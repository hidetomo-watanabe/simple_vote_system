<template>
  <div>
    <div class="themes">
      <h4>テーマ一覧</h4>
      <br>
      <table border="1" cellspacing="0">
        <tr v-for="(theme, index) in themes" :key="index">
          <td>{{index}}</td>
          <td>
            <router-link v-bind:to="{path: theme.name}">{{theme.name}}</router-link>
          </td>
        </tr>
      </table>
    </div>
    <br>
    <div class="addTheme">
      <h4>テーマ追加</h4>
    </div>
    <v-form>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
                v-model="inputTheme"
                :append-icon="inputTheme ? 'send': ''"
                label="テーマ"
                type="text"
                clear-icon="close"
                clearable
                required
                @click:append="addTheme"
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
    name: "Top",
    data () {
      return {
        themes: [],
        inputTheme: "",
      }
    },
    firestore() {
      return {
        themes: db.collection("themes").orderBy("createdAt"),
      }
    },
    methods: {
      addTheme() {
        const now = new Date();
        db.collection("themes").add({
          name: this.inputTheme,
          createdAt: now,
        });
        this.clear();
      },
      // 入力データの初期化
      clear() {
        this.inputTheme = "";
      },
    },
  }
</script>

<style scoped>
  .themes {
    margin: 0 0 0 4em;
  }
  .addTheme {
    margin: 0 0 0 4em;
  }
</style>
