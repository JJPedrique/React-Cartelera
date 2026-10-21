import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { Button } from '@/components/ui/button'
import { MensajeError } from '@/shared/components/MensajeError'
import { EsqueletoFicha, FichaPersona } from '../components/FichaPelicula'
import { GrillaPeliculas } from '../components/GrillaPeliculas'
import { usePersona } from '../hooks/usePeliculas'

// M8 · Una página con su propia URL: /peliculas/603
export function DetallePersona() {
  // useParams lee los segmentos dinámicos de la ruta (:id). Siempre llegan como string.
  const { id } = useParams()
  const { datos: actor, error, reintentar } = usePersona(Number(id))
 
  // Retornos tempranos: primero el error, luego la carga, al final la película
  if (error) return <MensajeError mensaje={error} onReintentar={reintentar} />
  if (!actor) return <EsqueletoFicha />

  return (
    <article>
      <title>{`${actor.name} · Cartelera`}</title>

      <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2 text-muted-foreground">
        <Link to="/peliculas">
          <ArrowLeft /> Catálogo
        </Link>
      </Button>

      <FichaPersona persona={actor} />

      {actor.movie_credits.cast.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-bold">Conocido por</h2>
          {/* Cada tarjeta es un Link a otra película: cambia el :id y usePelicula vuelve a pedir */}
          <GrillaPeliculas peliculas={actor.movie_credits.cast.slice(0, 15)} />
        </section>
      )}
    </article>
  )
}
