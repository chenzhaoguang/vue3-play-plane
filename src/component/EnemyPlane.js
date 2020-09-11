//敌方飞机
import {
  h,
  defineComponent,
  ref,
  watch,
  reactive,
  toRefs,
} from "@vue/runtime-core";
import enemyPlaneImg from "../../assets/enemy.png";

export default defineComponent({
  props: ["x", "y"],
  setup(props, ctx) {
    const { x, y } = toRefs(props);
    return {
      x,
      y,
    };
  },
  render(ctx) {
    return h("Container", { x: ctx.x, y: ctx.y }, [
      h("Sprite", { texture: enemyPlaneImg }),
    ]);
  },
});
