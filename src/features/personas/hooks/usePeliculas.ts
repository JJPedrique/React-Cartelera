import { useConsulta } from '@/shared/hooks/useConsulta'
import { obtenerDetalle, } from '../services/persona'

// M6 · Hooks de la feature: combinan useConsulta con el servicio.
// La página ya no sabe de efectos, AbortController ni Axios: solo pide "las películas con estos filtros".

// Lo usamos en M8, en la página de detalle
export function usePersona(id: number) {
  return useConsulta(`persona|${id}`, (signal) => obtenerDetalle(id, signal))
}

