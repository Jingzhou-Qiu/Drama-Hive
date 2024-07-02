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
    const { spoken_languages, genres, status, first_air_date } = detail;

    genres?.forEach((genre, index) => {
        text += `${genre.name}${index === genres.length - 1 ? ' / ' : ' '}`;
    });

    spoken_languages?.forEach((lang, index) => {
        text += `${lang.english_name}${index === spoken_languages.length - 1 ? ' / ' : ' '}`;
    });

    if (status) text += `${status} / `;
    if (first_air_date) text += first_air_date;

    return text;
};

const TVPoster = ({ imageUrl }) => (
    <Image source={{ uri: imageUrl }} style={styles.poster} />
);

const TVInfo = ({ name, tagline, smallTag }) => (
    <View style={styles.first_firstContainer}>
        <Text style={styles.titleText}>{name}</Text>
        <Text style={styles.tagline}>{tagline}</Text>
        <Text style={styles.smallTag}>{smallTag}</Text>
    </View>
);

export default function SingleTVPage({ route }) {
    const [detail, setDetail] = useState(null);
    const [smallTag, setSmallTag] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { tvShow } = route.params;
    const imageUrl = baseUrl + tvShow.poster_path;

    const fetchDetails = async (id) => {
        setIsLoading(true);
        try {
            const url = `https://api.themoviedb.org/3/tv/${id}?language=en-US`;
            const response = await fetch(url, options);
            const data = await response.json();
            setDetail(data);
            setSmallTag(getGenreString(data));
        } catch (error) {
            console.error('Error fetching TV show details:', error);
        } finally {
            setIsLoading(false);
        }
    };
    
    useEffect(() => {
        fetchDetails(tvShow.id);
    }, [tvShow.id]);

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={screenStyle.container}>
            <View style={styles.firstContainer}>
                <TVPoster imageUrl={imageUrl} />
                <TVInfo 
                    name={tvShow.name}
                    tagline={detail?.tagline ?? ''}
                    smallTag={smallTag}
                />
            </View>
            {tvShow.overview && (
                <Text style={styles.text_overview}>
                    Overview: {tvShow.overview}
                </Text>
            )}
            <Text style={styles.titleText}>User review: to be implemented</Text>
        </View>
    );
}