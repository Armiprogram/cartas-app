
import 'react-native-gesture-handler';
import {  View } from 'react-native';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { PaperProvider } from 'react-native-paper';
import { LoginScreen } from './src/screens/LoginScreen';
import { NavigationContainer, NavigationContainerRefContext } from '@react-navigation/native';
import { StackNavigator } from './navigator/StackNavigator';


export default function App() {
  return (
    <NavigationContainer>
    <PaperProvider>
    <StackNavigator/>
          
    </PaperProvider>
    </NavigationContainer>
  );
}


