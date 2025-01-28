import router from "@/router/index";
import { useAuth } from "@/store/auth";

export default function setupRouteGuards() {
  router.beforeEach((to, _from, next) => {
    const { token } = useAuth();
    const localToken = localStorage.getItem("token");
    const isAuthenticated = token || localToken;
    const authPath = "/auth/sign-in";

    if (to.path == "/" && localToken) {
      return next("/admin/dashboard");
    }

    if (isAuthenticated && to.path === authPath) {
      return next("/admin/dashboard");
    }

    if (!isAuthenticated) {
      if (to.path !== authPath) {
        return next(authPath);
      }
    }

    next();
  });
}
