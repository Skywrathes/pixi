import { Application } from "pixi.js";
import { Fox } from "./Fox";
import AssetsGame from "./AssetsGame";
import { Background } from "./Background";

interface GameProps {
  app: Application;
  assets: AssetsGame;
  maxWidth: number;
  maxHeight: number;
}

class Game{
  private app: Application;
  private fox: Fox;
  private background: Background;
  private maxWidth: number;
  private maxHeight: number;

  constructor({app, assets, maxWidth, maxHeight}: GameProps) {
    this.app = app;

    this.fox = new Fox(assets, maxWidth, app);
    this.background = new Background(maxWidth, maxHeight);
    this.app.stage.addChild(this.background);
    this.app.stage.addChild(this.fox);
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
  }

  private centerFox(): void {
    const screenWidth = Math.min(this.maxWidth, window.innerWidth);
    const screenHeight = Math.min(this.maxHeight, window.innerHeight);
    this.fox.x = (screenWidth - this.fox.width) / 2;
    this.fox.y = (screenHeight - this.fox.height) / 2;
  }

  setBackgroundSize() {
    this.background.setMobileSize();
  }

  update(): void {
    this.centerFox();
    this.fox.update();
  }
}

export default Game;