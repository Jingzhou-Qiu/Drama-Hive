import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';


const MessageDisplay = ({ messages }) => {
  const navigation = useNavigation()


  const gotoMoviePage = (titles) => {
    navigation.navigate("SearchTitle", titles)
  }


  const renderMessage = ({ item }) => {
    if (item.sender === "me") {
      return (
        <View style={[styles.messageBubble, styles.sentMessage]}>
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
      );
    } else {
      return (
        <TouchableOpacity style={[styles.messageBubble, styles.receivedMessage]} onPress={()=>gotoMoviePage(item.movieTitle)}>
          <Text style={styles.messageText}>{item.text}</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <FlatList
      data={messages}
      renderItem={renderMessage}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  messageText: {
    fontSize: 16,
  },
});

export default MessageDisplay;