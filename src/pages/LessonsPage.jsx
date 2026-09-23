import { Link, useParams } from 'react-router-dom'
import { lessons } from '../lessons/catalog'

export function LessonsPage() {
  return (
    <div className="stack-lg">
      <header className="page-intro">
        <p className="eyebrow">Parcours</p>
        <h1>Les fondamentaux React</h1>
        <p>
          Lis une leçon, joue avec le mini-exemple, puis retrouve le même concept
          dans Produits, Recettes, Panier ou Connexion.
        </p>
      </header>
      <div className="lesson-grid">
        {lessons.map((lesson, index) => (
          <Link key={lesson.slug} to={`/lecons/${lesson.slug}`} className="card lesson-card">
            <span className="lesson-index">{String(index + 1).padStart(2, '0')}</span>
            <span className="badge">{lesson.level}</span>
            <h2>{lesson.title}</h2>
            <p>{lesson.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function LessonDetailPage() {
  const { slug } = useParams()
  const index = lessons.findIndex((item) => item.slug === slug)
  const lesson = lessons[index]

  if (!lesson) {
    return (
      <p>
        Leçon introuvable. <Link to="/lecons">Retour</Link>
      </p>
    )
  }

  const Demo = lesson.Demo
  const prev = lessons[index - 1]
  const next = lessons[index + 1]

  return (
    <article className="lesson-detail">
      <Link to="/lecons" className="back">
        ← Toutes les leçons
      </Link>
      <p className="eyebrow">{lesson.level}</p>
      <h1>{lesson.title}</h1>
      <p className="lede">{lesson.summary}</p>

      <section className="card theory">
        <h2>À retenir</h2>
        <ul>
          {lesson.theory.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Démo interactive</h2>
        <Demo />
      </section>

      <nav className="lesson-nav">
        {prev ? <Link to={`/lecons/${prev.slug}`}>← {prev.title}</Link> : <span />}
        {next ? <Link to={`/lecons/${next.slug}`}>{next.title} →</Link> : <span />}
      </nav>
    </article>
  )
}
