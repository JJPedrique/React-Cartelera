import { tmdb } from '@/core/api/tmdb'
import type { DetallePersona } from '../models/persona'

// append_to_response: reparto, videos y similares en UNA sola petición
export async function obtenerDetalle(id: number, signal?: AbortSignal) {
  const { data } = await tmdb.get<DetallePersona>(`/person/${id}`, {
    params: { append_to_response: 'movie_credits', include_video_language: 'es,en' },
    signal,
  })
  return data
}