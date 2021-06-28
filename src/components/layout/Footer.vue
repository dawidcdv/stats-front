<template>
  <div class="footer">
    <div class="wrapper">
        <div class="copyright">
          <span>Copyright © 2021 Dawid Jóźwiak</span>
        </div>
        <div class="menu">
            <ul>
              <li>
                <router-link :to="{'name' : 'Main'}" tag="a">Home</router-link>
              </li>
              <li>
                <router-link :to="{'name' : 'Statistics'}" tag="a">Statystyki</router-link>
              </li>
            </ul>
          </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
.footer{
  height: 100px;
}
.wrapper{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
.copyright{
  flex : 1;
  text-align: start;
}
.menu{
  flex : 1;
}

li a {
  display: block;
  color: grey;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none !important;
}
ul {
  list-style-type: none;
  width: 100%;
  justify-content: end;
  display: flex;
  flex-direction: row;

}
li a:hover:not(.active) {
  color: #4e4e4e;
}
</style>