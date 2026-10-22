import { tmdb } from '@/core/api/tmdb'
import type { DetallesActor } from '../models/persona'

// append_to_response: reparto, videos y similares en UNA sola petición
export async function obtenerDetalle(id: number, signal?: AbortSignal) {
  const { data } = await tmdb.get<DetallesActor>(`/person/${id}`, {
    // 1. Pedimos los créditos de películas en el append_to_response
    params: { 
      append_to_response: 'movie_credits', 
      language: 'es-ES' 
    },
    signal,
  });

  if (data.movie_credits?.cast) {
    const peliculasUnicas = Array.from(
      new Map(data.movie_credits.cast.map(pelicula => [pelicula.id, pelicula])).values()
    );

    data.movie_credits.cast = peliculasUnicas.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
  }

  return data;
}