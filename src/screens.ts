const homeScreen = document.getElementById('homeScreen') as HTMLElement;
const gameScreen = document.getElementById('gameScreen') as HTMLElement;
const gameOverScreen = document.getElementById('gameOverScreen') as HTMLElement;
const gameControls = document.getElementById('gameControls') as HTMLElement;



const introAudio = new Audio();  //Playing sound during initial game render
introAudio.src = './assets/audio/introsong.mp3';
introAudio.loop=true


//Functions to handle the appropriate screen display during the different button clicks


 function showHome(): void {
   
    homeScreen.style.display = 'flex';
    gameScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';
}
function showGameScreen(): void {
    introAudio.pause()
    homeScreen.style.display = 'none';
    gameScreen.style.display = 'flex';
    gameOverScreen.style.display = 'none';
}

 function showGameOverScreen(): void {
    introAudio.play()
    gameScreen.style.display = 'none';
    gameOverScreen.style.display = 'flex';
}
function showGameControls(): void {
  
    gameControls.style.display='flex'

}
 function gameOver(): void {
    introAudio.pause()
    showGameOverScreen();
}

export {showHome,showGameOverScreen,showGameScreen,gameOver,showGameControls}
