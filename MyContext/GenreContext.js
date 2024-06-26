
import React, { useState, createContext, useEffect } from 'react';
import { options } from '../App'


export const GenreContext = createContext(null);



export default function GenreProvider({ children }) {
    const [genreMap, setGenre] = useState(null)

    async function fetchGenre() {
        map = new Array()
        let rs = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
            .then(response => response.json())
            .catch(err => console.error(err));

        rs.genres.map((element) => {
            map.push([element.id, element.name])
        })
        setGenre(map)
        return genreMap
    }

    useEffect(() => {
        fetchGenre()
    },[])


    return (
        <GenreContext.Provider value = {genreMap}  >
            {children}
        </GenreContext.Provider>

    )
}