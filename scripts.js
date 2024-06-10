document.addEventListener('DOMContentLoaded', function () {
    const playButton = document.getElementById('play-button');
    let player = null;
    let isPlaying = false;

    // Initialize Tone.js player
    function initializePlayer() {
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
        if (!player) {
            await Tone.start();  // Ensures Tone.js AudioContext is started
            initializePlayer();
        }

        if (isPlaying) {
            player.stop();
            playButton.textContent = 'Play';
        } else {
            player.start();
            playButton.textContent = 'Pause';
        }

        isPlaying = !isPlaying;
    });
});
