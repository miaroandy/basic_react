import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const [form, setForm] = useState({ username: 'emilys', password: 'emilyspass' })
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/profil" replace />
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await login({ user: form.username, pass: form.password })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connexion impossible')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="auth-card card" onSubmit={handleSubmit}>
      <p className="eyebrow">Auth DummyJSON</p>
      <h1>Connexion</h1>
      <p className="muted">
        Compte de démo prérempli : <code>emilys</code> / <code>emilyspass</code>
      </p>
      <label>
        Identifiant
        <input name="username" value={form.username} onChange={handleChange} />
      </label>
      <label>
        Mot de passe
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
      </label>
      {error && <p className="warn">{error}</p>}
      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? 'Connexion…' : 'Se connecter'}
      </button>
    </form>
  )
}
