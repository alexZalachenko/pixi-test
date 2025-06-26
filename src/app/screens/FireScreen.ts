import { Container, Ticker } from "pixi.js";

import { engine } from "../getEngine";
import { BaseScreen } from "./BaseScreen";
import { ParticleEmitter } from "../game/ParticleEmitter";
import { EmitterConfig } from "../game/config";

export class FireScreen extends BaseScreen {
	private emitters: ParticleEmitter[] = [];
	private emittersContainer: Container;

	constructor() {
		super('Phoenix Flame');
		engine().renderer.background.color = '#996633';

		this.emittersContainer = new Container();
		this.addChild(this.emittersContainer);

		// big red particles (flames)
		let fireConfig = new EmitterConfig();
		fireConfig.particleColour = '#ff1a1a';
		fireConfig.baseSize = 80;
		fireConfig.baseLifeTime = 1000;
		fireConfig.speedMultiplierY = 0.05;
		fireConfig.baseSpeedY = -0.01;
		fireConfig.spawnRandomOffsetX = 50;
		fireConfig.numParticles = 4;
		this.emitters.push(new ParticleEmitter(this.emittersContainer, 0, 0, fireConfig));

		// small orange particles (sparks)
		let sparksConfig = new EmitterConfig();
		sparksConfig.particleColour = '#ffa64d';
		sparksConfig.baseSize = 20;
		this.emitters.push(new ParticleEmitter(this.emittersContainer, 0, 0 - 100, sparksConfig));

		// medium sized grey particles (smoke)
		let smokeConfig = new EmitterConfig();
		smokeConfig.particleColour = '#e0ebeb';
		smokeConfig.baseSize = 30;
		this.emitters.push(new ParticleEmitter(this.emittersContainer, 0, 0 - 170, smokeConfig));
	}

	public update(time: Ticker) {
		super.update(time);

		if (this.paused) return;

		this.emitters.forEach(element => {
			element.update(time.deltaMS);
		});
	}

	public resize(width: number, height: number) {
		super.resize(width, height);

		this.emittersContainer.x = width * 0.5;
		this.emittersContainer.y = height * 0.5;
	}
}
