document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('playButton');
    const stutterButton = document.getElementById('stutterButton'); // Lägg till knappen för stuttereffekten
    let isPlaying = false;
    let stutterActive = false; // För att hålla koll på om stuttereffekten är aktiverad

    // Skapa en GrainPlayer för ljudfilen
    const grainPlayer = new Tone.GrainPlayer("ljudfil.mp3").toDestination();

    playButton.addEventListener('click', async () => {
        // Kontrollera om AudioContext är i "suspended" tillstånd och starta det i så fall
        if (Tone.context.state !== 'running') {
            await Tone.start();
        }

        // Starta eller stoppa uppspelningen baserat på nuvarande tillstånd
        if (isPlaying) {
            Tone.Transport.stop();
            grainPlayer.stop(); // Stoppa även GrainPlayern
            playButton.textContent = 'Play';
        } else {
            grainPlayer.start(0); // Starta GrainPlayern omedelbart
            Tone.Transport.start();
            playButton.textContent = 'Stop';
        }
        isPlaying = !isPlaying;
    });

    stutterButton.addEventListener('click', () => {
        // Toggle stuttereffekten
        if (!stutterActive) {
            // Skapa en Loop för att schemalägga repetitioner av GrainPlayern
            const stutterLoop = new Tone.Loop((time) => {
                // Starta GrainPlayern med korta intervall vid varje repetition
                grainPlayer.start(time, Math.random() * 0.05); // Justera intervallet efter behov
            }, "16n").start(0); // Anpassa repetitionshastigheten efter behov

            stutterActive = true;
            stutterButton.textContent = 'Disable Stutter';
        } else {
            // Avbryt stutter Loop
            stutterLoop.dispose(); // Stoppa och ta bort loopen
            stutterActive = false;
            stutterButton.textContent = 'Enable Stutter';
        }
    });
});
