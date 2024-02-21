<template>
    <Header/>
    <h1>Hello {{name}}, Welcome to the Update Page</h1>
    <form class="add">
        <input type="text" name="name" placeholder="Enter Name" v-model="restaurant.name"/>
        <input type="text" name="address" placeholder="Enter Address" v-model="restaurant.address"/>
        <input type="text" name="contact" placeholder="Enter contact" v-model="restaurant.contact"/>
        <button type="button" v-on:click="updateRestaurant">Update Restaurant</button>
    </form>
</template>

<script>
import Header from './Header.vue';
import axios from 'axios';
export default {
    name:"UpdatePage",
    components:{
        Header
    },
    data()
    {
        return{
            restaurant:{
                name:'',
                address:'',
                contact:''
            }
        }
    },
    methods:{
        async updateRestaurant(){

            console.warn(this.restaurant)
            const result = await axios.put("http://localhost:3000/restaurants/"+this.$route.params.id,{
                name:this.restaurant.name,
                address:this.restaurant.address,
                contact:this.restaurant.contact
            });
            if(result.status==200)
            {
                this.$router.push({name:'Home'})
            }

        }
    },
    async mounted()
        {
            let user= localStorage.getItem("user-info");
            this.name=JSON.parse(user).name;
            if(!user)
            {
                this.$router.push({name:'SignUp'})
            }
            const result = await axios.get('http://localhost:3000/restaurants/'+ this.$route.params.id)
            console.warn(result.data)
            this.restaurant=result.data
        }
}
</script>