"use client"

import Link from "next/link";

const Footer = () => {
  const companyLinks = [
    {link: "About Us", href: 'about-us'},
    {link: "Privacy Policy", href: 'privacy-policy'},
    {link: "Terms & Conditions", href: 'terms-conditions'},
    {link: "Contact Us", href: 'contact-us'}
  ];

  return (
    <footer className="bg-muted/50 border-t border-border py-12 w-full">
      <div className="container px-4 md:px-8 w-screen">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-medium text-foreground mb-4">
              Cloudberry
            </h3>
            <p className="text-neutral-400  text-sm max-w-md">
              Your destination for premium fashion and style. Discover the latest trends
              and timeless classics.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4 ">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((tab) => (
                <li key={tab.link}>
                  <Link
                    href={tab.href}
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    {tab.link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-neutral-400 ">
            © 2025 Zen Fashion Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
