<template>
  <div class="card" :style="styles">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
export default defineComponent({
  props: {
    padding: {
      type: String,
      default: "default",
    },
    hasBorder: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const styles = computed(() => {
      return {
        "--padding": `var(--padding-card-${props.padding})`,
        border: props.hasBorder ? "1px solid var(--color-black-5)" : "",
      };
    });
    return { styles };
  },
});
</script>

<style lang="scss" scoped>
.card {
  --padding-card-small: 8px;
  --padding-card-default: 16px;
  --padding-card-large: 24px;
  padding: var(--padding);
  border-radius: 8px;
  background: var(--color-white-1);
  box-shadow: 0px 4px 10px 0px rgba(35, 43, 66, 0.05);
}
</style>
