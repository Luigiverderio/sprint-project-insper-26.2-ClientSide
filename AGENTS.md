# AGENTS.md

Regras para todo agente (Codex, Claude Code) e membro do time. Fonte única: regras mudam só aqui e nas skills de `.agents/skills/` (`.claude/skills/` só aponta para elas).

## Projeto
- Frontend do projeto; o backend fica em https://github.com/Luigiverderio/sprint-project-insper-26.2.
- Stack: Vite + React 19 + TypeScript 6, React Router, React Query, Vitest + Testing Library, ESLint + Prettier.
- Comandos: `npm ci` · `npm run dev` · `npm test` · `npm run lint` · `npm run format` · `npm run build`
- **Verde** = `npm run lint`, `npm test`, `npm run build` e `npm run format:check` passando.
- Segredos só em `.env` (nunca ler, imprimir ou commitar). Variável `VITE_*` vai para o navegador: nunca ponha segredo nela. Variável nova → `.env.example` com valor fictício.
- Visual: siga `docs/manual-da-marca.md`; cores, fontes e espaçamentos só por tokens de `design-tokens/`.

## Branches
- `main`: release. Só recebe merge `--ff-only` de `develop` verde, quando o humano pedir.
- `develop`: integração. Base de todo trabalho.
- Trabalho: `<tipo>/<card>-<descricao-kebab>` criada a partir de `develop` atualizada; `<card>` = id do card em minúsculo (ex.: `feat/h22-mapa-ao-vivo`, `docs/t3-convencoes`).
- Sem PRs: integração por merge local + push.
- Proibido: commit direto em `main` ou `develop`; `push --force` nelas (na própria branch, só `--force-with-lease`); apagar branches remotas.

## Fluxo
1. `git switch develop && git pull --ff-only && git switch -c <branch>`. Card → Doing.
2. Pronto para integrar: `git fetch && git rebase origin/develop` e verde na branch. Card → Revision.
3. Merge só quando o humano pedir, com ou sem revisão: `git switch develop && git pull --ff-only && git merge --ff-only <branch>`.
4. Verde de novo **na `develop`** → `git push origin develop`. Falhou → sem push; `git reset --hard origin/develop` e corrija na branch.
5. O card só vai para Done depois da revisão de um colega; se o merge veio antes, ele espera em Revision.
6. Release (só a pedido do humano): `git switch main && git pull --ff-only && git merge --ff-only develop && git push origin main`.

## Commits (Conventional Commits)
`<tipo>(<escopo>): <descrição>` + rodapé `Refs: <card>` (ex.: `Refs: H22`).
- Tipos: `feat` `fix` `refactor` `test` `docs` `style` `perf` `build` `ci` `chore` `revert`.
- Tipo/escopo em inglês minúsculo; descrição em português, verbo no presente, minúscula, sem ponto, ≤72 caracteres.
- Um commit = uma mudança lógica; reutilize escopos (`git log --oneline`). Quebra de compatibilidade: `!` + rodapé `BREAKING CHANGE:`.

## Regras de execução
- Toda mudança pertence a um card do quadro https://trello.com/b/qypssKqv/sprint-2semestre; sem card, pergunte. Processo do quadro: skill `processo-trello`.
- Commit e push só quando o humano pedir; confira a branch atual antes.
- Siga os padrões do código; altere só o escopo da tarefa, sem refatorar ou reformatar fora dele.
- Mudança de comportamento exige teste em `<arquivo>.test.tsx`, ao lado do arquivo. Não desative testes para passar; se algo falhar, reporte.
- Dependência nova só se necessária, em commit `build(deps): ...`.
- Código em inglês; pastas de `src/` em português (`paginas`, `componentes`, `api`, `hooks`); textos da interface em português.
- Requisito, schema ou contrato de API ambíguo → pergunte, não suponha.
- Não edite `AGENTS.md`, `CLAUDE.md` ou skills sem pedido explícito.

## Pronto quando
Verde na `develop` com push feito · teste cobrindo a mudança · commits no padrão · sem segredos no diff · revisado por colega · card em Done atendendo o critério de aceite.
