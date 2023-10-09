import { Application, Assets } from 'pixi.js';
import Game from './components/Game';
import AssetsGame from './components/AssetsGame';
import { maxHeight, maxWidth, aspectRatio } from '../gameConfig';

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
	const game = new Game({ app, assets, maxWidth, maxHeight });
	app.ticker.add(game.update, game);

	const resizeWindow = (): void => {
		//Вычисление соотношения сторон по меньшей стороне
		if (maxHeight < maxWidth) {
			const screenHeight: number = Math.min(maxHeight, window.innerWidth);
			const screenWidth: number = screenHeight * aspectRatio;
			app.renderer.resize(screenWidth, screenHeight);
		} else {
			const screenWidth: number = Math.min(maxWidth, window.innerWidth);
			const screenHeight: number = screenWidth / aspectRatio;
			app.renderer.resize(screenWidth, screenHeight);
		}
	};
	window.addEventListener('resize', resizeWindow);
	resizeWindow();
	//открытие полноэкранного режима на мобильных устройствах требует
	//непосредственного взаимодействия с пользователем (кнопка) и особых разрешений.
	function fullscreenMobile() {
		const docEl = document.documentElement;
		if (docEl.requestFullscreen) {
			docEl.requestFullscreen();
		}
		app.renderer.resize(window.innerWidth, window.innerHeight);
		game.setBackgroundSize()
	}
	window.addEventListener('touchstart', fullscreenMobile);
}
loadAssets();
