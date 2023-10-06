import { Application, Assets } from 'pixi.js';
import Game from './components/Game';
import AssetsGame from './components/AssetsGame';
import {sizes} from '../gameConfig';

let maxWidth: number = sizes.maxWidth;
let maxHeight: number = sizes.maxHeight;

const app: Application = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: maxWidth,
  height: maxHeight
});

async function loadAssets() {
  await Assets.load('fox.json');
  const assets = new AssetsGame();
  const game = new Game({app, assets, maxWidth, maxHeight});
  app.ticker.add(game.update, game);

	const resizeWindow = (): void => {
		let screenWidth: number = Math.min(maxWidth, window.innerWidth);
		let screenHeight: number = Math.min(maxHeight, window.innerHeight);
		app.renderer.resize(screenWidth, screenHeight);
	};
	window.addEventListener('resize', resizeWindow);
	resizeWindow();

	function resizeMobile() {
		app.renderer.resize(window.innerWidth, window.innerHeight);
		game.setBackgroundSize()
	}
	window.addEventListener('touchstart', resizeMobile);
}
loadAssets();
