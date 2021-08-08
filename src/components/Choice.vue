<template>
  <div class="choice">
    {{ question }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
export default defineComponent({
  name: "Choice",
  props: ["question"],
})
</script>

<style lang="scss">
$hover-yellow: #f9a826;
$wrong-red: #ea8282;
$correct-green: #60bf88;
$blue: rgba(96, 102, 208, 0.8);

.choice {
  width: 380px;
  border-radius: 12px;
  border: 2px solid $blue;
  color: $blue;
  margin-bottom: 30px;
  margin-left: 25px;
  padding-left: 30px;
  padding-top: 15px;
  padding-bottom: 15px;

  &:hover {
    background: $hover-yellow;
    color: white;
    border-color: $hover-yellow;
    cursor: pointer;
  }

  @media screen and (max-width: 460px) {
    width: 80%;
    margin-left: 18px;
  }
}

.false {
  background-color: $wrong-red;
  color: white;
}

.correct {
  background-color: $correct-green;
  color: white;
}
</style>
