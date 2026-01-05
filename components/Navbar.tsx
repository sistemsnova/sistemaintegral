
import React, { useState, useEffect } from 'react';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Módulos', href: '#modulos' },
    { name: 'Rubros', href: '#rubros' },
    { name: 'Planes', href: '#planes' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-xl shadow-2xl py-3' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#inicio" className="flex items-center space-x-4 group cursor-pointer">
          <Logo size={42} className="group-hover:scale-110 transition-transform duration-500" />
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-widest text-white leading-none uppercase">Nova</span>
            <span className="text-[10px] font-bold tracking-[0.3em] text-orange-500 uppercase">Systems</span>
          </div>
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center font-bold text-[10px] tracking-[0.2em] uppercase">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-slate-400 hover:text-orange-500 transition-colors">
              {link.name}
            </a>
          ))}
          <a href="#contacto" className="bg-orange-500 text-slate-950 px-7 py-2.5 rounded-xl hover:bg-white hover:scale-105 transition-all shadow-lg shadow-orange-500/20">
            Consultoría
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden absolute top-full left-0 w-full glass-dark border-t border-white/5 transition-all duration-500 overflow-hidden ${isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col p-8 space-y-6 font-bold text-xs tracking-[0.3em] uppercase">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-300 hover:text-orange-500 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contacto" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-orange-500 border border-orange-500/30 px-6 py-4 rounded-2xl text-center"
          >
            Consultoría
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
