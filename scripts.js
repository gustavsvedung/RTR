document.addEventListener('DOMContentLoaded', async function () {
    const playButton = document.getElementById('play-button');
    let player = null;
    let isPlaying = false;

    // Initialize Tone.js player
    async function initializePlayer() {
        await Tone.start();
        player = new Tone.Player({
            url: 'one.ogg',
            loop: true,
            autostart: false,
        }).toDestination();
    }

    playButton.addEventListener('click', async function () {
        if (!player) {
            await initializePlayer();
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
