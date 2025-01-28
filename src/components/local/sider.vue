<template>
  <LayoutSider
    class="sider-section"
    v-model:collapsed="isCollapsed"
    :trigger="null"
    collapsible
  >
    <div class="section-wrapper">
      <div class="section-header">
        <div v-if="isCollapsed">
          <img src="/logo.png" alt="" />
        </div>
        <div class="section-header-top">
          <span v-if="!isCollapsed" class="section-header-img">
            <img style="width: 100%" src="/logo.png" alt="" />
          </span>
          <div @click="toCollapsed" class="section-header-collapse">
            <Icon name="arrow-left" color="white-1" />
          </div>
        </div>
        <h2 v-if="!isCollapsed" class="section-header-title">
          {{ $t("siderTitle") }}
        </h2>
      </div>
      <div class="section-divider"></div>
      <PerfectScrollbar class="section-body">
        <Menu mode="inline" class="section-menu">
          <MenuItem :key="index" v-for="(item, index) in list">
            <RouterLink
              v-if="item.path"
              :to="item.path"
              class="section-menu-item"
            >
              <Icon :name="item.icon" class="section-menu-item-icon" />
              <span class="section-menu-item-title">
                {{ $t(item.key) }}
              </span>
            </RouterLink>
          </MenuItem>
        </Menu>
      </PerfectScrollbar>
    </div>
  </LayoutSider>
</template>

<script lang="ts">
import { ref, defineComponent, type Ref } from "vue";
import { LayoutSider, Menu, MenuItem, SubMenu } from "ant-design-vue";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import { list } from "@/constants/menu.ts";
import { ERole } from "@/utilities/enums";
export default defineComponent({
  components: {
    LayoutSider,
    Menu,
    MenuItem,
    SubMenu,
    PerfectScrollbar,
  },
  setup() {
    const isCollapsed: Ref<boolean> = ref(false);

    const toCollapsed = (): void => {
      isCollapsed.value = !isCollapsed.value;
    };

    return { list, isCollapsed, ERole, toCollapsed };
  },
});
</script>
<style lang="scss">
@import "@/assets/scss/config/mixins";

@mixin menu-item {
  display: flex;
  align-items: center;
  height: var(--aside-menu-height);
  border-radius: 8px;
  padding: 0 12px 0 13px;
  transition: all 0.3s ease-in-out;
  gap: 10px;
  border: 1px solid transparent;

  &.router-link-active {
    background-color: #4a51dd;
    span {
      color: white !important;
    }
  }

  &-title {
    @include button-1(var(--color-black-1));
    color: var(--color-black-1) !important;
    white-space: nowrap;
    overflow: hidden;
    transition: width 0.3s ease-in-out, opacity 0.3s ease-in-out;
  }

  &-icon {
    opacity: 0.6;
    fill: var(--color-black-1);
    height: var(--width-icon);
    min-width: var(--width-icon);
  }

  &-angle {
    position: absolute;
    right: 12px;
    width: 18px;
    top: 50%;
    fill: var(--color-black-1);
    transform: rotate(0deg) translateY(-50%);
  }

  &:not(.router-link-active) {
    &:hover {
      background-color: rgba(var(--color-white), 0.3);
    }
  }
}

