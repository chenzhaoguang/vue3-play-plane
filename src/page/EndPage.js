import { h, defineComponent } from "@vue/runtime-core";
import endPageImg from "../../assets/end_page.jpg";
import restartBtnImg from "../../assets/restartBtn.png";

export default defineComponent({
  setup(props, ctx) {
    // 没有this
    // 作为 vue3 的入口函数
    const onClick = () => {
      ctx.emit("changePage","GamePage")
    };

    return {
      onClick,
    };
  },
  render(ctx) {
    // 背景图片
    // <div><img src="imgpath/></div>
    // pixi.js
    return h("Container", [
      h("Sprite", { texture: endPageImg }),
      h("Sprite", {
        texture: restartBtnImg,
        x: 215,
        y: 530,
        interactive: true,
        onClick: ctx.onClick,
      }),
    ]);
  },
});