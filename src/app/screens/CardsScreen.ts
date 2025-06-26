import type { Ticker } from "pixi.js";
import { Container } from "pixi.js";
import { Text } from "pixi.js";

import { engine } from "../getEngine";
import { CardsGame } from "../game/CardsGame";
import { Button } from "..//ui/Button";
import { MainScreen } from "./main/MainScreen";

/** The screen that holds the app */
export class CardsScreen extends Container {
  public static assetBundles = ["minimalUI"];

  private leftStack: Container;
  private rightStack: Container;
  private readonly cardsGame: CardsGame;
  private paused = false;
  private fpsText: Text;
  private backButton: Button;

  constructor() {
    super();

    this.leftStack = new Container();
    this.addChild(this.leftStack);

    this.rightStack = new Container();
    this.addChild(this.rightStack);
    this.rightStack.sortableChildren = true;

    this.cardsGame = new CardsGame(this.leftStack, this.rightStack);

    engine().renderer.background.color = '#0E9C46';

    this.fpsText = new Text({
      text: 'FPS: 0',
      style: {
        fill: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      }
    });
    this.addChild(this.fpsText);

    const title = new Text({
      text: 'Ace of Shadows',
      style: {
        fill: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        align: 'center'
      }
    });
    this.addChild(title);
    title.x = engine().renderer.width * 0.5;
    title.y = engine().renderer.height * 0.1;

    this.backButton = new Button({
          text: "Back",
          width: 140,
          height: 100,
    });
    this.backButton.onPress.connect(() => {engine().navigation.showScreen(MainScreen)});
    this.backButton.x = engine().renderer.width * 0.9;
    this.backButton.y = engine().renderer.height * 0.9;
    this.addChild(this.backButton);
  }

  public update(time: Ticker) {
    if (this.paused) return;

    this.cardsGame.update(time.deltaMS);
    this.fpsText.text = `FPS: ${time.FPS.toFixed(1)}`;
  }

  public async pause() {
    this.interactiveChildren = false;
    this.paused = true;
  }

  public async resume() {
    this.interactiveChildren = true;
    this.paused = false;
  }

  /** Resize the screen, fired whenever window size changes */
  public resize(width: number, height: number) {
    this.fpsText.x = width * 0.1;
    this.fpsText.y = height * 0.1;

    this.leftStack.x = width * 0.3;
    this.leftStack.y = height * 0.4;

    this.rightStack.x = width * 0.7;
    this.rightStack.y = height * 0.4;
  }
}
