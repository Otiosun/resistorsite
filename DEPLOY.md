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
NEXT_PUBLIC_WHATSAPP_URL=https://whatsapp.com/channel/0029Vb7y772DeON8Ba0kzd0o
```

6. Clique em `Deploy`.

## Fluxo Mais Simples

Se voce quer o caminho mais facil e gratis:

1. Entre na Vercel com GitHub.
2. Importe o repositorio.
3. Adicione so `NEXT_PUBLIC_WHATSAPP_URL` com o link do canal.
4. Deixe a Vercel criar a URL gratis `seu-projeto.vercel.app`.
5. Depois do primeiro deploy, abra o projeto na Vercel e copie a URL final.
6. Se quiser fixar essa URL tambem no projeto, adicione `NEXT_PUBLIC_SITE_URL` com ela e clique em `Redeploy`.

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
- Testar o botao `Comecar jornada` abrindo o canal do WhatsApp
- Revisar `Privacidade`, `Termos de uso` e `Seguranca`

## Dominio Proprio

Se quiser manter tudo gratis, use a URL `seu-projeto.vercel.app`.

Se depois quiser algo mais profissional, compre um dominio e conecte na propria Vercel. O site continua o mesmo.
