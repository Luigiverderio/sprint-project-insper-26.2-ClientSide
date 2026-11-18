import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { AUDIT_STATUS, type AuditStatus } from './auditStatus'
import { StatusBadge } from './StatusBadge'

describe('StatusBadge', () => {
  it('mostra o rótulo do status, não o código', () => {
    render(<StatusBadge status="possivelmente_nao_realizada" />)

    expect(screen.getByText('Não realizada')).toBeInTheDocument()
    expect(screen.queryByText('possivelmente_nao_realizada')).not.toBeInTheDocument()
  })

  it('usa os tokens de cor do status', () => {
    render(<StatusBadge status="realizada_no_horario" />)

    const badge = screen.getByText('No horário')
    expect(badge.style.backgroundColor).toBe('var(--status-no-horario)')
    expect(badge.style.color).toBe('var(--status-no-horario-sobre)')
  })

  it.each(Object.keys(AUDIT_STATUS) as AuditStatus[])('tem rótulo para %s', (status) => {
    render(<StatusBadge status={status} />)

    expect(screen.getByText(AUDIT_STATUS[status].label)).toBeInTheDocument()
  })
})
