document.addEventListener('DOMContentLoaded', function () {
    const playButton = document.getElementById('play-button');
    let player;
    let isPlaying = false;

    async function initializePlayer() {
        await Tone.start(); // Ensure Tone.js AudioContext is started with a user gesture
        player = new Tone.Player({
            url: 'one.ogg',
            loop: true,
            autostart: false,
        }).toDestination();
    }

    // testedit

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
