<template>
  <Table
    class="g-table"
    :class="{ bordered: $props.bordered }"
    :pagination="false"
  >
    <template
      v-for="(name, index) of slotNames"
      #[name]="slotData"
      :key="index"
    >
      <slot :name="name" v-bind="slotData || {}"></slot>
    </template>
  </Table>
</template>
<script lang="ts">
import { useSlots, defineComponent } from "vue";
import { Table } from "ant-design-vue";

export default defineComponent({
  components: {
    Table,
  },
  props: {
    bordered: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const slotNames = Object.keys(useSlots()) as "default"[];
    return { slotNames };
  },
});
</script>
<style lang="scss">
@import "@/assets/scss/config/mixins";
.ant-table-wrapper.g-table {
  &.bordered {
    border: 1px solid var(--color-black-6);
    border-radius: 12px;
    overflow: hidden;
    padding: 0 !important;
    flex: 0 0 auto;

    .ant-divider {
      margin: 0;
    }

    .ant-table {
      background-color: transparent;
    }
  }

  .ant-table {
    padding: 0;
  }

  .ant-table {
    border-radius: 8px;
    padding: 0px 16px;

    &-thead {
      & > tr {
        & > th {
          padding: 16px 8px;
          background-color: var(--color-white-1) !important;
          font-size: 18px;
          font-weight: 400;
          line-height: 150%;
          color: var(--color-black-2);
          border-color: var(--color-black-7);
          border-bottom: none !important;

          &::before {
            display: none;
          }
        }
      }
    }

    &-tbody {
      & > tr {
        & > td {
          font-size: 18px;
          font-weight: 400;
          line-height: 150%;
          color: var(--color-black-1);
          padding: 10px 8px;
          border-bottom: 1px solid transparent !important;
          background-color: white !important;
          border-top: 1px solid var(--color-black-7) !important;
          border-radius: 0 !important;
          position: relative;
          z-index: 1;
          & > * {
            vertical-align: middle;
          }
          &.ant-table-cell-row-hover {
            background-color: rgb(248, 248, 248) !important;
          }
        }

        &.ant-table-measure-row {
          & + tr {
            td {
              border-top: none !important;
            }
          }
        }

        &:last-child {
          & > td {
            border-bottom-color: transparent;
          }
        }

        &.ant-table-measure-row {
          & > td {
            border-bottom: none !important;
          }
        }
      }
    }

    &-container {
      table > thead > tr:first-child > *:first-child {
        border-start-start-radius: 0px;
      }
    }

    &-cell {
      .ant-slider {
        &-track {
          background-color: var(--color-red-1) !important;
        }
        &-mark {
          &-text {
            color: var(--color-red-1) !important;
          }
        }
      }
      &-scrollbar {
        &:not([rowspan]) {
          box-shadow: none;
        }
      }
      &.ant-table-column-sort {
        background-color: rgb(245, 245, 245) !important;
      }
    }
    &-thead > tr > th,
    &-tbody > tr > td {
      &.ant-table-cell-fix-left {
        border-right: 1px solid transparent;
        z-index: 2;
      }

      &.ant-table-cell-fix-right {
        border-left: 1px solid transparent;
      }
    }

    &.ant-table-ping-right,
    &.ant-table-ping-left {
      .ant-table {
        &-thead > tr > th,
        &-tbody > tr > td {
          &.ant-table-cell-fix-left-last {
            border-right: 1px solid var(--color-black-7);
          }

          &.ant-table-cell-fix-right-first {
            border-left: 1px solid var(--color-black-7);
          }
        }
      }
    }
  }
}
</style>
