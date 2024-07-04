import { Text, ScrollView } from "react-native"
import { screenStyle, options } from "../MyContext/ConstantContext"
import { useEffect, useState } from "react"
import MoviePre2 from "../Movie/MoviePre2"
import TVPre2 from "../TVShows/TVPre2"


export default function SearchTitle({ route }) {
    const [renderItem, setRenderItem] = useState([])
    const data = route.params;
    allItem = []
    const fetchTV = async (title) => {
        rs = await fetch(`https://api.themoviedb.org/3/search/tv?query=${title}&include_adult=false&language=en-US&page=1`, options).then(rs => rs.json()).then(rs => rs.results)
        for (let i = 0; i < rs.length; i++) {
            if (rs[i].original_name == title || rs[i].name == title) {
                let tv = {
                    name: title,
                    genre_ids: rs[i].genre_ids,
                    overview: rs[i].overview,
                    poster_path: rs[i].poster_path,
                    vote_average: rs[i].vote_average,
                    original_language: rs[i].original_language,
                    first_air_date: rs[i].first_air_date,
                    id: rs[i].id
                }
                allItem = [...allItem, (<TVPre2 tvShow={tv} key={tv.id}/>)]

            }
        }
    }
    const fetchMovie = async (title) => {
        rs = await fetch(`https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`, options).then(rs => rs.json()).then(rs => rs.results)
        for (let i = 0; i < rs.length; i++) {
            if (rs[i].original_title == title || rs[i].title == title) {

                let movie = {
                    title: rs[i].title,
                    genre_ids: rs[i].genre_ids,
                    overview: rs[i].overview,
                    poster_path: rs[i].poster_path,
                    vote_average: rs[i].vote_average,
                    lan: rs[i].original_language,
                    release_date: rs[i].release_date,
                    id: rs[i].id
                }
                allItem = [...allItem, (<MoviePre2 movie={movie} key={movie.id}/>)]
                break
            }
        }
    }
    const renderAll = async () => {
        for (let j = 0; j < data.length; j++) {
            if (data[j].type == 'tv') {
                await fetchTV(data[j].title)
            }else{
                await fetchMovie(data[j].title)
            }
        }
        return allItem
    }
    useEffect(() => { renderAll().then(rs => setRenderItem(allItem)) }, [])

    return (
        <ScrollView style={screenStyle.container}>
            {renderItem}
        </ScrollView>
    )
}



