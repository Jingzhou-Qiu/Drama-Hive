import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { options } from '../MyContext/ConstantContext';
import Movie from '../Movie/MoviePoster';
import { styles } from './styles';

const fetchMoviesByUrl = async (url) => {
  try {
    const response = await fetch(url, options);
    const { results } = await response.json();
    return results.map(({
      title,
      genre_ids,
      overview,
      poster_path,
      vote_average,
      original_language,
      release_date,
      id
    }) => ({
      title,
      genre_ids,
      overview,
      poster_path,
      vote_average,
      lan: original_language,
      release_date,
      id
    }));
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

export function MovieByUrl({ url }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      const fetchedMovies = await fetchMoviesByUrl(url);
      setMovies(fetchedMovies);
    };

    loadMovies();
  }, [url]);

  const renderMovie = useCallback(({ item }) => <Movie movie={item} />, []);

  return (
    <View style={styles.featureContainer}>
      <FlatList
        horizontal
        data={movies}
        renderItem={renderMovie}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}