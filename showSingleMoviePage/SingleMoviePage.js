import { Text, StyleSheet, Image, View } from 'react-native';
import { options } from '../App';
import { useEffect, useState } from 'react';

styles = StyleSheet.create({
    firstContainer: {
        flexDirection: "row"
    },
    first_firstContainer: {
        marginLeft: 25,
        marginTop: 20,
        flex: 1,
    },
    titleText: {
        fontSize: 20,
        textAlign: 'left',
        marginTop: 10,
        paddingTop: 3,
        textAlignVertical: 'center',
        fontFamily: 'Arial',
        fontWeight: '500'
    },
    poster: {
        marginLeft: 20,
        marginTop: 20,
        resizeMode: 'cover',
        width: 97.2,
        height: 144,
        borderRadius: 20,
    },
    smallTag: {
        fontSize: 12,
        textAlign: 'left',

    },
    text_overview:{
        marginTop: 10,
        marginLeft: 15,
        marginRight: 10,
        fontSize: 15,
        fontFamily: "Helvetica Neue",
        fontWeight: '400',
    },
    tagline:{

        marginBottom: 10,
        fontWeight: '400',
    }
})
const baseUrl = 'https://image.tmdb.org/t/p/original'

getGenreString = (detail) => {
    let text = ''
    if (detail == null) {
        return text
    }
    spokenLang = detail.spoken_languages
    array = detail.genres
    console.log(detail)
    for (let i = 0; i < array.length; i++) {
        text = text + array[i].name + " "
        if (i == array.length - 1) {
            text = text + "/"
        }
    }

    for (let i = 0; i < spokenLang.length; i++) {
        text = text + spokenLang[i].english_name + " "
        if (i == spokenLang.length - 1) {
            text = text + "/ "
        }
    }
    if (detail.status != null) {
        text = text + detail.status + " / "
    }
    if (detail.release_date != null) {
        text = text + detail.release_date
    }
    return text

}




export default function SingleMoviePage({ route, navigation }) {
    const [detail, setDetail] = useState(null)
    const [smallTag, setSmallTag] = useState('')
    const movie = route.params.movie
    const imageUrl = baseUrl + movie.poster_path

    async function fetchDetails(id) {
        const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
        console.log(url)
        let data = await fetch(url, options).then(rs => rs.json())
        setDetail(data)
    }


    useEffect(() => { fetchDetails(movie.id) }, [])
    useEffect(() => setSmallTag(getGenreString(detail)), [detail])

    console.log(movie)
    return (
        <View>
            <View style={styles.firstContainer}>
                <Image source={{ uri: imageUrl }} style={styles.poster} />
                <View style={styles.first_firstContainer}>
                    <Text style={styles.titleText}>{movie.title}</Text>
                    <Text style={styles.tagline}>{detail?.tagline}</Text>
                    <Text style={styles.smallTag}>{smallTag}</Text>
                </View>
            </View>
            <Text style = {styles.text_overview}>Overview: {movie.overview}</Text>
            <Text style={styles.titleText}>User review: to be implemented</Text>
        </View>

    )
}