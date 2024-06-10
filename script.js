const playButton = document.getElementById('playButton');
const stopButton = document.getElementById('stopButton');
const player = new Tone.Player({
    url: "one.ogg",
    loop: true
}).toDestination();

playButton.addEventListener('click', async () => {
    await Tone.start();
    player.start();
});

stopButton.addEventListener('click', () => {
    player.stop();
});
