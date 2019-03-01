<template>
  <div v-show="!loading">
    <br>
    <table>
      <tr>
        <td v-for="(item, index) in items" :key="index">
          <div v-show="checkHashtag(index)">
            <v-btn
                class="setHashtag"
                color="#DDDDDD"
                depressed
                v-on:click="resetHashtag()"
            >
              #{{item.name}}
            </v-btn>
          </div>
          <div v-show="!checkHashtag(index)">
            <v-btn
                class="setHashtag"
                color="#808080"
                v-on:click="setHashtag(index, item.name)"
            >
              #{{item.name}}
            </v-btn>
          </div>
        </td>
      </tr>
    </table>
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
  </div>
</template>

<script>
  import {db} from "../plugins/firebase";

  export default {
    name: "ChatForm",
    data () {
      return {
        theme: this.$route.params.theme,
        loading: true,
        isPush: "",
        inputComment: "",
        inputHashtag: "",
        items: [],
      }
    },
    firestore () {
      return {
        items: db.collection("items").where("theme", "==", this.theme).orderBy("createdAt"),
      }
    },
    mounted () {
      // loading終了
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    },
    methods: {
      // hashtagが選択されているか
      checkHashtag (index) {
        if (this.isPush === index) {
            return true;
        } else {
            return false;
        }
      },
      resetHashtag () {
        this.isPush = "";
        this.inputHashtag = "";
      },
      setHashtag (index, name) {
        this.isPush = index;
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
    },
  }
</script>

<style scoped>
  .setHashtag {
    margin: 0 0 0 1.8em;
    color: #FFF;
    font-weight: bold;
  }
</style>
