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
      <div><button class="btn-done" onclick="completedTask(this)">Completed </button></div>
    
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