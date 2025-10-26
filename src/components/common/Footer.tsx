"use client"
const Footer = () => {
  const companyLinks = [
    "About Us",
    "Privacy Policy",
    "Terms & Conditions",
    "Contact Us"
  ];

  return (
    <footer className="bg-muted/50 border-t border-border py-12 w-full">
      <div className="container px-4 md:px-8 w-screen">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-medium text-foreground mb-4 font-pirulen">
              Zen Fashion Studio
            </h3>
            <p className="text-muted-foreground text-sm max-w-md">
              Your destination for premium fashion and style. Discover the latest trends
              and timeless classics.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4 font-pirulen">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4 font-pirulen">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted hover:text-foreground transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted hover:text-foreground transition-colors"
                >
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted hover:text-foreground transition-colors"
                >
                  Size Guide
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Zen Fashion Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
