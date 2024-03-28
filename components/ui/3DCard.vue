<template>
  <div ref="card" class="card-hover-3d w-fit">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  const card = ref(null);

  const { elementX, elementY, isOutside, elementHeight, elementWidth } =
    useMouseInElement(card);

  const cardTransform = computed(() => {
    const MAX_ROTATION = 12;

    const rX = (
      MAX_ROTATION / 2 -
      (elementY.value / elementHeight.value) * MAX_ROTATION
    ).toFixed(2);

    const rY = (
      (elementX.value / elementWidth.value) * MAX_ROTATION -
      MAX_ROTATION / 2
    ).toFixed(2);

    return isOutside.value
      ? ''
      : `perspective(${elementWidth.value}px) rotateX(${rX}deg) rotateY(${rY}deg)`;
  });
</script>

<style scoped>
  .card-hover-3d {
    transform: v-bind(cardTransform);
    transition: transform 0.15s ease-out;
  }
</style>
