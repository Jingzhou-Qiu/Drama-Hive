import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SignUpPage from './Signup';
import { NavigationContainer } from '@react-navigation/native';
import SetupAccountPage from './SetUserName';
import Navigation from '../Navigation';
import { UserProvider } from '../MyContext/UserContext';
import { LoginPage } from './Login';
import UserScreen from '../User/UserScreen';
import SingleMoviePage from '../Movie/SingleMoviePage';
import SingleTVPage from '../TVShows/SingleTVPage';
import UpdateReview from '../User/UpdateReview';
import ForgotPasswordPage from './ForgotPassword';


export const Stack = createNativeStackNavigator();
export default LoginNavigator = () => {
    return (
        <UserProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name='Login' component={LoginPage} />
                    <Stack.Screen name='Signup' component={SignUpPage} />
                    <Stack.Screen name='SetupAccountPage' component={SetupAccountPage} />
                    <Stack.Screen name="Home" component={Navigation} />
                    <Stack.Screen name="userPage" component={UserScreen} />
                    <Stack.Screen name="movie" component={SingleMoviePage} />
                    <Stack.Screen name="tv" component={SingleTVPage} />
                    <Stack.Screen name="updateReview" component={UpdateReview} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPasswordPage} />
                </Stack.Navigator>
            </NavigationContainer>
        </UserProvider>
    );
};
