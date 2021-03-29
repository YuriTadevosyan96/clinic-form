<template>
    <Form />
</template>

<script>
import Form from "./components/Form.vue";
export default {
    name: "App",
    components: {
        Form,
    },
};
</script>

<style lang="sass">
#app
    display: flex
    padding: 1rem
    justify-content: center
    align-items: center
</style>
