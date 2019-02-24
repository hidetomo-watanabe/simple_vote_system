<template>
  <ul v-if="items.length">
    <div class="items">
      <table>
        <tr>
          <td class="item" v-for="(item, index) in items" :key="index">
            <h4>{{item.name}}</h4>
            <div class="referee">{{item.referee}}</div>
          </td>
        </tr>
        <tr>
          <td class="item" v-for="(item, index) in items" :key="index">
            <img :src="getImgPath(item.imgPath)" :alt="item.name" :title="item.name">
          </td>
        </tr>
        <tr>
          <td class="item" v-for="(item, index) in items" :key="index">
            <div class="good">
              <button v-on:click="increment(item.id, item.count)">
                <img src="../assets/good.png" alt="good" title="good">
                <div class="count">{{item.count}}</div>
              </button>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </ul>
  <ul v-else>
    <h2>アイテムを追加してください</h2>
    <br><br>
  </ul>
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
      getImgPath (imgPath) {
        if (imgPath) {
          return imgPath
        } else {
          return require('../assets/loading.gif')
        }
      },
      increment (id, count) {
        db.collection('items').doc(id).update({"count": count + 1})
      },
    }
  }
</script>

<style scoped>
  .items {
    overflow: auto;
    white-space: nowrap;
  }
  .item {
    padding: 0px 40px;
  }
  .referee {
    color: #808080;
  }
  .good {
    text-align: center;
  }
  .count {
    position: relative;
    display: inline-block;
    margin: 0.3em 0 1.5em 15px;
    padding: 0 5px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
    text-align: center;
    color: #FFF;
    font-size: 20px;
    font-weight: bold;
    background: #0068b7;
    border-radius: 50%;
    box-sizing: border-box;
  }
  .count:before {
    content: "";
    position: absolute;
    top: 50%;
    left: -18px;
    margin-top: -10px;
    border: 10px solid transparent;
    border-right: 15px solid #0068b7;
    z-index: 0;
  }
</style>
