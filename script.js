// dom selection
const img = document.querySelector('img');
const h2 = document.querySelector('h2');
const h3 = document.querySelector('h3');
const progressContainer = document.querySelector('#progress-container');
const progress = document.querySelector('#progress');
const currentTime = document.querySelector('#current-time');
const durationTime = document.querySelector('#duration-time');
const backward = document.querySelector('#backward');
const mainButton = document.querySelector('#main-button');
const forward = document.querySelector('#forward');
const audio = document.querySelector('audio');
// -------------------------------------------

// global variable
let isplay = false;
let count = 0;

// array of all songs you want
const songs = [
    {
        imgSrc: './img/jacinto-1.jpg',
        name: 'song 1',
        artist: 'jacinto',
        audioSrc:'./music/jacinto-1.mp3'
    },
    {
        imgSrc: './img/jacinto-2.jpg',
        name: 'song 2',
        artist: 'jacinto',
        audioSrc: './music/jacinto-2.mp3'
    },
    {
        imgSrc: './img/jacinto-3.jpg',
        name: 'song 3',
        artist: 'jacinto',
        audioSrc: './music/jacinto-3.mp3'
    },
    {
        imgSrc: './img/metric-1.jpg',
        name: 'Metric',
        artist: 'jacinto',
        audioSrc: './music/metric-1.mp3'
    },
]

// play song function
const song = () => {
    if (isplay) {
        isplay = false;
        mainButton.classList.replace('fa-pause', 'fa-play');
        mainButton.title = 'Play';
        audio.pause();
    } else {
        isplay = true;
        mainButton.classList.replace('fa-play', 'fa-pause');
        mainButton.title = 'Pause';
        audio.play();   
    }
}

// while time updates is audio function
const playingSong = (event) => {
    const durationMin = Math.floor(event.srcElement.duration / 60);
    const durationSec = Math.floor(event.srcElement.duration % 60);
    const cTimeMin = Math.floor(audio.currentTime / 60);
    const cTimeSec = Math.floor(audio.currentTime % 60);
    // progress bar change
    progress.style.width = `${audio.currentTime / event.srcElement.duration * 100}%`;
    // song duration change
    if (durationMin && durationSec) {
        durationTime.textContent = `0${durationMin}:${(durationSec < 10) ? 0 : ''}${durationSec}`;
    }
    // current song time change
    currentTime.textContent = `0${cTimeMin}:${(cTimeSec < 10) ? 0 : ''}${cTimeSec}`;
}

// progress container when clicked to change the song current song time this key word in event return differents and it only works with function key word not in variable function or arrow function
function progressBarC (event){
    const width = this.clientWidth;
    const clickplacex = event.offsetX;
    audio.currentTime = clickplacex / width * audio.duration;
}

// set songs function
const setSong = () => {
    img.src = songs[count].imgSrc;
    h2.textContent = songs[count].name;
    h3.textContent = songs[count].artist;
    audio.src = songs[count].audioSrc;
    audio.play();
}

// next song function
const nextSong = () => {
    console.log('clicked');
    count++;
    if (count > songs.length-1) {
        count = 0;
        setSong();
    } else {
        setSong();
    }
}

// previous song function
const prevSong = () => {
    count--;
    if (count < 0) {
        count = songs.length - 1;
        setSong();
    } else {
        setSong();
    }
}

// button listeners
mainButton.addEventListener('click', song);
audio.addEventListener('timeupdate', playingSong);
progressContainer.addEventListener('click', progressBarC);
forward.addEventListener('click', nextSong);
audio.addEventListener('ended', nextSong);
backward.addEventListener('click',prevSong);