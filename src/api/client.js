const BASE_URL = 'https://dummyjson.com'

async function request(path, options = {}) {
  const token = localStorage.getItem('dummyjson_token')
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers ?? {}),
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const message = `Erreur API ${response.status} sur ${path}`
    throw new Error(message)
  }

  return response.json()
}

export const api = {
  getProducts({ limit = 12, skip = 0, q = '', category = '' } = {}) {
    if (q.trim()) {
      return request(`/products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`)
    }
    if (category) {
      return request(`/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`)
    }
    return request(`/products?limit=${limit}&skip=${skip}`)
  },

  getProduct(id) {
    return request(`/products/${id}`)
  },

  getCategories() {
    return request('/products/categories')
  },

  getRecipes({ limit = 8, skip = 0 } = {}) {
    return request(`/recipes?limit=${limit}&skip=${skip}`)
  },

  getRecipe(id) {
    return request(`/recipes/${id}`)
  },

  login({ user, pass }) {
    console.log('api.login', { username: user, password: pass })
    const res =  request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ user, pass, expiresInMins: 60 }),
    })
    console.log('api.login terminé', { res })
    return res
  },

  getMe() {
    return request('/auth/me')
  },
  
  addProduct(payload) {
    return request('/products/add', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
}
