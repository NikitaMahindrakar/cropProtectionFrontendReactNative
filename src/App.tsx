import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ImageBackground, Image} from 'react-native';

import {Button, AlertContainer, Title, SplashScreen} from './components';

const LOGO_IMG = Image.resolveAssetSource(require('./images/logo.png')).uri;
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {StackNavigationProp, createStackNavigator} from '@react-navigation/stack';

import Upload from './screens/image_upload';
import Video from './screens/camera';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
export type RootStackParamList = {
  Upload: undefined;
  Video: undefined;

};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Upload"
        component={Upload}
      />
      <Stack.Screen
        name="Video"
        component={Video}
      />
    </Stack.Navigator>
    </NavigationContainer>
  );
};

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Upload'>;
type ScreenProp = StackNavigationProp<RootStackParamList, 'Video'>;
const App: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigation = useNavigation<homeScreenProp>();
  const navigation1 = useNavigation<ScreenProp>();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={{
        uri: LOGO_IMG,
      }}
      style={styles.backgroundImage}>
      <Title />
      <AlertContainer />

      <View style={styles.buttonContainer}>
        <Button text="Start Monitoring" 
          onPress={() => navigation.navigate('Upload')}/>
        <Button text="View Reports" onPress={() => navigation1.navigate('Video')} />
      </View>

      <View>{isVisible && <SplashScreen />}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    display: 'flex',
    gap: 20,
  },
});

export default App;