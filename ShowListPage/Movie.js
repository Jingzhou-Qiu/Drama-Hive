import {StyleSheet, Text, View, Image} from 'react-native';


const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        flexDirection: "column",
        width: 110,
        height: 185,
        borderWidth: 4,
        borderColor: '#20232a',
        alignItems: 'center',


    },
    poster:{
        resizeMode: 'cover',
        width: 97.2,
        height: 144,
        borderRadius: 20,
    },

    text:{
        textAlign: 'left',
        paddingTop: 3,
        textAlignVertical: 'center',
        fontFamily: 'Arial',
        fontSize: 12,
        fontWeight:'500'

    }

})
export default function Movie({movie}){
    formatTitle = (title) =>{
        if(title.length <= 24){
            return title
        }else{
            return title.substring(0, 21) + '...';
        }
    }

    const baseUrl = 'https://image.tmdb.org/t/p/original'
    const imageUrl = baseUrl + movie.poster_path
    console.log(imageUrl)
    let title = formatTitle(movie.title)
    
    return(
        <View style = {styles.container}>
            <Image source = {{uri: imageUrl}} style = {styles.poster}/>
            <Text style = {styles.text}>{title}</Text>
        </View>
    
    )

}