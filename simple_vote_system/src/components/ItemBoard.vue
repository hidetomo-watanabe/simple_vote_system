<template>
  <div>
    <div class="loading" v-show="loading">
      <img src="../assets/loading_page.gif" alt="loading_page" title="loading_page">
    </div>
    <div v-show="!loading">
      <ul v-if="items.length">
        <div class="items">
          <table>
            <tr>
              <td class="item" v-for="(item, index) in items" :key="index">
                <h4>
                  {{item.name}}
                  <button v-on:click="deleteItem(item.id, item.name, item.filename)">
                    <v-icon small>delete</v-icon>
                  </button>
                </h4>
                <div class="referee">{{item.referee}}</div>
              </td>
            </tr>
            <tr>
              <td class="item" v-for="(item, index) in items" :key="index">
                <img class="itemImg" :src="getImgPath(item.imgPath)" :alt="item.name" :title="item.name">
              </td>
            </tr>
            <tr>
              <td class="item" v-for="(item, index) in items" :key="index">
                <div class="good">
                  <div v-show="isGoodPushed(index)">
                    <img src="../assets/good_gray.png" alt="good_gray" title="good_gray">
                    <div class="count">{{item.count}}</div>
                  </div>
                  <div v-show="!isGoodPushed(index)">
                    <button v-on:click="incrementCount(index, item.id, item.count)">
                      <img src="../assets/good.png" alt="good" title="good">
                    </button>
                    <div class="count">{{item.count}}</div>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </ul>
      <ul v-else>
        <div class="noItem">
          <h2>アイテムがありません</h2>
        </div>
        <br><br>
      </ul>
    </div>
  </div>
</template>

<script>
  import {db} from "../plugins/firebase";
  import {storage} from "../plugins/firebase";

  export default {
    name: "ItemBoard",
    data () {
      return {
        theme: this.$route.params.theme,
        loading: true,
        isGoodPushedList: [],
        items: [],
      }
    },
    firestore () {
      return {
        items: db.collection("items").where("theme", "==", this.theme).orderBy("count", "desc").orderBy("createdAt"),
      }
    },
    mounted () {
      // loading終了
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    },
    methods: {
      getImgPath (imgPath) {
        if (imgPath) {
          return imgPath;
        } else {
          return require("../assets/loading_image.gif");
        }
      },
      deleteItem (id, name, filename) {
        var res = confirm(`${name}を削除しますか？`);
        if (res !== true) {
          return;
        }
        storage.ref().child(`images/${filename}`).delete();
        db.collection("items").doc(id).delete();
      },
      // goodを押したかどうか
      isGoodPushed (index) {
        if (this.isGoodPushedList.indexOf(index) == -1) {
          return false;
        } else {
          return true;
        }
      },
      incrementCount (index, id, count) {
        this.isGoodPushedList.push(index);
        db.collection("items").doc(id).update({"count": count + 1});
      },
    }
  }
</script>

<style scoped>
  .loading {
    text-align: center;
  }
  /*ホワイトボード風*/
  .items {
    overflow: auto;
    position: relative;
    margin: 2em auto 0 2.5em;
    padding: 3.5em 1em 1em;
    width: 93%; /* ボックス幅 */
    background-color: #fffff9; /* ボックス背景色 */
    color: #000; /* 文章色 */
    border: 5px solid #e6b422; /* 枠線 */
    border-radius: 3px; /* 角の丸み */
    box-shadow: 0 0 8px #333, 0 0 2px #555 inset;
  }
  .items::before,
  .items::after {
    position: absolute;
    content: '';
    width: 25px;
    bottom: 3px;
    border-radius: 2px;
    box-shadow: 1px 1px 3px #666;
  }
  .items::before {
    right: 55px;
    border: solid 3px #333333; /*飾ペン黒*/
  }
  .items::after {
    right: 20px;
    border: solid 3px #ff42a0; /*飾ペンピンク*/
    transform: rotate(8deg); /*飾ペン角度*/
  }
  .item {
    padding: 0 40px;
  }
  .itemImg {
    border: solid 1pt #808080;
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
    width: 35px;
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
  .noItem {
    text-align: center;
    font-family: "Meiryo";
  }
</style>
