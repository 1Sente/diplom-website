"use client";

import { motion } from "framer-motion";
import { Menu, X, User, LogIn } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Услуги", href: "/#services" },
    { name: "Хостинг", href: "/#hosting" },
    { name: "Портфолио", href: "/#portfolio" },
    { name: "Контакты", href: "/#contact" },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-neutral-950/80 backdrop-blur-lg border-b border-neutral-800 shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="text-2xl font-black tracking-tighter flex items-center gap-2">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              NEXUS
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {links.map((link, i) => (
              <motion.div 
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
              >
                <Link href={link.href} className="text-neutral-300 hover:text-white transition-colors text-sm font-medium tracking-wide">
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-neutral-300 hover:text-white text-sm font-medium transition-colors flex items-center gap-2"
            >
              <LogIn size={16} />
              Войти
            </Link>
            <Link 
              href="/dashboard" 
              className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-neutral-200 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <User size={16} />
              Личный Кабинет
            </Link>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center gap-4">
            <Link href="/dashboard" className="p-2 text-neutral-300 hover:text-white bg-neutral-900 rounded-lg">
              <User size={20} />
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-neutral-300 hover:text-white p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-neutral-950 border-b border-neutral-800 absolute w-full"
        >
          <div className="px-4 pt-2 pb-6 space-y-4">
            {links.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="block text-base font-medium text-neutral-300 hover:text-white py-2"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-neutral-800 flex flex-col gap-3">
              <Link 
                href="/login" 
                onClick={() => setIsOpen(false)}
                className="block text-center py-3 rounded-lg border border-neutral-800 text-white font-medium"
              >
                Войти
              </Link>
              <Link 
                href="/register" 
                onClick={() => setIsOpen(false)}
                className="block text-center py-3 rounded-lg bg-white text-black font-bold"
              >
                Зарегистрироваться
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}