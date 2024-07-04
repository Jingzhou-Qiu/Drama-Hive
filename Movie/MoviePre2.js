import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { options } from '../MyContext/ConstantContext';

const { width } = Dimensions.get('window');


const BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_URL = 'https://image.tmdb.org/t/p/w780';

const styles = StyleSheet.create({
    container: {
        width: width - 32,
        marginHorizontal: 16,
        marginVertical: 12,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#fff',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    imageContainer: {
        height: 200,
        position: 'relative',
    },
    backdrop: {
        width: '100%',
        height: '100%',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '50%',
    },
    poster: {
        width: 80,
        height: 120,
        position: 'absolute',
        bottom: -30,
        left: 16,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#fff',
    },
    contentContainer: {
        padding: 16,
        paddingLeft: 112,
    },
    title: {
        fontFamily: 'Roboto-Bold',
        fontSize: 18,
        marginBottom: 4,
        color: '#333',
    },
    infoContainer: {
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'center',
    },
    year: {
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        color: '#666',
        marginRight: 12,
    },
    rating: {
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        color: '#f39c12',
        flexDirection: 'row',
        alignItems: 'center',
    },
    overview: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    genreContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
    },
    genre: {
        backgroundColor: '#e0e0e0',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginRight: 8,
        marginBottom: 8,
    },
    genreText: {
        fontFamily: 'Roboto-Medium',
        fontSize: 12,
        color: '#333',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 8,
    },
    iconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    iconText: {
        marginLeft: 4,
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        color: '#666',
    },
});

const MoviePre2 = ({ movie }) => {
    const [backdropUrl, setBackdropUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

    const fetchImage = useCallback(async () => {

        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/images`, options);
            const data = await response.json();
            const backdrops = data.backdrops.map(backdrop => `${BACKDROP_URL}${backdrop.file_path}`);
            setBackdropUrl(backdrops[0] || null);
        } catch (error) {
            console.error('Error fetching image:', error);
        } finally {
            setIsLoading(false);
        }
    }, [movie.id]);

    useFocusEffect(
        useCallback(() => {
            fetchImage();
        }, [fetchImage])
    );

    const formatOverview = (overview) => {
        return overview.length > 100 ? `${overview.substring(0, 100)}...` : overview;
    };

    const handleNavigation = () => {
        navigation.navigate("Explore", { movie });
    };

    if (!movie.title) return null;

    if (isLoading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <TouchableOpacity style={styles.container} onPress={handleNavigation}>
            <View style={styles.imageContainer}>
                {backdropUrl && <Image source={{ uri: backdropUrl }} style={styles.backdrop} resizeMode="cover" />}
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.7)']}
                    style={styles.gradient}
                />
                <Image source={{ uri: `${BASE_URL}${movie.poster_path}` }} style={styles.poster} />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.title} numberOfLines={2}>{movie.title}</Text>
                <View style={styles.infoContainer}>
                    {movie.release_date && <Text style={styles.year}>{movie.release_date.split('-')[0]}</Text>}
                    <View style={styles.rating}>
                        <Icon name="star" size={16} color="#f39c12" />
                        <Text style={[styles.rating, { marginLeft: 4 }]}>{movie.vote_average.toFixed(1)}</Text>
                    </View>
                </View>
                <Text style={styles.overview}>{formatOverview(movie.overview || "")}</Text>
                <View style={styles.iconContainer}>
                    <View style={styles.iconWrapper}>
                        <Icon name="calendar-outline" size={16} color="#666" />
                        <Text style={styles.iconText}>{movie.release_date || 'N/A'}</Text>
                    </View>
                </View>
                <View style={styles.genreContainer}>
                    {movie.genres && movie.genres.slice(0, 3).map((genre, index) => (
                        <View key={index} style={styles.genre}>
                            <Text style={styles.genreText}>{genre.name}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default React.memo(MoviePre2);