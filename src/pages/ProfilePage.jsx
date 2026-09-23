import { useAuth } from '../context/AuthContext'

export function ProfilePage() {
  const { user, logout } = useAuth()

  return (
    <div className="stack-lg">
      <p className="eyebrow">Route protégée</p>
      <h1>
        Bonjour {user.firstName} {user.lastName}
      </h1>
      <p>
        Cette page n’est accessible que si AuthContext a une session. DummyJSON a
        renvoyé un JWT stocké dans localStorage.
      </p>
      <div className="card profile-card">
        <img src={user.image} alt="" width="72" height="72" />
        <div>
          <p>
            <strong>@{user.username}</strong>
          </p>
          <p className="muted">{user.email}</p>
        </div>
      </div>
      <button type="button" onClick={logout}>
        Se déconnecter
      </button>
    </div>
  )
}
