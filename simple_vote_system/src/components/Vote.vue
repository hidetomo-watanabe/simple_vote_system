<template>
  <table>
    <tr>
      <td class="vote" v-for="(vote, index) in votes" :key="index">
        <h4>{{vote.name}}</h4>
        <div class="referee">{{vote.referee}}</div>
        <img :src="require('../assets/' + vote.imgPath)" :alt="vote.name" :title="vote.name">
        <div class="count">
          <button v-on:click="increment(vote)">
            <img src="../assets/good.png" alt="good" title="good">
          </button>
          {{vote.count}}
        </div>
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
  .vote {
    padding: 0px 40px;
  }
  .referee {
    color: #808080;
  }
  .count {
    text-align: center;
    font-size: 20px;
  }
</style>
