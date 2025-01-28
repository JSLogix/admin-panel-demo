<template>
  <InputNumber
    type="number"
    class="g-input-number"
    :style="styles"
    :class="[{ 'g-input-number-center': isCenter }]"
    :placeholder="$t('fill')"
    >
    <template
      v-for="(name, index) of slotNames"
      #[name]="slotData"
      :key="index"
    >
      <slot :name="name" v-bind="slotData || {}"></slot>
    </template>
  </InputNumber>
</template>
<script lang="ts">
import { defineComponent, PropType, computed, useSlots } from "vue";
import { InputNumber } from "ant-design-vue";
import { EPropType } from "@/utilities/enums";

export default defineComponent({
  name: "GInputNumber",
  props: {
    size: {
      type: String as PropType<EPropType>,
      default: "default",
    },
    isCenter: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    InputNumber,
  },
  setup(props) {
    const styles = computed((): { [key: string]: string } => {
      return {
        "--local-size": `var(--element-size-${props.size})`,
        "--local-padding": `var(--element-padding-${props.size})`,
        "--local-font": `var(--element-font-${props.size})`,
      };
    });
    const slotNames = Object.keys(useSlots()) as "default"[];
    return { styles, slotNames };
  },
});
</script>
<style lang="scss" scoped>
.ant-input-number-group-wrapper.g-input-number {
  display: block;
  .ant-input-number-wrapper {
    display: flex;
  }
  .ant-input-number-group-addon {
    padding: 0;
    // min-width: var(--local-size);
    // max-width: var(--local-size);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.ant-input-number.g-input-number {
  height: var(--local-size);
  display: flex !important;
  align-items: center;
  width: 100%;
  & > div {
    width: 100%;
  }
  .ant-input-number-handler-wrap {
    display: none;
  }
  .ant-input-number {
    &-input {
      height: auto;
      padding: 0 var(--local-padding);
      width: 100%;
      font-size: var(--local-font);
      color: var(--color-black-1);
      &::placeholder {
        color: var(--color-black-4);
      }
    }
  }
  &-center {
    .ant-input-number {
      &-input {
        text-align: center;
      }
    }
  }
}
</style>
