import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { useState, useEffect } from 'react';
import { options } from '../MyContext/ConstantContext';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../MovieHomeScreen/styles';

export default function TVScreenGenre({ genreid, name }) {
    const navigation = useNavigation();
    const [data, setData] = useState(null);

    const handlePress = () => navigation.navigate('TVGenre', { genre: genreid });

    async function getTVShow(genre_ids) {
        try {
            let url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&sort_by=popularity.desc&with_genres=${genre_ids}`;
            let response = await fetch(url, options);
            let data = await response.json();
            setData('https://image.tmdb.org/t/p/original' + data.results[0].poster_path);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getTVShow(genreid);
    }, [genreid]);

    return (
        <TouchableOpacity onPress={handlePress} style={styles.touchableOpacity}>
            <View style={styles.container}>
                <ImageBackground source={{ uri: data }} style={styles.imageBackground} resizeMode="cover">
                    <Text style={styles.text}>{name}</Text>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    );
}


