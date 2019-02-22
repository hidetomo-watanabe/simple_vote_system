<template>
  <div>
    <!--フォームの表示ボタン-->
    <v-btn
        color="blue"
        dark
        center
        fab
        fixed
        right
        @click="showCreateForm"
    >
      <v-icon>edit</v-icon>
    </v-btn>
    <v-dialog v-model="displayForm" max-width="500px">
      <!--アイテム入力フォーム-->
      <v-card>
        <v-container>
          <h2>アイテム追加</h2>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
                v-model="inputItemName"
                :rules="ItemRules"
                label="アイテム名"
                required
            ></v-text-field>
            <v-text-field
                v-model="inputItemReferee"
                :rules="ItemRules"
                label="投稿者"
                required
            ></v-text-field>
            <v-btn
                :disabled="!valid"
                @click="addItem"
            >
              アイテム追加
            </v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import {db} from '../plugins/firebase';

  export default {
    components: {
    },
    data: () => ({
      // form入力データ
      inputItemName: "",
      inputItemReferee: "",
      // バリデーション
      valid: true,
      ItemRules: [
        v => !!v || 'コメントは必須項目です',
      ],
      // Formダイアログの表示可否
      displayForm: false,
    }),
    methods: {
      // アイテム追加
      addItem() {
        const now = new Date()
        // コメントをFirestoreへ登録
        db.collection('items').add({
          name: this.inputItemName,
          referee: this.inputItemReferee,
          count: 0,
          createdAt: now,
        })
        // ダイアログを閉じる
        this.hideCreateForm()
      },
      // Formの初期化
      clear() {
        this.$refs.form.reset()
      },
      // Formダイアログの表示
      showCreateForm() {
        this.displayForm = true
      },
      //
      // Formダイアログの非表示
      hideCreateForm() {
        this.clear()
        this.displayForm = false
      },
    },
  }
</script>
