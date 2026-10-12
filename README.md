# Rokira — Ragnarok Clássico

Site oficial da comunidade Rokira, com identidade visual inspirada na nostalgia de Rune-Midgard.

## Conteúdo

- Página institucional com novidades, rates e classes iniciais até a Classe 2.
- Database pesquisável com ícones, nomes, IDs, atributos e detalhes dos itens.
- Área de rankings para personagens, guildas e MVPs, preparada para receber dados oficiais quando a integração com o servidor estiver disponível.
- Imagens da marca e arte de fundo.

## Estrutura

- `dist/index.html` — página principal.
- `dist/items.js` — busca, filtros, paginação e fichas dos itens.
- `dist/assets/items.json` — catálogo atual de 6.169 itens.
- `dist/assets/background.png` e `dist/assets/logo.png` — imagens do site.
- `.openai/hosting.json` — configuração do projeto Sites.

O site é estático; os rankings ainda não estão conectados a uma API em tempo real.
