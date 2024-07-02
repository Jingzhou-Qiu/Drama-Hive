import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { options } from '../MyContext/ConstantContext';
import TvShow from './TVPoster'
import { styles } from '../MovieHomeScreen/styles';

const fetchTvShowsByUrl = async (url) => {
  try {
    const response = await fetch(url, options);
    const { results } = await response.json();
    return results.map(({
      name,
      genre_ids,
      overview,
      poster_path,
      vote_average,
      original_language,
      first_air_date,
      id
    }) => ({
      name,
      genre_ids,
      overview,
      poster_path,
      vote_average,
      lan: original_language,
      first_air_date,
      id
    }));
  } catch (error) {
    console.error('Error fetching TV shows:', error);
    return [];
  }
};

export function TvByUrl({ url }) {
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    const loadTvShows = async () => {
      const fetchedTvShows = await fetchTvShowsByUrl(url);
      setTvShows(fetchedTvShows);
    };

    loadTvShows();
  }, [url]);

  const renderTvShow = useCallback(({ item }) => <TvShow tvShow={item} />, []);

  return (
    <View style={styles.featureContainer}>
      <FlatList
        horizontal
        data={tvShows}
        renderItem={renderTvShow}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}