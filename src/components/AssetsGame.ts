import { BaseTexture, Spritesheet, Assets, Resource, Texture } from "pixi.js";
export default class AssetsGame{
  private spritesheet: Spritesheet;

  constructor(){
    this.spritesheet = new Spritesheet(
      BaseTexture.from('fox.png'),
      Assets.cache.get('fox.json').data
    );
    this.spritesheet.parse();
  }

  //static
  getTexture(textureName: string): Texture<Resource>{
    return this.spritesheet.textures[textureName];
  }
  //animated
  getAnimation(animationName: string): Texture<Resource>[] {
    const animations: Record<string, Texture<Resource>[]> = this.spritesheet.animations;
    return animations[animationName];
  }
}