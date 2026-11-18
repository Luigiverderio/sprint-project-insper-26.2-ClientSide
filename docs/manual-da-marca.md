# Manual da marca — white label

Versão 0.2 · novembro de 2026 · tokens em [`design-tokens/tokens.css`](../design-tokens/tokens.css)

Este manual define como o produto de monitoramento de ônibus aparece para qualquer cliente.
Ele parte do que o sistema atual já usa (relatórios Quarto e app Shiny do repositório
`gabinete-falzoni/monitoramento-onibus`) e organiza tudo em regras únicas. O objetivo não é
"enfeitar" a interface. O objetivo é que um mesmo dado apareça sempre da mesma forma, em
qualquer tela e para qualquer cliente.

---

## 1. Princípios

1. **A marca veste a moldura; os dados não mudam de roupa.** O cliente troca logo, nome e cor
   primária (cabeçalho, botões, links). As cores de status, sentidos, séries e metas são
   fixas. "Não realizada" é vermelho em todo cliente.
2. **Uma cor, um significado.** Uma cor de dado nunca é reaproveitada para outra coisa na
   mesma tela (ver §4.6, decisões sobre os conflitos herdados).
3. **Cor nunca sozinha.** Todo status também tem rótulo, e nas grades, ícone ou tooltip.
   Verde e vermelho se confundem para cerca de 8% dos homens.
4. **O número vem com a regra.** Todo indicador mostra a tolerância e a referência ao lado
   ("IPP (a) oficial · ±3 min · referência SPTrans 97%").
5. **Funciona offline e sem JavaScript.** Os relatórios são HTML de arquivo único. Fontes do
   sistema, nada de CDN obrigatório, e o conteúdo aparece completo sem script.

---

## 2. Arquitetura white label

Os tokens têm três camadas:

| Camada | Prefixo | Quem altera | Exemplo |
|---|---|---|---|
| Primitivos | `--p-*` | ninguém (só este manual) | `--p-neutro-700: #5f5e57` |
| Semânticos | `--cor-*`, `--status-*`, `--viagem-*`, `--dado-*`, `--fonte-*`, `--esp-*`, `--raio-*` | ninguém (só este manual) | `--cor-texto-secundario` |
| Marca | `--marca-*` | **o tema do cliente** | `--marca-primaria` |

Componentes usam apenas tokens semânticos. Nada de hex solto no código.

### 2.1 O que o cliente pode personalizar

| Item | Token / arquivo | Regra |
|---|---|---|
| Nome do produto | `--marca-nome` + título da página | até 32 caracteres |
| Logo | `assets/temas/<cliente>/logo.svg` | SVG, versão horizontal, altura de exibição 28 px; versão monocromática para fundo escuro |
| Favicon | `assets/temas/<cliente>/favicon.svg` | 32×32 |
| Cor primária | `--marca-primaria`, `--marca-primaria-hover` | contraste ≥ 4,5:1 com `--marca-sobre-primaria` |
| Texto sobre a primária | `--marca-sobre-primaria` | branco ou `#0b0b0b` |
| Fundo de seleção | `--marca-destaque-suave` | tom muito claro da primária; texto `#0b0b0b` sobre ele ≥ 7:1 |
| Fonte (opcional) | `--marca-fonte` | precisa ter números tabulares e funcionar offline (embutida ou do sistema) |
| Rodapé / contato | conteúdo | texto livre |

### 2.2 O que é fixo para todo cliente

Paleta de status e de viagem, cores de sentido, série única e categóricas, cor da meta,
neutros, escala tipográfica, espaçamentos, terminologia (§6) e formatação de números e
datas (§7).

### 2.3 Como criar o tema de um cliente

1. Crie `design-tokens/temas/<cliente>.css` sobrescrevendo **só** `--marca-*` dentro de
   `[data-tema="<cliente>"]` (há um exemplo no fim de `tokens.css`).
