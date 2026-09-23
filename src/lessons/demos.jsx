import { useRef, useState } from 'react'

export function JsxDemo() {
  const name = 'React'
  const year = new Date().getFullYear()

  return (
    <div className="demo-box">
      <p>
        JSX mélange HTML et JavaScript. Ici <strong>{name}</strong> en{' '}
        {year}.
      </p>
      <p className="muted">
        Une expression entre accolades est évaluée : {'{name}'}, {'{1 + 1}'} → {1 + 1}
      </p>
    </div>
  )
}

export function PropsDemo() {
  return (
    <div className="demo-stack">
      <Badge label="Débutant" tone="teal" />
      <Badge label="Intermédiaire" tone="orange" />
      <Badge label="Avancé" />
    </div>
  )
}

function Badge({ label, tone = 'ink' }) {
  return <span className={`badge badge-${tone}`}>{label}</span>
}

export function StateDemo() {
  const [count, setCount] = useState(0)

  return (
    <div className="demo-box">
      <p>
        Compteur : <strong>{count}</strong>
      </p>
      <div className="row">
        <button type="button" onClick={() => setCount((n) => n - 1)}>
          −
        </button>
        <button type="button" className="btn-primary" onClick={() => setCount((n) => n + 1)}>
          +
        </button>
        <button type="button" className="btn-ghost" onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
    </div>
  )
}

export function EventsDemo() {
  const [last, setLast] = useState('aucun')

  return (
    <div className="demo-box">
      <p>
        Dernier événement : <strong>{last}</strong>
      </p>
      <div className="row">
        <button type="button" onClick={() => setLast('clic')}>
          onClick
        </button>
        <input
          placeholder="onChange…"
          onChange={(e) => setLast(`saisie: ${e.target.value}`)}
        />
      </div>
    </div>
  )
}

export function ConditionalDemo() {
  const [online, setOnline] = useState(true)

  return (
    <div className="demo-box">
      <label className="row">
        <input
          type="checkbox"
          checked={online}
          onChange={(e) => setOnline(e.target.checked)}
        />
        Utilisateur en ligne
      </label>
      {online ? (
        <p className="ok">Connecté — on affiche ce bloc.</p>
      ) : (
        <p className="warn">Hors ligne — on affiche l’autre bloc.</p>
      )}
      {online && <p className="muted">Astuce : {'condition && <Composant />'}</p>}
    </div>
  )
}

export function ListDemo() {
  const fruits = [
    { id: 1, name: 'Mangue' },
    { id: 2, name: 'Litchi' },
    { id: 3, name: 'Papaye' },
  ]

  return (
    <ul className="plain-list">
      {fruits.map((fruit) => (
        <li key={fruit.id}>{fruit.name}</li>
      ))}
    </ul>
  )
}

export function FormDemo() {
  const [form, setForm] = useState({ title: '', price: '' })
  const [preview, setPreview] = useState(null)

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setPreview({ ...form })
  }

  return (
    <form className="demo-box" onSubmit={handleSubmit}>
      <label>
        Titre
        <input name="title" value={form.title} onChange={handleChange} />
      </label>
      <label>
        Prix
        <input name="price" value={form.price} onChange={handleChange} />
      </label>
      <button type="submit" className="btn-primary">
        Prévisualiser
      </button>
      {preview && (
        <p>
          Produit : {preview.title || 'sans titre'} — {preview.price || 0} €
        </p>
      )}
    </form>
  )
}

export function ChildrenDemo({ children }) {
  return (
    <div className="demo-box">
      <p className="muted">Ce cadre reçoit ses enfants via props.children :</p>
      {children}
    </div>
  )
}

export function RefDemo() {
  const [ticks, setTicks] = useState(0)
  const inputRef = useRef(null)

  return (
    <div className="demo-box">
      <input ref={inputRef} placeholder="Clique « Focus »" />
      <div className="row">
        <button
          type="button"
          onClick={() => inputRef.current?.focus()}
        >
          Focus (useRef)
        </button>
        <button type="button" onClick={() => setTicks((n) => n + 1)}>
          Re-render ({ticks})
        </button>
      </div>
      <p className="muted">
        Un ref garde une référence DOM sans relancer un rendu à chaque frappe.
      </p>
    </div>
  )
}

export function ReducerLikeDemo() {
  const [items, setItems] = useState([])

  return (
    <div className="demo-box">
      <div className="row">
        <button
          type="button"
          className="btn-primary"
          onClick={() =>
            setItems((prev) => [...prev, `Article ${prev.length + 1}`])
          }
        >
          Ajouter
        </button>
        <button type="button" className="btn-ghost" onClick={() => setItems([])}>
          Vider
        </button>
      </div>
      <p>{items.length} élément(s) — le vrai panier utilise useReducer.</p>
    </div>
  )
}

export function EffectPointerDemo() {
  return (
    <p className="demo-box">
      Ouvre <strong>Produits</strong> : un useEffect (via useFetch) appelle DummyJSON
      dès que la recherche, la catégorie ou la page change.
    </p>
  )
}

export function HooksPointerDemo() {
  return (
    <p className="demo-box">
      Tape dans la recherche Produits : useDebounce attend 400 ms avant de relancer DummyJSON.
    </p>
  )
}

export function ContextPointerDemo() {
  return (
    <p className="demo-box">
      Ajoute un produit au panier depuis le catalogue : le compteur du header se met à jour
      grâce au Context, sans props drilling.
    </p>
  )
}

export function CompositionPointerDemo() {
  return (
    <ChildrenDemo>
      <p>Je suis un enfant passé au cadre.</p>
    </ChildrenDemo>
  )
}

export function RouterPointerDemo() {
  return (
    <p className="demo-box">
      Navigue sans recharger la page : c’est le rôle du routeur. Le header utilise NavLink
      pour le style « actif ».
    </p>
  )
}
