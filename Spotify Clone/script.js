console.log("Welcome to Spotify")


let songIndex=0;
let audioElement = new Audio("songs/1.mp3")
let masterPlay = document.getElementById('masterPlay');
let myProgressBar =document.getElementById('myProgressBar');
let gif =document.getElementById('gif');
let masterSongName =document.getElementById('masterSongName');
let currentTimeDisplay = document.getElementById("currentTime");
let durationTimeDisplay = document.getElementById("durationTime");
let songItems= Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName: "Blinding Lights", filepath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Starboy ", filepath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "The Hills", filepath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Pray for me", filepath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Save Your Tears", filepath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "WickedGames", filepath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "After Hours", filepath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Timeless", filepath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Saulo Poulo", filepath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Die For You", filepath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]
songs.forEach((song, index) => {
    const tempAudio = document.createElement("audio");
    tempAudio.src = song.filepath;
    tempAudio.preload = "metadata";

    tempAudio.addEventListener("loadedmetadata", () => {
        const duration = tempAudio.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60).toString().padStart(2, "0");

        const timestampElement = document.getElementById(`timestamp-${index}`);
        if (timestampElement) {
            timestampElement.innerHTML = `${minutes}:${seconds} <i id="${index}" class="fa songItemPlay fa-circle-play"></i>`;
        }
    });
});



songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songname")[0.].innerText = songs[i].songName;
    
});
//audioElement.play()

//handle play/pause
masterPlay.addEventListener('click', () => {
    const currentSongIcon = document.getElementById(songIndex); 

    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;

        makeAllPlays();
        if (currentSongIcon) {
            currentSongIcon.classList.remove('fa-circle-play');
            currentSongIcon.classList.add('fa-circle-pause');
        }
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;

        if (currentSongIcon) {
            currentSongIcon.classList.remove('fa-circle-pause');
            currentSongIcon.classList.add('fa-circle-play');
        }
    }
});



//when pressed enter or space play/pause
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        masterPlay.click();
    }
});

// listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //update seekbar
    progress= parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;

})
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((el) => {
        el.classList.remove('fa-circle-pause');
        el.classList.add('fa-circle-play');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        const clickedIndex = parseInt(e.target.id);

        // If the same song is clicked again
        if (songIndex === clickedIndex) {
            if (audioElement.paused) {
                audioElement.play();
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
                gif.style.opacity = 1;
            } else {
                audioElement.pause();
                e.target.classList.remove('fa-circle-pause');
                e.target.classList.add('fa-circle-play');
                masterPlay.classList.remove('fa-circle-pause');
                masterPlay.classList.add('fa-circle-play');
                gif.style.opacity = 0;
            }
        } else {
            // If a new song is clicked
            makeAllPlays(); // Reset all icons
            songIndex = clickedIndex;

            audioElement.src = songs[songIndex].filepath;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();

            // Update play/pause icons
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
        }
    });
});
    
Array.from(document.getElementsByClassName('songItem')).forEach((element) => {
    element.addEventListener('click', (e) => {
        const clickedIndex = parseInt(element.getAttribute('data-index'));

        if (songIndex === clickedIndex && !audioElement.paused) {
            audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
            makeAllPlays();
        } else {
            songIndex = clickedIndex;
            audioElement.src = songs[songIndex].filepath;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();

            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
            makeAllPlays();
            const icon = document.getElementById(songIndex);
            if (icon) {
                icon.classList.remove('fa-circle-play');
                icon.classList.add('fa-circle-pause');
            }
        }
    });
});




document.getElementById('next').addEventListener('click', () => {
    makeAllPlays(); // Reset all icons first

    songIndex = (songIndex + 1) % songs.length;

    audioElement.src = songs[songIndex].filepath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();

    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;

    const currentBtn = document.getElementById(songIndex);
    if (currentBtn) {
        currentBtn.classList.remove('fa-circle-play');
        currentBtn.classList.add('fa-circle-pause');
    }
});




document.getElementById('previous').addEventListener('click', () => {
    makeAllPlays(); // Reset all icons first

    songIndex = (songIndex - 1 + songs.length) % songs.length;

    audioElement.src = songs[songIndex].filepath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();

    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;

    const currentBtn = document.getElementById(songIndex);
    if (currentBtn) {
        currentBtn.classList.remove('fa-circle-play');
        currentBtn.classList.add('fa-circle-pause');
    }
});

// Show duration once audio is loaded
audioElement.addEventListener("loadedmetadata", () => {
    const duration = audioElement.duration;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60).toString().padStart(2, '0');
    durationTimeDisplay.innerText = `${minutes}:${seconds}`;
});

// Update current playback time
audioElement.addEventListener("timeupdate", () => {
    const current = audioElement.currentTime;
    const minutes = Math.floor(current / 60);
    const seconds = Math.floor(current % 60).toString().padStart(2, '0');
    currentTimeDisplay.innerText = `${minutes}:${seconds}`;
});
audioElement.addEventListener('ended', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex++;
    }

    audioElement.src = songs[songIndex].filepath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();

    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});

const volumeSlider = document.getElementById('volumeSlider');

volumeSlider.addEventListener('input', () => {
    audioElement.volume = volumeSlider.value;
});
