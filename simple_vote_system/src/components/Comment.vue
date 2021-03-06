<template>
  <div v-show="!loading">
    <br>
    <div class="selectHashtags">
      <table>
        <tr>
          <td v-for="(item, index) in items" :key="index">
            <div v-show="isSelectedHashtag(item.name)">
              <v-btn
                  class="selectHashtag"
                  color="#DDDDDD"
                  depressed
                  v-on:click="resetHashtag()"
              >
                #{{item.name}}
              </v-btn>
            </div>
            <div v-show="!isSelectedHashtag(item.name)">
              <v-btn
                  class="selectHashtag"
                  color="#808080"
                  v-on:click="setHashtag(item.name)"
              >
                #{{item.name}}
              </v-btn>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <v-form>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
                v-model="inputComment"
                :append-icon="inputComment ? 'send': ''"
                label="コメント"
                type="text"
                clear-icon="close"
                clearable
                required
                @click:append="addComment"
            >
            </v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
    <ul v-if="comments.length">
      <v-list class="comments">
        <div v-for="(comment, index) in comments" :key="index">
          <div class="comment" v-show="isDisplayComment(comment.hashtag)">
            <v-list-tile
                :key="index"
            >
              <v-list-tile-content>
                <v-list-tile-sub-title class="text--primary subheading">{{comment.content}}</v-list-tile-sub-title>
                <v-list-tile-sub-title>
                  {{comment.createdAt.toDate().toLocaleString()}}
                  <v-icon @click="deleteComment(comment.id)" small>delete</v-icon>
                  {{comment.hashtag}}
                </v-list-tile-sub-title>
              </v-list-tile-content>

            </v-list-tile>
            <v-divider :key="comment.id"></v-divider>
          </div>
        </div>
      </v-list>
    </ul>
    <ul v-else>
      <div class="noComment">
        <h2>コメントがありません</h2>
      </div>
    </ul>
  </div>
</template>

<script>
  import {db} from "../plugins/firebase";

  export default {
    name: "Comment",
    data () {
      return {
        theme: this.$route.params.theme,
        loading: true,
        // 表示と入力でhashtagを分けておく
        selectedHashtag: "",
        inputHashtag: "",
        inputComment: "",
        items: [],
        comments: [],
      }
    },
    firestore () {
      return {
        items: db.collection("items").where("theme", "==", this.theme).orderBy("count", "desc").orderBy("createdAt"),
        comments: db.collection("comments").where("theme", "==", this.theme).orderBy("createdAt"),
      }
    },
    mounted () {
      // loading終了
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    },
    methods: {
      isSelectedHashtag (itemName) {
        if (this.selectedHashtag === "#" + itemName) {
          return true;
        } else {
          return false;
        }
      },
      isDisplayComment (hashtag) {
        if (!this.selectedHashtag) {
          return true;
        }
        if (this.selectedHashtag === hashtag) {
          return true;
        } else {
          return false;
        }
      },
      resetHashtag () {
        this.selectedHashtag = "";
        this.inputHashtag = "";
      },
      setHashtag (name) {
        this.selectedHashtag = "#" + name;
        this.inputHashtag = "#" + name;
      },
      addComment () {
        const now = new Date();
        db.collection("comments").add({
          theme: this.theme,
          content: this.inputComment,
          hashtag: this.inputHashtag,
          createdAt: now,
        });
        this.clear();
      },
      // 入力データの初期化
      clear () {
        this.resetHashtag();
        this.inputComment = "";
      },
      deleteComment (id) {
        if (!confirm("コメントを削除してよろしいですか？")) {
          return
        }
        db.collection("comments").doc(id).delete()
      },
    },
  }
</script>

<style scoped>
  .selectHashtags {
    overflow: auto;
  }
  .selectHashtag {
    margin: 0 0 0 1.8em;
    color: #FFF;
    font-weight: bold;
  }
  .comments {
    background-color: #FAFAFA;
  }
  /*テープ風*/
  .comment {
    position: relative;
    width: 90%;
    margin: 2.5em auto;
    padding: 35px 30px 20px;
    color: #770000;/* 文字色 */
    background-color: #e8ddbd; /*枠背景色*/
    box-shadow: inset 0 0 40px rgba(204, 186, 136,1), 0 2px 2px #ccc;
  }
  .comment::before {
    display: block;
    position: absolute;
    content: "";
    width: 140px;
    height: 35px;
    left: 35%;
    top: -16px;
    background-color: rgba(204, 186, 136, 0.3);/*テープ色*/
    box-shadow: 0 0 3px rgba(0,0,0,0.1);
    transform: rotate( -3deg ); /*テープ角度*/
  }
  .noComment {
    text-align: center;
    font-family: "Meiryo";
  }
</style>
