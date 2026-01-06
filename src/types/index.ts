export interface CarouselItem {
  id: number;
  title: string;
  description: string;
  image: string;
  order: number;
}

export interface NewsItem {
  id: number;
  titulo: string; // Note que mantivemos o português pois vem assim da API
  resumo: string;
  conteudo: string;
  slug: string;
  imagem: string;
  data_criacao: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  cover_image: string;
  category_name?: string;
}

export interface HomeData {
  carousel: CarouselItem[];
  news: NewsItem[];
  featured_services: ServiceItem[];
  video?: {
    id: number;
    title: string;
    video_file: string;
    about_text: string;
  } | null;
  settings?: {
    site_title: string;
    phone: string;
    email_contact: string;
    instagram?: string;
    linkedin?: string;
  } | null;
}

export interface OperatingBase {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  phone?: string;
  image?: string;     // A foto da fachada da base
  map_link?: string;  // O link do Google Maps (adicionado no Admin)
}

export interface Certification {
  id: number;
  name: string;
  image: string;
  description?: string;
}

export interface AboutData {
  company_info: {
    site_title: string;
    about_text: string;
    mission?: string;
    values?: string;
    about_image?: string; // <--- ADICIONE ESTA LINHA (Verifique se o nome no Django é 'about_image' ou apenas 'image')
  } | null;
  bases: OperatingBase[];
  certifications: Certification[];
}
export interface ContactChannel {
  id: number;
  tipo: string;      // Ex: 'EMAIL', 'LINK'
  conteudo: string;  // ANTES ERA 'valor' -> AGORA É 'conteudo'
  titulo: string;    // ANTES ERA 'nome'  -> AGORA É 'titulo'
  ordem: number;
  icone?: string;    // O JSON tem esse campo, então adicionei aqui
}

export interface ContactData {
  settings: {
    site_title: string;
    phone: string;
    email_contact: string;
    address: string;
    map_iframe?: string;
    // Adicionei os campos extras que vi no seu JSON para evitar erros futuros
    instagram?: string;
    linkedin?: string;
    facebook?: string;
    youtube?: string;
  } | null;
  channels: ContactChannel[];
}