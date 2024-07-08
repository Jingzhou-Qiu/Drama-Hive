import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SignUpPage from './Signup';
import { NavigationContainer } from '@react-navigation/native';
import Confirmation from './Confirmation';
import SetupAccountPage from './SetUserName';
import Navigation from '../Navigation';
import { UserProvider } from '../MyContext/UserContext';
import { LoginPage } from './Login';
import UserScreen from '../User/UserScreen';



export const Stack = createNativeStackNavigator();
export default LoginNavigator = () => {
    return (
        <UserProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='Login' component={LoginPage} />
                    <Stack.Screen name='Signup' component={SignUpPage} />
                    <Stack.Screen name='Confirmation' component={Confirmation} />
                    <Stack.Screen name='SetupAccountPage' component={SetupAccountPage} />
                    <Stack.Screen name="Home" component={Navigation} />
                    <Stack.Screen name="userPage" component={UserScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </UserProvider>
    );
};
