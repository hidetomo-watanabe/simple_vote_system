<template>
  <div>
    <p>
      theme一覧
    </p>
    <div class="themes" v-for="(theme, index) in themes" :key="index">
      <router-link v-bind:to="{path: theme.name}">{{theme.name}}</router-link>
    </div>
  </div>
</template>

<script>
  import {db} from "../plugins/firebase";
  export default {
    name: "Top",
    data () {
      return {
        themes: [],
      }
    },
    firestore() {
      return {
        // firestoreのitemsコレクションを参照
        themes: db.collection("themes").orderBy("createdAt"),
      }
    }
  }
</script>

<style scoped>
</style>
