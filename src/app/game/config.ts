export const cardsConfig = {
  cardCount: 144,
  cardWidth: 60,
  cardHeight: 90,
  cardOffset: 2,
  cardFillColor: 0x650a5a,
  cardBorderStyle: { width: 3, color: 0xfeeb77 },
  moveDelay: 1000, //milliseconds
  moveDuration: 1, //seconds
};


export class EmitterConfig{
  particleColour: string = '#ffffff';
  numParticles: number = 3;
  baseSize: number = 40;
  spawnRandomOffsetX: number = 20;
  speedMultiplierX: number = 0.05;
  baseSpeedY: number = -0.1;
  speedMultiplierY: number = 0.05;
  baseLifeTime: number = 250; // milliseconds
  randomLifeTimeMultiplier: number = 2250; // milliseconds
  scaleShrinkY: number = 0.98;
  scaleShrinkX: number = 0.98;
}