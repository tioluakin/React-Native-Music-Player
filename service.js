import TrackPlayer from "react-native-track-player"





// const { default: TrackPlayer } = require("react-native-track-player")

// service.js
module.exports = async function() {
TrackPlayer.addEventListener('remote-play', () => TrackPlayer);
TrackPlayer.addEventListener('remote-pause', () => TrackPlayer);
TrackPlayer.addEventListener('remote-stop', () => TrackPlayer);
};