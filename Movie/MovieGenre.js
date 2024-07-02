import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, FlatList } from 'react-native';
import MoviePre2 from './MoviePre2';
import { options, screenStyle } from '../MyContext/ConstantContext';

const MovieGenre = ({ route }) => {
    const [genre] = useState(route.params.genre);
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getMovies = useCallback(async (genreId) => {
        try {
            const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&with_genres=${genreId}`;
            const response = await fetch(url, options);
            const data = await response.json();
            return data.results;
        } catch (err) {
            console.error('Error fetching movies:', err);
            return [];
        }
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true);
            const movieData = await getMovies(genre);
            setMovies(movieData);
            setIsLoading(false);
        };

        fetchMovies();
    }, [genre, getMovies]);

    const renderItem = useCallback(({ item }) => (
        <MoviePre2
            movie={{
                title: item.title,
                genre_ids: item.genre_ids,
                overview: item.overview,
                poster_path: item.poster_path,
                vote_average: item.vote_average,
                lan: item.original_language,
                release_date: item.release_date,
                id: item.id
            }}
        />
    ), []);

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={screenStyle.container}>
            <FlatList
                data={movies}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default MovieGenre;