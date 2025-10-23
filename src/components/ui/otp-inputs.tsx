// OTPInputs.tsx (or inline above PhoneModal)
import React, { useEffect, useRef } from "react";

interface OTPInputsProps {
    value: string; // current OTP string (e.g. "123456")
    onChange: (val: string) => void;
    length?: number; // default 6
}

export const OTPInputs: React.FC<OTPInputsProps> = ({
    value,
    onChange,
    length = 4,
}) => {
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    // Ensure value length never exceeds `length`
    useEffect(() => {
        if (value.length > length) onChange(value.slice(0, length));
    }, [length, onChange, value]);

    const focusInput = (idx: number) => {
        const el = inputsRef.current[idx];
        if (el) el.focus();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        const raw = e.target.value.replace(/\D/g, ""); // only digits
        if (!raw) {
            // user cleared this input
            const newVal = value.split("");
            newVal[idx] = "";
            onChange(newVal.join("").trim());
            return;
        }

        // Only take first digit from raw (in case of fast typing)
        const digit = raw[0];
        const chars = value.split("");
        chars[idx] = digit;
        // fill subsequent empty boxes if user pasted multiple digits into one field
        let nextIdx = idx + 1;
        let remaining = raw.slice(1).split("");
        while (remaining.length && nextIdx < length) {
            chars[nextIdx] = remaining.shift()!;
            nextIdx++;
        }
        const merged = chars.join("").slice(0, length);
        onChange(merged);

        // move focus to next empty or nextIdx
        const moveTo = Math.min(idx + 1 + raw.length - 1, length - 1);
        focusInput(moveTo);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
        const key = e.key;

        if (key === "Backspace") {
            e.preventDefault();
            const chars = value.split("");
            if (chars[idx]) {
                // delete current
                chars[idx] = "";
                onChange(chars.join("").trim());
                focusInput(idx);
            } else {
                // current empty -> move to previous and delete
                const prev = Math.max(0, idx - 1);
                chars[prev] = "";
                onChange(chars.join("").trim());
                focusInput(prev);
            }
        } else if (key === "ArrowLeft") {
            e.preventDefault();
            focusInput(Math.max(0, idx - 1));
        } else if (key === "ArrowRight") {
            e.preventDefault();
            focusInput(Math.min(length - 1, idx + 1));
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, idx: number) => {
        e.preventDefault();
        const pasted = (e.clipboardData.getData("Text") || "").replace(/\D/g, "");
        if (!pasted) return;
        const chars = value.split("");
        let writeIdx = idx;
        for (const ch of pasted) {
            if (writeIdx >= length) break;
            chars[writeIdx] = ch;
            writeIdx++;
        }
        onChange(chars.join("").slice(0, length));
        focusInput(Math.min(writeIdx, length - 1));
    };

    // render inputs
    const digits = new Array(length).fill(0);
    return (
        <div className="flex justify-center gap-2 sm:gap-3 max-w-[300px] w-full">
            {digits.map((_, i) => (
                <input
                    key={i}
                    ref={(el) => {
                        inputsRef.current[i] = el;
                    }}

                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={value[i] ?? ""}
                    onChange={(e) => handleChange(e, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    onPaste={(e) => handlePaste(e, i)}
                    className={`
        w-14 h-14
        text-center text-base sm:text-lg lg:text-xl
        outline-none border-0 focus:border focus:border-black
        bg-gray-100 sm:bg-gray-200/50
        transition-all duration-150 ease-in-out
        focus:bg-white
      `}
                    aria-label={`OTP digit ${i + 1}`}
                />
            ))}
        </div>

    );
};
