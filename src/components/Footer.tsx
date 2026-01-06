import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-norte-blue text-norte-gray pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Marca */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-2xl">
              <span className="bg-norte-gold text-norte-blue w-8 h-8 rounded flex items-center justify-center text-lg">N</span>
              Norte Tech
            </div>
            <p className="text-sm leading-relaxed text-norte-gray">
              Referência em soluções de energia e engenharia no Norte do Brasil.
            </p>
            <div className="flex gap-3 pt-2">
              {[Instagram, Linkedin, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-norte-gold hover:text-norte-blue transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* ... (O resto do footer mantém a estrutura, apenas trocando cores manuais por 'text-norte-gold' ou 'hover:text-norte-gold') ... */}
           {/* Para economizar espaço, vou resumir: Onde tiver 'yellow-500', troque por 'norte-gold' */}
           {/* Exemplo de link: */}
           <div>
            <h3 className="text-white font-semibold mb-6">Navegação</h3>
            <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="flex items-center gap-2 hover:text-norte-gold transition-colors group">
                    <ArrowRight size={14} className="text-norte-gray group-hover:text-norte-gold" />
                    Home
                  </a>
                </li>
            </ul>
           </div>
           
           {/* Exemplo de ícone de contato */}
           <div>
             <h3 className="text-white font-semibold mb-6">Contato</h3>
             <ul className="space-y-4 text-sm">
               <li className="flex gap-4 items-center">
                 <Phone className="text-norte-gold flex-shrink-0" size={20} />
                 <span className="text-white font-medium">(92) 99123-4567</span>
               </li>
             </ul>
           </div>

        </div>
        
        <div className="border-t border-white/10 pt-8 text-center text-xs text-norte-gray">
          <p>&copy; {new Date().getFullYear()} Norte Tech Energia.</p>
        </div>
      </div>
    </footer>
  );
}