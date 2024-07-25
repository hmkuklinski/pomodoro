//JS for Pomodoro Timer
//by Hannah Kuklinski 

const bells = new Audio('./sounds/bell.wav'); 

//timer related buttons:
const startBtn = document.querySelector('.btn-start');
const pauseBtn= document.querySelector('.btn-pause');
const restartBtn= document.querySelector('.btn-restart');

//task buttons:
const addBtn = document.querySelector('.btn-add');
const removeBtn= document.querySelector('.btn-remove'); 

//change background button:
const bgBtn= document.querySelector('.btn-bg');
const nightCityBtn= document.querySelector('.btn-night-city');
const cityBtn= document.querySelector('.btn-city');
const flowerBtn= document.querySelector('.btn-flowers');
const cloudBtn= document.querySelector('.btn-clouds');
const spaceBtn = document.querySelector('.btn-space');

//music buttons:
const pianoBtn= document.querySelector('.btn-piano');
const krnbBtn= document.querySelector('.btn-krnb');
const coffeeShopBtn= document.querySelector('.btn-cs');

//spotify embedded:
const spotifyPiano = document.querySelector('.piano');
const spotifyKrnb= document.querySelector('.korean-rnb');
const spotifyCoffeeShop= document.querySelector('.coffee-shop');


//timer type buttons:
const pomodoroBtn= document.querySelector('.btn-pomodoro'); //25 min
const shortBtn = document.querySelector('.btn-short-break'); //5 min
const longBtn= document.querySelector('.btn-long-break'); //15 min

//time types:
const minutes= document.querySelector('.minutes'); 
const seconds = document.querySelector('.seconds');


//other variables:
let myInterval;
let state= true; 
let paused = true;


//get the box that holds the timer (for background color change):
let timerBox = document.querySelector('.app-counter-box');

//setting the timer based on button selected:
pomodoroBtn.addEventListener("click", function(){
    minutes.textContent= "25";
    //special formatting for pomodoro button when clicked
    pomodoroBtn.style.outline='2px solid pink';
    pomodoroBtn.style.backgroundColor='#e9416e';
    startBtn.style.backgroundColor='#e9416e';
    
    //need to reset any other formatting for previously clicked buttons
    longBtn.style.outline='none';
    longBtn.style.backgroundColor='#ff9469';
    shortBtn.style.outline='none';
    shortBtn.style.backgroundColor='#c49dce';
    
});

shortBtn.addEventListener("click", function(){
    minutes.textContent= "5";
    shortBtn.style.outline='2px solid white';
    shortBtn.style.backgroundColor='#a730c5';
    startBtn.style.backgroundColor='#a730c5';

    pomodoroBtn.style.outline='none';
    pomodoroBtn.style.backgroundColor='#e5a0b3';
    longBtn.style.outline='none';
    longBtn.style.backgroundColor='#ff9469';
});

longBtn.addEventListener("click", function(){
    minutes.textContent= "15";
    longBtn.style.outline='2px solid white';
    longBtn.style.backgroundColor='#ff733b';
    startBtn.style.backgroundColor='#ff733b';

    pomodoroBtn.style.outline='none';
    pomodoroBtn.style.backgroundColor='#e5a0b3';
    shortBtn.style.outline='none';
    shortBtn.style.backgroundColor='#c49dce';
});

const appTimer = function() {
  const sessionAmount = Number.parseInt(minutes.textContent); //takes number in the minutes class (str --> int)

  if(state) {
    state = false; //timer is started
    let totalSeconds = sessionAmount * 60; //timer is in seconds, need to convert

    const updateSeconds = function() {
      const secondDiv = document.querySelector('.seconds');
      if (!state){
        pauseBtn.textContent="Pause"; //changes it from resume --> pause (since it is running)
        totalSeconds--;
      
        let minutesLeft = Math.floor(totalSeconds/60); 
        let secondsLeft = totalSeconds % 60;
      
        if(secondsLeft < 10) {
          secondDiv.textContent = '0' + secondsLeft;
        } else {
          secondDiv.textContent = secondsLeft;
        }
        minutes.textContent = `${minutesLeft}`
      
        if(minutesLeft === 0 && secondsLeft === 0) {
          bells.play()
          clearInterval(myInterval);
          resetTimer();
        }
      }
    }
    
    myInterval = setInterval(updateSeconds, 1000);
  } else {
    alert('Session has already started.')
  }
};

//function to reset the timer:
const resetTimer = function(){
  minutes.textContent="25";
  seconds.textContent="00";
  pomodoroBtn.style.outline='2px solid black';
  state= true;
  paused= true;
  pomodoroBtn.disabled=false;
  shortBtn.disabled=false;
  longBtn.disabled=false;
  clearInterval(myInterval);
};

const pauseTimer= function(){
  if (paused){
    paused=false;
    myInterval = setInterval(updateSeconds, 1000);
  }
  else{
    clearInterval(myInterval);
    paused=true;
  }
}

