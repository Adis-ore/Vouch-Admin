import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

const RouterContext = createContext(null)
const ParamsContext = createContext({})

// Match a route pattern against a pathname.
// Returns { params } on match, or null.
function matchRoute(pattern, pathname) {
  let pat = pattern
  if (pat === undefined || pat === null) return null
  if (pat === '') pat = '/'
  if (!pat.startsWith('/')) pat = '/' + pat

  const path = pathname || '/'
  const isWildcard = pat.endsWith('/*') || pat === '*' || pat === '/*'
  const cleanPat = isWildcard ? pat.replace(/\/?[*]$/, '').replace(/\/$/, '') : pat

  const patParts = cleanPat.split('/').filter(Boolean)
  const pathParts = path.split('/').filter(Boolean)

  if (!isWildcard && patParts.length !== pathParts.length) return null
  if (isWildcard && patParts.length > pathParts.length) return null

  const params = {}
  for (let i = 0; i < patParts.length; i++) {
    const pp = patParts[i]
    if (pp.startsWith(':')) {
      params[pp.slice(1)] = decodeURIComponent(pathParts[i] ?? '')
    } else if (pp !== pathParts[i]) {
      return null
    }
  }

  return { params }
}

export function BrowserRouter({ children }) {
  const [pathname, setPathname] = useState(() => window.location.pathname)

  useEffect(() => {
    const handler = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', handler)
    return () => window.removeEventListener('popstate', handler)
  }, [])

  const navigate = useCallback((to, { replace = false } = {}) => {
    if (typeof to === 'number') {
      window.history.go(to)
      setTimeout(() => setPathname(window.location.pathname), 50)
      return
    }
    if (replace) {
      window.history.replaceState(null, '', to)
    } else {
      window.history.pushState(null, '', to)
    }
    setPathname(to)
  }, [])

  const ctx = useMemo(() => ({ pathname, navigate }), [pathname, navigate])

  return (
    <RouterContext.Provider value={ctx}>
      <ParamsContext.Provider value={{}}>
        {children}
      </ParamsContext.Provider>
    </RouterContext.Provider>
  )
}

export function Routes({ children }) {
  const { pathname } = useContext(RouterContext)

  const childArray = Array.isArray(children) ? children.flat() : [children]

  for (const child of childArray) {
    if (!child?.props) continue
    const { path, element } = child.props
    const result = matchRoute(path, pathname)
    if (result) {
      return (
        <ParamsContext.Provider value={result.params}>
          {element}
        </ParamsContext.Provider>
      )
    }
  }

  return null
}

export function Route() {
  return null
}

// Navigate redirects once on mount — no dependency on context to avoid infinite loops
export function Navigate({ to, replace = false }) {
  const { navigate } = useContext(RouterContext)
  const fired = useRef(false)

  useEffect(() => {
    if (!fired.current) {
      fired.current = true
      navigate(to, { replace })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

export function useNavigate() {
  const { navigate } = useContext(RouterContext)
  return navigate
}

export function useLocation() {
  const { pathname } = useContext(RouterContext)
  return useMemo(() => ({ pathname, state: null }), [pathname])
}

export function useParams() {
  return useContext(ParamsContext)
}

export function Link({ to, children, style, className, onClick }) {
  const { navigate } = useContext(RouterContext)
  const handleClick = (e) => {
    e.preventDefault()
    if (onClick) onClick(e)
    navigate(to)
  }
  return <a href={to} style={style} className={className} onClick={handleClick}>{children}</a>
}

export function NavLink({ to, children, style, className, end, ...rest }) {
  const { pathname, navigate } = useContext(RouterContext)
  const isActive = end ? pathname === to : pathname === to || pathname.startsWith(to + '/')
  const handleClick = (e) => {
    e.preventDefault()
    navigate(to)
  }
  const resolvedStyle = typeof style === 'function' ? style({ isActive }) : style
  const resolvedClass = typeof className === 'function' ? className({ isActive }) : className
  return (
    <a href={to} style={resolvedStyle} className={resolvedClass} onClick={handleClick} {...rest}>
      {typeof children === 'function' ? children({ isActive }) : children}
    </a>
  )
}

export function Outlet() {
  return null
}
