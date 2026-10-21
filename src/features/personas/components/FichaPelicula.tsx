import { Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { imagen } from '@/core/config/tmdb'
import { cn } from '@/lib/utils'
import { anio, type PersonaResumen } from '../models/persona'
import { BotonFavorito } from './BotonFavorito'
import { Calificacion } from './Calificacion'
import { DialogoTrailer } from './DialogoTrailer'
import { Reparto } from './Reparto'

interface Props {
  persona: PersonaResumen
}

function duracion(minutos: number | null) {
  if (!minutos) return null
  const h = Math.floor(minutos / 60)
  return h ? `${h} h ${minutos % 60} min` : `${minutos} min`
}

// Ficha completa de una película. Ya viene hecha: solo pinta lo que le llega por props.
// La usa la página de detalle en M8.
export function FichaPersona({ persona: persona }: Props) {
  const profile = imagen(persona.profile_path, 'w500')

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl border bg-card">
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent" />

        <div className={cn('relative grid gap-8 p-6 md:p-10', profile && 'md:grid-cols-[260px_1fr]')}>
          {profile && <img src={profile} alt={`Póster de ${persona.name}`} className="w-48 rounded-xl shadow-2xl md:w-full" />}
          <div className="min-w-0">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {persona.name}
            </h1>
            
            <p className="mt-6 max-w-2xl leading-relaxed">{persona.biography || 'Sin biografia en español.'}</p>

          </div>
        </div>
      </div>

    </>
  )
}

// Lo que se ve mientras llega el detalle
export function EsqueletoFicha() {
  return (
    <div className="grid gap-8 md:grid-cols-[260px_1fr]" aria-busy="true" aria-label="Cargando">
      <Skeleton className="aspect-2/3 rounded-xl" />
      <div className="space-y-4">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-28 w-full" />
      </div>
    </div>
  )
}
