
export const formatTrack = (track) => ({
  id: track.id,
  title: track.title,
  artists: track.artists.map(artist => artist.name),
  art: track.album.art_src,
  audio_src: track.audio_src,
})
