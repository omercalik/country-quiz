<template>
  <GameContainer />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import GameContainer from "./components/GameContainer.vue"

export default defineComponent({
  name: "App",
  components: {
    GameContainer,
  },
})
</script>

<style lang="scss">
#app {
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-image: url("./assets/background.png");
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
