document.addEventListener('DOMContentLoaded', async () => {
    const playButton = document.getElementById('play-button');
    const nextButton = document.getElementById('next-button');
    const shuffleButton = document.getElementById('shuffle-button');
    let player;
    let isPlaying = false;

    async function initializePlayer() {
        // Start audio context
        await Tone.start();
        
        // Create a buffer to preload the audio
        const buffer = new Tone.Buffer("one.ogg", () => {
            console.log("Audio buffer loaded successfully");
            playButton.disabled = false;
        }, (error) => {
            console.error("Error loading audio buffer", error);
            alert('Error loading audio file. Please try again later.');
        });

        // Create player with the loaded buffer
        player = new Tone.Player({
            url: buffer,
            loop: true,
            autostart: false,
        }).toDestination();

        // Ensure buffer is loaded before allowing playback
        await Tone.loaded();
    }

    function startPlayback() {
        if (player && player.loaded) {
            player.start();
            playButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
            isPlaying = true;
        } else {
            console.error("Player not ready");
            alert('Audio is still loading. Please wait.');
        }
    }

    function stopPlayback() {
        if (player) {
            player.stop();
            playButton.innerHTML = '<i class="fa-solid fa-play"></i>';
            isPlaying = false;
        }
    }

    // Initialize the player and load the audio file on page load
    playButton.disabled = true; // Disable button until audio is loaded
    await initializePlayer();

    playButton.addEventListener('click', () => {
        if (!player || !player.loaded) {
            alert('Audio is still loading. Please wait.');
            return;
        }
        if (isPlaying) {
            stopPlayback();
        } else {
            startPlayback();
        }
    });

    // Add additional event listeners for nextButton and shuffleButton if needed
});