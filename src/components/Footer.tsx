
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Globe,
  MessageCircle,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-semibold text-xl mb-4">
              <Globe className="h-6 w-6 text-accent" />
              <span>TrafficManager</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6">
              Powerful traffic management solutions for modern applications.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="https://twitter.com" icon={<Twitter size={18} />} label="Twitter" />
              <SocialLink href="https://linkedin.com" icon={<Linkedin size={18} />} label="LinkedIn" />
              <SocialLink href="https://github.com" icon={<Github size={18} />} label="GitHub" />
            </div>
          </div>
          
          <div className="md:col-span-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              <div>
                <h3 className="font-medium text-base mb-4">Product</h3>
                <ul className="space-y-3">
                  <FooterLink to="/docs">Documentation</FooterLink>
                  <FooterLink to="/generator">API Keys</FooterLink>
                  <FooterLink to="/docs#pricing">Pricing</FooterLink>
                  <FooterLink to="/docs#changelog">Changelog</FooterLink>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-base mb-4">Resources</h3>
                <ul className="space-y-3">
                  <FooterLink to="/docs#guides">Guides</FooterLink>
                  <FooterLink to="/docs#examples">Examples</FooterLink>
                  <FooterLink to="/docs#faq">FAQ</FooterLink>
                  <FooterLink to="/docs#api-status">API Status</FooterLink>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-base mb-4">Company</h3>
                <ul className="space-y-3">
                  <FooterLink to="/about">About Us</FooterLink>
                  <FooterLink to="/careers">Careers</FooterLink>
                  <FooterLink to="/blog">Blog</FooterLink>
                  <FooterLink to="/contact">Contact</FooterLink>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm text-muted-foreground">
            © {currentYear} TrafficManager. All rights reserved.
          </div>
          
          <div className="flex flex-wrap gap-6 text-sm">
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="h-8 gap-1.5">
              <MessageCircle className="h-3.5 w-3.5" />
              <span className="text-xs">Support</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1.5">
              <FileText className="h-3.5 w-3.5" />
              <span className="text-xs">Documentation</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ 
  href, 
  icon, 
  label 
}: { 
  href: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-muted-foreground hover:text-foreground p-2 rounded-full bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 transition-colors"
    aria-label={label}
  >
    {icon}
  </a>
);

const FooterLink = ({ 
  children, 
  to 
}: { 
  children: React.ReactNode;
  to: string;
}) => (
  <li>
    <Link
      to={to}
      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
    >
      {children}
    </Link>
  </li>
);

export default Footer;
