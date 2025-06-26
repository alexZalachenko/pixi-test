import { setEngine } from "./app/getEngine";
// import { CardsScreen } from "./app/screens/CardsScreen";
// import { DialogueScreen } from "./app/screens/DialogueScreen";
// import { FireScreen } from "./app/screens/FireScreen";
import { LoadScreen } from "./app/screens/LoadScreen";
import { MainScreen } from "./app/screens/main/MainScreen";
import { CreationEngine } from "./engine/engine";

/**
 * Importing these modules will automatically register there plugins with the engine.
 */
import "@pixi/sound";

// Create a new creation engine instance
const engine = new CreationEngine();
setEngine(engine);

(async () => {
  await engine.init({
    background: "#1E1E1E",
    resizeOptions: { minWidth: 768, minHeight: 1024, letterbox: false },
  });

  await engine.navigation.showScreen(LoadScreen);
  // await engine.navigation.showScreen(DialogueScreen);
  await engine.navigation.showScreen(MainScreen);
})();
