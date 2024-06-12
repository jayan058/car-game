import './style.css'
import { showHome, showGameScreen, showGameControls } from './screens.ts';
import { startGame } from './game.ts';
import { initInputHandlers } from './input.ts';
import { createEnemyCar} from './enemycar.ts';


const startButton = document.getElementById('startButton') as HTMLButtonElement;
const restartButton = document.getElementById('restartButton') as HTMLButtonElement;
const backToHomePage = document.getElementById('backToHomePage') as HTMLButtonElement;
const gameControls = document.getElementById('gameControls') as HTMLButtonElement;
let enemyCarInterval:number; 




// Event listeners for handling all the button clicks
startButton.addEventListener('click', () => {
    showGameScreen();
    startGame();
    clearInterval(enemyCarInterval)
     enemyCarInterval=setInterval(createEnemyCar, 500); // A new enemy car is created after every 500ms
    
    
});


restartButton.addEventListener('click', () => { 
   clearInterval(enemyCarInterval) //Clearing any intervals so that during the restart the game gets a fresh start without any intervals
    showGameScreen();
    startGame();
    enemyCarInterval=setInterval(createEnemyCar, 500); 
   
   
});

backToHomePage.addEventListener('click', () => {
  showHome();
});


gameControls.addEventListener('click', () => {
  showGameControls();
});

// Initialize the game by showing the home screen during the initial rendering
showHome();

initInputHandlers();
