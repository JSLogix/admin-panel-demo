<template>
  <Modal
    class="modal"
    :footer="false"
    @cancel="$emit('onCancel')"
    :width="$props.width"
  >
    <div class="modal-wrapper">
      <div class="modal-header" :class="{ 'modal-header-center': !hasClose }">
        <h2>{{ title }}</h2>
      </div>
      <div class="modal-body">
        <slot> </slot>
      </div>
      <div class="modal-footer" v-if="hasFooter">
        <ARow v-if="!$slots.footer" :gutter="[16, 0]">
          <ACol span="12">
            <KeepAlive>
              <Button color="black" size="default" @click="$emit('onCancel')">
                {{ $t("cancel") }}
              </Button>
            </KeepAlive>
          </ACol>
          <ACol span="12">
            <KeepAlive>
              <Button
                color="green"
                kind="filled"
                size="default"
                @click="$emit('onSubmit')"
                >{{ $t("submit") }}</Button
              >
            </KeepAlive>
          </ACol>
        </ARow>
        <slot name="footer"></slot>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Modal } from "ant-design-vue";

export default defineComponent({
  components: {
    Modal,
  },
  props: {
    title: {
      type: String,
    },
    hasFooter: {
      type: Boolean,
      default: true,
    },
    hasClose: {
      type: Boolean,
      default: true,
    },
    width: {
      default: "600px",
    },
  },
  emits: ["onCancel", "onSubmit"],
});
</script>

<style lang="scss">
@import "@/assets/scss/config/mixins";
.ant-modal.modal {
  .ant-modal {
    &-close {
      width: auto;
      height: auto;
      top: 16px;

      &-x {
        svg {
          color: var(--color-black-4);
          display: block;
          width: 24px;
          height: 24px;
        }
      }
    }
  }
  .modal {
    &-wrapper {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    &-header {
      h2 {
        @include subtitle-2;
      }
      &-center {
        h2 {
          text-align: center;
        }
      }
    }
    &-body {
      display: flex;
      flex-direction: column;
      gap: 24px;
      margin-top: 4px;
    }
    &-footer {
      max-width: 500px;
      width: 100%;
      margin: 0 auto;
      .button {
        width: 100%;
      }
    }
  }
}
</style>
