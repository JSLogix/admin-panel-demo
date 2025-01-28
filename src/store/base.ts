type TypeMenu = {
  title: string;
  path: string;
  icon?: string;
  children?: TypeMenu[];
  isHidden?: boolean;
  component?: any;
};

interface State {
  breadcrumbs: TypeMenu[];
  lang: ELang;
  isSiderCollapsed: boolean;
  pagesTitle: string;
  lightbox?: any;
}
import { defineStore } from "pinia";
import { ELang } from "@/utilities/enums";
export const useBase = defineStore({
  id: "base",
  state: (): State => ({
    pagesTitle: "",
    isSiderCollapsed: false,
    lang: ELang.UZ,
    breadcrumbs: [],
    lightbox: {
      index: 0,
      images: undefined,
      isActive: false,
    },
  }),

  actions: {
    toSetPagesTitle(value: string) {
      this.pagesTitle = value;
    },
    toToggleSiderCollapse() {
      this.isSiderCollapsed = !this.isSiderCollapsed;
    },
    toResetLang() {
      this.lang = ELang.UZ;
    },
    toSetBreadcrumbs(
      targetPath: string,
      currentMenu: TypeMenu[] | undefined | null
    ) {
      if (!currentMenu) {
        return;
      }
      for (let i = 0; i < currentMenu.length; i++) {
        if (currentMenu[i].path === targetPath) {
          this.breadcrumbs.push(currentMenu[i]);
        } else if (targetPath.includes(currentMenu[i].path)) {
          this.breadcrumbs.push(currentMenu[i]);
          this.toSetBreadcrumbs(targetPath, currentMenu[i].children);
        }
      }
    },
    toggleLightBox(_value: boolean, _images?: any) {
      this.lightbox.isActive = _value;
      if (_images) {
        this.lightbox.images = _images;
      }
      if (!_value) {
        this.lightbox.images = undefined;
      }
    },
  },
});
