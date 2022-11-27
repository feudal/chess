export const soundEffects = {
  move: () => {
    const audio = new Audio("/sounds/move.mp3");
    audio.play();
  },
  check: () => {
    const audio = new Audio("/sounds/check.mp3");
    audio.play();
  },
  capture: () => {
    const audio = new Audio("/sounds/capture-2.mp3");
    audio.play();
  },
  checkMate: () => {
    const audio = new Audio("/sounds/checkmate.mp3");
    audio.play();
  },
};
