<template>
  <div class="flex flex-col flex-1 h-screen w-screen overflow-y-hidden">
    <div class="invisible md:visible blur-sm pointer-events-none">
      <router-view name="HomeView"></router-view>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { RouterView } from "vue-router";

export default {
  components: {
    RouterView,
  },
};
</script>

<style>
body {
  background: linear-gradient(
    187.16deg,
    #181623 0.07%,
    #191725 51.65%,
    #0d0b14 98.75%
  );
  background-repeat: no-repeat;
  background-attachment: fixed;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
</style>
