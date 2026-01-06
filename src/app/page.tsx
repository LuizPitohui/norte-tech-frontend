'use client';

import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { HomeData } from '@/types';
import Hero from '@/components/Hero';
import NewsSection from '@/components/NewsSection'; // <--- Importar
import VideoSection from '@/components/VideoSection'; // <--- Importar
import ServicesSection from '@/components/ServicesSection';
import { Loader2, AlertCircle } from 'lucide-react';

export default function Home() {
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get('/api/home/');
        setData(response.data);
      } catch (err) {
        console.error("Erro ao carregar home:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-10 h-10 text-norte-gold animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-slate-500 p-4">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-slate-800">Falha na Conexão</h2>
        <button onClick={() => window.location.reload()} className="mt-4 px-6 py-2 bg-norte-blue text-white rounded-full">
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <main className="flex flex-col min-h-screen">
      
{/* 1. HERO (Carrossel) */}
      <Hero items={data.carousel} />

      {/* 4. NOTÍCIAS */}
      <NewsSection news={data.news} />

      {/* 3. VÍDEO INSTITUCIONAL */}
      <VideoSection data={data.video} />

      {/* 2. SERVIÇOS (NOVO) - Colocamos logo após o Hero para destaque */}
      <ServicesSection services={data.featured_services} />

    </main>
  );
}