import type { Ticker } from "pixi.js";
import { Container } from "pixi.js";

import { engine } from "../getEngine";
import { CardsGame } from "../game/CardsGame";
import { BaseScreen } from "./BaseScreen";

export class CardsScreen extends BaseScreen {
  private leftStack: Container;
  private rightStack: Container;
  private readonly cardsGame: CardsGame;

  constructor() {
    super('Ace of Shadows');

    this.leftStack = new Container();
    this.addChild(this.leftStack);

    this.rightStack = new Container();
    this.addChild(this.rightStack);
    this.rightStack.sortableChildren = true;

    this.cardsGame = new CardsGame(this.leftStack, this.rightStack);

    engine().renderer.background.color = '#0E9C46';
  }

  public update(time: Ticker) {
    super.update(time);

    if (this.paused) return;

    this.cardsGame.update(time.deltaMS);
  }

  public resize(width: number, height: number) {
    super.resize(width, height);

    this.leftStack.x = width * 0.3;
    this.leftStack.y = height * 0.4;

    this.rightStack.x = width * 0.7;
    this.rightStack.y = height * 0.4;
  }
}
