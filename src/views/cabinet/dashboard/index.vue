<template>
  <Card v-if="!dataset.loading"> </Card>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { message } from "ant-design-vue";
import { useHttp } from "@/api";
import { Card } from "@/components/local";

export default defineComponent({
  components: { Card },
  setup() {
    const { $get } = useHttp();

    const dataset = reactive({
      loading: false,
      data: [],
      params: {},
      video: {},
    });
    // use http;

    const toFetch = async (): Promise<void> => {
      dataset.loading = true;
      try {
        const { data } = await $get(`/user/statistics`);
        if (data.status) {
          dataset.data = data.data?.user_statistics;
          dataset.video = {
            video_long_count: data?.data?.video_long_count,
            video_short_count: data?.data?.video_short_count,
          };
        } else {
          message.error(
            "Server bilan bog‘lanishda xatolik yuz berdi. Iltimos, keyinroq urinib ko‘ring."
          );
        }
      } catch {
        message.error(
          "Server bilan bog‘lanishda xatolik yuz berdi. Iltimos, keyinroq urinib ko‘ring."
        );
      } finally {
        dataset.loading = false;
      }
    };

    toFetch();

    return { dataset };
  },
});
</script>
