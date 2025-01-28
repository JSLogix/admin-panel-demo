<template>
  <header class="header-section">
    <h1 class="section-title">
      {{ $t("headerTitle") }}
    </h1>
    <div class="section-divider"></div>
    <div class="section-lang">
      <LangDropdown>
        <template #default="{ activeLocale }">
          <KeepAlive>
            <Button kind="text">
              <div class="lang-dropdown-flag">
                <img :src="activeLocale?.flag" />
              </div>
              <!-- <img :src="activeLocale?.flag" alt="" /> -->
              {{ activeLocale?.label }}
              <Icon name="angle-bottom" />
            </Button>
          </KeepAlive>
        </template>
      </LangDropdown>
    </div>
    <div class="section-divider"></div>
    <Dropdown class="section-profile">
      <button class="section-profile-button">
        <Image :image="user?.avatar" />
        <div class="section-profile-button-info">
          <span>{{ user?.full_name }}</span>
        </div>
        <KeepAlive>
          <Icon custom name="angle-bottom" />
        </KeepAlive>
      </button>
      <ASpace :size="10"></ASpace>
      <template #overlay>
        <Menu>
          <!-- <MenuItem @click="$router.push(`/profile/${user?.id}`)">
            <KeepAlive>
              <Icon color="green-1" name="menuUser" />
            </KeepAlive>
            Личный кабинет
          </MenuItem> -->
          <MenuItem @click="toLogout">
            <KeepAlive>
              <Icon color="red-1" name="logout" />
            </KeepAlive>
            {{ $t("logOut") }}
          </MenuItem>
        </Menu>
      </template>
    </Dropdown>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed, type ComputedRef } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuth } from "@/store/auth";
import { Dropdown, Menu, MenuItem } from "ant-design-vue";
import Image from "@/components/local/image.vue";
import { list } from "@/constants/menu.ts";
import { toGetRole } from "@/constants/list";
import { storeToRefs, getActivePinia } from "pinia";
import LangDropdown from "@/components/local/lang-dropdown.vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  components: {
    Dropdown,
    MenuItem,
    Menu,
    Image,
    LangDropdown,
  },
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const route = useRoute();
    const store = useAuth();
    const { user } = storeToRefs(store);
    const pinia: any = getActivePinia();
    const toLogout = (): void => {
      localStorage.clear();
      store.$reset();
      pinia?._s?.forEach((store: any) => store?.$reset());
      router.push("/auth/sign-in");
    };
    const title: ComputedRef<string> = computed((): string => {
      const module = route.meta.module;
      const newList = list?.[user?.value?.role || ""];
      return (
        newList?.find((el: any) => el.module === module)?.title ||
        (route.path.includes("profile")
          ? t("personal_account")
          : t("admin_panel"))
      );
    });

    return { toLogout, title, user, toGetRole };
  },
});
</script>
<style lang="scss">
@import "@/assets/scss/config/mixins";

.header-section {
  height: var(--header-height);
  background-color: var(--color-white-1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  position: fixed;
  top: 16px;
  right: 16px;
  width: calc(100% - var(--aside-width) - 32px);
  transition: all 0.2s ease-in-out;
  border-radius: 16px;
  box-shadow: 0px 4px 10px 0px rgba(0, 45, 109, 0.05);

  &-siders {
    width: calc(100% - 32px);
  }
  &-img {
    width: 52px;
    height: auto;
    display: block;
    img {
      @include image;
    }
  }
  &-rigth {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  .section {
    &-title {
      @include subtitle-2(var(--color-black-1));
      flex: 1;
    }

    &-divider {
      width: 1px;
      height: calc(var(--header-height) - 16px);
      background-color: var(--color-black-7);
      margin: 0 16px;
    }

    &-profile {
      &-button {
        display: flex;
        align-items: center;
        gap: 10px;

        &-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;

          span {
            @include body-2(var(--color-black-1));
          }

          small {
            @include body-4(var(--color-black-5));
          }
        }

        & > .icon {
          --size-icon: 20px;
          --color: var(--color-primary-1);
        }
      }
    }
  }
}
</style>
