<template>
  <table>
    <tr>
      <td class="item" v-for="(item, index) in items" :key="index">
        <h4>{{item.name}}</h4>
        <div class="referee">{{item.referee}}</div>
        <img :src="require('../assets/' + item.imgPath)" :alt="item.name" :title="item.name">
        <div class="count">
          <button v-on:click="increment(item)">
            <img src="../assets/good.png" alt="good" title="good">
          </button>
          {{item.count}}
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
  import {db} from '../plugins/firebase';

  export default {
    name: 'Item',
    data () {
      return {
        items: [],
      }
    },
    firestore() {
      return {
        // firestoreのitemsコレクションを参照
        items: db.collection('items').orderBy('createdAt'),
      }
    },
    methods: {
      increment (item) {
        var obj = db.collection('items').doc(item.id)
        obj.update({"count": item.count + 1})
      },
    }
  }
</script>

<style scoped>
  .item {
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
