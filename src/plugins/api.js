import axios from "axios";
import {useAuthStore} from "@/stores/authentification.js";

export default {
  install: (app, {baseUrl}) => {
    app.config.globalProperties.$api = () => {
      const store = useAuthStore();
      if (!store.user.apikey) {
        return;
      }
      return axios.create({
        baseURL: baseUrl,
        headers: {
          "Content-type": "application/json",
          "Authorization": `key=${store.user.apikey}`,
        },
      });
    };
  }
};
