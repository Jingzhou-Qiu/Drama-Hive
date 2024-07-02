import React, { useContext, useState, useCallback } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { TVGenreContext } from '../MyContext/TvGenreContext';
import { styles } from '../MovieHomeScreen/styles';
import { screenStyle } from '../MyContext/ConstantContext';
import { TvByUrl } from './TvByUrl';
import TVScreenGenre from './TVScreenGenre';

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
                <TVScreenGenre genreid={genreId} name={name} key={index} />
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
                        isActive={activeFeatures.onTheAir}
                        onPress={() => toggleFeature('onTheAir', 'https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1', 'main')}
                    >
                        On The Air
                    </FeatureToggle>
                    <Text style={textStyles.featureText}>|</Text>
                    <FeatureToggle
                        isActive={activeFeatures.airingToday}
                        onPress={() => toggleFeature('airingToday', 'https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1', 'main')}
                    >
                        Airing Today
                    </FeatureToggle>
                </View>
                <TvByUrl url={urls.main} />

                <View style={styles.textContiner}>
                    <FeatureToggle
                        isActive={activeFeatures.popular}
                        onPress={() => toggleFeature('popular', 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', 'secondary')}
                    >
                        Popular
                    </FeatureToggle>
                    <Text style={textStyles.featureText}>|</Text>
                    <FeatureToggle
                        isActive={activeFeatures.topRated}
                        onPress={() => toggleFeature('topRated', 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', 'secondary')}
                    >
                        Top Rated
                    </FeatureToggle>
                </View>
                <TvByUrl url={urls.secondary} />

                <View style={styles.bigContainer}>
                    <RenderGenre data={genreMap} />
                </View>
            </ScrollView>
        </View>
    );
}