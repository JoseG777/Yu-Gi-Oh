<template>
    <h1 v-if = "HideData"> Test your knowledge on Yu-Gi-Oh! </h1>
    <nav class="navbar">
      <ul>

        <li>

        <router-link to="/easy"> 

        <div v-if = "HideData">
            <h1> Easy </h1>
            <img :src="require('@/assets/yghCard.png')" alt="Logo" @click = "hide"/>
        </div>
        
        </router-link>

        </li>

        <li>

        <router-link to="/hard"> 

        <div v-if = "HideData">
            <h1> Hard </h1>
            <img :src="require('@/assets/yghCard.png')" alt="Logo" @click = "hide"/>
        </div>

        </router-link>
        
        </li>

      </ul>
    </nav>

</template>
  
<script>
 export default {
    data(){
        return{
            HideData: true
        }
    },
    methods: {
        hide(){
            this.HideData = !this.HideData
        }
    },
 }
</script>
  
<style>

.navbar {
    background-color: white;
    color: #fff;
    display: flex;
    justify-content: center;
    text-align: center;
}
  
.navbar ul {
  list-style: none;
  display: flex;
  justify-content: center;
}
  
.navbar li {
  margin: 0 10px;
}
  
.router-link-exact-active {
/* Add styles for the active link if needed */
  font-weight: bold;
}

</style>
  