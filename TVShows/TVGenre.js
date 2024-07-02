import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, FlatList } from 'react-native';
import { options, screenStyle } from '../MyContext/ConstantContext';
import TVShowPre from './TVPre2.js'

const TVGenre = ({ route }) => {
    const [genre] = useState(route.params.genre);
    const [tvShows, setTVShows] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getTVShows = useCallback(async (genreId) => {
        try {
            const url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&sort_by=popularity.desc&with_genres=${genreId}`;
            const response = await fetch(url, options);
            const data = await response.json();
            return data.results;
        } catch (err) {
            console.error('Error fetching TV shows:', err);
            return [];
        }
    }, []);

    useEffect(() => {
        const fetchTVShows = async () => {
            setIsLoading(true);
            const tvData = await getTVShows(genre);
            setTVShows(tvData);
            setIsLoading(false);
        };

        fetchTVShows();
    }, [genre, getTVShows]);

    const renderItem = useCallback(({ item }) => (
        <TVShowPre
            tvShow={{
                name: item.name,
                genre_ids: item.genre_ids,
                overview: item.overview,
                poster_path: item.poster_path,
                vote_average: item.vote_average,
                original_language: item.original_language,
                first_air_date: item.first_air_date,
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
                data={tvShows}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default TVGenre;