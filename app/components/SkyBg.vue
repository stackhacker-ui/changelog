<script setup lang="ts">
interface Star {
  x: number;
  y: number;
  size: number;
  twinkleDelay: number;
  id: string;
}

const props = withDefaults(defineProps<{
  starCount?: number;
  color?: string;
  size?: { min: number; max: number };
  speed?: "slow" | "normal" | "fast";
}>(), {
  starCount: 50,
  color: "var(--primary)",
  size: () => ({
    min: 1,
    max: 3,
  }),
  speed: "normal",
});

const route = useRoute();

const hashSeed = (value: string) => {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index++) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
};

const createRandom = (seed: number) => {
  let state = seed;

  return () => {
    state = Math.imul(state, 1664525) + 1013904223;

    return (state >>> 0) / 4294967296;
  };
};

const generateStars = (count: number): Star[] => {
  const random = createRandom(hashSeed(`${route.path}:${count}`));

  return Array.from({ length: count }, (_, index) => {
    const x = Math.floor(random() * 100);
    const y = Math.floor(random() * 100);
    const size = random() * (props.size.max - props.size.min) + props.size.min;
    const twinkleDelay = random() * 5;

    return { x, y, size, twinkleDelay, id: `star-${index}` };
  });
};

const stars = useState<Star[]>(`${route.path.replace(/[^a-z0-9]+/gi, "-")}-sky`, () => generateStars(props.starCount));

const twinkleDuration = computed(() => {
  const speedMap: Record<string, string> = {
    slow: "4s",
    normal: "2s",
    fast: "1s",
  };

  return speedMap[props.speed];
});
</script>

<template>
  <div class="pointer-events-none absolute inset-0 z-[-1] overflow-hidden">
    <div
      v-for="star in stars"
      :key="star.id"
      class="star absolute"
      :style="{
        'left': `${star.x}%`,
        'top': `${star.y}%`,
        'transform': 'translate(-50%, -50%)',
        '--star-size': `${star.size}px`,
        '--star-color': color,
        '--twinkle-delay': `${star.twinkleDelay}s`,
        '--twinkle-duration': twinkleDuration,
      }"
    />
  </div>
</template>

<style scoped>
.star {
  width: var(--star-size);
  height: var(--star-size);
  background-color: var(--star-color);
  border-radius: 50%;
  animation: twinkle var(--twinkle-duration) ease-in-out infinite;
  animation-delay: var(--twinkle-delay);
  will-change: opacity;
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0.2;
  }

  50% {
    opacity: 1;
  }
}
</style>
