// Interfaces: describen la forma de lo que llega de TMDB.
// Solo declaramos los campos que usamos; TypeScript no se queja del resto.

export interface Actor {
    adult:                boolean;
    also_known_as:        string[];
    biography:            string;
    birthday:             string;
    deathday:             null;
    gender:               number;
    homepage:             null;
    id:                   number;
    imdb_id:              string;
    known_for_department: string;
    name:                 string;
    place_of_birth:       string;
    popularity:           number;
    profile_path:         string;
}

export interface Creditos {
    cast: Cast[];
    crew: Cast[];
    id:   number;
}

export interface Cast {
    adult:             boolean;
    backdrop_path:     null | string;
    genre_ids:         number[];
    id:                number;
    original_language: OriginalLanguage;
    original_title:    string;
    overview:          string;
    popularity:        number;
    poster_path:       null | string;
    release_date:      string;
    title:             string;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
    character?:        string;
    credit_id:         string;
    order?:            number;
    department?:       Department;
    job?:              string;
}

export type Department = "Crew" | "Directing" | "Production" | "Writing";

export type OriginalLanguage = "en" | "de" | "fr" | "it";

export interface DetallesActor extends Actor { 
  movie_credits: Creditos; 
}