2. Ative o tema com `<html data-tema="<cliente>">`.
3. Rode a checagem do tema:
   - [ ] contraste `--marca-primaria` × `--marca-sobre-primaria` ≥ 4,5:1;
   - [ ] contraste `--marca-primaria` × branco ≥ 3:1 (borda de foco, ícones);
   - [ ] a primária **não se confunde com uma cor de status**. Se a marca do cliente for
     verde, vermelha, amarela ou laranja, use-a só no logo e no cabeçalho, e deixe
     `--marca-primaria` em `#1f4e79` (padrão) ou na tinta `#0b0b0b`;
   - [ ] logo legível a 28 px de altura.

---

## 3. Logo e cabeçalho

- O produto não tem logo próprio fixo: no tema padrão, o cabeçalho mostra o nome em texto
  (`--fonte-16`, peso 600, `--cor-texto`).
- Cabeçalho: 56 px de altura, fundo `--cor-fundo`, borda inferior `--borda`. O logo do
  cliente fica à esquerda, com área de respiro de 8 px em volta.
- Com marca do cliente, o cabeçalho pode usar fundo `--marca-primaria` e texto
  `--marca-sobre-primaria`. Os dados nunca ficam sobre a cor da marca.
- Rodapé de relatório: "Dados: SPTrans (API Olho Vivo, GTFS, programação) · gerado em
  DD/MM/AAAA" + linha do cliente.

---

## 4. Cores

### 4.1 Neutros (quentes)

O sistema atual usa 15 cinzas quentes. Alguns diferem em 1 ou 2 pontos e ninguém percebe a
diferença. Consolidamos em 11:

| Token | Hex | Uso | Substitui |
|---|---|---|---|
| `--p-neutro-0` | `#ffffff` | fundo | |
| `--p-neutro-25` | `#fafaf7` | zebra de tabela, card de indicador | `#fbfbf9` |
| `--p-neutro-50` | `#f5f4f0` | cabeçalho de tabela, nota | `#f7f6f2` |
| `--p-neutro-100` | `#ecebe6` | borda entre linhas; status "fora do período" | `#efeee9` |
| `--p-neutro-200` | `#e1e0d9` | borda de card e tabela; faixa "com registros" | |
| `--p-neutro-300` | `#d6d5cf` | status "programação inválida" | |
| `--p-neutro-400` | `#c3c2b7` | borda forte, input, linha de grade | `#b5b4ad` |
| `--p-neutro-500` | `#9a998f` | status "inconclusiva" (preenchimento) | |
| `--p-neutro-600` | `#77766c` | texto terciário | `#8a897f` em texto (3,5:1, reprovava) |
| `--p-neutro-700` | `#5f5e57` | texto secundário, paradas | |
| `--p-neutro-950` | `#0b0b0b` | texto principal, terminais, meta | |

### 4.2 Status da saída programada (fixo)

É a paleta mais importante do produto. Ordem, rótulo e cor vêm de `STATUS` em
`R/11_relatorio_linha.R`, com uma troca decidida pelo time: "quase completa" passou do
azul para o verde claro (C1). A ordem abaixo é a ordem de legenda e de empilhamento em
todo lugar.

| # | Código (`audit_status`) | Rótulo | Grupo | Preenchimento | Texto sobre ele | Texto sobre branco |
|---|---|---|---|---|---|---|
| 1 | `realizada_no_horario` | No horário | cumprida | `#0ca30c` | tinta (5,9:1) | `#0a890a` |
| 2 | `realizada_com_atraso` | Atrasada | fora da tolerância | `#fab219` | tinta (10,7:1) | `#9f6d03` |
| 3 | `realizada_antecipadamente` | Antecipada | fora da tolerância | `#ec835a` | tinta (7,5:1) | `#cd4b18` |
| 4 | `viagem_quase_completa` | Quase completa (≥95%) | quase completa | `#7cc97c` | tinta (9,8:1) | `#378637` |
| 5 | `partida_sem_viagem_completa` | Saiu, não completou | não cumprida | `#8f2a2a` | branco (8,3:1) | `#8f2a2a` |
| 6 | `possivelmente_nao_realizada` | Não realizada | não cumprida | `#d03b3b` | branco (4,8:1) | `#d03b3b` |
| 7 | `inconclusiva` | Inconclusiva | inconclusiva | `#9a998f` | tinta (6,9:1) | `#78776c` |
| 8 | `programacao_invalida` | Programação inválida | sem avaliação | `#d6d5cf` | tinta | não use como texto |
| 9 | `fora_do_periodo_coletado` | Fora do período | sem avaliação | `#ecebe6` | tinta | não use como texto |

