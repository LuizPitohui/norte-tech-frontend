# Norte Tech — Frontend

Interface web do portal institucional da Norte Tech, construída em **Next.js** com **App Router** e consumindo a API do backend em Django.

## Páginas

| Rota | Descrição |
|------|-----------|
| `/` | Home institucional |
| `/sobre` | Apresentação da empresa |
| `/servicos/[slug]` | Catálogo de serviços, com página individual por serviço |
| `/noticias` | Listagem de notícias publicadas |
| `/noticias/[slug]` | Leitura da notícia |
| `/contato` | Formulário de contato |

Conteúdo dinâmico (notícias e serviços) vem da API, permitindo que a equipe publique pelo painel administrativo sem depender de deploy.

## Stack

- **Next.js** (App Router) + **React**
- **TypeScript**
- **Tailwind CSS**
- **Axios** para consumo da API
- **Lucide React** para ícones

## Como rodar

```bash
npm install
npm run dev
```

A aplicação sobe em `http://localhost:3000`. Configure a URL da API em um arquivo `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Projeto relacionado

O backend e o painel administrativo ficam em [NorteTech-Site](https://github.com/LuizPitohui/NorteTech-Site) — Django 6, com site institucional gerenciável e sistema de recrutamento (ATS).
