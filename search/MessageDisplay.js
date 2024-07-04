import React, { useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const MessageBubble = React.memo(({ item, isMe, showAvatar, onPress }) => (
  <TouchableOpacity 
    style={[
      styles.messageBubble, 
      isMe ? styles.sentMessage : styles.receivedMessage,
      !showAvatar && !isMe && styles.noAvatarMargin
    ]} 
    onPress={onPress}
  >
    <Text style={[styles.messageText, isMe && styles.sentMessageText]}>{item.text}</Text>
  </TouchableOpacity>
));

const MessageDisplay = ({ messages }) => {
  const navigation = useNavigation();

  const gotoMoviePage = useCallback((titles) => {
    navigation.navigate("SearchTitle", titles);
  }, [navigation]);

  const renderMessage = useCallback(({ item, index }) => {
    const isMe = item.sender === "me";
    const showAvatar = index === messages.length - 1 || messages[index + 1].sender !== item.sender;

    return (
      <View style={[styles.messageRow, isMe ? styles.sentRow : styles.receivedRow]}>
        {!isMe && showAvatar && (
          <View style={styles.avatar}>
            <Icon name="chatbubble-ellipses" size={24} color="#007AFF" />
          </View>
        )}
        <MessageBubble 
          item={item}
          isMe={isMe}
          showAvatar={showAvatar}
          onPress={() => !isMe && gotoMoviePage(item.info)}
        />
      </View>
    );
  }, [messages, gotoMoviePage]);

  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <SafeAreaView style={styles.container}>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContainer}
          initialNumToRender={15}
          maxToRenderPerBatch={10}
          windowSize={10}
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  sentRow: {
    justifyContent: 'flex-end',
  },
  receivedRow: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 20,
  },
  sentMessage: {
    backgroundColor: 'rgba(0, 122, 255, 0.9)',
    borderBottomRightRadius: 4,
  },
  receivedMessage: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderBottomLeftRadius: 4,
  },
  noAvatarMargin: {
    marginLeft: 44,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  sentMessageText: {
    color: '#FFFFFF',
  },
});

export default React.memo(MessageDisplay);