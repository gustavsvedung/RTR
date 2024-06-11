//instruction from tone.js
document.querySelector("play-button")?.addEventListener("click", async () => {
	await Tone.start();
	console.log("audio is ready");
});

/* document.addEventListener('DOMContentLoaded', function () {
    const playButton = document.getElementById('play-button');
    let player;
    let isPlaying = false;
    let audioReady = false;

    async function initializePlayer() {
        await Tone.start(); // Ensure Tone.js AudioContext is started with a user gesture
        console.log('Tone.js AudioContext started'); */

        player = new Tone.Player({
            url: 'one.ogg', // Use relative URL
            loop: true,
            autostart: false,
            onload: () => {
                console.log('Audio file loaded successfully');
                audioReady = true;
                if (isPlaying) {
                    player.start();
                    console.log('Playback started');
                    playButton.textContent = 'Pause';
                }
            },
            onerror: (error) => {
                console.error('Error loading audio file', error);
            }
        }).toDestination();

        // Debugging: Check player state
        console.log('Player initialized:', player.loaded);
    }

    playButton.addEventListener('click', async function () {
        console.log('Play button clicked');

        if (!audioReady) {
            console.log('Initializing player');
            try {
                await initializePlayer();
                if (player.loaded && !isPlaying) {
                    player.start();
                    console.log('Playback started');
                    playButton.textContent = 'Pause';
                    isPlaying = true;
                }
            } catch (error) {
                console.error('Error initializing player', error);
                return;
            }
        } else {
            if (isPlaying) {
                console.log('Stopping playback');
                player.stop();
                playButton.textContent = 'Play';
                isPlaying = false;
            } else {
                console.log('Starting playback');
                if (player.loaded) {
                    try {
                        player.start();
                        console.log('Playback started');
                        playButton.textContent = 'Pause';
                        isPlaying = true;
                    } catch (error) {
                        console.error('Error starting playback', error);
                    }
                } else {
                    console.log('Player is not loaded yet, waiting for load to complete');
                    isPlaying = true; // Set the flag to indicate we want to play once loaded
                }
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