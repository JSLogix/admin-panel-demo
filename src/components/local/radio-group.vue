<template>
  <RadioGroup class="radio-group">
    <template
      v-for="(name, index) of slotNames"
      #[name]="slotData"
      :key="index"
    >
      <slot :name="name" v-bind="slotData || {}"></slot>
    </template>
  </RadioGroup>
</template>
<script lang="ts">
import { defineComponent, useSlots } from "vue";
import { RadioGroup } from "ant-design-vue";
export default defineComponent({
  components: {
    RadioGroup,
  },
  setup() {
    const slotNames = Object.keys(useSlots()) as "default"[];
    return { slotNames };
  },
});
</script>
<style lang="scss">
@import "@/assets/scss/config/mixins";

.radio-group {
  display: block;

  .ant-radio {
    &-wrapper {
      padding: 12px 0;
    }

    &-group {
      display: flex;
      flex-direction: column;
    }
  }

  .ant-checkbox-wrapper,
  .ant-radio-button-wrapper {
    width: 100%;
    line-height: unset;
    height: var(--element-size-large);
    display: flex;
    align-items: center;
    border-radius: 8px !important;
    border: 1px solid var(--color-black-6);
    padding: 0 15px;

    & > span {
      &.ant-checkbox {
        display: none;
      }

      &.ant-checkbox ~ span,
      &.ant-radio-button ~ span {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 18px;
        font-weight: 400;
        line-height: 150%;
        padding: 0;

        i {
          min-width: 21.5px;
          height: 21.5px;
          border: 1.5px solid var(--color-black-5);
          border-radius: 50%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;

          &::after {
            content: "";
            width: calc(100% - 5px);
            height: calc(100% - 5px);
            background-color: var(--color-red-1);
            border-radius: 50%;
            opacity: 0;
            transition: all 0.1s ease-in-out;
          }
        }
      }

      &.ant-checkbox ~ span {
        i {
          border-radius: 4px;

          &::after {
            border-radius: 4px;
          }
        }
      }
    }

    &-checked {
      border-color: var(--color-red-1);

      & > span {
        &.ant-checkbox ~ span,
        &.ant-radio-button ~ span {
          color: var(--color-red-1);

          i {
            border: 1.5px solid var(--color-red-1);

            &::after {
              opacity: 1;
            }
          }
        }
      }
    }
  }
}
</style>
