<template>
  <div v-show="!loading">
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
    data: () => ({
      loading: true,
      inputComment: "",
    }),
    firestore() {
      return {
      }
    },
    mounted() {
      // loading終了
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    },
    methods: {
      addComment() {
        const now = new Date();
        db.collection("comments").add({
          content: this.inputComment,
          avatar: "https://picsum.photos/50?image=" + (Math.floor(Math.random() * 400) + 1),
          createdAt: now,
        });
        this.inputComment = "";
      },
    },
  }
</script>
