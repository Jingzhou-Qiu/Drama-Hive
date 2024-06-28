import { View, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { options } from '../MyContext/ConstantContext';
import Movie from '../ShowListPage/Movie';
import { styles } from './styles';




async function fetchMoviebyUrl(url) {
    let data = await fetch(url, options).then(rs => rs.json());
    data = data.results.map((item) => {
        return movie = {
            title: item.title,
            genre_ids: item.genre_ids,
            overview: item.overview,
            poster_path: item.poster_path,
            vote_average: item.vote_average,
            lan: item.original_language,
            release_date: item.release_date,
            id: item.id
        };
    });
    return data;
}
;
export function MovieByUrl({ url, name }) {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetchMoviebyUrl(url).then((rs) => setData(rs));
    }, [url]);

    return (
        <View style={styles.featureContainer}>
            <FlatList horizontal data={data} renderItem={(item) => <Movie movie={item.item} />} />
        </View>
    );

}
