import { useEffect, useRef, useState } from 'react'

/**
 * useQuery — run an async fn on mount, re-run when deps change.
 * Returns { data, loading, error, refetch }.
 */
export default function useQuery(fn, deps = []) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)
  const mountedRef             = useRef(true)

  const run = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fn()
      if (mountedRef.current) setData(result)
    } catch (err) {
      if (mountedRef.current) setError(err.message || 'Unknown error')
    } finally {
      if (mountedRef.current) setLoading(false)
    }
  }

  useEffect(() => {
    mountedRef.current = true
    run()
    return () => { mountedRef.current = false }
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error, refetch: run }
}
