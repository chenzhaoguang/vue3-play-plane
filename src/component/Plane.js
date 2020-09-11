// 飞机
import {
  h,
  defineComponent,
  ref,
  watch,
  reactive,
  toRefs,
} from "@vue/runtime-core";
import planeImg from "../../assets/plane.png";

export default defineComponent({
  props: ["x", "y"],
  setup(props, { emit }) {
    // console.log(props);
    // props 是一个只读的响应式对象
    // 方案一
    // const point = reactive({ x: props.x, y: props.y });
    // watch(props, (value) => {
    //   console.log(value);
    //   point.x = value.x;
    //   point.y = value.y;
    // });

    // return {
    //   point,
    // };

    // 方案二
    // 响应式丢失问题
    const { x, y } = toRefs(props);
    window.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        emit("attack", {
          x: x.value + 100,
          y: y.value,
        });
      }
    });
    return {
      x,
      y,
    };
  },
  render(ctx) {
    return h("Container", { x: ctx.x, y: ctx.y }, [
      h("Sprite", { texture: planeImg }),
    ]);
  },
});
