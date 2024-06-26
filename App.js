import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MovieGenre from './ShowListPage/MovieGenre';
import { useEffect, useState, useContext } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import HomeScreen from './HomeScreen/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GenreProvider from './MyContext/GenreContext';
import SingleMoviePage from './showSingleMoviePage/SingleMoviePage';



export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDRkOGFjOWM0YzA3OWEzMjNlZjAwMzY3MTQ5MmQzZiIsInN1YiI6IjY2NzE4NWRjMWJmODZmNjA1ZjZhYjEzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cqnD9xHIfL_SpjSBm1PJp_zF4PEDGH5g-YrYmB9gXOk'
  }
};

export default function App() {
  const [genreMap, setGenre] = useState(null);

  const Stack = createNativeStackNavigator();


  return (
    <GenreProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="MovieGenre" component={MovieGenre} />
          <Stack.Screen name = "Explore" component={SingleMoviePage}/>
        </Stack.Navigator>
      </NavigationContainer>
    </GenreProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
