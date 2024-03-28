import React, {useEffect, useState, useRef} from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, Image, Text,ImageBackground, FlatList, Animated } from 'react-native';
import TrackPlayer, {Capability, Event, RepeatMode, State, usePlaybackState, useProgress, useTrackPlayerEvents} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import songs from '../model/Data';





const {width, height} = Dimensions.get('window')

const setUpPlayer = async () => {
  try{
    await TrackPlayer.setupPlayer()
    await TrackPlayer.add(songs);
  }catch(e){  
    console.log(e);
    }
};   


const togglePlayBack = async playBackState => {
  const currentTrack = await TrackPlayer.getActiveTrack();
  if (currentTrack != null){
    if(playBackState == State.Paused){
      await TrackPlayer.play();
    } else{
      await TrackPlayer.pause();
    }
  }
};




const MusicPlayer = () => {
  const playBackState = usePlaybackState();
  const [songIndex, setSongIndex] = useState(0);

// custom references
const scrollX = useRef(new Animated.Value(0)).current;
const songSlider = useRef(null); //FlatList references

useEffect(() => {
  setUpPlayer();
scrollX.addListener(({value})  => {
// console.log('ScrollX : ${value} | Device Width : ${width}');
const index = Math.round(value / width);
  setSongIndex(index);
// console.log(index);
});
}, []);




const skipToNext = () => {
songSlider.current.scrollToOffset({
  offset: (songIndex + 1) * width,
});
};

const skipToPrevious = () => {
songSlider.current.scrollToOffset({
  offset: (songIndex - 1) * width,
});
};



  const renderSongs = ({item, index}) => {
  return(

      // {/* image */}

<Animated.View style={style.mainImageWrapper}>
    <View style={[style.imageWrapper, style.elevation]}>
<Image
source={item.artwork}
style={style.musicImage}
/>
    </View>
</Animated.View>


  );
};


  return (
 <ImageBackground
      blurRadius={30}
      source={require('../assets/img/univas.jpeg')}
      style={style.backgroundImage}> 

    
    
<SafeAreaView style ={style.container}>
    <View style = {style.maincontainer}>



    
      <Animated.FlatList
      ref={songSlider}
      renderItem={renderSongs}
      data={songs}
      keyExtractor={item => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator ={false}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [
          {
            nativeEvent :{
              contentOffset :{x:scrollX},
            },
          },
        ],
        {useNativeDriver:true},
      )}
  
      />




      {/* song content */}
      <View style={style.songContainer}>

<View> 
      <Text style={[style.songContent, style.songTitle]}>{songs[songIndex].title}</Text>
      <Text style={[style.songContent, style.songArtist]}>{songs[songIndex].artist}</Text>
      </View>

  <TouchableOpacity onPress={()=> {}}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#ffff" style={style.ellipsis} width ="100%" />
      </TouchableOpacity>


      </View>


      {/* slider */}
<View>
<Slider
style={style.progressBar}
value={10}
  minimumValue={0}
  maximumValue={100}
  thumbTintColor="transparent"
  minimumTrackTintColor="#ffffff"
  maximumTrackTintColor="#000000"
  onSlidingComplete={() => {}}
/>

{/* progress duration */}
<View style={style.progressLevelDuration}>
  <Text style={style.progressLabelText}>00:00 </Text>
  <Text style={style.progressLabelText}>00:00 </Text>
</View>

</View>

      {/* music controls */}
      <View style={style.musicControlsContainer}>
  <TouchableOpacity onPress={skipToPrevious}>
          <Ionicons name="play-skip-back" size={30} color="#ffff"/>
      </TouchableOpacity>

 
        <TouchableOpacity onPress={()=>  togglePlayBack (playBackState)}>
          <Ionicons
           name={
        playBackState == State.Playing
            ? "pause-circle"
            : "play-circle"
          } 
          size={50} color="#ffff"/>
      </TouchableOpacity>

        <TouchableOpacity onPress={skipToNext}>
          <Ionicons name="play-skip-forward" size={30} color="#ffff"/>
      </TouchableOpacity>
      </View>
    </View>






    <View style ={style.bottomContainer}>
    <View style = {style.bottomIconWrapper}>
        <TouchableOpacity onPress={()=> {}}>
          <Ionicons name="share-social" size={30} color="#F76800"/>
      </TouchableOpacity>

        <TouchableOpacity onPress={()=> {}}>
          <Ionicons name="repeat" size={30} color="#F76800"/>
      </TouchableOpacity>

        <TouchableOpacity onPress={()=> {}}>
          <Ionicons name="list" size={30} color="#F76800"/>
      </TouchableOpacity>

    
    </View>
  

    </View>
  
    
</SafeAreaView>
  </ImageBackground>

  );
};

export default MusicPlayer;






const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#00000099%',
  },

  maincontainer: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
      // backgroundColor:'#00000090',
  },

  bottomContainer: {
    width: 'width',
    alignItems: 'center',
   paddingVertical: 15,
  //  borderTopColor: '#393E46',
  //  borderWidth: 1,
  },

  bottomIconWrapper: {
flexDirection: 'row',
justifyContent: 'space-between',
width: '80%',
  },


  mainImageWrapper:{
width: width,
justifyContent: 'center',
alignItems: 'center',
  },

  imageWrapper: {
    width: 290,
  height: 400,
  marginBottom: 25,
  top:-15,
  },

  musicImage: {
    width: '100%',
    height: '100%',
    borderBottomRightRadius: 150,
      borderBottomLeftRadius: 150,

  },

  elevation: {
    elevation:50,

    shadowColor: '#ccc',
    shadowOffset: {
      width:5,
      height:5,
    },
    shadowOpacity:0.5,
    shadowRadius:3.84
  },

// playerArea:{
//   top:-50,
//   // position: 'absolute',
// },

  songContainer: {
  flexDirection:'row',
  justifyContent: 'space-between',
  width:'77%',
  // marginTop:'-10%',
  paddingBottom:'8%'
},

ellipsis: {
  backgroundColor:'#D9D9D920',
  padding:5,
  borderRadius:100,
},


songContent:{
  textAlign: 'left',
    color: '#EEEEEE',
},

  songTitle: {
    fontSize:18,
    fontWeight:'600',
    color:'#F76800',
  
  },

  songArtist: {
    fontSize:16,
    fontWeight:'600',
  
  },

progressBar:{
  width: 350,
  height:15,



},

progressLevelDuration:{
  width:320,
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  alignContent:'center',
  marginLeft:18,

},
progressLabelText:{
  color:'#ffff',
  fontWeight:'500',
}, 

musicControlsContainer:{
  flexDirection:'row',
  alignItems:'center',
  alignContent:'center',
  justifyContent:'space-between',
  width:'60%',
  
},
backgroundImage:{
  objectFit: 'cover',
  height: '100%'
}




});