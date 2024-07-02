import React, { useContext, useState, useCallback } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { GenreContext } from '../MyContext/GenreContext';
import { styles } from './styles';
import { ScreenGenre } from './ScreenGenre';
import { MovieByUrl } from './MovieByUrl';
import { screenStyle } from '../MyContext/ConstantContext';

const renderStyle = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: 'wrap',
    },
    textInput: {
        marginTop: 8,
        marginLeft: 30,
        marginBottom: 5,
        width: 300,
        height: 30,
        backgroundColor: "#e4e7e5",
        borderRadius: 10,
        paddingLeft: 10,
    },
});

const RenderGenre = React.memo(({ data }) => {
    if (!data) return null;
    return (
        <View style={renderStyle.container}>
            {data.map(([genreId, name], index) => (
                <ScreenGenre genreid={genreId} name={name} key={index} />
            ))}
        </View>
    );
});

const FeatureToggle = React.memo(({ isActive, onPress, children }) => (
    <TouchableOpacity onPress={onPress}>
        <Text style={[textStyles.featureText, { color: isActive ? 'black' : 'grey' }]}>
            {children}
        </Text>
    </TouchableOpacity>
));

const textStyles = StyleSheet.create({
    featureText: {
        fontFamily: 'Roboto',
        paddingTop: 10,
        paddingLeft: 8,
        paddingBottom: 4,
        fontWeight: '500',
        fontSize: 20,
    },
});

export default function HomeScreen({ navigation }) {
    const genreMap = useContext(GenreContext);
    const [input, setInput] = useState('');
    const [activeFeatures, setActiveFeatures] = useState({
        nowPlaying: true,
        upcoming: false,
        popular: true,
        topRated: false,
    });

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
        <View style={screenStyle.container}>
            <TextInput
                placeholder="Explore"
                style={renderStyle.textInput}
                onChangeText={setInput}
                onSubmitEditing={search}
                value={input}
            />
            <ScrollView>
                <View style={styles.textContiner}>
                    <FeatureToggle
                        isActive={activeFeatures.nowPlaying}
                        onPress={() => toggleFeature('nowPlaying', 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=2', 'main')}
                    >
                        Now Playing
                    </FeatureToggle>
                    <Text style={textStyles.featureText}>|</Text>
                    <FeatureToggle
                        isActive={activeFeatures.upcoming}
                        onPress={() => toggleFeature('upcoming', 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=2', 'main')}
                    >
                        Upcoming
                    </FeatureToggle>
                </View>
                <MovieByUrl url={urls.main} />

                <View style={styles.textContiner}>
                    <FeatureToggle
                        isActive={activeFeatures.popular}
                        onPress={() => toggleFeature('popular', 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', 'secondary')}
                    >
                        Popular
                    </FeatureToggle>
                    <Text style={textStyles.featureText}>|</Text>
                    <FeatureToggle
                        isActive={activeFeatures.topRated}
                        onPress={() => toggleFeature('topRated', 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', 'secondary')}
                    >
                        Top Rated
                    </FeatureToggle>
                </View>
                <MovieByUrl url={urls.secondary} />

                <View style={styles.bigContainer}>
                    <RenderGenre data={genreMap} />
                </View>
            </ScrollView>
        </View>
    );
}