document.addEventListener('DOMContentLoaded', function () {
    const playButton = document.getElementById('play-button');
    let player;
    let isPlaying = false;

    async function initializePlayer() {
        await Tone.start(); // Ensure Tone.js AudioContext is started with a user gesture
        console.log('Tone.js AudioContext started');

        player = new Tone.Player({
            url: 'one.ogg', // Use relative URL
            loop: true,
            autostart: false,
            onload: () => {
                console.log('Audio file loaded successfully');
                if (isPlaying) {
                    startPlayback();
                }
            },
            onerror: (error) => {
                console.error('Error loading audio file', error);
            }
        }).toDestination();

        // Debugging: Check player state
        console.log('Player initialized:', player.loaded);
    }

    function startPlayback() {
        if (player.loaded) {
            player.start();
            console.log('Playback started');
            playButton.textContent = 'Pause';
        } else {
            console.log('Player is not loaded yet');
        }
    }

    function stopPlayback() {
        player.stop();
        console.log('Playback stopped');
        playButton.textContent = 'Play';
    }

    playButton.addEventListener('click', async function () {
        console.log('Play button clicked');
        if (!player) {
            console.log('Initializing player');
            try {
                await initializePlayer();
                isPlaying = true;
                startPlayback();
            } catch (error) {
                console.error('Error initializing player', error);
                return;
            }
        } else {
            if (isPlaying) {
                stopPlayback();
                isPlaying = false;
            } else {
                startPlayback();
                isPlaying = true;
            }
        }
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