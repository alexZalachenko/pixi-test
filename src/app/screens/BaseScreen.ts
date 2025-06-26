import type { Ticker } from "pixi.js";
import { Container } from "pixi.js";
import { Text } from "pixi.js";

import { engine } from "../getEngine";
import { Button } from "..//ui/Button";
import { MainScreen } from "./main/MainScreen";

/** The screen that holds the app */
export class BaseScreen extends Container {
  public static assetBundles = ["minimalUI"];

  private fpsText: Text;
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

    let title = new Text({
      text: screenTitle,
      style: {
        fill: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        align: 'center',
      }
    });
    this.addChild(title);
    title.x = engine().renderer.width * 0.5;
    title.y = engine().renderer.height * 0.1;

    let backButton = new Button({
          text: "Back",
          width: 140,
          height: 100,
    });
    backButton.onPress.connect(() => {engine().navigation.showScreen(MainScreen)});
    backButton.x = engine().renderer.width * 0.9;
    backButton.y = engine().renderer.height * 0.9;
    this.addChild(backButton);
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
}
