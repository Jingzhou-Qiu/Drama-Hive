import React, { useState, createContext, useEffect } from 'react';
import { options } from './ConstantContext';

export const TVGenreContext = createContext(null);

export default function TVGenreProvider({ children }) {
    const [tvGenreMap, setTVGenre] = useState(null)

    async function fetchTVGenres() {
        try {
            const response = await fetch('https://api.themoviedb.org/3/genre/tv/list?language=en', options);
            const data = await response.json();

            const map = new Array();
            data.genres.forEach((element) => {
                map.push([element.id, element.name]);
            });

            setTVGenre(map);
        } catch (err) {
            console.error('Error fetching TV genres:', err);
        }
    }

    useEffect(() => {
        fetchTVGenres();
    }, []);

    return (
        <TVGenreContext.Provider value={tvGenreMap}>
            {children}
        </TVGenreContext.Provider>
    );
}