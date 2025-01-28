<template>
  <Textarea
    class="textarea"
    :placeholder="$t('fill')"
    :style="styles"
  ></Textarea>
</template>
<script lang="ts">
import { defineComponent, computed, PropType, type ComputedRef } from "vue";
import { Textarea } from "ant-design-vue";
export default defineComponent({
  components: {
    Textarea,
  },
  props: {
    size: {
      type: String as PropType<"small" | "default" | "large">,
      default: "large",
    },
  },
  setup(props) {
    const styles: ComputedRef<{ [key: string]: string }> = computed(() => {
      return {
        "--local-size": `var(--element-size-${props.size})`,
        "--local-padding": `var(--element-padding-${props.size})`,
        "--local-font": `var(--element-font-${props.size})`,
      };
    });

    return { styles };
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/config/mixins";
textarea.ant-input {
  min-height: 80px;
  padding: 8px 16px;
  font-weight: 400;
  width: 100%;
  font-size: var(--local-font);
  color: var(--color-black-1);
  @include body-2(var(--color-black-1));
  &::placeholder {
    color: var(--color-black-5);
  }
}
</style>
