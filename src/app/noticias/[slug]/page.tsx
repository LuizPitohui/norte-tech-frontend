'use client';

import { useEffect, useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '@/services/api';
import { NewsItem } from '@/types';
import { Calendar, ChevronLeft, Loader2, Share2 } from 'lucide-react';

const getImageUrl = (path: string) => {
  if (!path) return '/placeholder.jpg';
  if (path.startsWith('http')) return path;
  return `http://localhost:8000${path}`;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
};

// O 'params' no Next.js 15+ (App Router) precisa ser tratado como Promise em alguns casos, 
// mas na estrutura padrão de Page Component, ele vem como prop.
export default function NoticiaDetalhe({ params }: { params: Promise<{ slug: string }> }) {
  // Desembrulhamos a promessa dos params (Padrão novo do Next.js)
  const resolvedParams = use(params);
  
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/news/${resolvedParams.slug}/`)
      .then(response => setNews(response.data))
      .catch(err => console.error("Erro ao carregar notícia:", err))
      .finally(() => setLoading(false));
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-20">
        <Loader2 className="w-10 h-10 text-norte-gold animate-spin" />
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <h1 className="text-2xl font-bold text-norte-blue">Notícia não encontrada</h1>
        <Link href="/noticias" className="text-norte-gold hover:underline mt-4 block">Voltar para Notícias</Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-white pt-24 pb-20">
      
      {/* Hero da Notícia */}
      <div className="relative h-[400px] md:h-[500px] w-full">
        <Image
          src={getImageUrl(news.imagem)}
          alt={news.titulo}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-norte-blue/80 opacity-60"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-4xl mx-auto px-4 w-full">
            <Link href="/noticias" className="inline-flex items-center text-white/80 hover:text-norte-gold mb-6 transition-colors font-medium">
              <ChevronLeft size={20} className="mr-1" /> Voltar para Notícias
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {news.titulo}
            </h1>
            <div className="flex items-center gap-6 text-white/90">
              <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                <Calendar size={18} className="text-norte-gold" />
                {formatDate(news.data_criacao)}
              </span>
              <button className="flex items-center gap-2 hover:text-norte-gold transition-colors">
                <Share2 size={18} /> Compartilhar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo do Artigo */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
          
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-10 font-medium border-l-4 border-norte-gold pl-6 italic">
            {news.resumo}
          </p>
          
          {/* Renderização do HTML Rico (Vindo do CKEditor ou TextField do Django) */}
          <div 
            className="prose prose-lg prose-slate max-w-none 
              prose-headings:text-norte-blue prose-headings:font-bold 
              prose-a:text-norte-gold prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-2xl prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: news.conteudo }}
          />

        </div>
      </div>

    </article>
  );
}