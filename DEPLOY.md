# Deploy Gratis

## Vercel

O caminho mais facil para esta landing e publicar na Vercel.

1. Suba o projeto para o GitHub.
2. Entre em `https://vercel.com` com sua conta GitHub.
3. Clique em `Add New Project`.
4. Importe este repositorio.
5. Antes do deploy, configure estas variaveis:

```env
NEXT_PUBLIC_SITE_URL=https://seu-projeto.vercel.app
NEXT_PUBLIC_WHATSAPP_URL=https://wa.me/5511999999999?text=Oi%20vim%20pelo%20site%20da%20Pokestor
```

6. Clique em `Deploy`.

## O Que Fica Pronto

- HTTPS automatico na URL da Vercel
- Analytics funcionando na hospedagem da Vercel
- Metadata, `robots.txt`, `sitemap.xml` e social preview ativos
- Contato oficial via WhatsApp no rodape quando a variavel estiver preenchida

## Checklist Final

- Confirmar a URL publica em `NEXT_PUBLIC_SITE_URL`
- Confirmar o link real do WhatsApp em `NEXT_PUBLIC_WHATSAPP_URL`
- Abrir o site no celular e testar scroll, footer e modais
- Testar os cliques do cabecalho, orbita e contato
- Revisar `Privacidade`, `Termos de uso` e `Seguranca`

## Dominio Proprio

Se quiser manter tudo gratis, use a URL `seu-projeto.vercel.app`.

Se depois quiser algo mais profissional, compre um dominio e conecte na propria Vercel. O site continua o mesmo.
