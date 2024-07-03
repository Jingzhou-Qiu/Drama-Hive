import React, { useRef, useState } from 'react';
import { TouchableOpacity, Text, TextInput, View, Alert} from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import Constants from 'expo-constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { getAuth, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from "firebase/auth";

import { initializeApp } from 'firebase/app';
import '@firebase/auth';

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

const auth = getAuth();


export default App = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const recaptchaVerifier = useRef(null);
  const auth = getAuth(app);

  const sendVerification = () => {
    signInWithPhoneNumber(auth, "+1 "+phoneNumber, recaptchaVerifier.current)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      console.log(confirmationResult)
      setConfirm(confirmationResult);
      // ...
    }).catch((error) => {
      console.log("error:",error)
    });
  };

  // async function sendVerification() {
  //   const confirmation = await signInWithPhoneNumber(phoneNumber);
  //   setConfirm(confirmation);
  // }

  // const confirmCode = () => {
  //   const credential = PhoneAuthProvider.credential(
  //     verificationId,
  //     code
  //   );
    
  // signInWithCredential(credential)
  //     .then((result) => {
  //       console.log(result);
  //     });
  // };

  async function confirmCode() {
    try {
      rs = await confirm.confirm(code);
      Alert.alert("sign in")
      console.log(rs)
    } catch (error) {
      console.log('Invalid code.'+ error);
    }
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />
        <TextInput
          placeholder="Phone Number"
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          autoCompleteType="tel"
          style={styles.textInput}
        />
        <TouchableOpacity
          style={styles.sendVerification}
          onPress={sendVerification}
        >
          <Text style={styles.buttonText}>Send Verification</Text>
        </TouchableOpacity>
        <TextInput
          placeholder="Confirmation Code"
          onChangeText={setCode}
          keyboardType="number-pad"
          style={styles.textInput}
        />
        <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
          <Text style={styles.buttonText}>Send Verification</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};