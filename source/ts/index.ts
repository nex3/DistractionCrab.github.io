import {Bingo} from './bingo';
import {options} from './config/sekiro';

let bingo = new Bingo(options);
function main() {
  bingo.generate();
  bingo.writeToBoard();
}

declare global {
  interface Window {
    seed: () => void;
  }
}

window.seed = () => {
  const field = document.getElementById('seed') as HTMLInputElement;
  const text = field.value;
  bingo = new Bingo(options, parseInt(text));
  main();
};

document.addEventListener('DOMContentLoaded', main, false);
