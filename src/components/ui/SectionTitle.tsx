export default function SectionTitle({ title }: { title: string }) {
  return (
    <h1 className="text-3xl md:text-5xl font-semibold text-neutral-900 mb-8">
      {title}
    </h1>
  );
}
