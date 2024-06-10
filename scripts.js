document.addEventListener('DOMContentLoaded', function () {
    const playButton = document.getElementById('play-button');
    let player;
    let isPlaying = false;

    async function initializePlayer() {
        await Tone.start(); // Ensure Tone.js AudioContext is started with a user gesture
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

        // Debugging: Check player state
        console.log('Player state:', player.state);
    }

    playButton.addEventListener('click', async function () {
        console.log('Play button clicked');
        if (!player) {
            console.log('Initializing player');
            try {
                await initializePlayer();
            } catch (error) {
                console.error('Error initializing player', error);
                return;
            }
        }

        if (isPlaying) {
            console.log('Stopping playback');
            player.stop();
            playButton.textContent = 'Play';
        } else {
            console.log('Starting playback');
            try {
                player.start();
                console.log('Playback started');
            } catch (error) {
                console.error('Error starting playback', error);
            }
            playButton.textContent = 'Pause';
        }

        isPlaying = !isPlaying;
    });

    // Debugging: Check document events and player state
    document.addEventListener('visibilitychange', () => {
        console.log('Document visibility changed:', document.visibilityState);
    });
    window.addEventListener('focus', () => {
        console.log('Window focused');
    });
    window.addEventListener('blur', () => {
        console.log('Window blurred');
    });
});
