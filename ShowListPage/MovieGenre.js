import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import Movie from './Movie';
import MoviePre2 from './MoviePre2';
import {options} from '../App'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})


export default function MovieGenre( route, navigation) {
    // console.log(route.route.params.genre)

    const [genre, setGenre] = useState(route.route.params.genre)
    const [data, setData] = useState(null);


    async function getMovie(genre_ids) {
        try {
            let url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&with_genres=${genre_ids}`
            let response = await fetch(url, options)
            let data = await response.json()
            return data

        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        getMovie(genre).then((rs) => setData(rs.results));
    }, [genre]);

    const renderItem = ({ item }) => {
        let movie = {
            title: item.title,
            genre_ids: item.genre_ids,
            overview: item.overview,
            poster_path: item.poster_path,
            vote_average: item.vote_average,
            lan: item.original_language,
            release_date: item.release_date,
            id: item.id
        };

        return <MoviePre2 movie={movie} key={movie.id} />;
    };


    if (data == null) {
        return (
            <Text> Loading ...</Text>
        )
    } else {
        movieData = data.map((element, index) =>
        ({
            title: element.title,
            genre_ids: element.genre_ids,
            overview: element.overview,
            poster_path: element.poster_path,
            vote_average: element.vote_average,
            lan: element.original_language,
            release_date: element.release_date,
            id: element.id
        }))

        return (
            <View style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />

            </View>
        )

    }
}