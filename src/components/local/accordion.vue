<script lang="ts">
import { onMounted } from "vue";
import { ref, defineComponent, PropType, computed } from "vue";
import { VueDraggable } from "vue-draggable-plus";
import Accordion from "./accordion-2.vue";
// import axios from "@/plugins/axios";

export default defineComponent({
  name: "Accordion",
  emits: ["onClick", "update:modelValue", "onDrag"],
  props: {
    // list: {
    //   type: Array as PropType<any[]>,
    //   default: [],
    // },
    module: {
      type: String,
    },
    columns: {
      type: Array as PropType<any[]>,
      required: true,
    },
    hasLang: {
      type: Boolean,
      default: true,
    },
    modelValue: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
  },
  components: {
    Accordion,
    VueDraggable,
  },
  setup(props, { emit }) {
    // const contentRef = ref();
    const accordionRef = ref();
    const openRows = ref(<string[]>[]);
    const isValue = ref(new Set());

    const list = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const toSetup = () => {
      const accordions = accordionRef.value;
      if (accordions?.length) {
        accordions.forEach((accordion: any) => {
          accordion.style.display = "none";
        });
      }
    };
    onMounted((): void => {
      toSetup();
    });
    const onClick = (record: any, hasChildren: boolean): void => {
      if (isValue.value.has(record.id)) {
        isValue.value.delete(record.id);
        return;
      }
      if (!hasChildren) return;
      isValue.value.add(record.id);
      const accordions = accordionRef.value;
      console.log(accordionRef.value);
      if (!accordions?.length) return;
      const recordId = record.id.toString();
      const accordion = accordions.find(
        (accordion: any) =>
          accordion.getAttribute("data-parent-id") === recordId
      );
      if (!accordion) return;
      const content = accordion.querySelector("&>.accordion-content");
      if (!isValue.value.has(record.id)) {
        openRows.value.push(recordId);
        accordion.style.removeProperty("display");
        accordion.style.height = "0px";
        accordion.style.height = content.scrollHeight + "px";
        setTimeout(() => {
          accordion.style.removeProperty("height");
        }, 300);
      } else {
        const foundIndex = openRows.value.findIndex((id) => id === recordId);
        if (foundIndex !== -1) {
          openRows.value.splice(foundIndex, 1);
          accordion.style.height = content.scrollHeight + "px";
          requestAnimationFrame(() => {
            accordion.style.height = "0px";
          });
          setTimeout(() => {
            accordion.style.removeProperty("height");
            accordion.style.display = "none";
          }, 300);
        }
      }
    };
    const toRenderCell = (column: any, index: number, record: any) => {
      let result;
      if (column.customRender) {
        result = column.customRender({
          record,
          column,
          index,
          text: record[column.dataIndex],
        });
      } else {
        result = record[column.dataIndex];
      }
      return result;
    };
    const onChange = async (_event: any): Promise<void> => {
      // const _newIndex = event.newIndex;
      // const form = {
      //   position: list.value?.[newIndex].position,
      // };
      // await axios.put(`/${props.module}/${event.data.id}?is_drag=true`, form);
    };
    return {
      accordionRef,
      onClick,
      toRenderCell,
      openRows,
      list,
      onChange,
      isValue,
    };
  },
});
</script>

<template>
  <!-- group="g2" -->
  <VueDraggable
    v-model="list"
    draggable=".accordion-item"
    :animation="500"
    @end="onChange"
    class="drag-area accordion-content"
  >
    <div
      class="accordion-item"
      v-for="(record, recordIndex) in list"
      :key="record.id"
      :class="{
        'accordion-item-active':
          record.subcategories?.length && isValue.has(record.id),
        'accordion-item-children': record.subcategories?.length,
      }"
    >
      <div
        class="accordion-item-row"
        @click="onClick(record, record.subcategories?.length)"
      >
        <div
          class="accordion-item-row-col"
          :style="`flex: 0 0 ${column.width}`"
          v-for="(column, index) in columns"
          :key="column.dataIndex"
        >
          <template v-if="column.key === 'order'">
            <div class="accordion-item-cell">
              <Button
                kind="text"
                size="small"
                class="accordion-item-cell-arrow"
              >
                <Icon
                  name="angle-bottom"
                  color="red-1"
                  :style="{
                    overflow: record.subcategories?.length ? '' : 'hidden',
                  }"
                />
              </Button>
              {{ recordIndex + 1 }}
            </div>
          </template>
          <template v-else-if="column.key == 'name'">
            {{ record.name }}
          </template>
          <template v-else-if="column.key === 'action'">
            <div class="accordion-item-cell">
              <slot name="bodyCellAction" v-bind="{ column, record }"></slot>
            </div>
          </template>
          <template v-else>
            <div class="accordion-item-cell">
              {{ toRenderCell(column, index, record) }}
            </div>
          </template>
        </div>
      </div>
      <div
        class="accordion"
        ref="accordionRef"
        :data-parent-id="record.id"
        v-if="record.subcategories?.length"
      >
        <Accordion
          :columns="columns"
          v-model="record.subcategories"
          v-if="isValue.has(record.id)"
        >
          <template #bodyCellAction="{ column, record }: any">
            <template v-if="column.key == 'name'">
              <div>
                {{ record.name }}
              </div>
            </template>
          </template>
        </Accordion>
      </div>
    </div>
  </VueDraggable>
</template>
