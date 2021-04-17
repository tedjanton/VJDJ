

export const formatTrack = (track) => ({
  id: track.id,
  title: track.title,
  artists: track.artists.map(artist => artist.name),
  art: track.album.art_src,
  audio_src: track.audio_src,
});

export const playlistImageBuilder = (playlist) => {
  let imgs = [];
  if (playlist.tracks) {
    for (let i = 0; i < playlist.tracks.length; i++) {
      imgs.push(playlist.tracks[i].track.album.art_src);
    }
  }

  return imgs.filter((_img, i) => i < 4);
}

export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

export const handleQueue = (
  trackList,
  index,
  trackRef,
  setTrackIdx,
  setTrackQueue,
  setIsPlaying,
  ) => {

  let formatted = trackList.map(track => formatTrack(track));
  trackRef.current = formatted[index];
  setTrackIdx(index);
  setTrackQueue(formatted);
  setIsPlaying(true);
};
