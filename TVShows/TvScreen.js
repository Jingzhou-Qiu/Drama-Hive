import React, { useContext, useState, useCallback } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, TextInput, StatusBar } from 'react-native';
import { TVGenreContext } from '../MyContext/TvGenreContext';
import { screenStyle } from '../MyContext/ConstantContext';
import { TvByUrl } from './TvByUrl';
import TVScreenGenre from './TVScreenGenre';
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

export default function TvHome({ navigation }) {
    const genreMap = useContext(TVGenreContext);
    const [input, setInput] = useState('');
    const [activeFeatures, setActiveFeatures] = useState({
        onTheAir: true,
        airingToday: false,
        popular: true,
        topRated: false,
    });

    const [urls, setUrls] = useState({
        main: 'https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1',
        secondary: 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1',
    });

    const search = useCallback(() => {
        navigation.navigate("SearchScene", input);
    }, [navigation, input]);

    const toggleFeature = useCallback((feature, url, urlKey) => {
        setActiveFeatures(prev => {
            let newState = { ...prev };
            if (feature === 'onTheAir' || feature === 'airingToday') {
                newState.onTheAir = feature === 'onTheAir';
                newState.airingToday = feature === 'airingToday';
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
                    placeholder="Explore"
                    style={styles.searchInput}
                    onChangeText={setInput}
                    onSubmitEditing={search}
                    value={input}
                />
            </View>
            <ScrollView>
                <View style={styles.featureContainer}>
                    <FeatureToggle
                        isActive={activeFeatures.onTheAir}
                        onPress={() => toggleFeature('onTheAir', 'https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1', 'main')}
                    >
                        On The Air
                    </FeatureToggle>
                    <FeatureToggle
                        isActive={activeFeatures.airingToday}
                        onPress={() => toggleFeature('airingToday', 'https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1', 'main')}
                    >
                        Airing Today
                    </FeatureToggle>
                </View>
                <TvByUrl url={urls.main} />

                <View style={styles.featureContainer}>
                    <FeatureToggle
                        isActive={activeFeatures.popular}
                        onPress={() => toggleFeature('popular', 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', 'secondary')}
                    >
                        Popular
                    </FeatureToggle>
                    <FeatureToggle
                        isActive={activeFeatures.topRated}
                        onPress={() => toggleFeature('topRated', 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', 'secondary')}
                    >
                        Top Rated
                    </FeatureToggle>
                </View>
                <TvByUrl url={urls.secondary} />

                <Text style={styles.genreTitle}>Genres</Text>
                <View style={styles.genreContainer}>
                    {genreMap && genreMap.map(([genreId, name], index) => (
                        <TVScreenGenre genreid={genreId} name={name} key={index} />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}