//SongSpeed class
class SongSpeed {
    
    constructor(){
        this.speed = 1.0;
    }

    set speed(speed) {
        this._speed = speed;
    }

    get getSpeed(){
        return this._speed;
    }

     increaseSpeed(){
        if(this._speed < 2){
            this.speed = this._speed + 0.5; 
        }
    }

     decreaseSpeed(){
        if(this._speed > 0.5){
            this.speed = this._speed - 0.5;
        }
    }

}




/*--------------------------  get audio url and play pause it functionality below  ------------------------ */

 // handle play pause button animations
 let playBtn = document.querySelector('#play');
 let triangle = document.querySelector('.triangle');
 let stop = document.querySelector('.stop');

 let audioTime = document.getElementById('audio-time');

 let isPlaying = false;

 let toggleAnimation = () => {
     if(isPlaying){
         //hide triangle and show pause
         stop.style.animationName = "playOut";
         triangle.style.animationName = "playIn";

     }else{
         //hide pause and show tringle
         triangle.style.animationName = "playOut";
         stop.style.animationName = "playIn";
         
     }
     //toggle the active button state
     isPlaying = !isPlaying;
 };


//stores url of the audio 
let url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3";

//set the speed of the new audioObject
let songSpeed = new SongSpeed();
var countTime; // holds the current time played of the track
//handle playing or pausing the music

let playOrPauseMusic = (isSamesong) => {
    
        // create the audio element with the audio 
   let audioObject = new Audio(url);

   audioObject.playbackRate = songSpeed.getSpeed; // set the playback speed of the song 
   audioObject.currentTime = parseFloat(audioTime.innerText);// set the current time of the song- where it was left off

    // append to html
    let audioDiv = document.querySelector('.audio');

    audioDiv.appendChild(audioObject);

    //clean any prior audio file attached to DOM except the newly added one
    let audios = document.querySelectorAll('audio');

    for(let i = 0 ; i < audios.length-1 ; i++){
        audios[i].remove();
    }
 

    if(isPlaying){// play the music
    
        //play the music whenever you can
        audioObject.addEventListener('canplay', () => {
        audioObject.play();


        //keep track of the current time
        countTime = setInterval(() => {
            if(songSpeed.getSpeed == 0.5){
                audioTime.innerText = `${parseFloat(audioTime.innerText) + 0.5}`
            }else if(songSpeed.getSpeed == 1){
                audioTime.innerText = `${parseFloat(audioTime.innerText) + 1.0}`
            }else if(songSpeed.getSpeed == 1.5){
                audioTime.innerText = `${parseFloat(audioTime.innerText) + 1.5}`
            }else if(songSpeed.getSpeed == 2){
                audioTime.innerText = `${parseFloat(audioTime.innerText) + 2.0}`
            }
           
        }, 1000);

        });

    }else{//pause the music
        audioObject.pause();
        audioObject.src = audioObject.src;

        //stop counting the time of the track
        if(countTime != null){
            clearInterval(countTime);
        }
        
    }
}

//handles state changes and user interactions
 playBtn.addEventListener('click', (event, ) => {
    //handle button animation 
    toggleAnimation();

    //handle playing the music
    playOrPauseMusic();

 });


 //handle url change 
let urlInputElement = document.querySelector('#audioURL');

urlInputElement.addEventListener('input', () => {
    url = urlInputElement.value;
    
    //dispacth playBtn event to change the music url
    let event = new Event("click");

    //reset the timeCount to 0 for the new song
    audioTime.innerText = 0;

    isPlaying = true // to toggle play button to play regardless of its state
    playBtn.dispatchEvent(event);

});




/*-----------------------------  Adjust speed functionality below  -------------------------------  */

//get user-interactive elements
let slowDownBtn = document.querySelector('.slowDown');
let speedUpBtn = document.querySelector('.speedUp');

let leftH1 = document.querySelector('.left-h1');
let rightH1 = document.querySelector('.right-h1');

//add event-listeners to slow down and speed up buttons

//handles slowing down the song
slowDownBtn.addEventListener('click', () => {
    songSpeed.decreaseSpeed();

    //get the current track and change its speed
    let currentAudio = document.querySelector('audio');

    currentAudio.playbackRate = songSpeed.getSpeed;

    leftH1.style.visibility = "visible";
    if(songSpeed.getSpeed == 1 ){
        leftH1.innerHTML = `${songSpeed.getSpeed}.0`;
    }else{
        leftH1.innerHTML = songSpeed.getSpeed;
    }
    rightH1.style.visibility = "hidden";
});

//handles speeding up the song
speedUpBtn.addEventListener('click', () => {
    songSpeed.increaseSpeed();

    //get the current track and change its speed
    let currentAudio = document.querySelector('audio');

    currentAudio.playbackRate = songSpeed.getSpeed;
   
    rightH1.style.visibility = "visible";
    if(songSpeed.getSpeed == 1 || songSpeed.getSpeed == 2){
        rightH1.innerHTML = `${songSpeed.getSpeed}.0`;
    }else{
        rightH1.innerHTML = songSpeed.getSpeed;
    }
    leftH1.style.visibility = "hidden";
});