"Tinta" é `#0b0b0b`. Valores de contraste pelo cálculo WCAG 2.1. Regras:

- **Preenchimento** (célula da grade, barra, marcador): use a coluna "Preenchimento".
- **Badge** (fundo colorido com texto): preenchimento + "Texto sobre ele".
- **Texto colorido sobre branco** (ex.: valor numa tabela): use "Texto sobre branco". As
  cores 1 a 4 e 7 originais reprovam como texto pequeno. Os textos de "no horário"
  (`#0a890a`) e "quase completa" (`#378637`) são verdes parecidos: como texto, sempre
  acompanhados do rótulo.
- **Verde e verde claro lado a lado** (grade): a diferença é de claridade (1,7:1 entre
  os dois preenchimentos). É o que se quer, porque "quase completa" é quase cumprida, mas
  a célula sempre leva tooltip e a legenda funciona como filtro.
- **Redundância obrigatória**: rótulo visível na legenda; tooltip em cada célula da grade;
  em badges, ícone opcional (✓ no horário, ◷ atrasada/antecipada, ◐ quase completa,
  ✕ não realizada/não completou, ? inconclusiva, — sem avaliação).

### 4.3 Status da viagem reconstruída (fixo)

| Código (`trajectory_status`) | Rótulo | Cor |
|---|---|---|
| `viagem_confirmada` | Viagem confirmada | `#0ca30c` |
| `viagem_provavel` | Viagem provável | `#7cc97c` (mesma cor de "quase completa": as duas são "quase certo") |
| `trajetoria_parcial` | Trajetória parcial | `#8f2a2a` |
| `observacao_inconclusiva` | Observação inconclusiva | `#9a998f` |

### 4.4 Cores de dados (fixas)

| Token | Hex | Uso |
|---|---|---|
| `--dado-sentido-0` | `#2a78d6` | traçado e ônibus do sentido 0 |
| `--dado-sentido-1` | `#eb6834` | traçado e ônibus do sentido 1 |
| `--dado-sentido-circular` | `#5f5e57` | linha circular (sem sentido) |
| `--dado-serie-unica` | `#3b6ea5` | gráfico de uma série (IPP diário, histograma de desvio) |
| `--dado-meta` | `#0b0b0b` | linha de referência, **tracejada** 1 px, com rótulo |
| `--dado-sem-dado` | `#e1e0d9` | período com registros, sem evento |
| `--dado-lacuna-gps` | `#d03b3b` | lacuna de GPS > 10 min (preenchimento 35%), registro descartado (✕) |
| `--dado-cursor-tempo` | `#0b0b0b` | cursor "agora" nos diagramas, com etiqueta da hora em branco sobre tinta (C2) |
| `--dado-fora-de-foco` | `#8a897f` | veículos não destacados (só elemento gráfico, não texto) |
| `--dado-parada` / `--dado-terminal` | `#5f5e57` / `#0b0b0b` | contorno das paradas (raio 3) e terminais (raio 7), miolo branco |
| `--dado-veiculo-1` … `--dado-veiculo-6` | `#1baf7a` `#eda100` `#7d4fd6` `#d6457a` `#4f8a10` `#00838f` | veículos destacados, nessa ordem (C3) |

