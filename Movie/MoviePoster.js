import React, { useMemo } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const POSTER_WIDTH = width * 0.33; 
const POSTER_HEIGHT = POSTER_WIDTH * 1.5;

const styles = StyleSheet.create({
  container: {
    width: POSTER_WIDTH,
    marginHorizontal: 5,
    marginBottom: 20,
  },
  posterContainer: {
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
  },
  title: {
    color: '#fff',
    fontFamily: 'Arial',
    fontSize: 14,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  rating: {
    color: '#fff',
    fontFamily: 'Arial',
    fontSize: 12,
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

const BASE_URL = 'https://image.tmdb.org/t/p/w500';

const Movie = ({ movie }) => {
  const navigation = useNavigation();

  const formatTitle = (title) => {
    return title.length <= 20 ? title : `${title.substring(0, 17)}...`;
  };

  const imageUrl = useMemo(() => `${BASE_URL}${movie.poster_path}`, [movie.poster_path]);
  const title = useMemo(() => formatTitle(movie.title), [movie.title]);
  const rating = useMemo(() => movie.vote_average.toFixed(1), [movie.vote_average]);

  const navigate = () => {
    navigation.navigate("Explore", { movie });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={navigate}>
      <View style={styles.posterContainer}>
        <Image source={{ uri: imageUrl }} style={styles.poster} resizeMode="cover" />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradientOverlay}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.rating}>★ {rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(Movie);