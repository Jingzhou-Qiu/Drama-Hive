import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import Navigation from './Navigation'
import UserContext from './MyContext/UserContext';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { createContext } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyDXExwRQk28MWaI9jtIoYHLvGRaYlRSN-E",
  authDomain: "dramahive-2d5f7.firebaseapp.com",
  projectId: "dramahive-2d5f7",
  storageBucket: "dramahive-2d5f7.appspot.com",
  messagingSenderId: "167741254400",
  appId: "1:167741254400:web:17368d2d5364085bb3a1e5",
  measurementId: "G-HSH5C1LV69"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);


const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ auth, firestore, storage }}>
      {children}
    </FirebaseContext.Provider>
  );
};


export default function App() {
  const [isLogin, setLogin] = useState(false)
  const [userId, setUserId] = useState("")

  if (isLogin) {
    return (
      <FirebaseProvider>
        <UserContext.Provider value={userId}>
          <Navigation />
        </UserContext.Provider>
      </FirebaseProvider>
    );
  }
  else {
    return <LoginScreen setLogin={setLogin} setUserId={setUserId} />
  }
}


function LoginScreen({ setUserId, setLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'user' && password === 'password') {
      setLogin(true)
      setUserId(username)
    } else {
      Alert.alert('Error', 'Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
