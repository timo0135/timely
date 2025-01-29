import axios from "axios";

export default {
    install: (app, {baseUrl, key}) => {
        const api = axios.create({
            baseURL: baseUrl,
            headers: {
                "Content-type": "application/json",
                "Authorization": `key=${key}`i
            },
        });
        app.config.globalProperties.$api = api;
    }
}
