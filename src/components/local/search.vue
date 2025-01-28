<template>
  <div class="search" :style="styles">
    <KeepAlive>
      <Icon name="search" custom />
    </KeepAlive>
    <KeepAlive>
      <Input
        type="text"
        :placeholder="$t('search')"
        v-model:value="$props.params[$props.formKey]"
        @input="onSearch"
      />
    </KeepAlive>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, type ComputedRef } from "vue";
export default defineComponent({
  name: "Search",
  emits: ["onChange"],
  props: {
    params: {
      type: Object,
      required: true,
    },
    pagination: {
      type: Object,
    },
    placeholder: {
      type: String,
      default: "Qidirish",
    },
    formKey: {
      required: true,
      type: String,
    },
    size: {
      type: String,
      default: "default",
    },
  },
  setup(props, { emit }) {
    let typingTimer: NodeJS.Timeout;
    const typingDelay = 500;
    const onSearch = (): void => {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(function (): void {
        if (props.pagination) {
          props.pagination.page = 1;
        }
        if (props.params[props.formKey] === "") {
          props.params[props.formKey] = undefined;
        }
        emit("onChange");
      }, typingDelay);
    };

    const styles: ComputedRef<string[]> = computed(() => [
      `--size-search: var(--element-size-${props.size})`,
    ]);

    return { onSearch, styles };
  },
});
</script>
<style lang="scss">
@import "@/assets/scss/config/mixins";
.search {
  position: relative;
  height: var(--size-search);
  .input {
    padding: 0 calc(var(--space-16) * 2 + var(--size-icon-default)) 0
      var(--space-16);
  }
  .icon {
    position: absolute;
    right: var(--space-16);
    top: 50%;
    transform: translateY(-50%);
    --size-icon: var(--size-icon-default);
    --color-icon: var(--color-primary-1);
    z-index: 99;
  }
  // input {
  //   flex: 1;
  //   background-color: transparent;
  //   outline: none;
  //   border: none;
  //   @include body-3(var(--color-black2));
  //   padding: 0;
  //   &::placeholder {
  //     color: var(--color-black-4);
  //   }
  // }
}
</style>
