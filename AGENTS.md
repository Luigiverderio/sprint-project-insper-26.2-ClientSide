# AGENTS.md

Regras para todo agente (Codex, Claude Code) e membro do time. Fonte única: regras mudam só aqui e nas skills de `.agents/skills/`.

## Projeto
- Frontend (client side) do projeto; o backend fica em https://github.com/Luigiverderio/sprint-project-insper-26.2. Segredos em `.env` (nunca ler, imprimir ou commitar).
- Comandos (TODO: confirmar quando a stack fechar): `npm ci` · `npm test` · `npm run lint` · `npm run format`
- Visual: siga `docs/manual-da-marca.md`. Cores, fontes e espaçamentos só por tokens de `design-tokens/`, nunca valor solto no código.

## Branches
- `main`: release. Só recebe merge `--ff-only` de `develop` verde; agente só faz quando o humano pedir explicitamente.
- `develop`: integração e camada de teste. Base de todo trabalho; recebe só merges de branches de trabalho.
- Trabalho: `<tipo>/us<nn>-<descricao-kebab>` (ex.: `feat/us01-coleta-posicoes`), criada a partir de `develop` atualizada. `us<nn>` = história do card.
- Sem PRs: a integração é por merge local + push.
- Proibido: commit direto em `main` ou `develop`; `push --force` em `main`/`develop` (na própria branch, só `--force-with-lease`); apagar branches remotas.

## Fluxo
1. `git switch develop && git pull --ff-only` → `git switch -c <tipo>/us<nn>-<descricao>`
2. Antes de integrar: `git fetch && git rebase origin/develop`; testes e lint precisam passar. Card → Revision; um colega revisa a branch.
3. Merge após a revisão, só quando o humano pedir: `git switch develop && git pull --ff-only && git merge --ff-only <branch>`.
4. Testes e lint de novo **na `develop`**. Passou → `git push origin develop`. Falhou → não faça push; desfaça com `git reset --hard origin/develop` e corrija na branch.
5. Release (só com pedido explícito do humano): `git switch main && git pull --ff-only && git merge --ff-only develop && git push origin main`, só com `develop` verde.

## Processo (Scrum + Kanban, quadro no Trello)
- Toda mudança de código pertence a um card do quadro https://trello.com/b/qypssKqv/sprint-2semestre. Sem card, pergunte antes de começar.
- Colunas, WIP, formato do card e movimentos: skill `processo-trello`.
- Skills do time: fonte em `.agents/skills/<nome>/SKILL.md` (Codex); `.claude/skills/<nome>/SKILL.md` só aponta para ela (Claude Code).

## Commits (Conventional Commits)
`<tipo>(<escopo>): <descrição>`
- Tipos: `feat` `fix` `refactor` `test` `docs` `style` `perf` `build` `ci` `chore` `revert`.
- Tipo/escopo em inglês minúsculo. Descrição em português, verbo no presente, minúscula, sem ponto, ≤72 caracteres.
- Reutilize escopos existentes (`git log --oneline`). Um commit = uma mudança lógica. Quebra de compatibilidade: `!` + rodapé `BREAKING CHANGE:`.
- Rodapé `Refs: US<nn>` ligando o commit à história.
- Ex.: `feat(auth): adiciona login com JWT` · `fix(usuarios): corrige email duplicado`

## Regras de execução
- Commit e push só quando o humano pedir. Confira a branch atual antes.
- Siga os padrões já existentes no código. Altere só o escopo da tarefa, sem refatorar ou reformatar fora dele.
- Mudança de comportamento exige teste. Não desative testes para passar; se algo falhar, reporte.
- Dependência nova: só se necessária, registrada no arquivo de dependências, em commit `build(deps): ...`.
- Variável de ambiente nova → `.env.example` com valor fictício.
- Requisito, schema ou contrato de API ambíguo → pergunte, não suponha.
- Código em inglês (TODO: estilo e pasta de testes quando a stack fechar). Textos da interface em português, conforme o manual da marca.
- Não edite `AGENTS.md`/`CLAUDE.md`/skills sem pedido explícito.

## Pronto quando
Branch rebaseada sobre `develop` · teste novo cobrindo a mudança · commits no padrão · sem segredos no diff · revisado por colega · merge em `develop` com testes e lint verdes nela · push feito · card em Done atendendo o critério de aceite.
