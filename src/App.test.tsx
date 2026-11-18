import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from './App'

describe('App', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('abre a página inicial e mostra a API como conectada', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{"status":"ok"}')))

    render(<App />)

    expect(screen.getByRole('heading', { name: 'Monitoramento de Ônibus' })).toBeInTheDocument()
    expect(await screen.findByText('conectada')).toBeInTheDocument()
  })

  it('mostra a API como indisponível quando o backend não responde', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')))

    render(<App />)

    expect(await screen.findByText('indisponível')).toBeInTheDocument()
  })
})
