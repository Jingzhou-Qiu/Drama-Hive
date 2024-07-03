import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { options, screenStyle } from '../MyContext/ConstantContext';
import { useNavigation } from '@react-navigation/native';
import { getDataWithFilter } from '../MyContext/Firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';

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

const ActionButtons = ({ id }) => {
    const navigation = useNavigation();
    const writeReview = () => {
        navigation.navigate("WriteReview", { id, type: "tv" })
    }

    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={writeReview}>
                <Text style={styles.buttonText}>Watched</Text>
            </TouchableOpacity>
        </View>
    )
};

const Star = ({ filled, size }) => (
    <TouchableOpacity style={styles.starButton}>
        <Icon
            name={filled ? 'star' : 'star-o'}
            size={size}
            color={filled ? 'gold' : 'lightgray'}
        />
    </TouchableOpacity>
);

const ReviewComponent = ({ data }) => {
    const renderItem = ({ item }) => (
        <View style={styles.reviewContainer}>
            <View style={styles.userInfo}>
                <Text style={styles.username}>{item.user}</Text>
            </View>
            <View style={styles.reviewContent}>
                <View style={[{ flexDirection: "row" }, {marginBottom:10}]}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            filled={star <= item.rating}
                            size={10}
                        />
                    ))}
                </View>
                <Text style={styles.reviewText}>{item.review}</Text>
            </View>
        </View>
    );

    if (data) {
        return (
            <View style={styles.listContainer}>
                {data.map((item) => renderItem({ item }))}
            </View>
        );
    }
};

export default function SingleTVPage({ route }) {
    const [detail, setDetail] = useState(null);
    const [smallTag, setSmallTag] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [review, setReview] = useState(null);
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
        getDataWithFilter("Review", "id", '==', tvShow.id).then(rs => setReview(rs));
    }, [tvShow.id]);

    useFocusEffect(
        useCallback(() => {
            getDataWithFilter("Review", "id", '==', tvShow.id).then(rs => setReview(rs));
        }, [])
    );

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    return (
        <ScrollView style={screenStyle.container}>
            <View style={styles.firstContainer}>
                <TVPoster imageUrl={imageUrl} />
                <TVInfo 
                    name={tvShow.name}
                    tagline={detail?.tagline ?? ''}
                    smallTag={smallTag}
                />
            </View>
            <ActionButtons id={tvShow.id} />
            {tvShow.overview && (
                <Text style={styles.text_overview}>
                    Overview: {tvShow.overview}
                </Text>
            )}
            <ReviewComponent data={review} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    listContainer: {
        paddingHorizontal: 16,
    },
    reviewContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    userInfo: {
        flex: 1,
    },
    username: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    date: {
        color: '#888',
        fontSize: 12,
    },
    reviewContent: {
        marginTop: 5,
    },
    reviewText: {
        fontSize: 14,
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 20,
    },
    button: {
        height: 30,
        width: 75,
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 20,
        alignItems: "center"
    },
    buttonText: {
        color: '#333',
        fontSize: 12,
    },
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
