import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { options } from '../MyContext/ConstantContext';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.5;

export default function TVScreenGenre({ genreid, name }) {
    const navigation = useNavigation();
    const [data, setData] = useState(null);

    const handlePress = () => navigation.navigate('TVGenre', { genre: genreid });

    async function getTVShow(genre_ids) {
        try {
            let url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&page=4&sort_by=popularity.desc&with_genres=${genre_ids}`;
            let response = await fetch(url, options);
            let data = await response.json();
            setData('https://image.tmdb.org/t/p/w780' + data.results[0].backdrop_path);
        } catch (err) {
            console.error('Error fetching TV show:', err);
        }
    };

    useEffect(() => {
        getTVShow(genreid);
    }, [genreid]);

    return (
        <TouchableOpacity onPress={handlePress} style={styles.touchableOpacity}>
            <View style={styles.container}>
                <ImageBackground source={{ uri: data }} style={styles.imageBackground} resizeMode="cover">
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.8)']}
                        style={styles.gradient}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{name}</Text>
                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    touchableOpacity: {
        marginBottom: 15,
        alignItems: 'center',
    },
    container: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginLeft: 9,
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
    },
    textContainer: {
        padding: 15,
    },
    text: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
});