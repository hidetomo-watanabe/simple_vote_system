<template>
  <div>
    <div v-show="!loading">
      <ul v-if="comments.length">
        <v-list three-line>
          <template v-for="(comment, index) in comments">
            <v-list-tile
                :key="index"
                avatar
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
          </template>
        </v-list>
      </ul>
      <ul v-else>
        <div class="noComment">
          <h2>コメントがありません</h2>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
  import {db} from "../plugins/firebase";

  export default {
    name: "ChatBoard",
    data () {
      return {
        theme: this.$route.params.theme,
        loading: true,
        comments: [],
      }
    },
    firestore () {
      return {
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
  .noComment {
    text-align: center;
    font-family: "Meiryo";
  }
</style>
