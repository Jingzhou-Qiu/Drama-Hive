import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserContext from '../MyContext/UserContext';

const Star = ({ filled, onPress, size }) => (
    <TouchableOpacity onPress={onPress} style={styles.starButton}>
        <Icon
            name={filled ? 'star' : 'star-o'}
            size={size}
            color={filled ? 'gold' : 'lightgray'}
        />
    </TouchableOpacity>
);


const WriteReview = () => {
    const [selectedOption, setSelectedOption] = useState('Watched');
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const user = useContext(UserContext)
    const handleStarPress = (selectedRating) => {
        setRating(selectedRating);
    };
    const submit = () => {
        console.log(user)
        console.log(rating)
        console.log(review)

    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity><Text style={styles.cancelButton}>Cancel</Text></TouchableOpacity>
                <TouchableOpacity onPress={submit}><Text style={styles.confirmButton}>Confirm</Text></TouchableOpacity>
            </View>

            <View style={styles.segmentedControl}>
                <TouchableOpacity style={selectedOption === 'Want to watch' ? styles.selectedSegment : styles.segment}>
                    <Text>Want to watch</Text>
                </TouchableOpacity>
                <TouchableOpacity style={selectedOption === 'Watched' ? styles.selectedSegment : styles.segment}>
                    <Text>Watched</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.starRating}>
                <Text style={styles.ratingLabel}>Tap to rate:</Text>
                <View style={styles.starContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            filled={star <= rating}
                            onPress={() => handleStarPress(star)}
                            size={30}
                        />
                    ))}
                </View>
            </View>

            <TextInput
                style={styles.reviewInput}
                placeholder="Write a few words for your review..."
                multiline
                value={review}
                onChangeText={setReview}
                borderR
            />

        </View>
    );
};

const styles = StyleSheet.create({
    starButton: {
        padding: 3, 
      },
    container: {
        flex: 1,
        padding: 20,
        marginTop: 0,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        marginTop: 35,
    },
    cancelButton: {
        color: 'black',
    },
    confirmButton: {
        color: 'orange',
    },
    segmentedControl: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    segment: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    selectedSegment: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'black',
    },
    starRating: {
        marginBottom: 20,
        justifyContent:"center"
    },
    starContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      ratingLabel: {
        fontSize: 16,
        marginBottom: 10,
        color: '#888',
      },
    reviewInput: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        borderRadius: 10,
    },
});

export default WriteReview;