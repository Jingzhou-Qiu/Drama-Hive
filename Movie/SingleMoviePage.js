import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Image, View } from 'react-native';
import { options, screenStyle } from '../MyContext/ConstantContext';

const styles = StyleSheet.create({
    firstContainer: {
        flexDirection: "row"
    },
    first_firstContainer: {
        marginLeft: 25,
        marginTop: 20,
        flex: 1,
    },
    titleText: {
        fontSize: 20,
        textAlign: 'left',
        marginTop: 10,
        paddingTop: 3,
        textAlignVertical: 'center',
        fontFamily: 'Arial',
        fontWeight: '500'
    },
    poster: {
        marginLeft: 20,
        marginTop: 20,
        resizeMode: 'cover',
        width: 97.2,
        height: 144,
        borderRadius: 20,
    },
    smallTag: {
        fontSize: 12,
        textAlign: 'left',
    },
    text_overview: {
        marginTop: 10,
        marginLeft: 15,
        marginRight: 10,
        fontSize: 16,
        fontFamily: "Helvetica Neue",
        fontWeight: '400',
        lineHeight: 20,
        letterSpacing: 0.5,
        color: '#333',
        textAlign: 'justify',
      },
    tagline: {
        marginBottom: 10,
        fontWeight: '400',
    }
});

const baseUrl = 'https://image.tmdb.org/t/p/original';

const getGenreString = (detail) => {
    if (!detail) return '';

    let text = '';
    const { spoken_languages, genres, status, release_date } = detail;

    genres?.forEach((genre, index) => {
        text += `${genre.name}${index === genres.length - 1 ? ' / ' : ' '}`;
    });

    spoken_languages?.forEach((lang, index) => {
        text += `${lang.english_name}${index === spoken_languages.length - 1 ? ' / ' : ' '}`;
    });

    if (status) text += `${status} / `;
    if (release_date) text += release_date;

    return text;
};

const MoviePoster = ({ imageUrl }) => (
    <Image source={{ uri: imageUrl }} style={styles.poster} />
);

const MovieInfo = ({ title, tagline, smallTag }) => (
    <View style={styles.first_firstContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.tagline}>{tagline}</Text>
        <Text style={styles.smallTag}>{smallTag}</Text>
    </View>
);

export default function SingleMoviePage({ route }) {
    const [detail, setDetail] = useState(null);
    const [smallTag, setSmallTag] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { movie } = route.params;
    const imageUrl = baseUrl + movie.poster_path;

    const fetchDetails = async (id) => {
        setIsLoading(true);
        try {
            const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
            const response = await fetch(url, options);
            const data = await response.json();
            setDetail(data);
            setSmallTag(getGenreString(data));
        } catch (error) {
            console.error('Error fetching movie details:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchDetails(movie.id);
    }, [movie.id]);

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={screenStyle.container}>
            <View style={styles.firstContainer}>
                <MoviePoster imageUrl={imageUrl} />
                <MovieInfo 
                    title={movie.title}
                    tagline={detail?.tagline ?? ''}
                    smallTag={smallTag}
                />
            </View>
            {movie.overview && (
                <Text style={styles.text_overview}>
                    Overview: {movie.overview}
                </Text>
            )}
            <Text style={styles.titleText}>User review: to be implemented</Text>
        </View>
    );
}