import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

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


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createNativeStackNavigator();
const TvStack = createNativeStackNavigator();

const MovieStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={MovieHome} />
    <Stack.Screen name="MovieGenre" component={MovieGenre} />
    <Stack.Screen name="Explore" component={SingleMoviePage} />
    <Stack.Screen name="SearchScene" component={SearchScene} />
  </Stack.Navigator>
);

const TVStack = () => (
  <TvStack.Navigator screenOptions={{ headerShown: false }}>
    <TvStack.Screen name="TvHomeScreen" component={TvHomeScreen} />
    <TvStack.Screen name="TVGenre" component={TVGenre} />
    <TvStack.Screen name="ExploreTV" component={SingleTVPage} />
    <TvStack.Screen name="SearchScene" component={SearchScene} />
  </TvStack.Navigator>
);


const AIStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AISearch" component={AISearch} />
    <Stack.Screen name="SearchTitle" component={SearchTitle} />
    <Stack.Screen name="Explore" component={SingleMoviePage} />
  </Stack.Navigator>
);

const Navigation = () => (
  <GenreProvider>
    <TVGenreProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen
            name="Movie"
            component={MovieStack}
            options={{ tabBarLabel: 'Movie' }}
          />
          <Tab.Screen
            name="TV"
            component={TVStack}
            options={{ tabBarLabel: 'TV' }}
          />
          <Tab.Screen
            name="Recommend"
            component={AIStack}
            options={{ tabBarLabel: 'Recommend' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </TVGenreProvider>
  </GenreProvider>

);

export default Navigation;