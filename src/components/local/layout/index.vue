<template>
  <Card v-if="!$props.isCard" padding="small">
    <ARow :gutter="[16, 0]">
      <ACol :flex="1">
        <slot name="header-action" v-bind="{ dataset, toFetch }"></slot>
      </ACol>
      <ACol v-if="isAdd">
        <ACol>
          <Button color="green" @click="toToggleModal(true)">
            <Icon name="add" color="white-1" />
            {{ $t("add") }}
          </Button>
        </ACol>
      </ACol>
    </ARow>
  </Card>
  <Table
    :columns="columns"
    :dataSource="dataset.data?.results || []"
    :loading="dataset.loading"
  >
    <template #bodyCell="{ column, record, text, index }">
      <template v-if="column.key == 'index'">
        {{ index + 1 }}
      </template>
      <template v-if="column.key === 'action'">
        <ASpace :size="12" v-if="!$props.isAction">
          <LPopconfirm @confirm="toDelete(record.id)" v-if="!$props.isDelete">
            <Button color="red" kind="alpha" icon="delete" size="small" />
          </LPopconfirm>
          <Button
            color="green"
            kind="alpha"
            icon="edit"
            size="small"
            @click="toToggleModal(true, record.id)"
          />
        </ASpace>
        <slot name="table-action" v-bind="{ record }"></slot>
      </template>
      <slot v-else name="table" v-bind="{ column, record, text, index }"></slot>
    </template>
  </Table>
  <Card>
    <ARow justify="end">
      <ACol>
        <Pagination
          :total="dataset.data.count"
          @change="() => toFetch()"
          v-model:current="dataset.params.page"
        />
      </ACol>
    </ARow>
  </Card>

  <GModal
    :width="$props.widthModal"
    @on-cancel="toToggleModal(false)"
    :open="isModal"
    title="Qo'shish"
    @on-submit="toSubmit"
  >
    <AForm
      ref="formRef"
      :rules="rules"
      :model="form"
      autocomplete="off"
      :name="`custom-layout` + $route?.fullPath"
    >
      <ARow :gutter="[24, 24]">
        <slot name="form-top" v-bind="{ form, list: dataset.data }"></slot>
      </ARow>
    </AForm>
  </GModal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { useHttp } from "@/api";
import { message, Pagination } from "ant-design-vue";
import { cloneDeep } from "sloadash";
import { Rules } from "@/utilities/mixins";
import { Card, LPopconfirm, GModal, FormItem, Table } from "../index";

