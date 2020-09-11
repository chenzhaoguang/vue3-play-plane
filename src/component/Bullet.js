//我方子弹
import {
  h,
  defineComponent,
  ref,
  watch,
  reactive,
  toRefs,
} from "@vue/runtime-core";
import bulletImg from "../../assets/bullet.png";

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
      h("Sprite", { texture: bulletImg }),
    ]);
  },
});