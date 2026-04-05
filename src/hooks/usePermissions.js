import { useMemo } from 'react'
import { permissionsMatrix } from '../lib/permissions'

export default function usePermissions(role) {
  return useMemo(() => {
    if (!role || !permissionsMatrix[role]) {
      return {}
    }
    return permissionsMatrix[role]
  }, [role])
}
