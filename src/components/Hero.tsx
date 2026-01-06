'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { CarouselItem } from '@/types';

// Helper para corrigir URL da imagem (se vier relativa do Django)
const getImageUrl = (path: string) => {
  if (!path) return '/placeholder.jpg'; // Imagem de fallback
  if (path.startsWith('http')) return path;
  return `http://localhost:8000${path}`;
};

export default function Hero({ items }: { items: CarouselItem[] }) {
  const [current, setCurrent] = useState(0);

  // Auto-play do carrossel (5 segundos)
  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [items.length]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % items.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + items.length) % items.length);

  if (!items || items.length === 0) {
    return (
      <div className="h-[500px] bg-norte-blue flex items-center justify-center text-white">
        <p>Carregando destaques...</p>
      </div>
    );
  }

  return (
    <div className="relative h-[600px] w-full overflow-hidden group bg-slate-900">
      
      {/* Slides */}
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Imagem de Fundo com Overlay Escuro */}
          <div className="relative w-full h-full">
            <Image
              src={getImageUrl(item.image)}
              alt={item.title}
              fill
              className="object-cover"
              priority={index === 0} // Carrega a primeira imagem mais rápido
            />
            <div className="absolute inset-0 bg-gradient-to-r from-norte-blue/90 via-norte-blue/60 to-transparent" />
          </div>

          {/* Texto do Banner */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-xl space-y-6 opacity-0 animate-fadeIn" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                <span className="inline-block py-1 px-3 rounded-full bg-norte-gold/20 text-norte-gold border border-norte-gold/30 text-xs font-bold tracking-wider uppercase backdrop-blur-sm">
                  Destaque Norte Tech
                </span>
                <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                  {item.title}
                </h2>
                <p className="text-lg text-slate-300 line-clamp-3">
                  {item.description}
                </p>
                
                <button className="group flex items-center gap-2 bg-norte-gold text-norte-blue px-8 py-3 rounded-full font-bold hover:bg-white transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                  Saiba Mais
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Controles de Navegação */}
      {items.length > 1 && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-norte-gold hover:text-norte-blue transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-norte-gold hover:text-norte-blue transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicadores (Bolinhas) */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === current ? 'bg-norte-gold w-8' : 'bg-white/30 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}