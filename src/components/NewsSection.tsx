'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { NewsItem } from '@/types';

// Helper de data
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};

// Helper de imagem
const getImageUrl = (path: string) => {
  if (!path) return '/placeholder.jpg';
  if (path.startsWith('http')) return path;
  return `http://localhost:8000${path}`;
};

export default function NewsSection({ news }: { news: NewsItem[] }) {
  if (!news || news.length === 0) return null;

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-norte-gold font-bold tracking-wider uppercase text-sm">Atualizações</span>
            <h2 className="text-3xl md:text-4xl font-bold text-norte-blue mt-2">Últimas Notícias</h2>
          </div>
          <Link href="/noticias" className="hidden md:flex items-center gap-2 text-norte-blue hover:text-norte-gold font-bold transition-colors">
            Ver todas <ArrowRight size={20} />
          </Link>
        </div>

        {/* Grid de Notícias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {news.map((item) => (
            <Link key={item.id} href={`/noticias/${item.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full">
              
              {/* Imagem */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={getImageUrl(item.imagem)}
                  alt={item.titulo}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-norte-blue/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                  <Calendar size={12} />
                  {formatDate(item.data_criacao)}
                </div>
              </div>

              {/* Conteúdo */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-norte-blue mb-3 line-clamp-2 group-hover:text-norte-gold transition-colors">
                  {item.titulo}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-3 mb-4 flex-grow">
                  {item.resumo}
                </p>
                <span className="text-norte-gold text-sm font-bold flex items-center gap-1 mt-auto">
                  Ler mais <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Botão Mobile (aparece só no celular) */}
        <div className="mt-8 text-center md:hidden">
          <Link href="/noticias" className="inline-flex items-center gap-2 text-norte-blue font-bold">
            Ver todas as notícias <ArrowRight size={20} />
          </Link>
        </div>

      </div>
    </section>
  );
}