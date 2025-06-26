import type { Ticker } from "pixi.js";

import { engine } from "../getEngine";
import { BaseScreen } from "./BaseScreen";
import { ParticleEmitter } from "../game/ParticleEmitter";
import { EmitterConfig } from "../game/config";

export class FireScreen extends BaseScreen {
	private emitterX = engine().screen.width / 2;
	private emitterY = engine().screen.height / 2;
	private emitters: ParticleEmitter[] = [];

	constructor() {
		super('Phoenix Flame');
		engine().renderer.background.color = '#996633';

		// big red particles (flames)
		let fireConfig = new EmitterConfig();
		fireConfig.particleColour = '#ff1a1a';
		fireConfig.baseSize = 80;
		fireConfig.baseLifeTime = 1000;
		fireConfig.speedMultiplierY = 0.05;
		fireConfig.baseSpeedY = -0.01;
		fireConfig.spawnRandomOffsetX = 50;
		fireConfig.numParticles = 4;
		this.emitters.push(new ParticleEmitter(this, this.emitterX, this.emitterY, fireConfig));

		// small orange particles (sparks)
		let sparksConfig = new EmitterConfig();
		sparksConfig.particleColour = '#ffa64d';
		sparksConfig.baseSize = 20;
		this.emitters.push(new ParticleEmitter(this, this.emitterX, this.emitterY - 100, sparksConfig));

		// medium sized grey particles (smoke)
		let smokeConfig = new EmitterConfig();
		smokeConfig.particleColour = '#e0ebeb';
		smokeConfig.baseSize = 30;
		this.emitters.push(new ParticleEmitter(this, this.emitterX, this.emitterY - 170, smokeConfig));
	}

	public update(time: Ticker) {
		super.update(time);

		if (this.paused) return;

		this.emitters.forEach(element => {
			element.update(time.deltaMS);
		});
	}
}
