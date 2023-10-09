import { AnimatedSprite, Application, Container } from "pixi.js";
import AssetsGame from "./AssetsGame";
import { animationSpeed } from "../../gameConfig";

export class Fox extends Container {
  private assets: AssetsGame;
  private view: AnimatedSprite;
  private maxWidth: number;
  private app: Application;


  constructor(assets: AssetsGame, maxWidth: number, app: Application) {
    super();
    this.assets = assets;
    this.maxWidth = maxWidth;
    this.app = app;

    // const view = new Sprite(this.assets.getTexture("fox1.png"))
    this.view = new AnimatedSprite(this.assets.getAnimation("run"))
    if (this.view.textures.length > 0) {
      this.view.animationSpeed = animationSpeed;
      this.view.play();
    } else {
      console.error("No textures available for animation");
    }
    this.addChild(this.view);
  }

  update():void {
    this.x = (this.app.view.width - this.width) / 2;
    this.y = (this.app.view.height - this.height) / 2;
    this.view.scale.set(this.app.view.width / this.maxWidth, this.app.view.width / this.maxWidth);
  }
}