Regra dos veículos destacados (C3): os traçados mantêm as cores dos sentidos; os veículos
**não** destacados ficam em `--dado-fora-de-foco`; os destacados usam `--dado-veiculo-1`
a `-6`, que deixam de fora o azul e o laranja dos sentidos. Do 7º destaque em diante, o
veículo volta ao cinza e é identificado só pelo rótulo (prefixo) ao lado do marcador.

Regra da série única: **não use a cor da marca em gráficos.** Se o cliente for vermelho, um
gráfico de IPP vermelho seria lido como "ruim".

### 4.5 Seleção e interação

- Linha selecionada em tabela: `--cor-selecao` (padrão `#e4eefb`).
- Foco de teclado: contorno 2 px `--cor-foco` com afastamento de 2 px. Nunca remova o foco.
- Links e botões primários: `--cor-interativa` (= `--marca-primaria`).
- Valor que pede atenção numa tabela (ex.: não realizadas > 0): `--cor-texto-alerta`
  `#b02a2a`, peso 600.

### 4.6 Conflitos herdados do sistema atual

Encontrados no código atual. C1, C2 e C3 foram decididos pelo time em 18/11/2026. A
mudança nos relatórios que já circulam deve ser comunicada ao cliente junto com a nova
versão.

| # | Conflito | Onde | Decisão |
|---|---|---|---|
| C1 | Três azuis próximos com significados diferentes: "quase completa" `#3f7fb5`, sentido 0 `#2a78d6`, série única `#3b6ea5` | relatório, app, gráficos | **decidido:** "quase completa" passa a verde claro `#7cc97c`, a mesma cor de viagem provável |
| C2 | O cursor de tempo ("agora") usa o mesmo vermelho de "não realizada" `#d03b3b` | diagrama espaço-tempo e linha do tempo do app | **decidido:** cursor em tinta `#0b0b0b` (`--dado-cursor-tempo`) |
| C3 | As duas primeiras cores de destaque de veículo são idênticas às dos sentidos | mapa do app | **decidido:** não destacados em cinza; destaques usam `--dado-veiculo-1` a `-6`, sem as cores dos sentidos |
| C4 | Verde `#0ca30c` e vermelho `#d03b3b` lado a lado na grade | grade de cumprimento | manter as cores e garantir o tooltip, a legenda-filtro e, em tela, o padrão de ícone no hover |
| C5 | Percentual com ponto (`45.3%`) e milhar com ponto (`1.234`) no mesmo card | `pct()` em `relatorio_linha.qmd` | percentual com vírgula: `45,3%` (§7) |
| C6 | Gráficos estáticos em `theme_minimal()` padrão do ggplot, com fonte e cinzas diferentes do relatório | `R/10_exportacao.R` | um tema único de gráfico com os tokens (§8) |
| C7 | Texto auxiliar em `#8a897f` (3,5:1, reprova AA) | subtítulos de card, eixos secundários | `--cor-texto-terciario` `#77766c` |

Outras decisões de 18/11/2026: o peso dos números nos cards continua 600 (§5), e a cor
primária do tema padrão é o azul petróleo `#1f4e79` (§2.1).

---

## 5. Tipografia

- **Família:** `--fonte-sans` (fontes do sistema por padrão; o tema pode trocar). Os
  relatórios atuais herdam o tema Bootstrap "cosmo". A troca para a fonte do sistema mantém
  o arquivo offline e leve.
- **Mono:** `--fonte-mono`, para ids (veículo, `trip_id`, `stop_id`), registros GPS brutos e
  resumos de evidência.
- **Números tabulares** em toda tabela, card e eixo (`font-variant-numeric: tabular-nums`).

