<template>
  <ADropdown :trigger="['click']">
    <slot v-bind="{ activeLocale }"> </slot>
    <template #overlay>
      <Menu>
        <MenuItem
          @click="toSetLang(item.value)"
          v-for="item in LLang"
          :key="item.value"
          :is-active="item.value === activeLocale?.value"
        >
          <div class="lang-dropdown-flag">
            <img :src="item.flag" :alt="item.value" />
          </div>
          {{ item.label }}
        </MenuItem>
      </Menu>
    </template>
  </ADropdown>
</template>
<script lang="ts">
import { defineComponent, computed, type ComputedRef } from "vue";
import { Dropdown, Menu, MenuItem } from "ant-design-vue";
import { ELang } from "@/utilities/enums";
import { useI18n } from "vue-i18n";
import { LLang } from "@/constants/list";

export default defineComponent({
  components: {
    Dropdown,
    Menu,
    MenuItem,
  },
  setup() {
    const { locale } = useI18n();
    const toSetLang = (value: ELang): void => {
      locale.value = value;
    };
    const activeLocale: ComputedRef<
      { label: string; text: string; flag: string; value: ELang } | undefined
    > = computed(() => LLang.find((lang) => lang.value === locale.value));

    return {
      activeLocale,
      toSetLang,
      LLang,
      locale,
    };
  },
});
</script>

<style lang="scss">
.lang-dropdown-flag {
  width: 40px;
  height: 28px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
