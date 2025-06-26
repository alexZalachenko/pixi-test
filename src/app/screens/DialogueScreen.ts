import { Assets, LoaderParser, Sprite, Texture, Text, Container } from "pixi.js";
import { engine } from "../getEngine";
import { BaseScreen } from "./BaseScreen";
import gsap from 'gsap';


export class DialogueScreen extends BaseScreen {
	private dialogue: { name: string, text: string }[] = [];
	private currentLine: number = 0;
	private dialogueA: Container;
	private dialogueB: Container;

	constructor() {
		super('Magic Words');
		engine().renderer.background.color = '#CCE6ff';

		this.dialogueA = new Container();
		this.addChild(this.dialogueA);
		this.dialogueA.y = engine().renderer.height * 0.4;

		this.dialogueB = new Container();
		this.addChild(this.dialogueB);
		this.dialogueB.y = engine().renderer.height * 0.6;

		const customParser: LoaderParser = {
			name: 'parameteredImage',
			test: (url: string) => {
				return url.includes('png?');
			},

			load: async (url: string) => {
				const image = new Image();
				image.crossOrigin = 'anonymous';

				await new Promise<void>((resolve, reject) => {
					image.onload = () => resolve();
					image.onerror = () => reject(new Error(`Failed to load: ${url}`));
					image.src = url;
				});

				return Texture.from(image);
			},
		};
		Assets.loader.parsers.push(customParser);
	}

	public async show(): Promise<void> {
		const url = "https://private-624120-softgamesassignment.apiary-mock.com/v2/magicwords";
		const response = await fetch(url);
		if (!response.ok) {
			return;
		}

		const data = await response.json();

		let assets: { alias: string; src: string }[] = [];

		data.emojies.forEach((element: { name: string; url: string }) => {
			assets.push({
				alias: element.name,
				src: element.url
			});
		});

		data.avatars.forEach((element: { name: string; url: string }) => {
			assets.push({
				alias: element.name,
				src: element.url
			});
		});

		await Assets.load(assets);

		data.dialogue.forEach((element: { name: string; text: string }) => {
			this.dialogue.push({
				name: element.name,
				text: element.text
			});
		});

		this.showDialogueLine(this.dialogue[this.currentLine]);
	}

	private showDialogueLine(dialogue: { name: string; text: string }) {
		let horizontalDisplacement = 0;

		let dialogueContainer = this.currentLine % 2 == 0 ? this.dialogueA : this.dialogueB;
		dialogueContainer.removeChildren().forEach(child => child.destroy());

		let avatarTexture = Texture.from(dialogue.name);
		if (avatarTexture) {
			const avatar = new Sprite(avatarTexture);
			avatar.anchor.set(0, 0.5);
			avatar.y = 24;
			avatar.width = 48;
			avatar.height = 48;
			dialogueContainer.addChild(avatar);
			horizontalDisplacement += avatar.width + 8; // Padding
		}

		// Parse the text into segments (text / {emoji} / text / ...)
		const parts = dialogue.text.split(/({[^}]+})/g); // split on {...}

		for (const part of parts) {
			const emojiMatch = part.match(/^{(.+)}$/);
			if (emojiMatch) {
				const emojiId = emojiMatch[1];
				const emojiTexture = Texture.from(emojiId);
      	if (!emojiTexture) continue;
				const emoji = new Sprite(Texture.from(emojiId));
				emoji.anchor.set(0, 0.5);
				emoji.x = horizontalDisplacement;
				emoji.y = 24;
				emoji.width = 24;
				emoji.height = 24;
				dialogueContainer.addChild(emoji);
				horizontalDisplacement += emoji.width + 4;
			} 
			else if (part.length > 0) {
				const text = new Text({
					text: part,
					style: {
						fill: 'black',
						fontSize: 16,
						fontWeight: 'bold',
					}
				});
				text.x = horizontalDisplacement;
				text.y = 24;
				text.anchor.set(0, 0.5);
				dialogueContainer.addChild(text);
				horizontalDisplacement += text.width;
			}
		}

		let screenWidth = engine().renderer.width;
		let targetX;
		if (this.currentLine % 2 == 0) {
			dialogueContainer.x = 0;
			targetX = screenWidth * 0.05;

		}
		else {
			dialogueContainer.x = screenWidth;
			targetX = screenWidth * 0.95;
			dialogueContainer.pivot.x = dialogueContainer.width;
		}

		gsap.to(dialogueContainer, {
			duration: 1,
			x: targetX,
			ease: 'power2.out',
  	});

		if (this.currentLine < this.dialogue.length - 1) {
			setTimeout(() => {
				this.showDialogueLine(this.dialogue[++this.currentLine]);
			}, 2000);
		}
	}
}