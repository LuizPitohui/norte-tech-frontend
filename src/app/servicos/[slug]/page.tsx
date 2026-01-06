'use client';

import { useEffect, useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '@/services/api';
import { ServiceItem } from '@/types';
import { ChevronLeft, Loader2, CheckCircle, Phone } from 'lucide-react';

const getImageUrl = (path: string) => {
  if (!path) return '/placeholder.jpg';
  if (path.startsWith('http')) return path;
  return `http://localhost:8000${path}`;
};

export default function ServicoDetalhe({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [service, setService] = useState<ServiceItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/services/${resolvedParams.slug}/`)
      .then(response => setService(response.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [resolvedParams.slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-20"><Loader2 className="animate-spin text-norte-gold" /></div>;

  if (!service) return <div className="pt-32 text-center">Serviço não encontrado.</div>;

  return (
    <div className="bg-white min-h-screen pt-20">
      
      {/* Header do Serviço */}
      <div className="relative h-[400px] w-full bg-norte-blue">
        <Image
          src={getImageUrl(service.cover_image)}
          alt={service.title}
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-norte-blue via-transparent to-transparent"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <Link href="/servicos" className="inline-flex items-center text-white/80 hover:text-norte-gold mb-4 transition-colors font-medium">
              <ChevronLeft size={20} className="mr-1" /> Voltar para Serviços
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {service.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
            <h2 className="text-2xl font-bold text-norte-blue mb-6">Descrição do Serviço</h2>
            <div className="prose prose-lg prose-slate text-slate-600">
              {/* Se você tiver um campo 'content' HTML no futuro, use dangerouslySetInnerHTML aqui. 
                  Por enquanto, usaremos a short_description como placeholder */}
              <p className="lead">{service.short_description}</p>
              <p>
                A Norte Tech utiliza equipamentos de última geração e segue rigorosamente todas as normas técnicas (NR-10, NR-35) para garantir a entrega deste serviço com a máxima segurança e eficiência operacional.
              </p>
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-bold text-norte-blue mb-4">Diferenciais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Equipe Certificada', 'Equipamentos Próprios', 'Atendimento 24/7', 'Garantia de Qualidade'].map(item => (
                  <div key={item} className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <CheckCircle className="text-norte-gold flex-shrink-0" size={20} />
                    <span className="font-medium text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Lateral */}
          <div className="space-y-8">
            <div className="bg-norte-blue text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-white/10 w-32 h-32 rounded-full -mr-10 -mt-10 blur-2xl"></div>
              
              <h3 className="text-xl font-bold mb-4 relative z-10">Precisa deste serviço?</h3>
              <p className="text-slate-300 mb-8 relative z-10">
                Entre em contato agora mesmo para um orçamento personalizado.
              </p>
              
              <a href="/contato" className="block w-full bg-norte-gold text-norte-blue text-center font-bold py-3 rounded-full hover:bg-white transition-colors relative z-10">
                Solicitar Orçamento
              </a>
              
              <div className="mt-8 flex items-center justify-center gap-2 text-slate-300 relative z-10">
                <Phone size={18} />
                <span>(92) 99123-4567</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}