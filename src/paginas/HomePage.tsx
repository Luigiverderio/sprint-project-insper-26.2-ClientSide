import { useApiHealth } from '../hooks/useApiHealth'
import './HomePage.css'

export function HomePage() {
  const health = useApiHealth()

  const apiStatus = health.isPending
    ? 'verificando…'
    : health.isSuccess
      ? 'conectada'
      : 'indisponível'

  return (
    <main className="home">
      <h1 className="home__titulo">Monitoramento de Ônibus</h1>
      <p className="home__texto">
        Base do frontend pronta. O mapa ao vivo e os painéis chegam nas próximas sprints.
      </p>
      <p className="home__api" data-testid="api-status">
        API: <strong>{apiStatus}</strong>
      </p>
    </main>
  )
}
