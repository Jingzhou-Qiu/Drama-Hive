import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    textContiner: {
        flexDirection: 'row',
        justifyContent: 'left',
    },
    featureContainer: {
        marginBottom: 0,
        marginLeft: 5,
    },
    featureText: {
        fontStyle: 'Roboto',
        paddingTop: 10,
        paddingLeft: 8,
        paddingBottom: 4,
        color: 'black',
        fontWeight: '500',
        fontSize: 20,
    },
    bigContainer: {
        marginLeft: 10,
        justifyContent: "space-around"
    },
    touchableOpacity: {
        width: 180,
        height: 180,
        marginRight: 10,
        borderRadius: 15,
        marginTop: 10,
        overflow: 'hidden',
    },
    container: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        opacity: 0.7,
    },
    text: {
        fontStyle: 'italic',
        paddingTop: 20,
        paddingLeft: 20,
        color: 'black',
        fontWeight: '500',
        fontSize: 25,
    }
});
