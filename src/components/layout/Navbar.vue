<template>
    <div id="navbar">
      <ul>
        <li>
          <router-link :to="{'name' : 'Main'}" tag="a"><i class="pi  pi-chart-line" ></i></router-link>
        </li>
        <li>
          <router-link :to="{'name' : 'Statistics'}" tag="a"><i class="pi pi-book" ></i></router-link>
        </li>
        <li>
          <router-link :to="{'name' : 'StatisticsUpload'}" tag="a"><i class="pi pi-file-o"></i></router-link>
        </li>
      </ul>
    </div>
</template>

<script>
import Menubar from 'primevue/menubar';
export default {
  name: "Navbar",
  components:{
    Menubar
  },
  setup:()=>{
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  width: 100%;
}

li {
  float: left;
}
li:first-child{
  /*margin-right: 3rem;*/
}

li a {
  display: block;
  color: grey;
  text-align: center;
  padding: 1.4rem 1.6rem;
  text-decoration: none;
}

li a:hover:not(.active) {
  color: #4e4e4e;
}
i{
  font-size:2rem
}

</style>