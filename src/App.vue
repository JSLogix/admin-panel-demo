<template>
  <ConfigProvider
    :theme="{
      token: {
        colorPrimary: '#4a51dd',
      },
    }"
  >
    <router-view />
  </ConfigProvider>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount } from "vue";
import { ConfigProvider } from "ant-design-vue";
import { useAuth } from "@/store/auth";

export default defineComponent({
  components: {
    ConfigProvider,
  },
  setup() {
    const { toGet } = useAuth();
    toGet();

    onBeforeUnmount((): void => {
      localStorage.clear();
    });
    return {};
  },
});
</script>
