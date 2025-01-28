<template>
  <Upload
    :before-upload="handleFile"
    :show-upload-list="false"
    class="g-uploader"
  >
    <div class="g-uploader-card" v-if="$props.type === 'card'">
      <Icon name="image-add" custom />
      <Button icon="plus" color="green" kind="filled" />
    </div>
    <div class="g-uploader-input" v-else>
      <div class="g-uploader-input-placeholder">
        <div
          v-if="!fileName || !form[formKey]"
          class="g-uploader-input-placeholder_1"
        >
          <Icon name="drag-drop" />
          <!-- <Icon name="close" color="black-1" /> -->
          <Icon name="uploader" />
          <!-- <span>Video Yuklash</span> -->
        </div>
        <div v-else class="g-uploader-input-placeholder_1">
          <Icon name="document" class="uploader-value-icon" />
          <span>{{ fileName }}</span>
        </div>
      </div>
    </div>
  </Upload>
</template>
<script lang="ts">
import { useI18n } from "vue-i18n";
import { defineComponent, ref, PropType } from "vue";
import { Upload, message } from "ant-design-vue";
import { useHttp } from "@/api";

export default defineComponent({
  components: {
    Upload,
  },
  name: "LUploader",
  props: {
    formKey: {
      type: String,
      required: true,
    },
    isUrl: {
      type: Boolean,
      default: false,
    },
    withBaseUrl: {
      type: Boolean,
      default: false,
    },
    form: {
      type: Object,
      required: true,
    },
    type: {
      type: String as PropType<"card" | "input">,
      default: () => {
        return "input";
      },
    },
    limit: {
      type: String,
      default: "0px",
    },
  },
  setup(props) {
    const { t } = useI18n();
    const { $post } = useHttp();
    const fileName = ref<string>("");
    const handleFile = async (file: File): Promise<boolean> => {
      try {
        const maxSize = 2 * 1024 * 1024; // 2MB
        if (props.limit && props.limit !== "0px" && file.size > maxSize) {
          message.error(t("fileSizeLimit", { limit: props.limit }));
          return false;
        }

        if (props.isUrl) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("image_type", "VIDEO_POSTER");

          try {
            const response: { data?: { data?: { file_path?: string } } } =
              await $post("/upload-image", formData);
            if (response?.data?.data?.file_path) {
              props.form[props.formKey] = props.withBaseUrl
                  ? `https://backmedia.koznuri.uz/${response.data.data.file_path}`
                  : response.data.data.file_path;
              fileName.value = file.name;
              return true;
            }
            return false;
          } catch (uploadError) {
            message.error("Upload failed. Please try again.");
            console.error("Upload error:", uploadError);
            return false;
          }
        } else {
          props.form[props.formKey] = file;
          fileName.value = file.name;
          return true;
        }
      } catch (error) {
        console.error("File handling error:", error);
        message.error("An error occurred while processing the file");
        return false;
      }
    };
    return { handleFile, fileName };
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/config/mixins/typography";

.ant-upload-wrapper.g-uploader {
  display: block;

  .ant-upload {
    display: block;
  }

  .g-uploader {
    &-card {
      aspect-ratio: 1/1;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(var(--color-red), 0.1);
      border: 1px dashed rgba(var(--color-red), 0.2);
      border-radius: 8px;
      position: relative;
      z-index: 1;

      & > .g-icon-custom {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: -1;
        width: 80%;
        height: 80%;
        fill: rgba(var(--color-red), 0.1);
      }
    }

    &-input {
      border: 1px dashed var(--color-black-4);
      background: var(--color-black-8);
      display: block;
      padding: 10px 16px;
      cursor: pointer;
      border-radius: 8px;

      input {
        display: none;
      }

      &-placeholder {
        &_1 {
          display: flex;
          align-items: center;
          gap: 8px;

          span {
            overflow: hidden;
          }

          &-icons {
            display: flex;
            align-items: center;
            gap: 8px;

            svg {
              width: 22px;
              fill: var(--color-red-1);
            }

            i {
              font-size: 16px;
              color: var(--color-black-4);
            }
          }
        }
      }
    }
  }
}
</style>
