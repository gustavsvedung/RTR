document.addEventListener('DOMContentLoaded', function () {
    const playButton = document.getElementById('play-button');
    let player;
    let isPlaying = false;

    async function initializePlayer() {
        await Tone.start();
        console.log('Tone.js AudioContext started');
        player = new Tone.Player({
            url: 'one.ogg',
            loop: true,
            autostart: false,
            onload: () => {
                console.log('Audio file loaded successfully');
            },
            onerror: (error) => {
                console.error('Error loading audio file', error);
            }
        }).toDestination();
    }

    playButton.addEventListener('click', async function () {
        console.log('Play button clicked');
        if (!player) {
            console.log('Initializing player');
            await initializePlayer();
        }

        if (isPlaying) {
            console.log('Stopping playback');
            player.stop();
            playButton.textContent = 'Play';
        } else {
            console.log('Starting playback');
            player.start();
            playButton.textContent = 'Pause';
        }

        isPlaying = !isPlaying;
    });
});