.sider-section {
  background-color: white;
  --width-icon: 24px;
  @include devices(sm) {
    max-width: 80px !important;
  }

  .section {
    &-header {
      display: flex;
      align-items: center;
      gap: var(--space-16);
      flex-wrap: wrap;

      img {
        width: 62px;
        display: block;

        img {
          @include image;
        }
      }
      &-collapse {
        position: absolute;
        right: 0;
        background-color: #d2dbe1;
        width: 39px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 24px 0 0 24px;
        padding: var(--space-16);
      }
      &-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: var(--space-16);
      }
      &-title {
        @include body-3(var(--color-black-1));
      }
    }

    &-divider {
      border: 1px solid rgba(255, 255, 255, 0.15);
      margin: var(--space-16) 0;
    }

    &-wrapper {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: var(--space-16);
    }

    &-body {
      flex: 1;
      max-height: 100%;

      ul {
        background-color: transparent !important;

        li div,
        li {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          height: auto !important;

          &:active,
          &.ant-menu-item-selected {
            background-color: transparent !important;
          }

          i {
            color: var(--color-black-1) !important;
            transition: all 0.2s ease-in-out;
          }
        }

        li {
          position: relative;

          div {
            svg {
              &.icon-angle-bottom {
                position: absolute;
                right: 12px;
                top: 50%;
                transform: translateY(-50%);
              }
            }
          }
        }
      }

      // #endregion globally configuration

      & > ul {
        & > li {
          &:not(:last-child) {
            margin-bottom: 4px !important;
          }

          & > ul {
            padding-left: 20px !important;
            position: relative;

            &::after {
              content: "";
              position: absolute;
              left: 8px;
              top: 0;
              height: calc(100% - (var(--aside-menu-height) / 2));
              width: 1px;
              background-color: var(--color-white-1);
              opacity: 0.2;
            }

            & > li {
              margin-top: 4px !important;
              position: relative;
              overflow: unset !important;

              &::before {
                content: "";
                position: absolute;
                width: 8px;
                height: 1px;
                background-color: rgba(var(--color-white), 0.2);
                top: 50%;
                right: calc(100% + 4px);
                transform: translateY(-50%);
              }
            }
          }
        }
      }
    }

    &-menu {
      width: auto;

      &-divider {
        font-size: 16px;
        font-weight: 600;
        line-height: 140%;
        text-transform: uppercase;
        color: var(--color-black-1);
        margin: 24px 0;
      }

      &-item {
        @include menu-item();
      }
    }
  }

  .ant {
    &-menu {
      border-inline-end: none !important;

      &-submenu {
        &-title {
          border-radius: 8px;
          border: 1px solid transparent;
        }

        &-open {
          span.section-menu-item {
            border-color: rgba(var(--color-white), 0.2);
          }

          .sider-menu-item-angle {
            transform: translateY(-50%) rotate(180deg) !important;
          }
        }

        &-popup {
          background-color: transparent !important;

          ul {
            padding: 8px !important;
            border-radius: 8px;
            background: var(--color-black2) !important;

            li {
              height: auto !important;
              line-height: unset !important;
              margin-inline: unset !important;
              margin-block: unset !important;
              width: 100% !important;
              padding: 0 !important;
              height: 50px !important;

              &:not(:last-child) {
                margin-bottom: 4px !important;
              }

              &.ant-menu-item-active {
                background-color: rgba(var(--color-white), 0.3);
              }
            }
          }
        }
      }
    }

    &-layout {
      &-sider {
        background-color: rgb(35, 43, 66);

        &-children {
          height: 100%;
        }

        &-collapsed {
          .ant {
            &-menu {
              width: 100% !important;
              border-inline-end: unset !important;

              .section-menu-item {
                width: 50px;
                margin-left: 2px;

                &-title {
                  width: 0;
                  opacity: 0;
                }

                &-angle {
                  display: none;
                }

                // &-icon {
                //     margin-right: 24px;
                // }
              }
            }
          }
        }
      }
    }

    &-tooltip {
      &-content {
        transform: translateX(12px) !important;
      }

      &-inner {
        display: flex;
        align-items: center;
        padding: 3px 8px !important;

        svg {
          display: none;
        }

        span {
          @include body-4(var(--color-white-1));
        }
      }
    }
  }

  &.ant-layout-sider-collapsed {
    .section {
      &-header {
        .icon {
          margin: 0 auto;
        }

        img {
          width: calc(var(--aside-width) - var(--space-16) * 2);
        }
      }

      &-menu {
        &-item {
          --space-item: calc(
            (var(--aside-width) - var(--width-icon) - (var(--space-16) * 2)) / 2
          );
          padding: 0 var(--space-item);

          &-title {
            opacity: 0;
            width: 0px;
          }
        }
      }
    }
  }
}

.ant-tooltip {
  .section-menu-item {
    @include menu-item();

    &.router-link-active {
      background-color: transparent;
    }
  }
}
</style>
