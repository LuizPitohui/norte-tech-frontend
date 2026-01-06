'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, UserCircle, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // DEFINIÇÃO DOS LINKS (Nome na tela vs. Link real)
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'A Empresa', path: '/sobre' },
    { name: 'Serviços', path: '/servicos' }, // Sem cedilha
    { name: 'Notícias', path: '/noticias' }, // Sem acento
    { name: 'Contato', path: '/contato' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 top-0 left-0 transition-all duration-300 border-b border-white/10 ${
        scrolled 
          ? 'bg-norte-blue/90 backdrop-blur-md shadow-2xl py-2'
          : 'bg-gradient-to-r from-norte-blue via-norte-blue-light to-norte-blue py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          
          {/* LOGO */}
          <div className="flex-shrink-0 flex items-center group cursor-pointer">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-1 bg-norte-gold rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                <div className="relative bg-gradient-to-br from-norte-gold to-yellow-600 w-10 h-10 rounded-lg flex items-center justify-center font-black text-norte-blue text-xl shadow-lg">
                  N
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-white group-hover:text-norte-gold transition-colors">
                  Norte Tech
                </span>
                <span className="text-[10px] uppercase tracking-widest text-norte-gray font-semibold">
                  Soluções em Energia
                </span>
              </div>
            </Link>
          </div>

          {/* MENUS DESKTOP */}
          <div className="hidden md:flex space-x-1 items-center">
            {menuItems.map((item) => (
              <Link 
                key={item.name}
                href={item.path} 
                className="px-4 py-2 text-sm font-medium text-norte-gray hover:text-white hover:bg-white/5 rounded-full transition-all"
              >
                {item.name}
              </Link>
            ))}
            
            <div className="h-6 w-px bg-white/10 mx-2"></div>

            <a 
              href="http://localhost:8000/login" 
              className="group flex items-center gap-2 bg-white/5 hover:bg-norte-gold hover:text-norte-blue text-norte-gold px-5 py-2 rounded-full text-sm font-bold border border-norte-gold/30 hover:border-norte-gold transition-all duration-300"
            >
              <UserCircle size={18} />
              <span>Área do Candidato</span>
              <ChevronRight size={16} className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
            </a>
          </div>

          {/* BOTÃO MOBILE */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-norte-gray hover:text-white p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MENU MOBILE */}
      {isOpen && (
        <div className="md:hidden bg-norte-blue border-t border-white/10 absolute w-full shadow-2xl">
          <div className="px-4 pt-4 pb-6 space-y-2 flex flex-col">
            {menuItems.map((item) => (
               <Link 
                 key={item.name} 
                 href={item.path} 
                 className="block px-4 py-3 rounded-xl hover:bg-white/5 text-norte-gray hover:text-white"
                 onClick={() => setIsOpen(false)} // Fecha o menu ao clicar
               >
                 {item.name}
               </Link>
            ))}
            <a href="http://localhost:8000/login" className="block px-4 py-3 mt-4 rounded-xl bg-norte-gold text-norte-blue font-bold text-center">
              Acessar Área do Candidato
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}