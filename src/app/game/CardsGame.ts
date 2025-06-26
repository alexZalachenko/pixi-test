import { Container } from 'pixi.js';
import gsap from 'gsap';
import { cardsConfig as config } from './config';
import { createNumCards } from './cardsFactory';


/** A class that handles all of gameplay based features. */
export class CardsGame {
    private leftStack: Container;
    private rightStack: Container;
    private elapsedTime: number = 0;

    constructor(leftStack: Container, rightStack: Container) {
        this.leftStack = leftStack;
        this.rightStack = rightStack;

        createNumCards(config.cardCount, this.leftStack);
    }

    public update(delta: number) {
        this.elapsedTime += delta;

        if (this.elapsedTime >= config.moveDelay) {
            this.elapsedTime -= config.moveDelay;
            this.moveNextCard();
        }
    }
        
    private moveNextCard() {
        const card = this.leftStack.children.pop();
        
        if (!card) {
            this.update = () => {};
            return;
        }

        // Convert global to local
        const globalPos = card.getGlobalPosition();
        const localPos = this.rightStack.toLocal(globalPos);

        // Set position in new container
        card.x = localPos.x;
        card.y = localPos.y;
        this.rightStack.addChild(card);

        const rightStackCount = this.rightStack.children.length;
        const targetY = rightStackCount * config.cardOffset;
        card.zIndex = rightStackCount;

        gsap.to(card, {
            duration: config.moveDuration,
            x: 0,
            y: targetY,
            ease: "none",
            onComplete: () => {
            this.rightStack.addChild(card);
            },
        });
    }
}
