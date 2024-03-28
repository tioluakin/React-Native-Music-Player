import { View, StyleSheet} from 'react-native';
import React from 'react';
import Hero from './screens/Hero';
import  MusicPlayer from './screens/MusicPlayer';
import { StatusBar } from 'react-native';

const App = () => {
  return (
    <View style = {style.container}>
      <StatusBar barStyle="light-content" />
          {/* <Hero/> */}
      <MusicPlayer/>

    </View>
  );
};

export default App;


const style = StyleSheet.create({
  container: {
    flex:1
  },
});