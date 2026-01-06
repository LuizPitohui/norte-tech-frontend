'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { api } from '@/services/api';
import { AboutData } from '@/types';
import { Loader2, MapPin, Target, Heart, Phone, ExternalLink } from 'lucide-react'; // Removi 'Eye' (Visão)

const getImageUrl = (path: string | undefined) => {
  if (!path) return '/placeholder-base.jpg';
  if (path.startsWith('http')) return path;
  return `http://localhost:8000${path}`;
};

export default function SobrePage() {
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/about/')
      .then(response => setData(response.data))
      .catch(err => console.error("Erro ao carregar sobre:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-20">
        <Loader2 className="w-10 h-10 text-norte-gold animate-spin" />
      </div>
    );
  }

  if (!data) return <div className="pt-32 text-center">Dados não encontrados.</div>;

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden bg-norte-blue">
        <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <span className="text-norte-gold font-bold tracking-widest uppercase mb-2 block animate-fadeIn">Institucional</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fadeIn" style={{animationDelay: '0.1s'}}>
            Sobre a Norte Tech
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg animate-fadeIn" style={{animationDelay: '0.2s'}}>
            Construindo o futuro da energia com segurança e inovação no Norte do Brasil.
          </p>
        </div>
      </section>

      {/* 2. HISTÓRIA & FOTO */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 -mt-24 relative z-20">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-norte-blue mb-8 border-l-4 border-norte-gold pl-6">
                  Nossa História
                </h2>
                <div className="prose prose-lg prose-slate text-slate-600 leading-relaxed text-justify whitespace-pre-line">
                   {data.company_info?.about_text || "Texto sobre a empresa não cadastrado."}
                </div>
              </div>

              <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-lg border border-slate-100 group">
                <Image 
                  src={getImageUrl(data.company_info?.about_image)} 
                  alt="Sede da Norte Tech"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-norte-blue/20 to-transparent pointer-events-none"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. MISSÃO E VALORES (AGORA SÃO APENAS 2 COLUNAS) */}
      <section className="py-10 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Missão */}
            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 hover:shadow-xl hover:border-norte-gold/30 transition-all text-center group">
              <div className="w-20 h-20 bg-blue-100 text-norte-blue rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-norte-gold transition-colors shadow-inner">
                <Target size={40} />
              </div>
              <h3 className="text-2xl font-bold text-norte-blue mb-4">Missão</h3>
              <p className="text-slate-600 leading-relaxed">
                {data.company_info?.mission || "Missão da empresa..."}
              </p>
            </div>
            
            {/* Valores */}
            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100 hover:shadow-xl hover:border-norte-gold/30 transition-all text-center group">
              <div className="w-20 h-20 bg-blue-100 text-norte-blue rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-norte-gold transition-colors shadow-inner">
                <Heart size={40} />
              </div>
              <h3 className="text-2xl font-bold text-norte-blue mb-4">Valores</h3>
              <p className="text-slate-600 leading-relaxed">
                {data.company_info?.values || "Valores da empresa..."}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. BASES OPERACIONAIS */}
      {data.bases.length > 0 && (
        <section className="py-24 bg-norte-blue text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <span className="text-norte-gold font-bold tracking-widest uppercase text-sm">Onde Atuamos</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-2">Nossas Bases Operacionais</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.bases.map((base) => (
                <div key={base.id} className="bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col group h-full">
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image 
                      src={getImageUrl(base.image)} 
                      alt={`Base ${base.name}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                        <h3 className="text-xl font-bold text-white">{base.name}</h3>
                        <p className="text-norte-gold text-sm font-medium">{base.city} - {base.state}</p>
                    </div>
                  </div>

                  <div className="p-6 text-slate-600 flex flex-col flex-grow">
                    <div className="flex items-start gap-3 mb-4">
                        <MapPin className="text-norte-blue mt-1 flex-shrink-0" size={18} />
                        <p className="text-sm">{base.address}</p>
                    </div>
                    {base.phone && (
                        <div className="flex items-center gap-3 mb-6">
                            <Phone className="text-norte-blue flex-shrink-0" size={18} />
                            <p className="text-sm font-medium">{base.phone}</p>
                        </div>
                    )}
                    <div className="mt-auto pt-4 border-t border-slate-100">
                        {base.map_link ? (
                            <a href={base.map_link} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-norte-blue text-norte-blue hover:text-white py-3 rounded-xl transition-colors font-bold text-sm">
                                <ExternalLink size={16} /> Ver Localização
                            </a>
                        ) : (
                            <button disabled className="w-full py-3 bg-slate-100 text-slate-400 rounded-xl text-sm font-medium cursor-not-allowed">Mapa indisponível</button>
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. CERTIFICAÇÕES */}
      {data.certifications.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-slate-400 mb-12 uppercase tracking-widest">
              Certificações de Qualidade
            </h2>
            <div className="flex flex-wrap justify-center gap-12 items-center grayscale hover:grayscale-0 transition-all duration-500">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="w-32 h-32 relative group" title={cert.name}>
                  <Image src={getImageUrl(cert.image)} alt={cert.name} fill className="object-contain" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}