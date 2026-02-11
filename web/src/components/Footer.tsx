// src/components/Footer.tsx
import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#222222] text-[#8e8e8e] py-8 mt-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Proof of Skill. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-[#10BB35] transition-colors" aria-label="GitHub">
            <Github className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-[#10BB35] transition-colors" aria-label="Twitter">
            <Twitter className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-[#10BB35] transition-colors" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
        <nav>
          <ul className="flex space-x-4 text-sm">
            <li><a href="#" className="hover:text-[#10BB35] transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-[#10BB35] transition-colors">Terms of Service</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
