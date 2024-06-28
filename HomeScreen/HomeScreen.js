import { Text, View, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { GenreContext } from '../MyContext/GenreContext';
import { useContext, useState } from 'react';
import { styles } from './styles';
import { ScreenGenre } from './ScreenGenre';
import { MovieByUrl } from './MovieByUrl';
import { screenStyle } from '../MyContext/ConstantContext';


renderstyle = StyleSheet.create({
    container:
    {
        flexDirection: "row",
        flexWrap: 'wrap',
    },
    textInput: {
        marginTop: 8,
        marginLeft: 30,
        marginBottom: 5,
        width: 300,
        height: 30,
        backgroundColor: "#e4e7e5",
        borderRadius: 10,
        paddingLeft: 10,
    },
})


const RenderGenre = ({ data }) => {

    if (data != null) {
        return (
            <View style={renderstyle.container}>
                {data.map((ele, index) => <ScreenGenre genreid={ele[0]} name={ele[1]} key={index} />)}
            </View>
        )
    }

}

export default function HomeScreen({ navigation }) {
    const genreMap = useContext(GenreContext)
    const[input, setInput] = useState('')

    const[nowPlaying, setnowPlaying] = useState(true)
    const[Upcoming, setUpcoming] = useState(false)
    const[Popular, setPopular] = useState(true)
    const[Toprated, setToprated] = useState(false)

    const [currUrl, setUrl] = useState('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=2')
    const [currUrl2, setUrl2] = useState('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1')

    
    const search = () =>{
        navigation.navigate("SearchScene", input)
    }

    const textStyles = StyleSheet.create({
        featureText: {
            fontStyle: 'Roboto',
            paddingTop: 10,
            paddingLeft: 8,
            paddingBottom: 4,
            color: 'black',
            fontWeight: '500',
            fontSize: 20,
        },
        featureTextNowPlaying: {
            fontStyle: 'Roboto',
            paddingTop: 10,
            paddingLeft: 8,
            paddingBottom: 4,
            color: nowPlaying? 'black':'grey',
            fontWeight: '500',
            fontSize: 20,
        },
        featureTextUpcoming: {
            fontStyle: 'Roboto',
            paddingTop: 10,
            paddingLeft: 8,
            paddingBottom: 4,
            color: Upcoming? 'black':'grey',
            fontWeight: '500',
            fontSize: 20,
        },
        featureTextPopular: {
            fontStyle: 'Roboto',
            paddingTop: 10,
            paddingLeft: 8,
            paddingBottom: 4,
            color: Popular? 'black':'grey',
            fontWeight: '500',
            fontSize: 20,
        },
        featureTextTop: {
            fontStyle: 'Roboto',
            paddingTop: 10,
            paddingLeft: 8,
            paddingBottom: 4,
            color: Toprated? 'black':'grey',
            fontWeight: '500',
            fontSize: 20,
        },

    })


    return (
        <View style = {screenStyle.container}>
            <TextInput placeholder="Explore" style={renderstyle.textInput} onChangeText ={(text) => setInput(text)} onSubmitEditing = {search} value = {input}/>
            <ScrollView>
                <View style={styles.textContiner}>
                    <TouchableOpacity onPress={() => {
                        setnowPlaying(true)
                        setUpcoming(false)
                        setUrl('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=2')
                    }}>
                        <Text style={textStyles.featureTextNowPlaying}> Now Playing</Text>
                    </TouchableOpacity>
                    <Text style={textStyles.featureText} >|</Text>
                    <TouchableOpacity onPress={() => {
                        setnowPlaying(false)
                        setUpcoming(true)
                        setUrl('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=2')
                    }}>
                        <Text style={textStyles.featureTextUpcoming}> Upcoming </Text>
                    </TouchableOpacity>
                </View>
                <MovieByUrl url={currUrl} />

                <View style={styles.textContiner}>
                    <TouchableOpacity onPress={() => {
                        setPopular(true)
                        setToprated(false)
                        setUrl2('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1')
                    }}>
                        <Text style={textStyles.featureTextPopular}> Popular </Text>
                    </TouchableOpacity>
                    <Text style={textStyles.featureText} >|</Text>
                    <TouchableOpacity onPress={() => {
                         setPopular(false)
                         setToprated(true)
                        setUrl2('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1')
                    }}>
                        <Text style={textStyles.featureTextTop}> Top Rated </Text>
                    </TouchableOpacity>
                </View>
                <MovieByUrl url={currUrl2} />

                <View style={styles.bigContainer}>
                    <RenderGenre data={genreMap} />
                </View>
            </ScrollView>
        </View>
    )

}

