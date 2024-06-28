import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { useState } from 'react';
import { options } from '../MyContext/ConstantContext';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

export function ScreenGenre({ genreid, name }) {
    const navigation = useNavigation()
    const [data, setData] = useState(null);
    const handlePress = () => navigation.navigate('MovieGenre', { genre: genreid });

    async function getMovie(genre_ids) {
        try {
            let url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&with_genres=${genre_ids}`;
            let response = await fetch(url, options);
            let data = await response.json();
            setData('https://image.tmdb.org/t/p/original' + data.results[0].poster_path);

        } catch (err) {
            console.log(err);
        }
    };

    getMovie(genreid);


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
