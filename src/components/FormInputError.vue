<template>
    <div v-for="(error, index) in validationErrors" :key="index" class="invalid-input-message">{{ error.$message }}</div>
</template>

<script>
export default {
    name: "FormInputError",
    props: {
        validationErrors: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style lang="sass" scoped>
@use '../assets/sass/variables' as variables
.invalid-input-message
    text-align: center
    color: variables.$color-danger
</style>
