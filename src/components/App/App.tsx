import styles from './App.module.css';
import { useState } from 'react';
import type { Movie } from '../../types/movie';
import { Toaster } from 'react-hot-toast';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import fetchMovies from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import Paginate from '../Paginate/Paginate';
import NoMovieFound from '../NoMovieFound/NoMovieFound';

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState<number>(1);

 const { data, isError, isLoading, isSuccess } = useQuery(
   {
     queryKey: ['movies', query, page],
     queryFn: () => fetchMovies(query, page),
     enabled: !!query,
     placeholderData: keepPreviousData,
   }
 );

  function handleSearch(query: string) {
    setQuery(query);
    setPage(1);
  }

  function handleSelect(movie: Movie) {
    setSelectedMovie(movie);
  }

  function handleCloseModal() {
    setSelectedMovie(null);
  }
 
  const totalPages = data?.total_pages || 0;

  return (
    <div className={styles.app}>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onSubmit={handleSearch} />
      {isSuccess && totalPages > 1 && ( <Paginate pageCount={totalPages} onPageChange={({ selected }) => setPage(selected + 1)} forcePage={page - 1} />)}
      {isLoading && <Loader />}
      {!isLoading && isError && <ErrorMessage />}
      {!isLoading && !isError && data?.results.length === 0 && <NoMovieFound />}
      {data && data.results.length > 0 && (<MovieGrid movies={data.results} onSelect={handleSelect} />)}
      {selectedMovie && (<MovieModal movie={selectedMovie} onClose={handleCloseModal} />)}
    </div>
  );
}
