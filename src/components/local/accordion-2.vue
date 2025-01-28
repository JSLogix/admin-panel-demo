<template>
  <Collapse accordion class="accordion" :ghost="true">
    <CollapsePanel
      :showArrow="false"
      :key="index"
      v-for="(item, index) in list"
      class="accordion-item"
    >
      <template #header>
        {{ item.title }}
      </template>
      <template #default v-if="item.subcategories?.length">
        <RecursionAccordion :list="item.subcategories" />
      </template>
    </CollapsePanel>
  </Collapse>
</template>
<script lang="ts">
import { Collapse, CollapsePanel } from "ant-design-vue";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "RecursionAccordion",
  components: { Collapse, CollapsePanel },
  props: {
    list: {
      type: Array as PropType<any[]>,
    },
  },
});
</script>
