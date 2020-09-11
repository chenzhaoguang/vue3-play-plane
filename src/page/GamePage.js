import {
  h,
  defineComponent,
  reactive,
  onMounted,
  onUnmounted,
} from "@vue/runtime-core";
import Map from "../component/Map";
import Plane from "../component/Plane";
import EnemyPlane from "../component/EnemyPlane";
import Bullet from "../component/Bullet";
import { game } from "../Game";
import { hitTestObject } from "../utils/index";

export default defineComponent({
  setup(props, { emit }) {
    const { planeInfo } = useCreatePlane();
    // 敌方飞机
    const { enemyPlanes } = useCreateEnemyPlanes();
    // 我方子弹
    const { bullets, addBullet } = useCreateBullets();
    useFighting(enemyPlanes, bullets, planeInfo, emit);

    const onAttack = (bulletInfo) => {
      // 添加子弹
      addBullet(bulletInfo);
    };

    return {
      onAttack,
      bullets,
      planeInfo,
      enemyPlanes,
    };
  },

  render(ctx) {
    // 创建敌方
    const createEnemyPlanes = () => {
      return ctx.enemyPlanes.map((info) => {
        return h(EnemyPlane, { x: info.x, y: info.y });
      });
    };

    // 我方子弹
    const createBullets = () => {
      return ctx.bullets.map((info) => {
        return h(Bullet, { x: info.x, y: info.y });
      });
    };

    return h("Container", [
      h(Map),
      h(Plane, {
        x: ctx.planeInfo.x,
        y: ctx.planeInfo.y,
        onAttack: ctx.onAttack,
      }),
      ...createEnemyPlanes(),
      ...createBullets(),
    ]);
  },
});

function useFighting(enemyPlanes, bullets, planeInfo, emit) {
  const handleTicker = () => {
    // 主循环
    // 敌方飞机移动
    // y
    enemyPlanes.forEach((enemyInfo) => {
      enemyInfo.y++;
    });

    // 移动我方子弹
    bullets.forEach((bulletInfo) => {
      bulletInfo.y--;
    });

    // 碰撞检测
    // 矩形碰撞
    enemyPlanes.forEach((enemyInfo) => {
      if (hitTestObject(enemyInfo, planeInfo)) {
        console.log("hit");
        // 游戏结束
        emit("changePage", "EndPage");
      }
    });

    // 我方子弹和敌方飞机的碰撞检测
    bullets.forEach((bulletInfo, bulletIndex) => {
      enemyPlanes.forEach((enemyInfo, enemyIndex) => {
        if (hitTestObject(bulletInfo, enemyInfo)) {
          bullets.splice(bulletIndex, 1);
          enemyPlanes.splice(enemyIndex, 1);
          // 我方子弹消失
          // 敌方飞机消失
        }
      });
    });
  };

  onMounted(() => {
    game.ticker.add(handleTicker);
  });

  onUnmounted(() => {
    game.ticker.remove(handleTicker);
  });
}

function useCreateBullets() {
  const bullets = reactive([]);

  const addBullet = (info) => {
    bullets.push({ ...info, width: 61, height: 99 });
  };

  return {
    bullets,
    addBullet,
  };
}

function useCreateEnemyPlanes() {
  const enemyPlanes = reactive([
    {
      x: 50,
      y: 0,
      width: 308,
      height: 207,
    },
  ]);

  return {
    enemyPlanes,
  };
}

function useCreatePlane() {
  // 我方飞机的逻辑
  const planeInfo = reactive({ x: 150, y: 450, width: 258, height: 364 });
  // 键盘控制飞机的移动
  const speed = 15;
  window.addEventListener("keydown", (e) => {
    switch (e.code) {
      case "ArrowUp":
        planeInfo.y -= speed;
        break;
      case "ArrowDown":
        planeInfo.y += speed;
        break;
      case "ArrowLeft":
        planeInfo.x -= speed;
        break;
      case "ArrowRight":
        planeInfo.x += speed;
        break;
    }
  });
  return { planeInfo };
}
