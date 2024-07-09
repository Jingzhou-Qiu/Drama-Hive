import React, { useEffect, useState, useContext, useCallback } from 'react';
import { 
  Text, 
  StyleSheet, 
  Image, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { options } from '../MyContext/ConstantContext';
import { useNavigation } from '@react-navigation/native';
import { getDataWithFilter, addData, checkDuplicate, findReview } from '../MyContext/Firebase';
import { useFocusEffect } from '@react-navigation/native';
import UserContext from '../MyContext/UserContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const baseUrl = 'https://image.tmdb.org/t/p/original';

const getGenreString = (detail) => {
    if (!detail) return '';
    const { genres, release_date } = detail;
    let text = genres?.map(genre => genre.name).join(', ') || '';
    if (release_date) text += ` • ${release_date.split('-')[0]}`;
    return text;
};

const MoviePoster = ({ imageUrl, backdropUrl }) => (
  <View style={styles.posterContainer}>
    <Image source={{ uri: backdropUrl }} style={styles.backdropImage} />
    <View style={styles.posterOverlay} />
    <Image source={{ uri: imageUrl }} style={styles.poster} />
  </View>
);

const MovieInfo = ({ title, tagline, smallTag }) => (
  <View style={styles.infoContainer}>
    <Text style={styles.titleText}>{title}</Text>
    {tagline ? <Text style={styles.tagline}>"{tagline}"</Text> : null}
    <Text style={styles.smallTag}>{smallTag}</Text>
  </View>
);

const ActionButtons = ({ id }) => {
  const navigation = useNavigation();
  const context = useContext(UserContext);
  const email = context.email;

  const writeReview = async () => {
    if (!email) {
      Alert.alert("Sign In Required", "Please sign in to write a review.");
      return;
    }
    if ( await checkDuplicate("Review", email, id)){
      rs = await findReview("Review", email, id)
      navigation.navigate("updateReview",{id, type: "movie", rating:rs.rating, review:rs.review})
      return
    }
    navigation.navigate("WriteReview", { id, type: "movie" });
  };

  const addLike = async() => {
    if (!email) {
      Alert.alert("Sign In Required", "Please sign in to add to favorites.");
      return;
    }
    if ( await checkDuplicate("Like", email, id)){
      Alert.alert("Already added");
      return
    }
    addData("Like", {email, id});
    Alert.alert("Success", "Added to favorites!");
  };

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={[styles.button, styles.favoriteButton]} onPress={addLike}>
        <Text style={styles.buttonText}>♥ Add to Favorites</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.reviewButton]} onPress={writeReview}>
        <Text style={styles.buttonText}>✎ Write Review</Text>
      </TouchableOpacity>
    </View>
  );
};

const Star = ({ filled }) => (
  <Text style={[styles.starText, filled ? styles.filledStar : styles.emptyStar]}>
    {filled ? '★' : '☆'}
  </Text>
);

const ReviewItem = ({ item }) => {
  const [user, setUser] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const rs = await getDataWithFilter("UserInfo", "email", "==", item.email);
      setUser(rs[0]?.username || 'Anonymous');
    };
    getUser();
  }, [item.email]);

  return (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Text style={styles.username}>{user}</Text>
        <View style={styles.rating}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} filled={star <= item.rating} />
          ))}
        </View>
      </View>
      <Text style={styles.reviewText}>{item.review}</Text>
    </View>
  );
};

const ReviewComponent = ({ data }) => {
  if (!data || data.length === 0) {
    return <Text style={styles.noReviews}>No reviews yet. Be the first to review!</Text>;
  }

  return (
    <View style={styles.reviewsList}>
      {data.map((item) => (
        <ReviewItem key={item.id} item={item} />
      ))}
    </View>
  );
};

const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#0000ff" />
    <Text style={styles.loadingText}>Loading movie details...</Text>
  </View>
);

export default function SingleMoviePage({ route }) {
  const [detail, setDetail] = useState(null);
  const [smallTag, setSmallTag] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [review, setReview] = useState(null);
  const { movie } = route.params;
  const imageUrl = baseUrl + movie.poster_path;
  const backdropUrl = baseUrl + movie.backdrop_path;

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
    getDataWithFilter("Review", "id", '==', movie.id).then(rs => setReview(rs));
  }, [movie.id]);

  useFocusEffect(
    useCallback(() => { 
      getDataWithFilter("Review", "id", '==', movie.id).then(rs => setReview(rs));
    }, [])
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView style={styles.container}>
      <MoviePoster imageUrl={imageUrl} backdropUrl={backdropUrl} />
      <View style={styles.contentContainer}>
        <MovieInfo
          title={movie.title}
          tagline={detail?.tagline}
          smallTag={smallTag}
        />
        <ActionButtons id={movie.id} />
        {movie.overview && (
          <View style={styles.overviewContainer}>
            <Text style={styles.overviewTitle}>Overview</Text>
            <Text style={styles.overview}>{movie.overview}</Text>
          </View>
        )}
        <View style={styles.reviewsHeader}>
          <Text style={styles.reviewsTitle}>Reviews</Text>
        </View>
        <ReviewComponent data={review} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  posterContainer: {
    height: SCREEN_WIDTH * 0.75,
    position: 'relative',
  },
  backdropImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  posterOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  poster: {
    width: 120,
    height: 180,
    position: 'absolute',
    bottom: -30,
    left: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  contentContainer: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  tagline: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 5,
  },
  smallTag: {
    fontSize: 14,
    color: '#888',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  favoriteButton: {
    backgroundColor: '#FF6B6B',
    marginRight: 10,
  },
  reviewButton: {
    backgroundColor: '#4ECDC4',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  overviewContainer: {
    marginBottom: 20,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  overview: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  reviewsHeader: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 20,
    marginBottom: 10,
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  reviewsList: {
    marginTop: 10,
  },
  reviewCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  rating: {
    flexDirection: 'row',
  },
  starText: {
    fontSize: 18,
  },
  filledStar: {
    color: '#FFD700',
  },
  emptyStar: {
    color: '#D3D3D3',
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  noReviews: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});