<template>
<div>
    <Header/>
    <div class="welcome">
      <h1>Hello {{ name }}, Welcome</h1>
    </div>
    <div class="restaurant-list">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in restaurants" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.contact }}</td>
            <td>{{ item.address }}</td>
            <td>
              <router-link :to="'/update/'+item.id">Update</router-link>
              <button @click="deleteRestaurant(item.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</div>
</template>

<script>
import Header from './Header.vue'
import axios from 'axios'
export default {
    name:"HomePage",
    data(){
        return{
            name:'',
            restaurants:[],
        }

    },
    components:{
        Header
    },
    methods:{
        async deleteRestaurant(id)
        {
            let result = await axios.delete("http://localhost:3000/restaurants/"+id);
            console.warn(result)
            if(result.status==200)
            {
                this.loadDate();
            }
        },
        async loadDate()
        {
            let user= localStorage.getItem("user-info");
            this.name=JSON.parse(user).name;
            if(!user)
            {
                this.$router.push({name:'SignUp'})
            }

            let result = await axios.get("http://localhost:3000/restaurants");
            this.restaurants = result.data;
        }
    },
    async mounted()
        {
            this.loadDate();
        }
}
</script>

<style>
.welcome {
  text-align: center;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

/* Style the actions */
td:last-child {
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

button {
  padding: 8px 15px;
  background-color: #dc3545;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #c82333;
}
</style>