//once timer button is clicked:
startBtn.addEventListener('click', function(){
  appTimer(); //runs timer
  startBtn.style.display="none";
  pauseBtn.style.display="inline-block";
  restartBtn.style.display="inline-block";

  //don't want the user clicking button and editing display momentarily
  pomodoroBtn.disabled=true;
  shortBtn.disabled=true;
  longBtn.disabled=true;
});

//user clicks restart button:
restartBtn.addEventListener('click', function(){
  resetTimer();
  startBtn.style.display="inline-block";
});

//user clicks pause button:
pauseBtn.addEventListener('click', function(){
  state= !state; //toggles it to opposite value
  pauseBtn.textContent="Resume";
});

//task manager function
function addTask(){
  const taskInput= document.getElementById('task-input-box');
  const taskList= document.getElementById('taskList');

  if (taskInput.value.trim() !== ''){ //user entry not empty (trim() removes leading/trailing whitespace from input)
    const taskItem= document.createElement('li'); 
    taskItem.innerHTML = `
    <div class="task-item-container">
      <div class="task-text">${taskInput.value}</div>
      <div><button class="btn-remove" onclick="removeTask(this)">Done</button></div>
    
    </div>
    `; //adds a task item with entry description and done button (will eliminate this element from existing list if finished)
    taskList.appendChild(taskItem); //adds newly created li element to existing list of tasks
    taskInput.value=''; //clears input field for new entry

  }
}

addBtn.addEventListener("click", addTask);

function removeTask(button){
  const taskItem = button.closest('li');
  taskItem.remove();
}

// for the change background button option- city sunset version:
bgBtn.addEventListener('click', function(){
  changeBg(imagesBg);
});

// MAIN FUNCTION FOR BACKGROUND IMAGE CHANGE!!! -------
let currentIndex= -1;
function changeBg(imageArray){
  let newIndex = (currentIndex + 1) % imageArray.length; //causes loop around if equal to imageArray.length
  
  const img = new Image();
  img.src = imageArray[newIndex]; //change img src to one in array

  img.onload = function () { //wait until fully loads
    document.querySelector('html').style.backgroundImage = `url(${imageArray[newIndex]})`;
    //image formatting:
    document.querySelector('html').style.backgroundSize = 'cover';
    document.querySelector('html').style.backgroundRepeat = 'no-repeat';
    document.querySelector('html').style.backgroundPosition = 'center center';  
    currentIndex = newIndex;
  };
}

//for sunset city: seattle, s2, la, rio, nyc
const imagesBg= [
  'https://live.staticflickr.com/3771/11032788945_906c7d5bf2_b.jpg',
  'https://wallpapers.com/images/hd/city-sunset-iphone-2vwqkoyrdgbh61ik.jpg',
  'https://i.pinimg.com/originals/1d/be/bd/1dbebd94e79d85657481483e5bcb913c.jpg',
  'https://wallpapersmug.com/download/750x1334/cbd58d/rio-de-janeiro-sunrise-4k.jpg',
  'https://images.unsplash.com/photo-1540915316469-83b330a15605?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmV3JTIweW9yayUyMHN1bnJpc2V8ZW58MHx8MHx8fDA%3D'
  

]; 

//for night city: korea, chicago, hong kong, seattle
nightCityBtn.addEventListener('click', function(){
  changeBg(cityNightBg);
});

const cityNightBg=[
  'https://images.unsplash.com/photo-1517154421773-0529f29ea451?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2VvdWx8ZW58MHx8MHx8fDA%3D',
  'https://wallpapercave.com/wp/wp8711781.jpg',
  'https://r1.ilikewallpaper.net/iphone-wallpapers/download/75250/night-in-Hong-Kong-iphone-wallpaper-ilikewallpaper_com.jpg',
  'https://wallpaperaccess.com/full/4331421.jpg'
];

//for city aesthetics: nyc, korea- pink flowers, korea-flowers2, pgh, venice, nyc2, tokyo
cityBtn.addEventListener('click', function(){
  changeBg(cityBg);
});

const cityBg=[
  'https://images.pexels.com/photos/450597/pexels-photo-450597.jpeg?cs=srgb&dl=pexels-lex-photography-450597.jpg&fm=jpg',
  'https://i.pinimg.com/originals/4b/42/5b/4b425b5a74d80fc237647165d78ebcf9.jpg',
  'https://images.unsplash.com/photo-1538669715315-155098f0fb1d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNlb3VsfGVufDB8fDB8fHww',
  'https://i.pinimg.com/736x/7f/e9/f3/7fe9f36785e4b5ae22041dede3751aea.jpg',
  'https://runawaywithkay.com/wp-content/uploads/2020/04/IMG_8448-768x1024.jpg',
  'https://thumbs.dreamstime.com/b/tokyo-tower-landmark-japan-panoramic-modern-city-bird-eye-view-dramatic-sunrise-morning-sky-business-concept-88113454.jpg'

];

//for flower and aesthetic background pictures:
flowerBtn.addEventListener('click', function(){
  changeBg(flowersBg);
});

