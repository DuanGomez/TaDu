// =====================================================
// CONFIGURACIÓN DE LA CANCIÓN - EDITA AQUÍ
// =====================================================

export const SONG_CONFIG = {
  recipientName: 'Thaly',

  message: `Amarte es el sentimiento más bonito q tengo en estos momentos, cuando estoy contigo me siento como en un campo tranquilo lleno de flores, al estar a tu lado percibo el calor de tu amor y cuando hay un mínimo roce entre nosotros puedo experimentar todo el amor q existe en una sola persona. Estoy muy agradecido de poder compartir tantos bellos momentos contigo y estoy seguro de q te volvería a elegir una y mil veces.`,

  // YouTube: video ID, segundo de inicio y fin del clip
  youtubeVideoId: 'qNHcVevz7wo',
  youtubeStart:   54,
  youtubeEnd:     108,

  spotifyUrl: 'https://open.spotify.com/playlist/7bBmdv0eAI0f1R0346eDWr?si=21bbb4c5e9674172',

  // Letra — times son tiempos ABSOLUTOS del video (segundos del clip + 54)
  lyrics: [
    { time: 0,   text: '' },          // antes de que empiece el clip
    { time: 56,  text: 'No creo que nadie' },
    { time: 58,  text: 'Se sienta como yo me siento' },
    { time: 60,  text: 'Por ti ahora' },
    { time: 63,  text: 'Te quiero muchito', isEasterEgg: true },
    { time: 66,  text: 'Y todos los caminos que te llevaron allí fueron sinuosos' },
    { time: 72,  text: 'Y todas las luces que iluminan el camino se estaban apagando' },
    { time: 78,  text: 'Hay muchas cosas que me gustaría decirte' },
    { time: 82,  text: 'Pero no sé cómo' },
    { time: 88,  text: 'Porque tal vez' },
    { time: 93,  text: 'Vas a ser la única que me salve' },
    { time: 98,  text: 'Y después de todo' },
    { time: 103, text: "You're my wonderwall" },
    { time: 107,  text: 'Te quiero muchísimo', isEasterEgg: true }
  ],
};