export default defineComponent({
  components: { Card, Table, LPopconfirm, GModal, FormItem, Pagination },
  props: {
    isCard: {
      type: Boolean,
      default: false,
    },
    additional: {
      type: Object,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    widthModal: {
      type: String,
      default: "600px",
    },
    isFormData: {
      type: Boolean,
      default: false,
    },
    module: {
      type: String,
      required: true,
    },
    isAction: {
      type: Boolean,
      default: false,
    },
    isAdd: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { expose }) {
    const { $get, $post, $delete, $patch } = useHttp();
    const isModal = ref<boolean>(false);
    const form = reactive({ ...props?.additional?.form });
    const rules = Rules(props.additional?.rules);
    const formRef = ref();

    const dataset = reactive({
      data: <any>{},
      params: { ...props?.additional?.params, limit: 10, page: 1 },
      loading: false,
    });

    const columns = [
      {
        title: "№",
        width: "1%",
        key: "index",
      },
      ...(cloneDeep(props?.additional?.columns) || []),
      {
        key: "action",
        dataIndex: "",
        width: "1%",
      },
    ];

    // methods
    const toToggleModal = (_bool: boolean, _id?: number | string): void => {
      if (_id) {
        toFetchDetail(_id);
      }
      isModal.value = _bool;
    };
    const toSetValidateLang = (): void => {
      Object.keys(form).forEach((key): void => {
        if (
          typeof form[key] === "object" &&
          "uz" in form[key] &&
          "ru" in form[key] &&
          "en" in form[key]
        ) {
          // rules[key] = {
          //   validator: toValidateLang,
          //   trigger: "blur",
          //   message: "Ushbu qator to'ldirilishi shart !",
          // };
        }
      });
    };

    const toSubmit = (): void => {
      if (form?.id) {
        toUpdate();
      } else {
        toPost();
      }
    };

    const toResetForm = (): void => {
      Object.keys(form).forEach((key): void => {
        delete form[key];
      });
      Object.assign(form, cloneDeep(props?.additional?.form) || {});
    };

    //server acion method

    const toDelete = async (_id: number | string): Promise<void> => {
      dataset.loading = true;
      try {
        await $delete(props.module + `/${_id}`);
        await toFetch();
      } catch {
        message.error(
          "Server bilan bog‘lanishda xatolik yuz berdi. Iltimos, keyinroq urinib ko‘ring."
        );
      } finally {
        dataset.loading = false;
      }
    };

    const toFetch = async (): Promise<void> => {
      dataset.loading = true;
      try {
        const response = await $get(props.module + "/list", {
          ...dataset.params,
        });
        if (response?.data?.status) {
          dataset.data = response?.data?.data || response?.data || {};
        }
      } catch (err) {
        console.log(err);
        message.error(
          "Server bilan bog‘lanishda xatolik yuz berdi. Iltimos, keyinroq urinib ko‘ring."
        );
      } finally {
        dataset.loading = false;
      }
    };

    const toFetchDetail = async (_id: string | number): Promise<void> => {
      dataset.loading = true;
      try {
        const { data, statusText } = await $get(props.module + `/${_id}`);
        if (statusText == "OK") {
          Object.assign(form, cloneDeep(data.data));
        } else {
          message.error(
            "Server bilan bog‘lanishda xatolik yuz berdi. Iltimos, keyinroq urinib ko‘ring."
          );
        }
      } catch (err) {
        console.log(err);
        message.error(
          "Server bilan bog‘lanishda xatolik yuz berdi. Iltimos, keyinroq urinib ko‘ring."
        );
      } finally {
        dataset.loading = false;
      }
    };

    const toPost = async (): Promise<void> => {
      dataset.loading = true;
      try {
        formRef.value.validate().then(async (): Promise<void> => {
          let newForm = form;
          if (props.isFormData) {
            // newForm = toSetFormData(form);
          }
          const response = await $post(props.module + "/create", newForm);
          if (response.statusText == "OK") {
            message.success("Yaratildi");
          } else {
            message.error(
              "Server bilan bog‘lanishda xatolik yuz berdi. Iltimos, keyinroq urinib ko‘ring."
            );
          }
          toResetForm();
          await toFetch();
          toToggleModal(false);
        });
      } catch (err) {
        console.log(err);
        message.error(
          "Server bilan bog‘lanishda xatolik yuz berdi. Iltimos, keyinroq urinib ko‘ring."
        );
      } finally {
        dataset.loading = false;
      }
    };

    const toUpdate = async (): Promise<void> => {
      dataset.loading = true;
      try {
        formRef.value.validate().then(async (): Promise<void> => {
          let newForm = form;
          if (props.isFormData) {
            // newForm = toSetFormData(form);
          }
          const response = await $patch(props.module + "/update", newForm);
          if (response.statusText == "OK") {
            message.success("Yangilandi");
          } else {
            message.error(
              "Server bilan bog‘lanishda xatolik yuz berdi. Iltimos, keyinroq urinib ko‘ring."
            );
          }
          toResetForm();
          await toFetch();
          toToggleModal(false);
        });
      } catch (err) {
        console.log(err);
        message.error(
          "Server bilan bog‘lanishda xatolik yuz berdi. Iltimos, keyinroq urinib ko‘ring."
        );
      } finally {
        dataset.loading = false;
      }
    };

    toFetch();
    toSetValidateLang();
    expose({ toFetch });
    // defineExpose({
    //   toFetch,
    // });

    return {
      columns,
      toDelete,
      toToggleModal,
      isModal,
      form,
      rules,
      formRef,
      dataset,
      toSubmit,
      toFetch,
    };
  },
});
</script>
