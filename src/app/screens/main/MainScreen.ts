import { animate } from "motion";
import type { AnimationPlaybackControls } from "motion/react";
import { Container } from "pixi.js";

import { engine } from "../../getEngine";
import { Button } from "../../ui/Button";
import { CardsScreen } from "../CardsScreen";
import { DialogueScreen } from "../DialogueScreen";
import { FireScreen } from "../FireScreen";


export class MainScreen extends Container {
  public static assetBundles = ["main", "minimalUI"];

  public mainContainer: Container;
  private cardsButton: Button;
  private dialogueButton: Button;
  private fireButton: Button;

  constructor() {
    super();

    this.mainContainer = new Container();
    this.addChild(this.mainContainer);
  
    this.cardsButton = new Button({
      text: "Cards",
      width: 175,
      height: 110,
    });
    this.cardsButton.onPress.connect(() => {engine().navigation.showScreen(CardsScreen)});
    this.addChild(this.cardsButton);
  
    this.dialogueButton = new Button({
      text: "Dialogue",
      width: 175,
      height: 110,
    });
    this.dialogueButton.onPress.connect(() => {engine().navigation.showScreen(DialogueScreen)});
    this.addChild(this.dialogueButton);
  
    this.fireButton = new Button({
      text: "Fire",
      width: 175,
      height: 110,
    });
    this.fireButton.onPress.connect(() => {engine().navigation.showScreen(FireScreen)});
    this.addChild(this.fireButton);

    engine().renderer.background.color = '#1E1E1E';
  }

  public resize(width: number, height: number) {
    const centerX = width * 0.5;
    const centerY = height * 0.5;

    this.mainContainer.x = centerX;
    this.mainContainer.y = centerY;

    this.cardsButton.y = height * 0.9;
    this.cardsButton.x = width * 0.4;
    this.dialogueButton.y = height * 0.9;
    this.dialogueButton.x = width * 0.5;
    this.fireButton.y = height * 0.9;
    this.fireButton.x = width * 0.6;
  }

  public async show(): Promise<void> {

    const elementsToAnimate = [
      this.cardsButton,
      this.dialogueButton,
      this.fireButton,
    ];

    let finalPromise!: AnimationPlaybackControls;
    for (const element of elementsToAnimate) {
      element.alpha = 0;
      finalPromise = animate(
        element,
        { alpha: 1 },
        { duration: 0.3, delay: 0.75, ease: "backOut" },
      );
    }

    await finalPromise;
  }
}
