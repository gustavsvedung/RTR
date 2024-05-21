document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('playButton');
    let isPlaying = false;

    // Ställ in transport BPM
    Tone.Transport.bpm.value = 80;

    // Ladda buffern för att undvika hack vid loopning
    const buffer = new Tone.Buffer('one.mp3', () => { // Ändra här till one.mp3
        const player = new Tone.Player({
            url: buffer,
            loop: false, // Vi hanterar loopningen själva
            autostart: false
        }).toDestination();

        // Beräkna taktlängd i sekunder (80 BPM => 1 takt = 60 / 80 = 0.75 sekunder)
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
});
