<template>
  <ACol span="12" v-if="$props.show">
    <AFormItem
      :label="$props.label"
      :name="$props.name"
      class="form-item"
      :class="{ isFlex: 'form-item-flex' }"
    >
      <slot></slot>
    </AFormItem>
  </ACol>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "FormItem",
  props: {
    label: {
      type: String,
    },
    name: {
      type: String,
    },
    show: {
      type: Boolean,
      default: true,
    },
    isFlex: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
<style lang="scss">
@import "@/assets/scss/config/mixins";

.form-item {
  margin-bottom: 0;

  .ant-form {
    &-label {
      margin-bottom: 6px;

      & > label {
        height: unset !important;
        display: block !important;
        // @include body2(var(--color-black-1));
        font-size: 18px;
        font-weight: 400;
        line-height: 150%;
      }
    }

    &-row {
      flex-direction: column;
    }

    &-item {
      &-control {
        width: 100%;
        flex: unset;

        &-input {
          min-height: unset;
        }
      }

      &-label {
        margin-bottom: 8px;
        padding-bottom: 0 !important;
        display: flex;
        text-align: start;

        // @include devices(xs) {
        //     margin-bottom: 4px;
        // }

        & > label {
          display: block;
          height: auto;
          font-size: 18px;
          font-weight: 400;
          line-height: 150%;

          &::after {
            content: "";
          }
        }
      }
    }
  }

  &-flex {
    .ant-form {
      &-item {
        &-label {
          margin-bottom: 0;
        }
      }

      &-row {
        flex-direction: row;
        align-items: center;
      }
    }
  }
}
</style>
