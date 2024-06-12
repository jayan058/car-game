import { setCarDirection } from './game';


//Handling the arrow left and arrow right event after the player presses the key 
function keyDown(e: KeyboardEvent): void {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        setCarDirection('right');
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        setCarDirection('left');
    }
   
}

function initInputHandlers(): void {
    document.addEventListener('keydown', keyDown);
    
}

export { initInputHandlers }
