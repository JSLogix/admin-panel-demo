import type { App, Component } from "vue";

import Icon from "./icon.vue";
import Button from "./button.vue";
import Select from "./select.vue";
import Input from "./input.vue";

interface LGComponent {
  conf: Component;
  name: string;
}

const LGComponents: LGComponent[] = [
  { conf: Icon, name: "Icon" },
  { conf: Button, name: "Button" },
  { conf: Select, name: "Select" },
  { conf: Input, name: "Input" },
];

export const toSetupGlobalComponents = (app: App): void => {
  LGComponents.forEach(({ conf, name }) => {
    app.component(name, conf);
  });
};
