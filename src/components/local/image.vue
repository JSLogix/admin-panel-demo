<template>
  <div class="image" :style="styles">
    <img v-if="$props.image" :src="$props.image" />
    <KeepAlive v-else>
      <Icon name="bell" custom />
    </KeepAlive>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, type ComputedRef } from "vue";
export default defineComponent({
  props: {
    image: {
      type: String,
      default: undefined,
    },
    size: {
      type: String,
      default: "default",
    },
    radius: {
      type: String,
      default: "curved",
    },
  },
  setup(props) {
    const styles: ComputedRef<string[]> = computed((): string[] => [
      `--size: var(--size-image-${props.size})`,
      `--radius: var(--radius-image-${props.radius})`,
    ]);

    return { styles };
  },
});
</script>

<style lang="scss">
.image {
  --size-image-small: 40px;
  --size-image-default: 48px;
  --size-image-large: 100%;

  --radius-image-curved: 8px;
  --radius-image-circle: 50%;

  position: relative;
  aspect-ratio: 1/1;
  border: 1px solid var(--color-black-7);
  overflow: hidden;
  width: var(--size);
  height: var(--size);
  border-radius: var(--radius);
  background-color: rgba(242, 244, 247, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 8px;
  }
  .icon {
    --size-icon: calc(100% - 16px);
  }
}
</style>
