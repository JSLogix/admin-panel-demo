<template>
  <Select
    :placeholder="$t('select')"
    :style="styles"
    class="select"
    :show-search="true"
    @popupScroll="handlePopupScroll"
    @search="handleSearch"
    :filter-option="filterOption"
  >
    <template #suffixIcon>
      <Icon name="angle-bottom" size="small" color="blue" />
    </template>
  </Select>
</template>

<script lang="ts">
import { defineComponent, computed, ref, type ComputedRef } from "vue";
import { Select } from "ant-design-vue";
export default defineComponent({
  components: {
    Select,
  },
  props: {
    size: {
      type: String,
      default: "default",
    },
    fetchData: {
      type: Function,
    },
    count: {
      type: Number,
      default: 0,
    },
    currentCount: {
      type: Number,
      default: 0,
    },
    searchKey: {
      type: String,
      default: "search",
    },
  },

  setup(props) {
    const styles: ComputedRef<{ [key: string]: string }> = computed(() => {
      return {
        "--local-size": `var(--element-size-${props.size})`,
        "--local-padding": `var(--element-padding-${props.size})`,
      };
    });
    const limit = ref(20);
    let isFetching = false;
    let typingTimer: any;
    const DELAY = 500;
    const scrollPosition = ref(0);
    const handlePopupScroll = (e: any) => {
      if (!props.fetchData || isFetching) return;
      scrollPosition.value = e.target.scrollTop;
      const maxScroll = e.target.scrollHeight - e.target.clientHeight;
      clearTimeout(typingTimer);
      typingTimer = setTimeout(function () {
        if (
          e.target.scrollTop >= maxScroll - 1 &&
          props.count > props.currentCount
        ) {
          limit.value += 20;
          if (props.fetchData) {
            props.fetchData({ per_page: limit.value });
          }
        }
      }, DELAY);
    };

    const handleSearch = (value: string | undefined) => {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(function () {
        limit.value = 20; // Reset limit
        if (value === "") {
          value = undefined;
        }
        props.fetchData && props.fetchData({ [props.searchKey]: value });
      }, DELAY);
    };
    const filterOption = (input: string, option: any) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    return { styles, filterOption, handleSearch, handlePopupScroll };
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/config/mixins";
.select.ant-select {
  &.ant-select-multiple,
  &.ant-select-single {
    width: 100%;
    display: flex;
    .ant-select {
      &-selector {
        height: var(--local-size);
        display: flex;
        align-items: center;
        background-color: transparent;
        border: 1px solid var(--color-black-6);
        border-radius: 6px;
        width: 100%;
        font-size: 18px;
        padding: 0 16px;
        .ant-select {
          &-selection {
            &-search {
              display: flex;
              align-items: center;
              inset-inline-start: unset;
              inset-inline-end: unset;
            }
            &-item,
            &-placeholder {
              @include body-2(var(--color-black-4));
            }
            &-item {
              color: var(--color-black-1);
            }
          }
        }
      }
      &-item {
        &-option {
          &-content {
            color: var(--color-white-1);
          }
        }
      }
    }
  }
  &.ant-select-multiple {
    min-height: var(--local-size);
    .ant-select-selection {
      &-overflow {
        gap: 8px;
        row-gap: 4px;
      }
      &-item {
        gap: 8px;
        height: unset;
        padding-inline-start: 0;
        padding-inline-end: 0;
        margin-inline-end: 0;
        margin: 0;
        padding: 0 6px;
        &-content {
          margin: 0;
        }
      }
    }
    .ant-select-selector {
      height: auto;
      padding: 6px 16px;
    }
  }
  &.ant-select-disabled {
    opacity: 0.7;
  }
}
</style>
