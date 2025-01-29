import axios from "axios";
import { useAuthStore } from "./stores/authentification";

const store = useAuthStore();

export default {
    install: (app, {baseUrl}) => {
        if(!store.user.apikey) {
            return;
        }
        const api = axios.create({
            baseURL: baseUrl,
            headers: {
                "Content-type": "application/json",
                "Authorization": `key=${store.user.apikey}`,
            },
        });
        app.config.globalProperties.$api = api;
    }
}