//daisy, sunflower medly, pink, roses
const flowersBg= [
  'https://4kwallpapers.com/images/wallpapers/chamomile-flowers-1080x2340-12903.jpeg',
  'https://i.pinimg.com/736x/53/7a/46/537a46b75541a904c9b557daf2758a15.jpg',
  'https://i.pinimg.com/1200x/37/9d/2c/379d2c70f67f62c4770d01c2848bc6d3.jpg',
  'https://img.freepik.com/premium-photo/colorful-beautiful-flower-art-flower-arrangement-decoration-wallpaper-background-illustrations_327903-1590211.jpg',
  'https://i.pinimg.com/736x/53/7a/46/537a46b75541a904c9b557daf2758a15.jpg'
];

//for sky and cloud background photos:
cloudBtn.addEventListener('click', function(){
  changeBg(skyBg);
});
const skyBg=[
  'https://r1.ilikewallpaper.net/pic/201905/Indonesia_75976_1080x1920_640.jpg',
  'https://r1.ilikewallpaper.net/iphone-x-wallpapers/download-152028/white-clouds-in-blue-sky.jpg',
  'https://i.pinimg.com/originals/f3/1f/8b/f31f8b2ca8177de96e75c7cd574cc7b0.jpg',
  'https://i.pinimg.com/564x/48/14/14/481414bd8282d08956de7c92f1aa9cca.jpg',
];


//for space stuff: 
spaceBtn.addEventListener('click', function(){
  changeBg(spaceBg);
});
const spaceBg=[
  'https://i.pinimg.com/736x/de/d9/fb/ded9fb2c8a2c3f61a172e4eb8644db53.jpg',
  'https://funmauj.b-cdn.net/test/551018.jpg',
  'https://wallpapers-clan.com/wp-content/uploads/2023/10/space-porthole-view-wallpaper-scaled.jpg',
  'https://getwallpapers.com/wallpaper/full/6/0/a/399978.jpg'
];


//for the music playlists!!!
pianoBtn.addEventListener('click', displayPiano);
function displayPiano(){
  spotifyPiano.style.display="block";
  spotifyKrnb.style.display="none";
  spotifyCoffeeShop.style.display="none";
}

coffeeShopBtn.addEventListener('click', displayCs);
function displayCs(){
  spotifyPiano.style.display="none";
  spotifyKrnb.style.display="none";
  spotifyCoffeeShop.style.display="block";
}
krnbBtn.addEventListener('click', displayKRnb);
function displayKRnb(){
  spotifyPiano.style.display="none";
  spotifyKrnb.style.display="block";
  spotifyCoffeeShop.style.display="none";
}

// for the random quote generator:
let quoteTextBox = document.querySelector('.quote-body');
let author = document.querySelector('.author');
let generateQuoteBtn = document.querySelector('.btn-quote');

const url= "https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";

async function fetchQuote(){
  try{
    const response= await fetch(url); 
    //check if HTTP response code in 200s (successful)- boolean:
    if (response.ok === false){
      throw new Error("There was an error with the request"); //throws error if not okay
    }
    //parse data as JSON
    const data= await response.json(); 

    // Check if the data has quoteText and quoteAuthor
    if (data.quoteText && data.quoteAuthor) {
      quoteTextBox.innerHTML = `"${data.quoteText}"`;
      author.innerHTML = `- ${data.quoteAuthor}`;
    } else {
      quoteTextBox.innerHTML = "No quote text available.";
      author.innerHTML = "- Unknown";
    }
  } //need to handle any errors that occur --> provide context to user
  catch (error) {
    console.error('Error fetching quote:', error);
    quoteTextBox.innerHTML = "Sorry, we are unable to complete this request."; //set quoteText to error message instead
    author.innerHTML = ""; //clear author text
  }
}

window.addEventListener("load", fetchQuote);
generateQuoteBtn.addEventListener("click", fetchQuote);


//for the uploading of personal photos ---------------------------
let myPhotos = [];
//grabbing each button:
const startPhotoUploadBtn = document.querySelector('.btn-add-photo');
const changeMyPhotoBtn= document.querySelector('.btn-my-uploads');
const fileSubmit = document.getElementById('uploadInput');

//event listeners for each button:
startPhotoUploadBtn.addEventListener('click', startUpload);
fileSubmit.addEventListener('change', handleUpload);
changeMyPhotoBtn.addEventListener('click', changeUpload);

//shows the input for file selection and submit photo button
function startUpload(){
  fileSubmit.click(); //automatically opens photo file selector on click
}
//changes background photo to photo from myPhotos:
function changeUpload(){
  if (myPhotos.length === 0) {
    alert('You do not have any photos. Please click the add photo button to submit a photo!');
  } else {
    changeBg(myPhotos);
  }
}

function handleUpload(){
  //files property --> returns FileList containing selected files
  const files = fileSubmit.files;
  //check that file is selected:
  if (files.length >0){
    //iterate through all selected photos:
    for (let i=0;i<files.length;i++){
      const currentFile= files[i];
      const reader = new FileReader(); //add a file reader

      reader.readAsDataURL(currentFile);

      //if file is read successfully by reader:
      reader.onload= function(e){
        myPhotos.push(e.target.result); //add to myPhotos array
      }

      
    }
    alert('Your photos have been added! Click the My Photos to set your new background image');
  }else{
    alert('Please select a file.');
  }
}


