import { Container, Graphics, Sprite, Texture } from "pixi.js";
import { engine } from "../getEngine";
import { EmitterConfig } from "./config";

export class ParticleEmitter {
    private particles: FireParticle[] = [];
    private locationX: number = 0;
    private locationY: number = 0;
    private config: EmitterConfig;

    constructor(container: Container, locationX: number, locationY: number, config: EmitterConfig) {
        const fireTexture = this.createFireTexture(config.particleColour, config.baseSize);
        this.locationX = locationX;
        this.locationY = locationY;
        this.config = config;
        
        for (let i = 0; i < config.numParticles; i++) {
            let newParticle = new FireParticle(fireTexture);
            container.addChild(newParticle);
            this.particles.push(newParticle);
        }
    }

	private createFireTexture(particleColour: string, size: number): Texture {
		const circleGraphics = new Graphics();
		circleGraphics.circle(0, 0, size);
  		circleGraphics.fill(particleColour);
		return engine().renderer.generateTexture(circleGraphics);
	}

    public update(deltaTime: number) {
        for (const particle of this.particles) {
			if (particle.update(deltaTime)) {
                particle.reset(this.locationX, this.locationY, this.config);
            }
        }
    }
}

class FireParticle extends Sprite {
	vx = 0;
	vy = 0;
	life = 0;
	maxLife = 0;

	constructor(texture: Texture) {
		super(texture);
		this.anchor.set(0.5);
	}

	reset(x: number, y: number, config: EmitterConfig) {
		this.x = x + config.spawnRandomOffsetX * (Math.random() < 0.5 ? -1 : 1);;
		this.y = y;
		this.alpha = 1;
		this.scale.set(0.5 + Math.random() * 0.5);
		this.vx = (Math.random() - 0.5) * config.speedMultiplierX;
		this.vy = config.baseSpeedY - Math.random() * config.speedMultiplierY;
		this.life = 0;
		this.maxLife = config.baseLifeTime + Math.random() * config.randomLifeTimeMultiplier; // this is milliseconds
	}

    // returns true if the particle has reached its maximum life time
	update(deltaTime: number): boolean {
		this.x += this.vx * deltaTime;
		this.y += this.vy * deltaTime;
		this.life += deltaTime;
		this.alpha = 1 - this.life / this.maxLife;
        
        return this.life >= this.maxLife;
	}
}
