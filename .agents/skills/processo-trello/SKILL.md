---
name: processo-trello
description: Processo Scrum + Kanban do time no quadro Trello "Sprint 2ºSemestre". Use ao iniciar, revisar ou concluir uma tarefa, ao criar ou mover cards, ao escolher a próxima tarefa ou ao nomear branch e commit a partir de um card.
---

# Processo no Trello (Scrum + Kanban)

Quadro: https://trello.com/b/qypssKqv/sprint-2semestre · sprint de 1 semana · a meta da sprint fica no topo do quadro e orienta a prioridade.

## Papéis
- PO: Vitor (vitoros1). Organiza e prioriza o Product Backlog e o Sprint Backlog e define o critério de aceite.
- SM: Luigi (luigimv). Garante o processo (fluxo de branches, commits, card por mudança), vigia o WIP, conduz as cerimônias e remove impedimentos.
- Dúvida de escopo ou prioridade → PO. Dúvida de processo ou bloqueio → SM.

## Colunas
Product Backlog → Sprint Backlog → To - Do → Doing (WIP 4) → Revision (WIP 2) → Done.

O WIP não está configurado no Trello: conte os cards antes de mover. Coluna cheia → não mova; reporte o gargalo.

## Card de tarefa
- Título: `<id> – <descrição>`. `H<nn>` = história do documento de requisitos (H1–H32); `T<nn>` = tarefa técnica sem história. O id liga card, branch (`feat/h22-...`) e commit (`Refs: H22`).
- Responsável: membro do card.
- Etiquetas, uma de cada grupo:
  - tamanho: `P` (≤2h) · `M` (meio dia) · `G` (≥1 dia → quebrar em cards menores);
  - categoria: `CÓDIGO` · `DADOS` · `DESIGN` · `DOCUMENTAÇÃO`;
  - prioridade: `ALTA` · `MÉDIA` · `BAIXA`.
- Datas planejadas (opcional): início e entrega nos campos de data do card, definidos por quem planeja (ex.: PO).
- Datas reais (criada/iniciada/pronta) vêm do histórico do card (criação e movimentos); não as registre à mão.
- Card sem id (`H<nn>`/`T<nn>`), responsável ou etiquetas não sai de To - Do.

## Movimentos
- Responsável: To - Do → Doing ao começar; Doing → Revision quando a branch está pronta para revisão.
- O merge na `develop` pode vir antes da revisão (quando o humano pedir); o card continua em Revision.
- Revisor (um colega): Revision → Done após revisar, com o merge na `develop` verde e o critério de aceite atendido.

## Agentes
- Com acesso ao Trello: atualize só o card da tarefa atual. Sem acesso: diga ao humano o que mover.
- Sem card para a tarefa: pergunte antes de começar.
