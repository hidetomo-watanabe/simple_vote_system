<template>
  <div>
    <div v-show="!loading">
      <v-list three-line>
        <template v-for="(comment, index) in comments">
          <v-list-tile
              :key="index"
              avatar
          >
            <v-list-tile-avatar>
              <img :src="comment.avatar">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-sub-title class="text--primary subheading">{{comment.content}}</v-list-tile-sub-title>
              <v-list-tile-sub-title>
                {{comment.createdAt.toDate().toLocaleString()}}
                <v-icon @click="deleteComment(comment.id)" small>delete</v-icon>
              </v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider :key="comment.id"></v-divider>
        </template>
      </v-list>
    </div>
  </div>
</template>

<script>
  import {db} from "../plugins/firebase";

  export default {
    name: "ChatBoard",
    data: () => ({
      loading: true,
      comments: [],
    }),
    firestore() {
      return {
        // firestoreのcommentsコレクションを参照
        comments: db.collection("comments").orderBy("createdAt"),
      }
    },
    mounted() {
      // loading終了
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    },
    methods: {
      deleteComment(id) {
        if (!confirm("コメントを削除してよろしいですか？")) {
          return
        }
        db.collection("comments").doc(id).delete()
      },
    },
  }
</script>
