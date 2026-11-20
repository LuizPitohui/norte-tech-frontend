# 🌐 Norte Tech — Frontend

## 📋 Sobre o Projeto

Interface web do portal institucional da **Norte Tech – Serviços em Energia**, construída em **Next.js 16** com **App Router** e consumindo a API do backend em Django.

Todo o conteúdo do site (banner da home, notícias, serviços, vídeo institucional, bases operacionais, certificações e canais de contato) é cadastrado pelo painel administrativo do backend. A equipe publica e atualiza o site sem depender de um novo deploy do frontend.

## 🚀 Tecnologias Utilizadas

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, rotas dinâmicas por `slug`)
- **Runtime:** React 19
- **Linguagem:** TypeScript, com tipos para cada resposta da API (`src/types`)
- **Estilização:** Tailwind CSS, com paleta própria da marca (`norte-blue`, `norte-gold`)
- **HTTP:** Axios
- **Ícones:** Lucide React

---

## ✨ Páginas e Funcionalidades

| Rota | Descrição |
|------|-----------|
| `/` | Home com carrossel de destaques, serviços em destaque, últimas notícias e vídeo institucional |
| `/sobre` | Apresentação da empresa, missão e valores, **bases operacionais** (com foto e link para o Google Maps) e **certificações** |
| `/servicos/[slug]` | Página individual de cada serviço |
| `/noticias` | Listagem de notícias e artigos |
| `/noticias/[slug]` | Leitura da notícia |
| `/contato` | Canais de atendimento (telefone, e-mail, redes sociais) e mapa da matriz |

- 🎠 **Hero com carrossel** ordenado pelo campo `order` definido no admin.
- 🎬 **Vídeo institucional** servido pela pasta de mídia do backend.
- ⚠️ **Tela de falha de conexão** quando a API está fora do ar, em vez de uma página quebrada.
- 📱 **Layout responsivo** com navbar e footer compartilhados.

---

## 🔌 Integração com a API

| Endpoint | Usado em |
|----------|----------|
| `GET /api/home/` | Home: carrossel, notícias, serviços em destaque, vídeo e configurações do site |
| `GET /api/about/` | Sobre: dados da empresa, bases e certificações |
| `GET /api/services/{slug}/` | Detalhe do serviço |
| `GET /api/news/` | Listagem de notícias |
| `GET /api/news/{slug}/` | Detalhe da notícia |
| `GET /api/contact/` | Configurações de contato e canais |

---

## 🔧 Como Rodar

### Pré-requisitos
- Node.js 20+
- Backend [NorteTech-Site](https://github.com/LuizPitohui/NorteTech-Site) rodando em `http://localhost:8000`

### Passo a passo
```bash
git clone https://github.com/LuizPitohui/norte-tech-frontend.git
cd norte-tech-frontend
npm install
npm run dev
```

A aplicação sobe em `http://localhost:3000`.

A URL da API está definida em `src/services/api.ts` (`baseURL`). Para apontar para outro servidor, altere esse valor e o `remotePatterns` em `next.config.ts`, que libera as imagens vindas de `/media/`.

### Build de produção
```bash
npm run build
npm run start
```

---

## 📂 Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx            # Layout raiz (navbar + footer)
│   ├── page.tsx              # Home
│   ├── sobre/page.tsx
│   ├── contato/page.tsx
│   ├── noticias/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── servicos/[slug]/page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx              # Carrossel
│   ├── ServicesSection.tsx
│   ├── NewsSection.tsx
│   └── VideoSection.tsx
├── services/api.ts           # Cliente Axios
└── types/index.ts            # Tipos das respostas da API
```

---

## 🔗 Projeto Relacionado

O backend e o painel administrativo ficam em [NorteTech-Site](https://github.com/LuizPitohui/NorteTech-Site): Django 6, com site institucional gerenciável e sistema de recrutamento (ATS).
