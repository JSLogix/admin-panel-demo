<template>
  <Input class="input" :style="styles" :placeholder="$t('fill')">
    <template
      v-for="(name, index) of slotNames"
      #[name]="slotData"
      :key="index"
    >
      <slot :name="name" v-bind="slotData || {}"></slot>
    </template>
  </Input>
</template>
<script lang="ts">
import { defineComponent, computed, useSlots, type ComputedRef } from "vue";

import { Input } from "ant-design-vue";

export default defineComponent({
  props: {
    size: {
      type: String,
      default: "default",
    },
  },
  components: {
    Input,
  },
  setup(props) {
    const styles: ComputedRef<string[]> = computed(() => [
      `--size: var(--element-size-${props.size})`,
    ]);
    const slotNames = Object.keys(useSlots()) as "default"[];
    return { styles, slotNames };
  },
});
</script>
<style lang="scss" scoped>
@import "@/assets/scss/config/mixins";
.input.ant-input-affix-wrapper,
.input.ant-input {
  height: var(--size);
  @include body-2(var(--color-black-1));
  padding: 0 16px;
  border-radius: 8px;
  border-color: var(--color-black-6);
  &::placeholder {
    color: var(--color-black-5);
  }
}
.input.ant-input-affix-wrapper .ant-input {
  @include body-2(var(--color-black-1));
}
.input.ant-input-affix-wrapper .ant-input-suffix .icon {
    --size-icon: 20px;
    --color-icon: var(--color-red-1)
    cursor: pointer;
    cursor: pointer;
}
</style>
