<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const isHide = ref<boolean>(true);

    const toSetType = (): void => {
      isHide.value = !isHide.value;
    };
    return {
      isHide,
      toSetType,
    };
  },
});
</script>
<template>
  <Input :type="isHide ? 'password' : 'text'">
    <template #suffix>
      <Icon
        style="cursor: pointer"
        v-if="isHide"
        name="eye"
        @click="toSetType"
      />
      <Icon style="cursor: pointer" v-else name="eye-off" @click="toSetType" />
    </template>
  </Input>
</template>
