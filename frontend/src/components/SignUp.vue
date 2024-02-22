<template>
    <img class="logo" src="../assets/chili.jpg"/>
    <h1>Sign Up</h1>
    <div class="register">
        <input type="text" v-model="name" placeholder="Enter Name" />
        <input type="email" v-model="email" placeholder="Enter Email" />
        <input type="password" v-model="password" placeholder="Enter Password" />
        <input type="text" v-model="birthdate" placeholder="Enter Birthdate (JJ/MM/AAAA)" />
        <button v-on:click="signUp" >Sign Up</button>
        <p>
            <router-link to="/login">Login</router-link>
        </p>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'SignUp',
    data() {
        return {
            name: '',
            email: '',
            password: '',

        }
    },
    methods: {
        async signUp() {
            if (!this.validateInputs()) {
                return;
            }
            
            let result = await axios.post("http://localhost:3000/users", {
                email: this.email,
                password: this.password,
                name: this.name
            });

            console.warn(result);
            if (result.status == 201) {
                alert("sign-up success");
                localStorage.setItem("user-info", JSON.stringify(result.data));
                this.$router.push({ name: 'Home' });
            }
        },
        
        validateInputs() {
            // Validation du nom (au moins 3 caractères)
            if (this.name.length < 3) {
                alert("Le nom doit avoir au moins 3 caractères.");
                return false;
            }
            
            // Validation de l'email (suivre le regex)
            let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.email)) {
                alert("Veuillez entrer une adresse e-mail valide.");
                return false;
            }

            // Validation du mot de passe (au moins 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial)
            let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(this.password)) {
                alert("Le mot de passe doit avoir au moins 8 caractères, incluant au moins une majuscule, une minuscule, un chiffre et un caractère spécial.");
                return false;
            }

            
        }
    },
    mounted() {
        let user = localStorage.getItem("user-info");
        if (user) {
            this.$router.push({ name: 'Home' });
        }
    }
}
</script>

<style>

</style>
