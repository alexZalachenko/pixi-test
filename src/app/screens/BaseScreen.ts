import type { Ticker } from "pixi.js";
import { Container } from "pixi.js";
import { Text } from "pixi.js";

import { engine } from "../getEngine";
import { Button } from "..//ui/Button";
import { MainScreen } from "./main/MainScreen";

export class BaseScreen extends Container {
  public static assetBundles = ["minimalUI"];

  private fpsText: Text;
  private titleText: Text;
  private backButton: Button;
  protected paused = false;

  constructor(screenTitle: string) {
    super();

    this.fpsText = new Text({
      text: 'FPS: 0',
      style: {
        fill: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      }
    });
    this.addChild(this.fpsText);

    this.titleText = new Text({
      text: screenTitle,
      style: {
        fill: 'white',
        fontSize: 24,
        fontWeight: 'bold',
      }
    });
    this.titleText.anchor.set(0.5);
    this.addChild(this.titleText);

    this.backButton = new Button({
          text: "Back",
          width: 140,
          height: 100,
    });
    this.backButton.anchor.set(1);
    this.backButton.onPress.connect(() => {engine().navigation.showScreen(MainScreen)});
    this.addChild(this.backButton);
  }

  public update(time: Ticker) {
    if (this.paused) return;

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

  public resize(width: number, height: number) {
    const centerX = width * 0.5;
    const centerY = height * 0.5;

    this.x = 0;
    this.y = 0;

    this.titleText.x = centerX;
    this.titleText.y = centerY * 0.1;

    this.fpsText.x = 20;
    this.fpsText.y = 20;

    this.backButton.x = width - 50;
    this.backButton.y = height - 50;
  }
}