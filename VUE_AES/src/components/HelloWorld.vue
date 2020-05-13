<template>
  <div>
    <span>响应结果--></span><input v-model="desc"/><hr>
    <input v-model="name"/>

    <button @click="createEvent">提交</button>

    <button @click="searchEvent">查询</button>

  </div>
</template>

<script>
  import {create,search} from '../api/api'
  export default {
    data(){
      return{
        name:'',
        desc:''
      }
    },
    methods:{
      searchEvent(){
        search().then(res=>{
          console.log(res.data + "get 响应结果");
          if(res.data.code === '0'){this.name = res.data.data.name}
        })
      },

      createEvent(){
        create({name:this.name}).then(res=>{
          console.log(res.data.data)
          if(res.data.code === '0'){this.desc = res.data.desc}
          console.log(res.data + "post 响应结果");
        })
      }
    }
  }
</script>

<style scoped>

</style>
