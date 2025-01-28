<template>
  <Button class="button" :class="classes" :style="styles">
    <Icon v-if="$props.icon" :name="$props.icon" custom></Icon>
    <slot></slot>
  </Button>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  type ComputedRef,
  type PropType,
} from "vue";
import { Button } from "ant-design-vue";
import { EPropType } from "@/utilities/enums";
export default defineComponent({
  props: {
    size: {
      type: String as PropType<EPropType>,
      default: "default",
    },
    color: {
      type: String,
      default: "primary",
    },
    kind: {
      type: String as PropType<
        "filled" | "alpha" | "outline" | "alpha-bordered" | "text"
      >,
      default: "filled",
    },
    icon: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "auto",
    },
  },
  components: {
    Button,
  },
  setup(props) {
    const classes: ComputedRef<(string | { "button-icon": string })[]> =
      computed(() => [
        `button-kind-${props.kind}`,
        { "button-icon": props.icon },
      ]);
    const styles: ComputedRef<string[]> = computed(() => [
      `--local-color: var(--color-${props.color})`,
      `--local-size: var(--element-size-${props.size})`,
      `--local-width: ${props.width}`,
    ]);
    return { styles, classes };
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/config/mixins";
.button.ant-btn {
  height: var(--local-size);
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  --size-icon: 24px;
  gap: 8px;
  width: var(--local-width);
  .icon {
    --color-icon: var(--local-color);
    fill: rgb(var(--color-icon));
  }
  span {
    @include button-1;
  }
  &.button {
    &-kind {
      &-filled {
        background-color: rgb(var(--local-color));
        color: var(--color-white-1);
        &:hover {
          background-color: rgba(var(--local-color), 0.8);
          border-color: rgb(var(--local-color));
        }
        &.button-icon {
          .icon {
            --color-icon: 255, 255, 255;
          }
        }
      }
      &-outline {
        background-color: var(--color-white-1);
        border-color: rgb(var(--local-color));
        span {
          color: rgb(var(--local-color));
        }
        &:hover {
          background-color: rgb(var(--local-color));
          span {
            color: var(--color-white-1);
          }
        }
      }
      &-alpha {
        background-color: rgba(var(--local-color), 0.2);
        border-color: transparent;
        span {
          color: rgb(var(--local-color));
        }
      }
      &-text {
        background-color: transparent;
        border: none;
        padding: 0;
        height: auto;
        box-shadow: unset;
        span {
          color: var(--color-black);
        }
        .icon {
          fill: var(--color-icon);
        }
      }
    }
  }
  &.button {
    &-icon {
      width: var(--local-size);
      height: var(--local-size);
      padding: 0;

      .icon {
        --size-icon: calc(100% - 16px);
        --color-icon: var(--local-color);
      }
    }
  }
}
</style>
