<template>
  <div class="sign-in-form">
    <div class="logo">
      Admin panel demo
      <!-- <img src="/logo.png" alt="" /> -->
    </div>
    <strong>{{ $t("login.title") }}</strong>
    <a-form
      label-position="top"
      ref="formRef"
      :model="form"
      :rules="rules"
      status-icon
      layout="vertical"
    >
      <ARow :gutter="[16, 16]">
        <FormItem span="24">
          <LPhoneNumber
            autocomplete="off"
            autofocus
            v-model:value="form.phone"
            :placeholder="$t('login.loginPlaceholder')"
          />
        </FormItem>
        <FormItem span="24">
          <Input
            v-model:value="form.password"
            @keypress.enter="onLogin"
            :placeholder="$t('login.passwordPlaceholder')"
          />
        </FormItem>
      </ARow>
    </a-form>
    <Button :loading="loading" @click="onLogin">
      {{ $t("login.submit") }}
    </Button>
  </div>
</template>
<script lang="ts">
import { reactive, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { FormItem } from "@/components/local";
import { useHttp } from "@/api";
import { useAuth } from "@/store/auth";
import { LPhoneNumber } from "@/components/local";
import { useI18n } from "vue-i18n";

export default defineComponent({
  components: { FormItem, LPhoneNumber },
  setup() {
    const { t } = useI18n();

    const { $post } = useHttp();
    const { toSet, toGet } = useAuth();

    const router = useRouter();
    const form = reactive({
      phone: "",
      password: "",
    });
    const loading = ref<boolean>(false);
    const formRef = ref();
    const rules: Record<string, any[]> = {
      phone: [
        {
          required: true,
          message: t("login.loginPlaceholder"),
          trigger: "change",
        },
      ],
      password: [
        {
          required: true,
          message: t("login.passwordPlaceholder"),
          trigger: "change",
        },
      ],
    };

    const onLogin = async (): Promise<void> => {
      loading.value = true;
      try {
        let phone = form.phone.replace(/\D/g, "");
        const loginForm = {
          password: form.password,
          phone,
        };
        const { data }: any = await $post(`user/login`, loginForm);
        if (!data?.status) {
          message.error(t("login.error"));
        }
        toSet({
          token: data?.data?.token,
          user: { fio: data?.data?.name, id: data?.data?.id },
        });
        toGet();
        router.push("/admin/dashboard");
      } catch (err) {
        message.error(t("errorInServer"));
        console.log(err);
      }
      loading.value = false;
    };

    return { form, onLogin, rules, loading, formRef };
  },
});
</script>
