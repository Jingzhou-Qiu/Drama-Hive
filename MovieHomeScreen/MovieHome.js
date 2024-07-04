import React, { useContext, useState, useCallback } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, TextInput, StatusBar } from 'react-native';
import { GenreContext } from '../MyContext/GenreContext';
import { ScreenGenre } from './ScreenGenre';
import { MovieByUrl } from './MovieByUrl';
import { screenStyle } from '../MyContext/ConstantContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
    container: {
        ...screenStyle.container,
        backgroundColor: '#f8f8f8',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginTop: 16,
        marginBottom: 8,
        backgroundColor: "#e4e7e5",
        borderRadius: 20,
        paddingHorizontal: 12,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
        marginLeft: 8,
    },
    featureContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginHorizontal: 16,
        marginVertical: 12,
    },
    featureText: {
        fontFamily: 'Roboto-Medium',
        fontSize: 18,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginRight: 8,
    },
    genreTitle: {
        fontFamily: 'Roboto-Bold',
        fontSize: 20,
        marginVertical: 12,
        marginLeft: 16,
        color: '#333',
    },
    genreContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        padding: 8,
    },
});

const FeatureToggle = React.memo(({ isActive, onPress, children }) => (
    <TouchableOpacity onPress={onPress}>
        <Text style={[
            styles.featureText, 
            { color: isActive ? '#007AFF' : '#666',
              borderBottomWidth: isActive ? 2 : 0,
              borderBottomColor: '#007AFF' }
        ]}>
            {children}
        </Text>
    </TouchableOpacity>
));

export default function MovieHome() {
    const genreMap = useContext(GenreContext);
    const [input, setInput] = useState('');
    const [activeFeatures, setActiveFeatures] = useState({
        nowPlaying: true,
        upcoming: false,
        popular: true,
        topRated: false,
    });
    const navigation = useNavigation();

    const [urls, setUrls] = useState({
        main: 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=2',
        secondary: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
    });

    const search = useCallback(() => {
        navigation.navigate("SearchScene", input);
    }, [navigation, input]);

    const toggleFeature = useCallback((feature, url, urlKey) => {
        setActiveFeatures(prev => {
            let newState = { ...prev };
            if (feature === 'nowPlaying' || feature === 'upcoming') {
                newState.nowPlaying = feature === 'nowPlaying';
                newState.upcoming = feature === 'upcoming';
            } else if (feature === 'popular' || feature === 'topRated') {
                newState.popular = feature === 'popular';
                newState.topRated = feature === 'topRated';
            }
            return newState;
        });
        setUrls(prev => ({ ...prev, [urlKey]: url }));
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.searchContainer}>
                <Icon name="search" size={20} color="#666" />
                <TextInput
                    placeholder="Explore movies"
                    style={styles.searchInput}
                    onChangeText={setInput}
                    onSubmitEditing={search}
                    value={input}
                />
            </View>
            <ScrollView>
                <View style={styles.featureContainer}>
                    <FeatureToggle
                        isActive={activeFeatures.nowPlaying}
                        onPress={() => toggleFeature('nowPlaying', 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=2', 'main')}
                    >
                        Now Playing
                    </FeatureToggle>
                    <FeatureToggle
                        isActive={activeFeatures.upcoming}
                        onPress={() => toggleFeature('upcoming', 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=2', 'main')}
                    >
                        Upcoming
                    </FeatureToggle>
                </View>
                <MovieByUrl url={urls.main} />

                <View style={styles.featureContainer}>
                    <FeatureToggle
                        isActive={activeFeatures.popular}
                        onPress={() => toggleFeature('popular', 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', 'secondary')}
                    >
                        Popular
                    </FeatureToggle>
                    <FeatureToggle
                        isActive={activeFeatures.topRated}
                        onPress={() => toggleFeature('topRated', 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', 'secondary')}
                    >
                        Top Rated
                    </FeatureToggle>
                </View>
                <MovieByUrl url={urls.secondary} />

                <Text style={styles.genreTitle}>Genres</Text>
                <View style={styles.genreContainer}>
                    {genreMap && genreMap.map(([genreId, name], index) => (
                        <ScreenGenre genreid={genreId} name={name} key={index} />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}