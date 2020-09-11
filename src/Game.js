import { Application } from "pixi.js";
// setup canvas
export const game = new Application({
  width: 750,
  height: 1080,
});

document.body.append(game.view);

// game.stage
export function getRootContainer() {
  return game.stage;
}
