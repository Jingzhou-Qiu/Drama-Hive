import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: "column",
        width: 110,
        height: 185,
        // borderWidth: 4,
        // borderColor: '#20232a',
        // alignItems: 'center',


    },
    poster: {
        resizeMode: 'cover',
        width: 97.2,
        height: 144,
        borderRadius: 20,
    },

    text: {
        textAlign: 'left',
        paddingLeft: 4,
        paddingTop: 3,
        textAlignVertical: 'center',
        fontFamily: 'Arial',
        fontSize: 12,
        fontWeight: '500'

    }

})
export default function Movie({ movie }) {
    const navigation = useNavigation()
    formatTitle = (title) => {
        if (title.length <= 24) {
            return title
        } else {
            return title.substring(0, 21) + '...';
        }
    }

    const baseUrl = 'https://image.tmdb.org/t/p/original'
    const imageUrl = baseUrl + movie.poster_path

    let title = formatTitle(movie.title)

    const navigate = ()=>{
        navigation.navigate("Explore", {movie: movie} )
    }

    return (
        <View style={styles.container} >
            <TouchableOpacity onPress={navigate}>
                <Image source={{ uri: imageUrl }} style={styles.poster} />
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
        </View>

    )

}