| Token | Tamanho | Peso | Uso |
|---|---|---|---|
| `--fonte-30` | 30 px | 600 | valor do card de indicador (IPP, ICV) |
| `--fonte-24` | 24 px | 600 | título de página; valor do card de status |
| `--fonte-20` | 20 px | 600 | título de seção |
| `--fonte-16` | 16 px | 400 | texto corrido |
| `--fonte-14` | 14 px | 400/600 | rótulo de card, legenda, painéis |
| `--fonte-13` | 13 px | 400 | tabelas; mono em 13 px |
| `--fonte-12` | 12 px | 400 / 600 caixa alta | subtítulo de card, eixos, rodapé; rótulo de seção em caixa alta com espaçamento 0,04em |

Títulos em caixa de frase ("Grade de cumprimento", não "Grade De Cumprimento"). Caixa alta só
no rótulo de seção ("INDICADORES (REFERÊNCIA SPTRANS: 97%)").

---

## 6. Voz e terminologia

### 6.1 Tom

Direto, factual e sem adjetivo. Afirma só o que o dado sustenta: "possivelmente não
realizada", não "não realizada pela empresa". Quando há dúvida, diz qual é a dúvida
("inconclusiva: ônibus parou de transmitir").

### 6.2 Termos fixos (use exatamente assim)

| Termo | Significado curto (tooltip) |
|---|---|
| **Saída programada** | horário de partida da tabela da SPTrans |
| **Partida observada** | horário em que o GPS mostra o ônibus deixando o terminal |
| **Viagem completa** | viagem que percorreu o traçado de ponta a ponta |
| **IPP (a) oficial** | saídas que partiram até 3 min antes ou depois do horário **e** completaram a viagem ÷ saídas avaliáveis |
| **IPP (b)** | como o (a), somando as saídas no horário que não completaram (sem as partidas espúrias) e as inconclusivas. Limite superior |
| **IPP (c)** | como o (b), com tolerância de ±4 min |
| **ICV** | cumprimento de viagens por faixa horária, limitado ao programado (ficha IQT.GSO.001.05) |
| **ICV ampliado** | ICV + viagens quase completas e saídas inconclusivas |
| **Referência SPTrans** | 97% (linha tracejada) |
| **Lacuna de GPS** | veículo em serviço sem transmitir por mais de 10 min |
| **Dia de serviço** | começa às 03h. Horários após a meia-noite pertencem ao dia anterior (24:10, 25:00) |

Nunca abrevie os rótulos de status nem invente sinônimos ("pulada", "falhou", "furou").
Exceção: "não realizadas (puladas)" pode aparecer **uma vez**, como explicação, no card.

---

## 7. Formatação de dados (pt-BR)

| Dado | Formato | Exemplo |
|---|---|---|
| Inteiro | milhar com ponto | `12.480` |
| Decimal | vírgula, 1 casa | `12,4` |
| Percentual | vírgula, 1 casa, `%` colado | `45,3%` |
| Indicador ausente | travessão | `–` |
| Diferença de minutos | sinal explícito, sinal de menos verdadeiro | `+2 min` · `−1 min` |
| Hora | `HH:MM` (segundos só em log bruto) | `06:42` · `24:10` |
| Data | `DD/MM/AAAA`; em grade, só o dia `07` com o dia da semana no cabeçalho | `07/09/2026` |
| Mês | por extenso, minúsculo | `setembro de 2026` |
| Linha | código SPTrans como está | `701A-10` |
| Sentido | `sentido 0 → <letreiro>`; circular: `circular` | `sentido 1 → Pq. D. Pedro II` |
| Distância | km com vírgula | `12,4 km` |
| Fuso | sempre `America/Sao_Paulo`; não exiba o fuso salvo em exportação | |

Em JavaScript: `Intl.NumberFormat("pt-BR", …)` e `Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo" })`.

---

## 8. Visualização de dados

- **Escolha do gráfico:** cumprimento dia × horário → grade (células); série no tempo →
  barras (diário) ou linha (horário); distribuição de desvio → histograma de 1 min;
  posição × tempo → diagrama espaço-tempo; atividade de veículos → linha do tempo.
- **Eixos:** rótulos `--fonte-12` em `--cor-texto-secundario`; grade só horizontal, 1 px
  `--p-neutro-100`; sem grade secundária.
