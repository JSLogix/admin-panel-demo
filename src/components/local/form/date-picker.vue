<template>
  <DatePicker
    class="picker"
    format="DD.MM.YYYY"
    valueFormat="DD.MM.YYYY"
    :placeholder="$t('date_select')"
    :style="styles"
    :allowClear="false"
  >
    <template #suffixIcon>
      <Icon name="calendar" color="blue-1" custom />
    </template>
  </DatePicker>
</template>
<script lang="ts">
import { defineComponent, computed, PropType, type ComputedRef } from "vue";
import { DatePicker } from "ant-design-vue";

export default defineComponent({
  components: {
    DatePicker,
  },
  props: {
    size: {
      type: String as PropType<"small" | "default" | "large">,
      default: "default",
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
.ant-picker.picker {
  width: 100%;
  height: var(--local-size);
  border-color: var(--color-black-6);
  padding: 0 16px;
  border-radius: 8px;

  .ant-picker {
    &-input {
      input {
        @include body-2(var(--color-black-1));

        &::placeholder {
          color: var(--color-black-5);
        }
      }
    }

    &-suffix,
    &-clear {
      svg {
        width: 22px;
        height: 22px;
        fill: var(--color-red-1);
      }
    }
  }
}
</style>
