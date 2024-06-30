document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('play-button');
    const nextButton = document.getElementById('next-button');
    const shuffleButton = document.getElementById('shuffle-button');
    const body = document.body;
    const trackTitle = document.querySelector('h2');
    let player;
    let isPlaying = false;
    let isInitialized = false;

    const noSleep = new NoSleep(); // Initialize NoSleep

    const tracks = [
        { title: "one", url: "1.mp3", className: "track-one" },
        { title: "two", url: "2.mp3", className: "track-two" },
        { title: "three", url: "3.mp3", className: "track-three" },
        { title: "four", url: "4.mp3", className: "track-four" }
    ];
    let currentTrackIndex = 0;

    async function initializeAudio(url, autoplay = false) {
        if (isInitialized) return;

        playButton.disabled = true;
        playButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>'; // Show loading spinner

        try {
            await Tone.start();
            player = new Tone.Player({
                url: url,
                loop: true, // Ensure the audio loops
                autostart: autoplay, // Start playing if autoplay is true
                onload: () => {
                    console.log("Audio loaded successfully");
                    playButton.disabled = false;
                    if (autoplay) {
                        playButton.innerHTML = '<i class="fa-solid fa-pause"></i>'; // Show pause icon if autoplaying
                        isPlaying = true; // Update isPlaying status if autoplay is true
                        noSleep.enable(); // Enable NoSleep when autoplaying
                    } else {
                        playButton.innerHTML = '<i class="fa-solid fa-play"></i>'; // Show play icon if not autoplaying
                    }
                    isInitialized = true;
                },
                onerror: (error) => {
                    console.error("Error initializing audio:", error);
                    playButton.innerHTML = '<i class="fa-solid fa-exclamation-triangle"></i>';
                    alert('Error initializing audio. Please try again.');
                }
            }).toDestination();
        } catch (error) {
            console.error("Error initializing audio:", error);
            playButton.innerHTML = '<i class="fa-solid fa-exclamation-triangle"></i>';
            alert('Error initializing audio. Please try again.');
        }
    }

    function togglePlayback() {
        if (!isInitialized) return;

        if (isPlaying) {
            player.stop();
            playButton.innerHTML = '<i class="fa-solid fa-play"></i>';
            noSleep.disable(); // Disable NoSleep when paused
        } else {
            player.start();
            playButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
            noSleep.enable(); // Enable NoSleep when playing
        }
        isPlaying = !isPlaying;
    }

    function loadTrack(index, autoplay = false) {
        if (player) {
            player.stop();
            player.dispose();
        }
        isInitialized = false;
        const track = tracks[index];
        body.className = track.className;
        trackTitle.textContent = track.title;
        initializeAudio(track.url, autoplay);
    }

    function shuffleTrack() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * tracks.length);
        } while (randomIndex === currentTrackIndex);
        currentTrackIndex = randomIndex;
        loadTrack(currentTrackIndex, isPlaying); // Use isPlaying to determine autoplay
    }

    playButton.addEventListener('click', async () => {
        if (!isInitialized) {
            await initializeAudio(tracks[currentTrackIndex].url, true);
        } else {
            togglePlayback();
        }
    });

    nextButton.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex, isPlaying); // Use isPlaying to determine autoplay
    });

    shuffleButton.addEventListener('click', () => {
        shuffleTrack();
    });
});