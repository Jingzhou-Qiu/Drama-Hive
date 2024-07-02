import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        width: 380,
        height: 250,
        borderBottomWidth: 2,
        borderBottomColor: 'grey',
    },
    imageContainer: {
        flexDirection: "row",
        marginTop: 10,
        height: 150,
    },
    titleContainer: {
        flexDirection: "row",
        marginTop: 5,
        alignItems: 'center',
    },
    poster: {
        width: 97,
        height: 144,
        borderRadius: 10,
        marginRight: 10,
    },
    backdrop: {
        width: 250,
        height: 144,
        borderRadius: 10,
    },
    title: {
        fontFamily: 'Roboto',
        fontSize: 15,
        fontWeight: '500',
        marginRight: 5,
    },
    year: {
        fontFamily: 'Roboto',
        fontSize: 13,
        color: '#505251',
        fontWeight: '400',
    },
    rating: {
        marginTop: 5,
        fontSize: 13,
    },
    overview: {
        marginTop: 5,
        fontSize: 13,
        fontWeight: '400',
    }
});

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDRkOGFjOWM0YzA3OWEzMjNlZjAwMzY3MTQ5MmQzZiIsInN1YiI6IjY2NzE4NWRjMWJmODZmNjA1ZjZhYjEzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cqnD9xHIfL_SpjSBm1PJp_zF4PEDGH5g-YrYmB9gXOk';
const BASE_URL = 'https://image.tmdb.org/t/p/original';

const MoviePre2 = ({ movie }) => {
    const [backdropUrl, setBackdropUrl] = useState(null);
    const navigation = useNavigation();

    const fetchImage = useCallback(async () => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${movie.id}/images`,
                {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${API_KEY}`
                    }
                }
            );
            const data = await response.json();
            const backdrops = data.backdrops.map(backdrop => `${BASE_URL}${backdrop.file_path}`);
            setBackdropUrl(backdrops[0] || null);
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    }, [movie.id]);

    useEffect(() => {
        fetchImage();
    }, [fetchImage]);

    const formatOverview = (overview) => {
        return overview.length > 80 ? `${overview.substring(0, 80)}...` : overview;
    };

    const handleNavigation = () => {
        navigation.navigate("Explore", { movie });
    };

    if (!movie.title) return null;

    return (
        <TouchableOpacity style={styles.container} onPress={handleNavigation}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: `${BASE_URL}${movie.poster_path}` }} style={styles.poster} />
                {backdropUrl && <Image source={{ uri: backdropUrl }} style={styles.backdrop} />}
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{movie.title}</Text>
                {movie.release_date && <Text style={styles.year}>({movie.release_date.split('-')[0]})</Text>}
            </View>
            <Text style={styles.rating}>Rating: {movie.vote_average.toFixed(1)}</Text>
            <Text style={styles.overview}>Overview: {formatOverview(movie.overview || "")}</Text>
        </TouchableOpacity>
    );
};

export default React.memo(MoviePre2);