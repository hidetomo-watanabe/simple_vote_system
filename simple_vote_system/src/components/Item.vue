<template>
  <table>
    <tr>
      <td class="item" v-for="(item, index) in items" :key="index">
        <h4>{{item.name}}</h4>
        <div class="referee">{{item.referee}}</div>
      </td>
    </tr>
    <tr>
      <td class="item" v-for="(item, index) in items" :key="index">
        <img :src="require('../assets/' + getFilename(item.filename))" :alt="item.name" :title="item.name">
      </td>
    </tr>
    <tr>
      <td class="item" v-for="(item, index) in items" :key="index">
        <div class="count">
          <button v-on:click="increment(item.id, item.count)">
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
      getFilename (filename) {
        if (filename) {
          return filename
        } else {
          return 'noimage.png'
        }
      },
      increment (id, count) {
        var obj = db.collection('items').doc(id)
        obj.update({"count": count + 1})
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
