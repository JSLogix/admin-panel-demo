<template>
  <Input v-maska data-maska="+998 (##) ### ## ##" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { vMaska } from "maska";
export default defineComponent({
  name: "LPhoneNumber",
  directives: {
    maska: vMaska,
  },
  setup() {
    return {};
  },
});
</script>