- **Meta:** linha tracejada `--dado-meta` com rótulo no próprio gráfico ("referência
  SPTrans 97%"), não só na legenda.
- **Legenda:** acima do gráfico, na ordem da §4.2. Nos relatórios, a legenda da grade é
  também filtro (clique liga/desliga; "todos" e "nenhum" como ações).
- **Tooltip:** título com data e horário; depois status, partida observada, diferença em
  minutos, veículo, evidência. Mesmo conteúdo no `<title>` do SVG para funcionar sem JS.
- **Mapa:** fundo cinza claro (tiles sem cor), traçado com 3 px, paradas e terminais como
  na §4.4, ônibus com raio 6 (destacado 9, contorno branco).
- **Gráficos estáticos (R/ggplot):** criar um `tema_marca()` que lê os mesmos hex deste
  manual, para PNGs e relatórios baterem com a interface (conflito C6).

---

## 9. Componentes

| Componente | Especificação |
|---|---|
| **Card de indicador** | borda `--cor-borda-forte`, fundo `--cor-fundo-sutil`, raio 8, padding 10×14. Valor `--fonte-30`/600; rótulo `--fonte-14` secundário; explicação `--fonte-12` terciário, máx. 230 px |
| **Card de status** | como o de indicador, fundo branco, borda `--cor-borda`; amostra de cor 10×10 raio 2 antes do rótulo |
| **Rótulo de seção** | `--fonte-12`, 600, caixa alta, `--cor-texto-secundario` |
| **Badge de status** | raio 4, padding 2×6, `--fonte-12`/600, cores da §4.2 |
| **Legenda-filtro** | itens com amostra 12×12; hover com borda `--cor-borda-forte`; item desligado com 35% de opacidade |
| **Tabela** | `--fonte-13`; cabeçalho fixo com fundo `--cor-fundo-cabecalho` e borda inferior forte; zebra `--cor-fundo-sutil`; números à direita e tabulares; ordenação por clique; contêiner com raio 6 e rolagem própria |
| **Barra inline** | altura 8, raio 2, largura proporcional (0–100%), seguida do valor |
| **Nota** | fundo `--cor-fundo-nota`, borda esquerda 3 px `--cor-borda-forte`, `--fonte-14` |
| **Busca** | input 260 px, borda `--cor-borda-forte`, raio 4 |
| **Grade de cumprimento** | célula = uma saída; linhas = dias, colunas = horários da tabela; separada por sentido e tipo de dia |

Espaçamento sempre na escala de 4 px (`--esp-1` … `--esp-8`).

---

## 10. Acessibilidade (mínimo)

- WCAG 2.1 AA: texto ≥ 4,5:1, texto grande e elementos gráficos ≥ 3:1. Os valores das
  tabelas acima já foram conferidos.
- Nenhuma informação só por cor (§1.3).
- Tudo que é clicável também funciona por teclado; foco visível.
- Gráficos com resumo textual ou tabela equivalente.
- `lang="pt-BR"` na página.

---

## 11. Manutenção

- Mudança de cor, termo ou formato: primeiro neste manual e em `tokens.css`, no mesmo
  commit (`docs(marca): ...` / `style(tokens): ...`); depois nos componentes.
- Cliente novo: só `design-tokens/temas/<cliente>.css` + assets, com a checagem da §2.3.
- Histórico de versões no fim deste arquivo.

### Histórico

- **0.1** (18/11/2026): primeira versão, extraída do app Shiny e dos relatórios Quarto do
  sistema atual. Conflitos C1–C7 abertos.
- **0.2** (18/11/2026): decisões do time. "Quase completa" passa a verde claro `#7cc97c`
  (C1); cursor de tempo em tinta (C2); veículos destacados sem as cores dos sentidos,
  com os tokens `--dado-veiculo-1…6` no lugar de `--dado-cat-1…8` (C3); peso 600 nos
  números e primária padrão `#1f4e79` confirmados.
