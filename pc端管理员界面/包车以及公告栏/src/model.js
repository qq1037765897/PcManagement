import model from "./components/pagemodel.js"
const template = `<model></model>`;
const config = {
    el: "#modelPage",
    components: {
        model
    },
    template,
    router,
    store
}

new Vue(config)