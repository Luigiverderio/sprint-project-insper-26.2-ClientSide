/** Audit status of a scheduled departure, as produced by the audit pipeline. */
export type AuditStatus =
  | 'realizada_no_horario'
  | 'realizada_com_atraso'
  | 'realizada_antecipadamente'
  | 'viagem_quase_completa'
  | 'partida_sem_viagem_completa'
  | 'possivelmente_nao_realizada'
  | 'inconclusiva'
  | 'programacao_invalida'
  | 'fora_do_periodo_coletado'

/** Label and token slug for each status (docs/manual-da-marca.md §4.2 and §6.2). */
export const AUDIT_STATUS: Record<AuditStatus, { label: string; token: string }> = {
  realizada_no_horario: { label: 'No horário', token: 'no-horario' },
  realizada_com_atraso: { label: 'Atrasada', token: 'atrasada' },
  realizada_antecipadamente: { label: 'Antecipada', token: 'antecipada' },
  viagem_quase_completa: { label: 'Quase completa (≥95%)', token: 'quase-completa' },
  partida_sem_viagem_completa: { label: 'Saiu, não completou', token: 'saiu-nao-completou' },
  possivelmente_nao_realizada: { label: 'Não realizada', token: 'nao-realizada' },
  inconclusiva: { label: 'Inconclusiva', token: 'inconclusiva' },
  programacao_invalida: { label: 'Programação inválida', token: 'programacao-invalida' },
  fora_do_periodo_coletado: { label: 'Fora do período', token: 'fora-do-periodo' },
}
