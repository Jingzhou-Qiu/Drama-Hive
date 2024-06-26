import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';


const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        justifyContent: 'left',
        flexDirection: "column",
        width: 380,
        height: 250,
        borderBottomWidth: 2,
        borderBottomColor: 'grey',
        alignItems: 'left',
    },
    container2: {
        justifyContent: 'left',
        flexDirection: "row",
        marginTop: 10,
        width: 380,
        height: 150,
        // borderWidth: 4,
        // borderColor: '#ff00ff',
        alignItems: 'left',
    },
    container3: {
        justifyContent: 'left',
        flexDirection: "row",
        marginTop: 0,
        width: 380,
        height: 17,
        // borderWidth: 4,
        // borderColor: '#ff00ff',
        alignItems: 'left',
    },

    poster: {
        marginLeft: 5,
        resizeMode: 'cover',
        width: 97.2,
        height: 144,
        borderRadius: 10,
    },
    picture: {
        resizeMode: 'cover',
        width: 250,
        height: 144,
        borderRadius: 10,
        marginLeft: 10,

    },

    text_title: {
        textAlign: 'left',
        marginLeft: 7,
        paddingBottom: 2,
        textAlignVertical: 'center',
        fontFamily: 'Roboto',
        fontSize: 15,
        fontWeight: '500'

    },
    text_year: {
        textAlign: 'left',
        marginLeft: 7,
        marginTop: 2,
        textAlignVertical: 'center',
        fontFamily: 'Roboto',
        fontSize: 13,
        color: '#505251',
        fontWeight: '400',
    },
    text_rate: {
        marginLeft: 10,
        fontSize: 13,
    },
    text_overview:{
        marginTop: 5,
        marginLeft: 8,
        fontSize: 13,
        fontWeight: '400',
    }

})



export default function MoviePre2({ movie }) {
    const [imageurl, setImageUrl] = useState(null);
    const navigation = useNavigation()
    const poster_url = 'https://image.tmdb.org/t/p/original' + movie.poster_path;
    const image_url = `https://api.themoviedb.org/3/movie/${movie.id}/images`;

    async function fetchImage(url) {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MDRkOGFjOWM0YzA3OWEzMjNlZjAwMzY3MTQ5MmQzZiIsInN1YiI6IjY2NzE4NWRjMWJmODZmNjA1ZjZhYjEzOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cqnD9xHIfL_SpjSBm1PJp_zF4PEDGH5g-YrYmB9gXOk'
            }
        };
        let rs = await fetch(url, options)
            .then((response) => response.json())

        data = rs.backdrops.map((element, index) => 'https://image.tmdb.org/t/p/original' + element.file_path)

        return data
    }

    useEffect(() => {
        fetchImage(image_url).then((rs) => setImageUrl(rs))
    }, [movie]);

    pic_url = imageurl ? imageurl[0] : null;

    formatOverview = (overview) =>{
        if(overview.length > 80){
            return overview.substring(0,80) + '...'
        }else{
            return overview
        }
    }
    handleNavigtion = () =>{
        navigation.navigate("Explore", {movie: movie})
    }


    return (
        <TouchableOpacity style={styles.container} onPress = {handleNavigtion}>
            <View style={styles.container2}>
                <Image source={{ uri: poster_url }} style={styles.poster} />
                <Image source={{ uri: pic_url }} style={styles.picture} />
            </View>
            <View style={styles.container3}>
                <Text style={styles.text_title}>{movie.title}</Text>
                <Text style={styles.text_year}>({movie.release_date})</Text>
            </View>
            <Text style = {styles.text_rate}>rating: {movie.vote_average}</Text>
            <Text style = {styles.text_overview}>Overview: {formatOverview(movie.overview)}</Text>
        </TouchableOpacity>
        
    )





}