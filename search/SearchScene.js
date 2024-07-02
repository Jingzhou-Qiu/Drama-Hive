import { options } from '../MyContext/ConstantContext'
import { useState, useEffect } from "react"
import MoviePre2 from "../Movie/MoviePre2"
import { ScrollView } from "react-native"
import { screenStyle } from '../MyContext/ConstantContext'
import TVShowPre from '../TVShows/TVPre2'


function handleData(data) {
    rs = new Array()
    if (data != null) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].media_type == "movie") {
                let movie = {
                    title: data[i].original_title,
                    genre_ids: data[i].genres,
                    overview: data[i].overview,
                    poster_path: data[i].poster_path,
                    vote_average: data[i].vote_average,
                    lan: data[i].original_language,
                    release_date: data[i].release_date,
                    id: data[i].id
                }
                rs.push(
                    <MoviePre2 movie={movie} key = {movie.id}/>
                )
            }
            else if(data[i].media_type == "tv"){
                let tv = {
                    name: data[i].name,
                    genre_ids: data[i].genre_ids,
                    overview: data[i].overview,
                    poster_path: data[i].poster_path,
                    vote_average: data[i].vote_average,
                    lan: data[i].original_language,
                    release_date: data[i].release_date,
                    id: data[i].id
                }
                rs.push(
                    <TVShowPre tvShow={tv} key={tv.id}/>
                )
            }
        
        }
    }
    return rs
}


export default function SearchScene({ route }) {
    const [data, setData] = useState(null)
    const url = `https://api.themoviedb.org/3/search/multi?query=${route.params}&include_adult=false&language=en-US&page=1`;
    async function fetchData(url) {
        rs = await fetch(url, options).then(rs => rs.json())
        setData(rs.results)
    }
    useEffect(() => { fetchData(url) }, [])

    rs = handleData(data)

    return(
        <ScrollView style = {screenStyle.container} >{rs}</ScrollView>
    )

}