<template>
  <component @click="toHandleClick" class="icon" :is="icon" :style="styles" />
</template>
<script lang="ts">
import {
  defineAsyncComponent,
  defineComponent,
  computed,
  type ComputedRef,
  type PropType,
} from "vue";
import { EPropType } from "@/utilities/enums";
export default defineComponent({
  name: "Icon",
  emits: ["click"],
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String as PropType<EPropType>,
      default: "default",
    },
    color: {
      type: String,
      default: "black-1",
    },
    custom: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const toHandleClick = (event: Event): void => {
      emit("click", event);
    };
    const icon = defineAsyncComponent(
      () => import(`../../assets/svg/${props.name}.svg`)
    );
    const styles: ComputedRef<string[]> = computed(() => {
      if (!props.custom) {
        return [
          `--color-icon: var(--color-${props.color})`,
          `--size-icon: var(--size-icon-${props.size})`,
        ];
      } else {
        return [];
      }
    });
    return { icon, toHandleClick, styles };
  },
});
</script>
<style lang="scss" scoped>
.icon {
  width: var(--size-icon);
  height: var(--size-icon);
  min-width: var(--size-icon);
  fill: var(--color-icon);
}
</style>
