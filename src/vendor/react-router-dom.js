import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const LocationContext = createContext(null)

export function BrowserRouter({ children }) {
  const [location, setLocation] = useState({ pathname: window.location.pathname })

  useEffect(() => {
    const onPop = () => setLocation({ pathname: window.location.pathname })
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = (to, { replace = false } = {}) => {
    if (replace) {
      window.history.replaceState(null, '', to)
    } else {
      window.history.pushState(null, '', to)
    }
    setLocation({ pathname: to })
  }

  const value = useMemo(() => ({ location, navigate }), [location])

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>
}

function pathMatch(pathname, path) {
  if (path === '*') return true
  if (!path) return false
  const regex = new RegExp(`^${path.replace(/\*/g, '.*')}$`)
  return regex.test(pathname)
}

export function Routes({ children }) {
  const context = useContext(LocationContext)
  const pathname = context?.location?.pathname || window.location.pathname

  let element = null
  const childrenArray = Array.isArray(children) ? children : [children]

  for (const child of childrenArray) {
    if (!child || !child.props) continue
    const { path, element: el } = child.props
    if (pathMatch(pathname, path)) {
      element = el
      break
    }
  }

  return element
}

export function Route({ element }) {
  return element
}

export function Navigate({ to }) {
  const context = useContext(LocationContext)

  useEffect(() => {
    if (!context) return
    context.navigate(to)
  }, [to, context])

  return null
}

export function useLocation() {
  const context = useContext(LocationContext)
  return context?.location || { pathname: window.location.pathname }
}
