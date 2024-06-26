import { Text, View, ScrollView, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { GenreContext } from '../MyContext/GenreContext';
import { useContext, useState } from 'react';
import { styles } from './styles';
import { ScreenGenre } from './ScreenGenre';
import { MovieByUrl } from './MovieByUrl';

renderstyle = StyleSheet.create({
    container:
    {
        flexDirection: "row",
        flexWrap: 'wrap',
    }
})


const RenderGenre = ({ data }) => {

    if (data != null) {
        return (
            <View style = {renderstyle.container}>
                {data.map((ele, index) =>  <ScreenGenre genreid={ele[0]} name={ele[1]} key={index}/> )}
            </View>
        )
    }

}

export default function HomeScreen({ navigation }) {
    const genreMap = useContext(GenreContext)
    const [currUrl, setUrl] = useState('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=2')
    const [currUrl2, setUrl2] = useState('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1')


    return (
        <ScrollView>
            <View style={styles.textContiner}>
                <TouchableOpacity onPress={() => {
                    setUrl('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=2')
                }}>
                    <Text style={styles.featureText}> Now Playing</Text>
                </TouchableOpacity>
                <Text style={styles.featureText} >|</Text>
                <TouchableOpacity onPress={() => {
                    setUrl('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=2')
                }}>
                    <Text style={styles.featureText}> Upcoming </Text>
                </TouchableOpacity>
            </View>
            <MovieByUrl url={currUrl} />

            <View style={styles.textContiner}>
                <TouchableOpacity onPress={() => {
                    setUrl2('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1')
                }}>
                    <Text style={styles.featureText}> Popular </Text>
                </TouchableOpacity>
                <Text style={styles.featureText} >|</Text>
                <TouchableOpacity onPress={() => {
                    setUrl2('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1')
                }}>
                    <Text style={styles.featureText}> Top Rated </Text>
                </TouchableOpacity>
            </View>
            <MovieByUrl url={currUrl2} />

            <View style={styles.bigContainer}>
                <RenderGenre data={genreMap} />
            </View>
        </ScrollView>
    )

}

