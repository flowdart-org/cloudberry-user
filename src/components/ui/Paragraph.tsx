export default function Paragraph({ text }: { text: string }) {
  return (
    <p className="text-lg md:text-xl text-neutral-700 leading-relaxed mb-6 max-w-3xl mx-auto">
      {text}
    </p>
  );
}
