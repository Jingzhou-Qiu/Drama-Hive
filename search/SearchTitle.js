import { Text, ScrollView } from "react-native"
import { screenStyle, options } from "../MyContext/ConstantContext"
import { useEffect, useState } from "react"
import MoviePre2 from "../Movie/MoviePre2"


export default function SearchTitle({route}) {

    const [display, setDisplay] = useState([])
    const data = route.params;
    temp = new Array()

    async function fetchData(title) {
        const url = `https://api.themoviedb.org/3/search/multi?query=${title}&include_adult=false&language=en-US&page=1`
        rs = await fetch(url, options).then(rs => rs.json()).then(rs => rs.results)
        for (let i = 0; i < rs.length; i++) {
            if (rs[i]?.original_title == title || rs[i]?.name == title || rs[i]?.original_name == title) {
                let movie = {
                    title: rs[i].original_title,
                    genre_ids: rs[i].genre_ids,
                    overview: rs[i].overview,
                    poster_path: rs[i].poster_path,
                    vote_average: rs[i].vote_average,
                    lan: rs[i].original_language,
                    release_date: rs[i].release_date,
                    id: rs[i].id
                }
                temp.push(movie)
            }
        }
    }

    async function fetchAll() {
        for (let i = 0; i < data.length; i++) {
            await fetchData(data[i])
        }
    }
    
    useEffect(() => {
        fetchAll().then(()=>setDisplay(temp))
    }, [])


    return (
        <ScrollView style={screenStyle.container}>
            {display.map((item) => <MoviePre2 movie={item} key={item.id} />)}
        </ScrollView>
    )
}



