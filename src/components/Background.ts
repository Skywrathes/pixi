import { Container, Sprite } from "pixi.js";

export class Background extends Container {
  private view: Sprite;
  private maxWidth: number;
  private maxHeight: number;

  constructor(maxWidth: number, maxHeight:number) {
    super();
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this.view = Sprite.from('back.png');
    this.view.width = this.maxWidth;
    this.view.height = this.maxHeight;
    this.addChild(this.view);
  }

  setMobileSize(): void {
    if (window.innerHeight > window.innerWidth) {
      this.view.height = window.innerHeight;
    } else {
      this.view.width = window.innerWidth;
    }

  }
}