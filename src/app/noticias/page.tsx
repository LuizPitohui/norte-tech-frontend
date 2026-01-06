'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { api } from '@/services/api';
import { NewsItem } from '@/types';
import { Calendar, ArrowRight, Loader2 } from 'lucide-react';

const getImageUrl = (path: string) => {
  if (!path) return '/placeholder.jpg';
  if (path.startsWith('http')) return path;
  return `http://localhost:8000${path}`;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
};

export default function NoticiasPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/news/')
      .then(response => setNews(response.data))
      .catch(err => console.error("Erro ao carregar notícias:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-20">
        <Loader2 className="w-10 h-10 text-norte-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-norte-blue mb-4">Notícias & Artigos</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Fique por dentro das últimas novidades, projetos e tecnologias da Norte Tech.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <Link key={item.id} href={`/noticias/${item.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full">
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={getImageUrl(item.imagem)}
                  alt={item.titulo}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-norte-blue/90 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                  <Calendar size={12} />
                  {formatDate(item.data_criacao)}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-norte-blue mb-4 group-hover:text-norte-gold transition-colors line-clamp-2">
                  {item.titulo}
                </h2>
                <p className="text-slate-500 mb-6 line-clamp-3 flex-grow leading-relaxed">
                  {item.resumo}
                </p>
                <span className="text-norte-gold font-bold flex items-center gap-2 mt-auto text-sm uppercase tracking-wide">
                  Ler Matéria Completa <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {news.length === 0 && (
          <div className="text-center text-slate-400 py-20">
            <p>Nenhuma notícia encontrada no momento.</p>
          </div>
        )}

      </div>
    </div>
  );
}