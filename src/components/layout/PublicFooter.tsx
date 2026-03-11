import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import logo from "@/assets/logo_new.png";

export default function PublicFooter() {
  return (
    <footer className="bg-navy text-primary-foreground/80">
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-6 group">
              <img src={logo} alt="Scooled Logo" className="h-10 w-auto object-contain transition-transform group-hover:scale-110" />
              <div className="flex flex-col">
                <span className="font-display text-lg font-black tracking-tight leading-none text-white">SCOOLED</span>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-cyan">Aquatics Hub</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-primary-foreground/60 mb-6">
              Premium swimming pool booking, coaching, and membership platform. Making aquatics accessible, modern, and delightful.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold text-primary-foreground mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2.5">
              {["About", "Programs", "Memberships", "Contact"].map((l) => (
                <Link key={l} to={`/${l.toLowerCase().replace(/ /g, "-")}`} className="text-sm hover:text-primary-foreground transition-colors">
                  {l}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold text-primary-foreground mb-4">Policies</h4>
            <div className="flex flex-col gap-2.5">
              {["Privacy Policy", "Terms of Service", "Refund Policy", "Safety Guidelines"].map((l) => (
                <a key={l} href="#" className="text-sm hover:text-primary-foreground transition-colors">{l}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold text-primary-foreground mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2.5 text-sm">
                <MapPin size={16} className="mt-0.5 shrink-0 text-cyan" />
                <span>12 Marine Drive, Mumbai 400001</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <Phone size={16} className="shrink-0 text-cyan" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <Mail size={16} className="shrink-0 text-cyan" />
                <span>hello@scooledaquatics.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-sm text-primary-foreground/40">
          © 2025 Scooled. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
