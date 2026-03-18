import { Movie } from "@/types/movie";

const STORAGE_KEY = "movie-diary";

export function getMovies(): Movie[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  return JSON.parse(data) as Movie[];
}

export function addMovie(movie: Omit<Movie, "id" | "createdAt">): Movie {
  const movies = getMovies();
  const newMovie: Movie = {
    ...movie,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  movies.unshift(newMovie);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  return newMovie;
}

export function updateMovie(id: string, updates: Partial<Movie>): Movie | null {
  const movies = getMovies();
  const index = movies.findIndex((m) => m.id === id);
  if (index === -1) return null;
  movies[index] = { ...movies[index], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  return movies[index];
}

export function deleteMovie(id: string): boolean {
  const movies = getMovies();
  const filtered = movies.filter((m) => m.id !== id);
  if (filtered.length === movies.length) return false;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
}
