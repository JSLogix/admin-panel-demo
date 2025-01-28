import { defineStore } from "pinia";

interface StateUser {
  fio?: string;
  id?: string;
  avatar?: string;
  full_name?: string;
  role?: string;
  [key: string]: any;
}
interface State {
  user?: StateUser;
  token: string;
}

export const useAuth = defineStore({
  id: "auth",
  state: (): State => ({
    user: undefined,
    token: "",
  }),
  actions: {
    toGet() {
      this.user = JSON.parse(localStorage.getItem("user") || "{}");
      this.token = localStorage.getItem("token") || "";
    },
    toSet({ token, user }: { token?: string; user?: StateUser }) {
      if (user) localStorage.setItem("user", JSON.stringify(user));
      if (token) localStorage.setItem("token", token);
    },
  },
});
