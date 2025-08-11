import axios from 'axios';
import type { Movie } from '../types/movie';

export interface FetchingMovieService {
  page: number;
  total_results: number;
  total_pages: number;
  results: Movie[];
}

const API_URL = 'https://api.themoviedb.org/3/search/movie';
const API_KEY = import.meta.env.VITE_TMDB_TOKEN;

export default async function fetchMovies(query: string, page: number): Promise<FetchingMovieService> {
  try {
    const { data, status } = await axios.get<FetchingMovieService>(API_URL, {
      params: { query, page },
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (status !== 200) {
      throw new Error('Failed to fetch movies');
    }
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}
