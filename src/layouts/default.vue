<template>
  <div class="layout">
    <Sider />
    <Header />
    <div class="layout-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/local/header.vue";
import Sider from "@/components/local/sider.vue";
export default defineComponent({
  components: {
    Header,
    Sider,
  },
  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
.layout {
  height: 100vh;
  padding-top: calc(var(--header-height) + 16px);
  background-color: var(--color-black-10);
  width: 100%;

  .ant-layout-sider {
    flex: 0 0 var(--aside-width) !important;
    width: var(--aside-width) !important;
    max-width: var(--aside-width) !important;
    min-width: var(--aside-width) !important;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    transition: all 0.2s ease-in-out;

    &.ant-layout-sider-collapsed ~ .header-section,
    &.ant-layout-sider-collapsed ~ .layout-content,
    &.ant-layout-sider-collapsed {
      --aside-width: 86px;
    }

    & ~ .layout-content {
      width: calc(100% - var(--aside-width));
      transition: all 0.2s ease-in-out;
      margin-left: auto;
    }
  }

  &-content {
    height: 100%;
    max-height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}
</style>
