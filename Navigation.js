import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MovieGenre from './Movie/MovieGenre';
import HomeScreen from './HomeScreen/HomeScreen';
import GenreProvider from './MyContext/GenreContext';
import SingleMoviePage from './Movie/SingleMoviePage';
import SearchScene from './search/SearchScene';
import AISearch from './search/AISearch';
import SearchTitle from './search/SearchTitle';
import TvHomeScreen from './TVShows/TvScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const MovieStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="MovieGenre" component={MovieGenre} />
    <Stack.Screen name="Explore" component={SingleMoviePage} />
    <Stack.Screen name="SearchScene" component={SearchScene} />
  </Stack.Navigator>
);

const TVStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="TvHomeScreen" component={TvHomeScreen} />
  </Stack.Navigator>
);

const TopTabNavigator = () => (
  <TopTab.Navigator screenOptions={{ headerShown: false }}>
    <TopTab.Screen name="Movies" component={MovieStack} />
    <TopTab.Screen name="TV Shows" component={TVStack} />
  </TopTab.Navigator>
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
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Home"
          component={TopTabNavigator}
          options={{ tabBarLabel: 'Home' }}
        />
        <Tab.Screen
          name="Recommend"
          component={AIStack}
          options={{ tabBarLabel: 'Recommend' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  </GenreProvider>
);

export default Navigation;