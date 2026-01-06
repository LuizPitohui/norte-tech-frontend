'use client';

import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { ContactData } from '@/types';
import { Loader2, Phone, Mail, MapPin, MessageCircle, Facebook, Instagram, Linkedin, Globe, ExternalLink, ArrowRight, ShieldAlert } from 'lucide-react';

export default function ContatoPage() {
  const [data, setData] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/contact/')
      .then(response => setData(response.data))
      .catch(err => console.error("Erro ao carregar contato:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-20">
        <Loader2 className="w-10 h-10 text-norte-gold animate-spin" />
      </div>
    );
  }

  const getIcon = (texto: string) => {
    if (!texto) return <Phone size={22} />;
    const t = texto.toLowerCase();
    
    if (t.includes('denuncia') || t.includes('privacidade')) return <ShieldAlert size={22} />;
    if (t.includes('zap') || t.includes('whatsapp')) return <MessageCircle size={22} />;
    if (t.includes('mail') || t.includes('email') || t.includes('fale')) return <Mail size={22} />;
    if (t.includes('insta')) return <Instagram size={22} />;
    if (t.includes('face')) return <Facebook size={22} />;
    if (t.includes('linked')) return <Linkedin size={22} />;
    if (t.includes('site') || t.includes('web') || t.includes('link')) return <Globe size={22} />;
    
    return <Phone size={22} />;
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* 1. HERO SIMPLES */}
      <section className="bg-norte-blue text-white pt-32 pb-24 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 pointer-events-none"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="text-norte-gold font-bold tracking-widest uppercase mb-2 block animate-fadeIn">Fale Conosco</span>
            <h1 className="text-3xl md:text-5xl font-bold">Canais de Atendimento</h1>
         </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 pb-20 space-y-12">
        
        {/* 2. LISTA DE CONTATOS */}
        {data?.channels && data.channels.length > 0 ? (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
            <div className="divide-y divide-slate-100">
              {data.channels.map((canal) => {
                // CORREÇÃO: Usando 'conteudo' e 'titulo' conforme seu JSON
                const conteudo = canal.conteudo || '';
                const isLink = conteudo.startsWith('http');

                return (
                  <div key={canal.id} className="group flex items-center gap-6 p-6 hover:bg-slate-50 transition-all duration-300">
                    
                    {/* Ícone Redondo */}
                    <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-norte-blue group-hover:bg-norte-gold group-hover:text-norte-blue transition-colors shadow-sm flex-shrink-0">
                      {getIcon(canal.tipo || canal.titulo)}
                    </div>

                    {/* Informações */}
                    <div className="flex-grow">
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1 group-hover:text-norte-blue transition-colors">
                        {canal.titulo}
                      </h3>
                      
                      {isLink ? (
                        <a 
                          href={conteudo} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-lg font-bold text-norte-blue hover:text-norte-gold transition-colors flex items-center gap-2"
                        >
                          Acessar Link <ExternalLink size={16} />
                        </a>
                      ) : (
                        <p className="text-lg font-bold text-norte-blue select-all break-all">
                          {conteudo || "—"}
                        </p>
                      )}
                    </div>

                    {/* Seta Decorativa (Direita) */}
                    <div className="text-slate-200 group-hover:text-norte-gold transition-colors transform group-hover:translate-x-1">
                      <ArrowRight size={24} />
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-xl shadow-sm">
            <p className="text-slate-400">Nenhum canal de contato cadastrado.</p>
          </div>
        )}

        {/* 3. MATRIZ ADMINISTRATIVA */}
        {data?.settings && (
          <div className="bg-norte-blue rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-norte-gold/10 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
              
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm border border-white/10">
                <MapPin size={40} className="text-norte-gold" />
              </div>

              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Matriz Administrativa</h2>
                  <p className="text-slate-300 text-lg font-light leading-relaxed max-w-2xl">
                    {data.settings.address || "Endereço da matriz não configurado."}
                  </p>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-2">
                  {data.settings.phone && (
                    <div className="flex items-center gap-2 text-slate-300">
                      <Phone size={18} className="text-norte-gold" />
                      <span>{data.settings.phone}</span>
                    </div>
                  )}
                  {data.settings.email_contact && (
                    <div className="flex items-center gap-2 text-slate-300">
                      <Mail size={18} className="text-norte-gold" />
                      <span>{data.settings.email_contact}</span>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}