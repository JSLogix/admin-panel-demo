<template>
  <AForm
    ref="formRef"
    autocomplete="off"
    :model="form"
    :rules="rules"
    :name="`custom-form-layout` + $route?.fullPath"
  >
    <ARow :gutter="[24, 24]">
      <slot name="form" v-bind="{ form }"></slot>
    </ARow>
  </AForm>
  <br v-if="!$props.isFooter" />
  <ASpace v-if="!$props.isFooter">
    <Button color="red" :loading="loading" @click="$router.back()"
      >Bekor qilish</Button
    >
    <Button color="green" :loading="loading" @click="toPost">Yuborish</Button>
    <Button
      v-if="isNextBtn"
      color="blue-1"
      @click="toChangeTab"
      :loading="loading"
      >O'tkazib yuborish</Button
    >
  </ASpace>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, type PropType, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { cloneDeep } from "lodash";
import { Rules, toValidateLang, toSetFormData } from "@/utilities/mixins";
import { useHttp } from "@/api";
import { ETab } from "@/utilities/enums";
export default defineComponent({
  emits: ["toPost"],
  props: {
    rules: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    form: {
      type: Object as PropType<any>,
      default: () => {},
    },
    module: {
      type: String,
    },
    isFooter: {
      type: Boolean,
      default: false,
    },
    isFormData: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit, expose }) {
    // declaration
    const formRef = ref();
    const form = reactive(cloneDeep(props.form));
    const rules = Rules(props.rules);
    const route = useRoute();
    const loading = ref(false);
    const { $post } = useHttp();
    const router = useRouter();

    // method
    const toSetValidateLang = (): void => {
      if (props.form) {
        Object.keys(form).forEach((key): void => {
          if (
            typeof form[key] === "object" &&
            form[key] !== null &&
            "uz" in form[key] &&
            "ru" in form[key] &&
            "en" in form[key]
          ) {
            rules[key] = {
              validator: toValidateLang,
              trigger: "blur",
              message: "Ushbu qator to'ldirilishi shart !",
            };
          }
        });
      }
    };

    const toChangeTab = (): void => {
      const tabIndex = route.query.tab || 1;
      router.push({ query: { ...route.query, tab: +tabIndex + 1 } });
    };
    const isNextBtn = computed(() => {
      if (!route.query.tab) return false;
      if (Number(route.query.tab) == ETab.VIDEO_CREATE) return false;
      if (Number(route.query.tab) == ETab.YOUTUBE) return false;
      return true;
    });
    const toSetVideoKey = (): void => {
      if (form && "video_key" in form) {
        form.video_key = route?.query?.video_key;
      }
      if (form && "video_id" in form) {
        form.video_id = route?.query.video_id;
      }
    };

    const toPost = async (): Promise<void> => {
      loading.value = true;
      try {
        formRef.value.validate().then(async (): Promise<void> => {
          if (props.module) {
            const response: any = await $post(
              props.module,
              props.isFormData ? toSetFormData(form) : form
            );
            if (response.statusText == "OK") {
              message.success("Yaratildi");
              if (props.module == "/video/create") {
                router.push({
                  query: { ...route.query, video_id: response.data?.data?.id },
                });
              }
            } else {
              message.error(
                "Server bilan bog‘lanishda xatolik yuz berdi. Iltimos, keyinroq urinib ko‘ring."
              );
            }
          }
          emit("toPost", form);
        });
      } catch (err) {
        message.error(
          "Server bilan bog‘lanishda xatolik yuz berdi. Iltimos, keyinroq urinib ko‘ring."
        );
      } finally {
        loading.value = false;
      }
    };

    toSetValidateLang();
    toSetVideoKey();

    expose({
      form,
    });

    return { formRef, form, rules, toPost, toChangeTab, isNextBtn, loading };
  },
});
</script>
