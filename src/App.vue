<template>
    <div id="app" class="app">
        <div class="app__form">
            <Form />
        </div>
    </div>
</template>

<script>
import Form from './components/Form.vue';

export default {
    name: 'App',
    components: {
        Form,
    },
};
</script>

<style>
.app {
    padding: 24px;
    box-sizing: border-box;
    background-color: #fafafa;
}

.app__form {
    width: 100%;
    max-width: 800px;
    margin: 20px auto;
}
</style>
