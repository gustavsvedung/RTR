document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('playButton');
    const speedDownButton = document.getElementById('speedDownButton');
    const reverbButton = document.getElementById('reverbButton');
    let isPlaying = false;
    let playbackRate = 1; // Grundläggande uppspelningshastighet
    let reverbActive = false; // För att hålla koll på om reverb är aktiverat

    // Skapa en reverb-effekt
    const reverb = new Tone.Reverb({
        decay: 3, // Justera decay-tiden för reverb-effekten efter behov
        wet: 0.5 // Justera våt/dry mix för reverb-effekten efter behov
    }).toDestination();

    // Ställ in transport BPM
    Tone.Transport.bpm.value = 80;

    // Ladda buffern för att undvika hack vid loopning
    const player = new Tone.Player({
        url: 'one.ogg',
        loop: false, // Vi hanterar loopningen själva
        autostart: false,
        playbackRate: playbackRate // Används för att justera uppspelningshastighet
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

    speedDownButton.addEventListener('click', () => {
        // Sänk uppspelningshastigheten med 10%
        playbackRate -= 0.1;
        if (playbackRate < 0.1) {
            playbackRate = 0.1; // Låt inte uppspelningshastigheten bli mindre än 0.1
        }
        player.playbackRate = playbackRate;
    });

    reverbButton.addEventListener('click', () => {
        // Toggle reverb-effekten
        if (reverbActive) {
            player.disconnect(reverb);
            reverbActive = false;
            reverbButton.textContent = 'Add Reverb';
        } else {
            player.connect(reverb);
            reverbActive = true;
            reverbButton.textContent = 'Remove Reverb';
        }
    });
});
