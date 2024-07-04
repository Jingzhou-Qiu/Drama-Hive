import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MovieGenre from './Movie/MovieGenre';
import MovieHome from './MovieHomeScreen/MovieHome';
import GenreProvider from './MyContext/GenreContext';
import SingleMoviePage from './Movie/SingleMoviePage';
import SearchScene from './search/SearchScene';
import AISearch from './search/AISearch';
import SearchTitle from './search/SearchTitle';
import TvHomeScreen from './TVShows/TvScreen';
import TVGenre from './TVShows/TVGenre';
import TVGenreProvider from './MyContext/TvGenreContext';
import SingleTVPage from './TVShows/SingleTVPage'
import UserScreen from './User/UserScreen';
import WriteReview from './User/WriteReview';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TvStack = createNativeStackNavigator();

const MovieStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={MovieHome} />
    <Stack.Screen name="MovieGenre" component={MovieGenre} />
    <Stack.Screen name="Explore" component={SingleMoviePage} />
    <Stack.Screen name="SearchScene" component={SearchScene} />
    <Stack.Screen name="WriteReview" component={WriteReview} />
  
  </Stack.Navigator>
);

const TVStack = () => (
  <TvStack.Navigator screenOptions={{ headerShown: false }}>
    <TvStack.Screen name="TvHomeScreen" component={TvHomeScreen} />
    <TvStack.Screen name="TVGenre" component={TVGenre} />
    <TvStack.Screen name="ExploreTV" component={SingleTVPage} />
    <TvStack.Screen name="SearchScene" component={SearchScene} />
    <TvStack.Screen name="WriteReview" component={WriteReview} />
  </TvStack.Navigator>
);


const AIStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AISearch" component={AISearch} />
    <Stack.Screen name="SearchTitle" component={SearchTitle} />
    <Stack.Screen name="Explore" component={SingleMoviePage} />
  </Stack.Navigator>
);

const CustomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconName = () => {
          switch (route.name) {
            case 'Movie':
              return 'film-outline';
            case 'TV':
              return 'tv-outline';
            case 'Recommend':
              return 'bulb-outline';
            case 'user':
              return 'person-outline';
            default:
              return 'square-outline';
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tabItem}
          >
            <Icon 
              name={iconName()} 
              size={24} 
              color={isFocused ? '#007AFF' : '#8E8E93'} 
            />
            <Text style={[
              styles.tabLabel,
              { color: isFocused ? '#007AFF' : '#8E8E93' }
            ]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const Navigation = () => (
  <GenreProvider>
    <TVGenreProvider>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <Tab.Screen name="Movie" component={MovieStack} />
        <Tab.Screen name="TV" component={TVStack} />
        <Tab.Screen name="Recommend" component={AIStack} />
        <Tab.Screen name="user" component={UserScreen} />
      </Tab.Navigator>
    </TVGenreProvider>
  </GenreProvider>
);

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F7',
    borderTopWidth: 1,
    borderTopColor: '#D1D1D6',
    paddingBottom: 5,
    paddingTop: 5,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 4,
  },
});

export default Navigation;