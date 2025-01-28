<template>
  <RadioGroup
    :value="lang"
    @change="toSetLang"
    class="radio-group radio-group-lang"
  >
    <Tooltip v-for="item in LLang" :title="item.text">
      <RadioButton :value="item.value">
        <div class="radio-group-lang-img">
          <img :src="`/images/lang/${item.value}.png`" :alt="item.label" />
        </div>
        {{ item.label }}
      </RadioButton>
    </Tooltip>
  </RadioGroup>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RadioGroup, Tooltip, RadioButton } from "ant-design-vue";
import { storeToRefs } from "pinia";
import { LLang } from "@/constants/list";
import { useBase } from "@/store/base";

export default defineComponent({
  name: "GLang",
  components: {
    RadioGroup,
    Tooltip,
    RadioButton,
  },
  setup() {
    const { lang } = storeToRefs(useBase());
    const toSetLang = (value: any): void => {
      lang.value = value.target.value;
    };
    return {
      LLang,
      lang,
      toSetLang,
    };
  },
});
</script>

<style lang="scss" scoped>
.radio-group-lang {
  flex-direction: row;
  display: flex !important;
  align-items: center;
  gap: 8px;
  .ant-radio-button {
    &-wrapper {
      flex: 1;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      &::before {
        display: none !important;
      }
      span {
        &:not(.ant-radio-button) {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
      }
    }
  }
  &-img {
    width: 25px;
    height: 28px;
    display: block;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
