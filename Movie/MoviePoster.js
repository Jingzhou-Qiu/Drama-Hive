import React, { useMemo } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    container: {
        width: 110,
        height: 185,
    },
    poster: {
        width: 97,
        height: 144,
        borderRadius: 20,
    },
    text: {
        paddingLeft: 4,
        paddingTop: 3,
        fontFamily: 'Arial',
        fontSize: 12,
        fontWeight: '500'
    }
});

const BASE_URL = 'https://image.tmdb.org/t/p/original';

const Movie = ({ movie }) => {
    const navigation = useNavigation();

    const formatTitle = (title) => {
        return title.length <= 24 ? title : `${title.substring(0, 21)}...`;
    };

    const imageUrl = useMemo(() => `${BASE_URL}${movie.poster_path}`, [movie.poster_path]);
    const title = useMemo(() => formatTitle(movie.title), [movie.title]);

    const navigate = () => {
        navigation.navigate("Explore", { movie });
    };

    return (
        <TouchableOpacity style={styles.container} onPress={navigate}>
            <Image source={{ uri: imageUrl }} style={styles.poster} />
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

export default React.memo(Movie);