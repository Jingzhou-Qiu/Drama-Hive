import * as Facebook from 'expo-auth-session/providers/facebook';
import { useEffect, useState } from 'react';
import { Button, View, Text } from 'react-native';
import { screenStyle } from './MyContext/ConstantContext';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import { useNavigation } from '@react-navigation/native';
import * as AuthSession from 'expo-auth-session';
import Navigation from './Navigation';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: '207380752470492',
    redirectUri: makeRedirectUri({
      scheme: 'DramaHive',
    }),
})


  useEffect(() => {
    if (response?.type === 'success') {
      (async () => {
        const userInfoResponse = await fetch(`https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,name,picture.type(large)`);
        const userInfo = await userInfoResponse.json();
        setUserInfo(userInfo);
      })();
    }
  }, [response]);

  return (
    // <View style={screenStyle.container}>
    //   <Button
    //     disabled={!request}
    //     onPress={() => {
    //       promptAsync();
    //     }}
    //     title="Login with Facebook"
    //   />
    //   {userInfo && (
    //     <View>
    //       <Text>Welcome, {userInfo.name}</Text>
    //       <Image source={{ uri: userInfo.picture.data.url }} style={{ width: 100, height: 100 }} />
    //     </View>
    //   )}
    // </View>
    <Navigation/>
  );
}