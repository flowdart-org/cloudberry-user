"use client";

import { sendOtp, verifyOtp } from "@/lib/functions/auth";
import { useState } from "react";
import { OTPInputs } from "./ui/otp-inputs";
import { useAuthStore } from "@/store/authStore";

interface PhoneModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PhoneModal = ({ isOpen, onClose }: PhoneModalProps) => {
    const [phone, setPhone] = useState<string>("");
    const [otp, setOtp] = useState<string>("");
    const [showOTP, setShowOTP] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const {login} = useAuthStore()

    // ✅ Handle Phone Input
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 10);
        setPhone(value);
        setError("");
    };

    // ✅ Send OTP
    const handleSendOTP = async () => {
        if (phone.length !== 10) {
            setError("Please enter a valid 10-digit number.");
            return;
        }

        setLoading(true);
        const indNum = "+91 " + phone;
        const response = await sendOtp(indNum);

        if (response.success) {
            login({ email: '', id: '', phone: '', name: ''})
            setShowOTP(true);
            setLoading(false)
            setError("");
        } else {
            setError(response.message || "Failed to send OTP. Please try again.");
        }
        setLoading(false)
    };

    // ✅ Verify OTP
    const handleVerifyOTP = async () => {
        if (otp.length !== 4) {
            setError("Please enter a valid 4-digit OTP.");
            return;
        }
        setLoading(true);
        const indNum = "+91 " + phone;
        const response = await verifyOtp(indNum, otp)

        if (response.success) {
            setError("");
            handleClose()
        } else {
            setError(response.message || "Failed to send OTP. Please try again.");
        }
        setLoading(false)
    };

    const handleClose = () => {
        setPhone('');
        setOtp('');
        setShowOTP(false);
        setLoading(false);
        onClose()
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
            <div className="bg-white px-10 py-16 shadow-lg rounded-md md:w-[500px] flex flex-col items-center">
                <h2 className="text-2xl mb-8 text-center text-gray-900 font-mono">
                    {showOTP ? "Enter OTP" : "Login or Signup"}
                </h2>

                {/* ✅ Error Message */}
                {error && (
                    <p className="text-red-500 text-sm mb-3 text-center max-w-[300px]">
                        {error}
                    </p>
                )}

                {/* ✅ Phone Input */}
                {!showOTP && (
                    <div className="flex items-center border overflow-hidden focus-within:ring-1 ring-primary max-w-[300px] w-full rounded-md">
                        <span className="px-3 text-gray-800 ml-2 border-r">+91</span>
                        <input
                            type="text"
                            value={phone}
                            onChange={handlePhoneChange}
                            placeholder="Enter 10-digit number"
                            className="flex-1 px-2 py-2 outline-none text-gray-900 bg-white"
                        />
                    </div>
                )}

                {/* ✅ OTP Input */}
                {showOTP && (
                    <OTPInputs value={otp} onChange={setOtp} length={4} />
                )}

                {/* ✅ Buttons */}
                {showOTP ? (
                    <button
                        onClick={handleVerifyOTP}
                        disabled={loading}
                        className="mt-4 w-full bg-primary text-white py-4 hover:bg-primary/90 transition font-semibold font-mono max-w-[300px] disabled:opacity-70"
                    >
                        {loading ? "Verifying..." : "VERIFY OTP"}
                    </button>
                ) : (
                    <button
                        onClick={handleSendOTP}
                        disabled={loading}
                        className="mt-4 w-full bg-primary text-white py-4 hover:bg-primary/90 transition font-semibold font-mono max-w-[300px] disabled:opacity-70"
                    >
                        {loading ? "Sending..." : "SEND OTP"}
                    </button>
                )}

                <button
                    onClick={handleClose}
                    disabled={loading}
                    className="mt-2 w-full text-sm text-gray-500 hover:text-gray-900"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default PhoneModal;
