<template>
    <div class = "login-main">
        <p>Login</p>
        <form @submit.prevent="onSubmit">
            <input type="text" v-model = "user"  placeholder="User">
            <input type="text" v-model = "password"  placeholder="Password">
            <input type="submit" value="Submit" class="btn">
        </form>
    </div>
</template>

<script>
export default {
    name: "Login",
    methods: {
        onSubmit(){
            const lmao = {
                user:this.user,
                password:this.password
            }
            this.$emit('login',lmao);
        }
    }
}

</script>

<style scoped>
    .login-main {
        background-color: aquamarine;

    }
</style>