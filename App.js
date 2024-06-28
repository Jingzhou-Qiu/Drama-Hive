import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import MovieGenre from './ShowListPage/MovieGenre';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import HomeScreen from './HomeScreen/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GenreProvider from './MyContext/GenreContext';
import SingleMoviePage from './showSingleMoviePage/SingleMoviePage';
import SearchScene from './search/SearchScene';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AISearch from './search/AISearch';
import SearchTitle from './search/SearchTitle';



function HomeScreenNavigate() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="MovieGenre" component={MovieGenre} />
        <Stack.Screen name="Explore" component={SingleMoviePage} />
        <Stack.Screen name="SearchScene" component={SearchScene} />
      </Stack.Navigator>
    </>

  )
}
function AICompNavigate(){
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator initialRouteName="AISearch" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AISearch" component={AISearch} />
        <Stack.Screen name="SearchTitle" component={SearchTitle} />
      </Stack.Navigator>
    </>

  )

}

export default function App() {
  const Tab = createBottomTabNavigator()
  return (
    <GenreProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{
          headerShown: false
        }}>
          <Tab.Screen name='HomeScreenNavigate' component={HomeScreenNavigate} options ={{headerTitle: "Home", tabBarLabel: 'Home'}}/>
          <Tab.Screen name='AISearch' component={AICompNavigate} options ={{headerTitle: "Recommend", tabBarLabel: 'Recommend'}}/>
        </Tab.Navigator>
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
