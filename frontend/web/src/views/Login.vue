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
            if (this.password.length>0 && this.user.length>0){
                /*const info = {
                user:this.user,
                password:this.password
                }*/
                localStorage.setItem('jwt',this.password)
                //this.$emit('login',info);
                this.$router.push('Summary')
            }
            
        }
    }
}

</script>

<style scoped>
    .login-main {
        background-color: aquamarine;

    }
</style>