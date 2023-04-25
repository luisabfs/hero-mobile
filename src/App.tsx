import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


function App(): JSX.Element {
  return (
    <NavigationContainer>
      <StatusBar />
    </NavigationContainer>
  );
}

export default App;
