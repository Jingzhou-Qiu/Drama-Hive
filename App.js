import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MovieGenre from './ShowListPage/MovieGenre';
import { useEffect, useState } from 'react';





export default function App() {
  const [genreMap, setGenre] = useState(null);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDRkOGFjOWM0YzA3OWEzMjNlZjAwMzY3MTQ5MmQzZiIsInN1YiI6IjY2NzE4NWRjMWJmODZmNjA1ZjZhYjEzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cqnD9xHIfL_SpjSBm1PJp_zF4PEDGH5g-YrYmB9gXOk'
    }
  };


  async function fetchGenre() {
    map = new Map()
    let rs = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
      .then(response => response.json())
      .catch(err => console.error(err));
    rs.genres.map((element) => {
      map.set(element.id, element.name)
    })
    setGenre(map)
    console.log(genreMap)
    return genreMap
  }

  useEffect(()=>{
    fetchGenre()
  })


  return (
    <View style={styles.container}>
      <MovieGenre genre="18"/>
    </View>
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
