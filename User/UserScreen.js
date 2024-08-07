import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, SafeAreaView, ActivityIndicator, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../MyContext/UserContext';
import { CommonActions } from '@react-navigation/native';
import { getDataWithFilter, deleteLike } from '../MyContext/Firebase';
import { options } from '../MyContext/ConstantContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const baseUrl = 'https://image.tmdb.org/t/p/w200';


const ContentItem = ({ item, isLike, email, update }) => {
  const [details, setDetails] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const navigation = useNavigation()

  useEffect(() => {
    fetchDetails()
  }, [item.id]);

  const fetchDetails = async () => {
    const url = `https://api.themoviedb.org/3/${item.type}/${item.id}?language=en-US`;
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setDetails(data);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };
  const onRemoveLike = async () => {
    await deleteLike(email, item.id, item.type);
    await update();
    
  }
  
  const gotonewPage = () => {
    if (item.type == 'tv') {
      tvShow = {
        name: details.name,
        genre_ids: details.genre_ids,
        overview: details.overview,
        poster_path: details.poster_path,
        vote_average: details.vote_average,
        original_language: details.original_language,
        first_air_date: details.first_air_date,
        id: details.id
      }
      navigation.navigate("tv", { tvShow })
    }
    else {
      let movie = {
        title: details.title,
        genre_ids: details.genre_ids,
        overview: details.overview,
        poster_path: details.poster_path,
        vote_average: details.vote_average,
        lan: details.original_language,
        release_date: details.release_date,
        id: details.id
      }
      navigation.navigate("movie", { movie });

    }

  }



  if (!details) return null;

  return (
    <TouchableOpacity style={styles.contentItem} onPress={()=>gotonewPage()}>
      <View style={styles.posterContainer}>
        {imageLoading && <ActivityIndicator style={styles.loader} color="#3498db" />}
        <Image
          source={{ uri: baseUrl + details.poster_path }}
          style={styles.posterImage}
          onLoadEnd={() => setImageLoading(false)}
        />
      </View>
      <View style={styles.contentInfo}>
        <Text style={styles.titleText} numberOfLines={1}>{details.title || details.name}</Text>
        {isLike ? (
          <TouchableOpacity style={styles.removeButton} onPress={() => onRemoveLike()}>
            <Icon name="heart-dislike" size={24} color="#e74c3c" />
            <Text style={styles.removeButtonText}>Remove from Favorites</Text>
          </TouchableOpacity>
        ) : (
          <>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon
                  key={star}
                  name={star <= item.rating ? "star" : "star-outline"}
                  size={16}
                  color="#f39c12"
                />
              ))}
            </View>
            <Text style={styles.reviewText} numberOfLines={2}>{item.review}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const UserContent = ({ email, contentType }) => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchContent = async () => {
    setRefreshing(true);
    try {
      const rs = await getDataWithFilter(contentType, "email", "==", email);
      setData(rs);
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [contentType]);

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <ContentItem item={item} isLike={contentType === "Like"} email={email} update={fetchContent} />}
      keyExtractor={(item, index) => {item.id.toString() + contentType}}
      contentContainerStyle={styles.contentList}
      ListEmptyComponent={<Text style={styles.emptyText}>No {contentType.toLowerCase()}s yet</Text>}
      refreshing={refreshing}
      onRefresh={fetchContent}
    />
  );
};

const UserScreen = () => {
  const userInfo = useContext(UserContext);
  const email = userInfo.email;
  const user = userInfo.user;
  const setEmail = userInfo.setEmail; 
  const setUser = userInfo.setUser; 
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Review');

  const login = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  };

  const logout = () => {
    setEmail(null);
    setUser(null);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  };

  if (email == null) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loginContainer}>
          <Icon name="person-circle-outline" size={100} color="#3498db" />
          <Text style={styles.loginText}>Please log in to view your profile</Text>
          <TouchableOpacity style={styles.loginButton} onPress={login}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Icon name="person-circle-outline" size={60} color="#fff" />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user}</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Icon name="log-out-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'Review' && styles.activeTab]}
            onPress={() => setActiveTab('Review')}
          >
            <Text style={[styles.tabText, activeTab === 'Review' && styles.activeTabText]}>My Reviews</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'Like' && styles.activeTab]}
            onPress={() => setActiveTab('Like')}
          >
            <Text style={[styles.tabText, activeTab === 'Like' && styles.activeTabText]}>My Likes</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <UserContent email={email} contentType={activeTab} />
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    padding: 20,
    backgroundColor: '#3498db',
  },
  logoutButton: {
    padding: 10,
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8d7da',
    padding: 8,
    borderRadius: 5,
    marginTop: 8,
  },
  removeButtonText: {
    color: '#721c24',
    marginLeft: 8,
    fontSize: 14,
  },
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 25,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#3498db',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
  },
  activeTab: {
    borderBottomColor: '#3498db',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  activeTabText: {
    color: '#3498db',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  contentList: {
    flexGrow: 1,
  },
  contentItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  posterContainer: {
    width: 80,
    height: 120,
    marginRight: 15,
    borderRadius: 8,
    overflow: 'hidden',
  },
  posterImage: {
    width: '100%',
    height: '100%',
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#f0f0f0',
  },
  contentInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
});

export default UserScreen;