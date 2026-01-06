'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';
import { ServiceItem } from '@/types';

// Helper de imagem
const getImageUrl = (path: string) => {
  if (!path) return '/placeholder.jpg';
  if (path.startsWith('http')) return path;
  return `http://localhost:8000${path}`;
};

export default function ServicesSection({ services }: { services: ServiceItem[] }) {
  if (!services || services.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-norte-gold font-bold tracking-wider uppercase text-sm">O Que Fazemos</span>
          <h2 className="text-3xl md:text-4xl font-bold text-norte-blue mt-2 mb-4">
            Soluções de Engenharia e Energia
          </h2>
          <p className="text-slate-500 text-lg">
            Tecnologia de ponta e equipe especializada para atender as demandas mais complexas da região Norte.
          </p>
        </div>

        {/* Grid de Serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link 
              key={service.id} 
              href={`/servicos/${service.slug}`}
              className="group relative bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:border-norte-gold/50 transition-all duration-300 hover:shadow-xl flex flex-col"
            >
              
              {/* Imagem com Overlay no Hover */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={getImageUrl(service.cover_image)}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-norte-blue/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-norte-gold text-norte-blue px-6 py-2 rounded-full font-bold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    Ver Detalhes
                  </span>
                </div>
              </div>

              {/* Conteúdo do Card */}
              <div className="p-8 flex flex-col flex-grow">
                {/* Ícone Decorativo (Categoria) */}
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 -mt-14 relative z-10 border border-slate-100 group-hover:bg-norte-gold transition-colors duration-300">
                  <Zap size={24} className="text-norte-gold group-hover:text-norte-blue transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-norte-blue mb-3 group-hover:text-norte-gold transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                  {service.short_description}
                </p>

                <div className="flex items-center text-norte-blue font-bold text-sm group-hover:translate-x-2 transition-transform duration-300">
                  Saiba mais <ArrowRight size={16} className="ml-2 text-norte-gold" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Botão Ver Todos */}
        <div className="mt-16 text-center">
          <Link 
            href="/servicos" 
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-norte-blue text-norte-blue font-bold hover:bg-norte-blue hover:text-white transition-all duration-300"
          >
            Ver Todos os Serviços
          </Link>
        </div>

      </div>
    </section>
  );
}