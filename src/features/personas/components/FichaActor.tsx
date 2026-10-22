import { Skeleton } from '@/components/ui/skeleton'
import { imagen } from '@/core/config/tmdb'
import { cn } from '@/lib/utils'
import type { Actor } from '../models/persona'
import { Cake, Earth } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

function iniciales(nombre: string) {
  return nombre
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
}

interface Props {persona: Actor}

// Ficha completa de una película. Ya viene hecha: solo pinta lo que le llega por props.
// La usa la página de detalle en M8.
export function FichaActor({ persona: persona }: Props) {
  const profile = imagen(persona.profile_path, 'w500')

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl border bg-card">
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent" />

        <div className={cn('relative grid gap-8 p-6 md:p-10', 'md:grid-cols-[260px_1fr]')}>
          <Avatar className="size-64">
            <AvatarImage src={imagen(profile, 'w185') ?? undefined} alt={persona.name} className="object-cover" />
            {/* Si la foto no existe o no carga, shadcn muestra el fallback */}
            <AvatarFallback className="text-7xl">{iniciales(persona.name)}</AvatarFallback>
          </Avatar>
          
          <div className="min-w-0">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {persona.name}
            </h1>
            
            <div className='pt-3'>
              {persona.birthday && (
                <span className="mr-1 inline-flex items-center gap-1 text-sm text-muted-foreground">
                  <Cake className="size-4" /> {persona.birthday}
                </span>
              )}
              {persona.place_of_birth && (
                <span className="mr-1 inline-flex items-center gap-1 text-sm text-muted-foreground">
                    <Earth className="size-4" /> {persona.place_of_birth}
                </span>  
              )}             
            </div>

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
