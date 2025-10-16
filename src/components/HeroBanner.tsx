import heroBanner from "@/assets/hero-banner.jpg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const HeroBanner = () => {
  return (
    <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden bg-gradient-to-r from-secondary to-muted">
      <div className="absolute inset-0">
        <Image
          src={heroBanner}
          alt="Fashion Sale Banner"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
      </div>
      
      <div className="relative container h-full flex items-center justify-end px-4 md:px-8">
        <div className="text-right max-w-lg">
          <p className="text-accent text-xl md:text-2xl font-semibold mb-2">
            Last chance!
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            UP TO 40% OFF*
          </h2>
          <Link href={`/shop`}>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Shop Now
          </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
