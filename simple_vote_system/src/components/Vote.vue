<template>
  <table>
    <tr>
      <td v-for="(vote, index) in votes" :key="index">
        <h4>{{vote.target}}</h4>
        <img :src="require('../assets/' + vote.imgPath)" :alt="vote.target" :title="vote.target">
        <h3>{{vote.count}}</h3>
        <button v-on:click="increment(vote)">
          <img src="../assets/good.png" alt="good" title="good">
        </button>
      </td>
    </tr>
  </table>
</template>

<script>
  import {db} from '../plugins/firebase';

  export default {
    name: 'Vote',
    data () {
      return {
        votes: [],
      }
    },
    firestore() {
      return {
        // firestoreのvotesコレクションを参照
        votes: db.collection('votes').orderBy('createdAt'),
      }
    },
    methods: {
      increment (vote) {
        var obj = db.collection('votes').doc(vote.id)
        obj.update({"count": vote.count + 1})
      },
    }
  }
</script>

<style scoped>
</style>
