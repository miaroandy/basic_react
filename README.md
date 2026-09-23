# React Atelier

Application React pour **apprendre les bases de React** en consommant l’API publique [DummyJSON](https://dummyjson.com).

Tu ne lis pas seulement de la théorie : chaque concept a une **leçon interactive** et une **mise en pratique** (catalogue, recettes, panier, connexion JWT).

## Lancer le projet

```bash
npm install
npm run dev
```

Ouvre l’URL affichée par Vite (en général `http://localhost:5173`).

Build de production :

```bash
npm run build
npm run preview
```

## Compte DummyJSON (connexion)

La page **Connexion** est préremplie avec un utilisateur de démo :

- identifiant : `emilys`
- mot de passe : `emilyspass`

DummyJSON répond avec un JWT (`accessToken`) stocké dans `localStorage`. La page **Profil** est une **route protégée**.

## Parcours recommandé

1. Accueil — aperçu de l’app et 4 produits API.
2. Leçons — dans l’ordre (JSX → Router).
3. Produits — recherche, catégories, pagination, détail, panier.
4. Recettes — second endpoint, même schéma de fetch.
5. Connexion → Profil — formulaire contrôlé + Context d’auth.

## Où trouver chaque concept dans le code

| Concept | Fichier / écran |
| --- | --- |
| JSX, composants, props | `src/lessons/demos.jsx`, `ProductCard` |
| `useState`, événements, formulaires | leçons + `LoginPage.jsx` |
| Listes et `key` | `ProductsPage.jsx`, `RecipesPage.jsx` |
| Rendu conditionnel (loading / erreur / vide) | `useFetch` + pages catalogue |
| `useEffect` | `src/hooks/useFetch.js`, `useDebounce.js` |
| Hooks personnalisés | `src/hooks/` |
| Context | `AuthContext.jsx`, `CartContext.jsx` |
| `useReducer` | panier |
| `useMemo` | total panier, `totalPages`, value des providers |
| `useRef` | leçon dédiée |
| React Router | `src/App.jsx` (`Routes`, `useParams`, `NavLink`) |
| Route protégée | `ProtectedRoute.jsx` |
| Client HTTP | `src/api/client.js` |

## API DummyJSON utilisée

Base : `https://dummyjson.com`

- `GET /products?limit=&skip=`
- `GET /products/search?q=`
- `GET /products/category/:slug`
- `GET /products/categories`
- `GET /products/:id`
- `GET /recipes`
- `POST /auth/login`
- `GET /auth/me` (token Bearer)

Les écritures DummyJSON (ex. `POST /products/add`) sont simulées : l’API renvoie un objet mais **ne persiste pas**.

---

# Fondamentaux de React

## 1. Qu’est-ce que React ?

React est une bibliothèque UI. Tu décris **à quoi l’écran doit ressembler** en fonction de données. React compare cet arbre (Virtual DOM) à l’écran précédent et met à jour le vrai DOM au minimum.

Une app React est un **arbre de composants**.

## 2. JSX

JSX ressemble à du HTML dans du JavaScript.

```jsx
const title = 'Atelier'
return <h1 className="hero">{title}</h1>
```

Règles utiles :

- `class` → `className`, `for` → `htmlFor`
- une fonction composant retourne **un** parent (ou un Fragment `<>...</>`)
- le JS va entre `{ }`

## 3. Composants et props

Un composant est une **fonction** qui reçoit des props et retourne du JSX.

```jsx
function Badge({ label }) {
  return <span>{label}</span>
}
```

Les props descendent **parent → enfant**. On ne les modifie pas. Pour changer l’UI, on change un **state**.

## 4. State : `useState`

```jsx
const [count, setCount] = useState(0)
setCount((n) => n + 1)
```

- `setCount` **planifie un nouveau rendu**
- ne mute pas : `{ ...obj, x }`, `[...arr, item]`
- si le nouveau state dépend de l’ancien, passe une fonction

## 5. Événements

`onClick`, `onChange`, `onSubmit` reçoivent une **fonction**.

```jsx
<button onClick={() => add(product)}>Ajouter</button>
<form onSubmit={handleSubmit}>
```

Dans un formulaire : `e.preventDefault()` pour ne pas recharger la page.

## 6. Rendu conditionnel

```jsx
{loading && <Spinner />}
{error ? <ErrorBanner error={error} /> : <List />}
if (!user) return <Navigate to="/connexion" />
```

Les trois états réseau à toujours gérer : **loading**, **erreur**, **données** (éventuellement liste vide).

## 7. Listes et keys

```jsx
{products.map((product) => (
  <ProductCard key={product.id} product={product} />
))}
```

La `key` doit être **stable et unique** (souvent un id). Évite l’index si la liste se réordonne ou se filtre.

## 8. Formulaires contrôlés

React détient la valeur :

```jsx
<input name="username" value={form.username} onChange={handleChange} />
```

Un seul handler peut mettre à jour un objet `form` via `e.target.name`.

## 9. `useEffect` : le monde extérieur

`useEffect` sert à **synchroniser** : fetch, abonnement, timer.

```jsx
useEffect(() => {
  let cancelled = false
  fetch(url).then((json) => {
    if (!cancelled) setData(json)
  })
  return () => { cancelled = true }
}, [url])
```

- deps `[]` : au montage
- deps `[query]` : quand `query` change
- le `return` est le **cleanup** (éviter les fuites et les setState sur composant démonté)

Dans ce projet, `useFetch` encapsule ce schéma.

## 10. Hooks personnalisés

Toute logique réutilisable qui utilise des hooks va dans une fonction `useXxx`.

- `useFetch` : loading / data / error
- `useDebounce` : attendre avant de relancer la recherche

**Règles des hooks :** uniquement au top-level d’un composant ou d’un autre hook (pas dans `if` / boucles).

## 11. Context

Quand trop de composants ont besoin de la même donnée (auth, panier), un Provider évite de faire descendre des props partout.

```jsx
const CartContext = createContext(null)
const { count, add } = useCart()
```

N’en abuse pas : pour un parent et un enfant, les **props** restent plus claires.

## 12. `useReducer`

Utile pour un state avec plusieurs actions cohérentes.

Le panier :

- `ADD`
- `REMOVE`
- `CLEAR`

`dispatch({ type: 'ADD', product })` → le reducer retourne un **nouvel** état.

## 13. `useRef`

`ref.current` est une boîte mutable **sans re-render**. Typique : focus un input, garder un timer.

## 14. `useMemo` / `useCallback`

- `useMemo` : mémoriser un calcul (total, pages)
- `useCallback` : mémoriser une fonction

Utile surtout si un enfant est mémoïsé ou si la `value` d’un Context changerait trop souvent. La lisibilité passe avant la micro-optimisation.

## 15. Composition

React compose, il n’hérite pas. `children` est le JSX entre les balises :

```jsx
<Layout>{children}</Layout>
```

## 16. React Router

Une SPA change de page **sans recharger**.

- `Link` / `NavLink` : navigation
- `useParams()` : `/produits/:id`
- `Navigate` : redirection (login, 404)
- `ProtectedRoute` : si pas de session → `/connexion`

## 17. Parler à une API depuis React

Flux standard dans cette app :

1. L’utilisateur change un state (`query`, `page`).
2. Un `useEffect` (via `useFetch`) relance DummyJSON.
3. On affiche spinner, puis liste ou erreur.
4. Un clic `add(product)` met à jour le Context panier (pas DummyJSON : le panier est local).
5. Login : `POST /auth/login` puis stockage du token.

Toujours penser CORS (DummyJSON l’autorise), JSON, et erreurs HTTP (`response.ok`).

## 18. Mental model à garder

1. **UI = f(state)**  
2. Les données descendent (props / context).  
3. Les événements remontent (`onClick` qui appelle `setState` chez le parent).  
4. Fetch = effet de bord, pas du rendu.  
5. Immutabilité du state.

Quand quelque chose « ne se met pas à jour », demande-toi : *est-ce que j’ai bien appelé un setter avec une **nouvelle** valeur ?*

## Structure du dépôt

```
src/
  api/client.js          # fetch DummyJSON
  components/            # Layout, cartes, route protégée
  context/               # auth + panier
  hooks/                 # useFetch, useDebounce
  lessons/               # contenu + démos des leçons
  pages/                 # écrans routés
  App.jsx                # routes
  main.jsx               # point d’entrée
```

Bon atelier.
