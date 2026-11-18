import { AUDIT_STATUS, type AuditStatus } from './auditStatus'
import './StatusBadge.css'

type StatusBadgeProps = {
  status: AuditStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, token } = AUDIT_STATUS[status]
  return (
    <span
      className="status-badge"
      data-status={status}
      style={{
        backgroundColor: `var(--status-${token})`,
        color: `var(--status-${token}-sobre)`,
      }}
    >
      {label}
    </span>
  )
}
