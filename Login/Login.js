import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDataWithFilter } from '../MyContext/Firebase';
import UserContext from '../MyContext/UserContext';
import { CommonActions } from '@react-navigation/native';


export const LoginPage = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigation();
    const myContext = useContext(UserContext);
    const contextChangePhoneNumber = myContext.setPhoneNumber;
    const contextChangeUser = myContext.setUser;


    const resetToInitialRoute = () => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Home' }, 
            ],
          })
        );
      };

    

    const handleLogin = async () => {
        try {
            const rs = await getDataWithFilter("UserInfo", "phoneNumber", "==", phoneNumber);
            if (rs.length === 0) {
                setError("Phone number not found");
            } else if (rs[0].password !== password) {
                setError("Incorrect password");
            } else {
                contextChangePhoneNumber(phoneNumber)
                contextChangeUser(rs[0].username)
                resetToInitialRoute()
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("An error occurred. Please try again.");
        }
    };

    const handleSignUp = () => {
        navigation.navigate("Signup");
    };

    const handleContinueWithoutLogin = () => {
        resetToInitialRoute()
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.formContainer}>
                <Text style={styles.title}>Welcome Back</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TouchableOpacity
                    style={[styles.button, styles.primaryButton]}
                    onPress={handleLogin}
                >
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSignUp}>
                    <Text style={styles.signUpText}>
                        Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleContinueWithoutLogin}>
                    <Text style={styles.continueWithoutLoginText}>
                        Continue without Login
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    continueWithoutLoginText: {
        textAlign: 'center',
        color: '#007AFF',
        marginTop: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    button: {
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 15,
    },
    primaryButton: {
        backgroundColor: '#007AFF',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signUpText: {
        textAlign: 'center',
    },
    signUpLink: {
        color: '#007AFF',
        fontWeight: 'bold',
    },
});

export default LoginPage;
