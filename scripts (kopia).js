document.addEventListener('DOMContentLoaded', async () => {
    const playButton = document.getElementById('play-button');
    const nextButton = document.getElementById('next-button');
    const shuffleButton = document.getElementById('shuffle-button');
    let player;
    let isPlaying = false;

    async function initializePlayer() {
        await Tone.start();
        player = new Tone.Player({
            url: 'one.ogg',
            loop: true,
            autostart: false,
            onload: () => {
                console.log('Audio file loaded successfully');
                // Preload audio by playing it silently for a brief moment
                player.volume.value = -Infinity; // Mute the player
                player.start();
                player.stop();
                player.volume.value = 0; // Reset volume
            },
            onerror: (error) => {
                alert('Error loading audio file. Please try again later.');
                console.error('Error loading audio file', error);
            }
        }).toDestination();
    }

    function startPlayback() {
        if (player && player.loaded) {
            player.start();
            playButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
        } else {
            alert('Audio is still loading. Please wait.');
        }
    }

    function stopPlayback() {
        if (player) {
            player.stop();
            playButton.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
    }

    // Initialize the player and load the audio file on page load
    await initializePlayer();

    playButton.addEventListener('click', () => {
        if (!player) {
            alert('Audio is still loading. Please wait.');
            return;
        }
        if (isPlaying) {
            stopPlayback();
        } else {
            startPlayback();
        }
        isPlaying = !isPlaying;
    });

    // Add additional event listeners for nextButton and shuffleButton if needed
});