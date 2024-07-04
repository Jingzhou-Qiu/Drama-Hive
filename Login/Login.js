import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import SignUpPage from './Signup';
import Navigation from '../Navigation';
import { NavigationContainer, useNavigation } from '@react-navigation/native';


const Stack = createNativeStackNavigator();
const LoginNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Login' component={LoginPage} />
                <Stack.Screen name='Signup' component={SignUpPage} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const LoginPage = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = (method) => {
        // Implement login logic here
        console.log(`Logging in with ${method}`);
        console.log('Phone:', phoneNumber);
        console.log('Password:', password);
    };

    const handleSignUp = () => {
        navigation.navigate("Signup");
        console.log('Navigate to Sign Up page');
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

                <TouchableOpacity
                    style={[styles.button, styles.primaryButton]}
                    onPress={() => handleLogin('primary')}
                >
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={handleSignUp}>
                    <Text style={styles.signUpText}>
                        Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
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
export { LoginNavigator };