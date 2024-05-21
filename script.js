document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('playButton');
    const speedDownButton = document.getElementById('speedDownButton');
    const reverbButton = document.getElementById('reverbButton');
    const stutterButton = document.getElementById('stutterButton'); // Lägg till stutterknappen
    let isPlaying = false;
    let playbackRate = 1; // Grundläggande uppspelningshastighet
    let reverbActive = false; // För att hålla koll på om reverb är aktiverat
    let stutterActive = false; // För att hålla koll på om stuttereffekten är aktiverad

    // Skapa en reverb-effekt
    const reverb = new Tone.Reverb({
        decay: 3, // Justera decay-tiden för reverb-effekten efter behov
        wet: 0.5 // Justera våt/dry mix för reverb-effekten efter behov
    }).toDestination();

    // Skapa en GrainPlayer för ljudfilen
    const grainPlayer = new Tone.GrainPlayer("one.ogg").toDestination();

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

    speedDownButton.addEventListener('click', () => {
        // Sänk uppspelningshastigheten med 10%
        playbackRate -= 0.1;
        if (playbackRate < 0.1) {
            playbackRate = 0.1; // Låt inte uppspelningshastigheten bli mindre än 0.1
        }
        grainPlayer.playbackRate = playbackRate;
    });

    reverbButton.addEventListener('click', () => {
        // Toggle reverb-effekten
        if (!reverbActive) {
            grainPlayer.connect(reverb);
            reverbActive = true;
            reverbButton.textContent = 'Remove Reverb';
        } else {
            grainPlayer.disconnect(reverb);
            reverbActive = false;
            reverbButton.textContent = 'Add Reverb';
        }
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
