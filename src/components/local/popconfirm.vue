<template>
  <Popconfirm :ok-text="t('yes')" :cancel-text="t('no')" placement="topLeft">
    <template #title>
      {{ title }}
    </template>
    <slot></slot>
  </Popconfirm>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Popconfirm } from "ant-design-vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "LPopconfirm",
  components: { Popconfirm },
  props: {
    title: {
      type: String,
      default: () => {
        const { t } = useI18n();
        return t("deleteConfirm");
      },
    },
  },
  setup(props) {
    const { t } = useI18n();

    return {
      t,
      title: props.title,
    };
  },
});
</script>
