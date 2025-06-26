import { engine } from '../getEngine';
import { cardsConfig as config } from './config';
import { Container, Graphics, Sprite, Texture } from 'pixi.js';

export function createNumCards(cardsToCreate: number, cardsContainer: Container) {
    const cardTexture: Texture = createCardTexture();

    for (let i = 0; i < cardsToCreate; i++) {
        const card = new Sprite(cardTexture);
        card.width = config.cardWidth;
        card.height = config.cardHeight;
        card.y = i * config.cardOffset;
        card.zIndex = i;

        cardsContainer.addChild(card);
    }
}

function createCardTexture(): Texture {
    const cardGraphics = new Graphics();
    cardGraphics.rect(0, 0, config.cardWidth, config.cardHeight);
    cardGraphics.fill(config.cardFillColor);
    cardGraphics.stroke(config.cardBorderStyle);
    
    return engine().renderer.generateTexture(cardGraphics);
}