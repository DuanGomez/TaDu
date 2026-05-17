// =====================================================
// CONFIGURACIÓN DE LA CANCIÓN - EDITA AQUÍ
// =====================================================

export const SONG_CONFIG = {
  // Nombre de la persona (aparece en la pantalla de inicio)
  recipientName: 'Thaly',

  // Tu mensaje de amor (usa \n para saltos de línea)
  message: `Toda mi vida es mas linda cuando estas tu, quedate mucho tiempo mas.`,

  // YouTube video ID (solo el ID, no la URL completa)
  youtubeVideoId: '3EtBoBuf65M', // Una tarde juntos - Darviin

  // URL directa a la canción en Spotify
  spotifyUrl: 'https://open.spotify.com/track/1tWlTDVDM0JJVz5GhcQds1',

  // Letra sincronizada — time: segundos exactos desde el inicio del video
  lyrics: [
    { time: 0,   text: '' },
    // Verso 1 — intro instrumental termina al seg 19
    { time: 20,  text: '¿Qué culpa tengo?' },
    { time: 24,  text: 'Que mi dulce Dios quisiera' },
    { time: 28,  text: 'Hacer que tus ojos combinen tan bonito con los míos' },
    { time: 35,  text: '' },
    // Verso 2
    { time: 37,  text: 'Qué culpa tengo, que nuestra propia risa nos dé risa' },
    { time: 46,  text: 'Y cuando reímos, reímos y reímos, reímos y reímos' },
    { time: 53,  text: 'Te quiero mucho', isEasterEgg: true },
    // Pre-coro
    { time: 55,  text: 'Yo no sé qué te pones en los labios, corazón de melón' },
    { time: 64,  text: 'Que me saben a que quiero una eternidad con vos, sin más' },
    // Coro 1
    { time: 73,  text: 'Prendete el comal, vamos a cocinar' },
    { time: 77,  text: 'Yo el café y vos el pan, vivir bailando' },
    // Puente 1
    { time: 82,  text: 'Mi amor, quédate un rato más' },
    { time: 86,  text: 'Luego te iré a dejar a tu casa' },
    { time: 92,  text: 'No me importa caminar, no me importa caminar' },
    // Verso 3
    { time: 101, text: 'Yo siempre supe, que de una u otra forma serías la luz de mis días' },
    { time: 112, text: 'Razón de alegrías y el amor de mi vida' },
    // Puente 2
    { time: 117, text: 'Ay, pasan los días y agradezco a Dios' },
    { time: 126, text: 'Por darme tu vida, no faltan palabras entre los besos y cada caricia' },
    { time: 133, text: 'Te quiero cada dia mas', isEasterEgg: true },
    // Coro 2
    { time: 136, text: 'Yo no sé qué te pones en los labios, corazón de melón' },
    { time: 144, text: 'Que me saben a que quiero una eternidad con vos, sin más' },
    { time: 153, text: 'Prendete el comal, vamos a cocinar' },
    { time: 157, text: 'Yo el café y vos el pan, vivir bailando' },
    // Outro
    { time: 163, text: 'Mi amor, quédate un rato más' },
    { time: 167, text: 'Luego te iré a dejar a tu casa' },
    { time: 171, text: "(Quedate)"},
    { time: 174, text: 'Un ratito más, mi amor' },
    { time: 177, text: 'Hasta que caiga el sol' },
    { time: 180, text: "(Quedate)"},
    { time: 182, text: 'O siquiera hasta las 6 después de tomar café' },
    { time: 190, text: 'Te quiero mucho muchisisisisimooo', isEasterEgg: true },
    { time: 217, text: '' },
  ],
};
