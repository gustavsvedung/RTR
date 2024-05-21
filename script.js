document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('playButton');
    let isPlaying = false;

    // Ställ in transport BPM
    Tone.Transport.bpm.value = 80;

    // Ladda buffern för att undvika hack vid loopning
    const player = new Tone.Player({
        url: 'one.ogg',
        loop: false, // Vi hanterar loopningen själva
        autostart: false
    }).toDestination();

    const measureDuration = (60 / Tone.Transport.bpm.value) * 4;
    const loopDuration = measureDuration * 16; // 16 takter

    // Schemalägg en exakt återuppspelning efter 16 takter
    Tone.Transport.scheduleRepeat((time) => {
        player.start(time);
    }, loopDuration);

    playButton.addEventListener('click', async () => {
        // Kontrollera om AudioContext är i "suspended" tillstånd och starta det i så fall
        if (Tone.context.state !== 'running') {
            await Tone.start();
        }

        // Starta eller stoppa uppspelningen baserat på nuvarande tillstånd
        if (isPlaying) {
            Tone.Transport.stop();
            player.stop();
            playButton.textContent = 'Play';
        } else {
            player.start(0); // Starta spelaren omedelbart
            Tone.Transport.start();
            playButton.textContent = 'Stop';
        }
        isPlaying = !isPlaying;
    });
});
