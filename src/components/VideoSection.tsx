'use client';

import { Play } from 'lucide-react';

interface VideoProps {
  data: {
    title: string;
    video_file: string;
    about_text: string;
  } | null | undefined;
}

const getVideoUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `http://localhost:8000${path}`;
};

export default function VideoSection({ data }: VideoProps) {
  if (!data) return null;

  return (
    <section className="py-24 bg-norte-blue text-white overflow-hidden relative">
      {/* Background Decorativo */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-norte-blue-light/30 -skew-x-12 translate-x-20 z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Texto Sobre a Empresa */}
          <div className="space-y-8">
            <div>
              <span className="text-norte-gold font-bold tracking-wider uppercase text-sm">Quem Somos</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-2 leading-tight">
                {data.title}
              </h2>
            </div>
            
            <div className="prose prose-lg prose-invert text-slate-300">
              <p>{data.about_text}</p>
            </div>

            <button className="bg-transparent border-2 border-norte-gold text-norte-gold px-8 py-3 rounded-full font-bold hover:bg-norte-gold hover:text-norte-blue transition-all duration-300 flex items-center gap-3 group">
              <Play size={20} className="fill-current" />
              Conheça Nossa História
            </button>
          </div>

          {/* Player de Vídeo */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 bg-black aspect-video group">
            <video 
              controls 
              className="w-full h-full object-cover"
              poster="/placeholder-video.jpg" // Opcional: imagem de capa
            >
              <source src={getVideoUrl(data.video_file)} type="video/mp4" />
              Seu navegador não suporta vídeos HTML5.
            </video>
          </div>

        </div>
      </div>
    </section>
  );
}