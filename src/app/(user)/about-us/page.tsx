import Header from "@/components/common/Header";
import Container from "@/components/ui/Container";
import Paragraph from "@/components/ui/Paragraph";
import SectionTitle from "@/components/ui/SectionTitle";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header categories={false} />
    <main className="min-h-screen bg-white py-24">
      <Container>
        <SectionTitle title="ABOUT US — CLOUDBERRY" />

        <Paragraph text="Cloudberry was built on a simple belief: confidence is the one style that never goes out of fashion. We design apparel for individuals who refuse to blend in — people who want their clothing to speak before they do." />

        <Paragraph text="Our focus is clarity, not clutter. Cloudberry releases only a few, carefully crafted digital-print designs instead of flooding the market with noise. Every piece is engineered to stand out, last long, and feel effortless. No trends for the sake of trends. No compromises on quality." />

        <Paragraph text="Cloudberry is not fast fashion. It is intentional fashion. Our mission is to redefine everyday wear with prints that are bold, modern, and unmistakably ours. When someone sees a Cloudberry piece, they should recognize it instantly — not because of a logo, but because of the design language." />

        <Paragraph text="We are building a brand that people feel as much as they wear: clarity, confidence, and individuality." />

        <p className="text-xl md:text-2xl font-semibold text-neutral-900 mt-10">
          Cloudberry. Wear Your Confidence.
        </p>
      </Container>
    </main></div>
  );
}
