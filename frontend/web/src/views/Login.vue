<template>
    <div class = "login-main">
        <p>Login</p>
        <form @submit.prevent="onSubmit">
            <div class = "input-field">
                <input type="text" v-model = "user"  placeholder="User">
            </div>
            <div class = "input-field">
                <input type="password" v-model = "password"  placeholder="Password">
            </div>
            
            <div v-if="thereisinput">
                <input class = "input-button" type="submit" value="Submit">
            </div>
            
        </form>

        <router-link to="/register">Register</router-link>


    </div>
</template>

<script>
export default {
    name: "Login",
    data(){
        return {
            user: "",
            password:""
        }
    },
    computed: {
        thereisinput(){
            if (this.user.length==0){
                return false
            }
            console.log("test")
            return true
        }
    },
    methods: {
        onSubmit(){
            if (this.password.length>0 && this.user.length>0){
                /*const info = {
                user:this.user,
                password:this.password
                }*/
                localStorage.setItem('jwt',this.password)
                console.log("set the jwt")
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
        text-align: center;

    }

    .input-field {
        
        padding: 20px;

    }

    .input-button {
        background-color: green;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        font-size: 20px;
        display: inline-block;
        text-decoration: none;
        transition-duration: 0.4s;
    }
    .input-button:hover{
        background-color: white;
        color:green;
    }
    
</style>