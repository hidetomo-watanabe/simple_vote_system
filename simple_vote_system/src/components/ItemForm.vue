<template>
  <div v-show="!loading">
    <!--フォームの表示ボタン-->
    <v-btn
        color=#0068b7
        small
        dark
        center
        fab
        fixed
        right
        @click="showCreateForm"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="displayForm" max-width="500px">
      <!--アイテム入力フォーム-->
      <v-card>
        <v-container>
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
            <div v-if="!previewImage">
              <input
                type="file"
                @change="changeFile"
              >
            </div>
            <div v-else>
              <div class="preview">
                preview
                <button @click="removePreviewImage">
                  <v-icon small>delete</v-icon>
                </button>
              </div>
              <img :src="previewImage">
            </div>
            <br>
            <br>
            <div class="addItemBtn">
              <v-btn
                :disabled="!valid || !previewImage"
                @click="addItem"
              >
                アイテム追加
              </v-btn>
            </div>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import {db} from '../plugins/firebase';
  import {storage} from '../plugins/firebase';

  export default {
    components: {
    },
    data: () => ({
      loading: true,
      // form入力データ
      inputItemName: "",
      inputItemReferee: "",
      previewImage: '',
      uploadFile: null,
      // バリデーション
      valid: true,
      ItemRules: [
        v => !!v || 'コメントは必須項目です',
      ],
      // Formダイアログの表示可否
      displayForm: false,
    }),
    mounted() {
      // loading終了
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    },
    methods: {
      // ファイル選択時の処理
      changeFile: function(e){
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
          return;
        }
        this.createPreviewImage(files[0]);
        this.uploadFile = files[0];
      },
      // ファイルプレビューを作成
      createPreviewImage(file) {
        var reader = new FileReader();
        var vm = this;
        reader.onload = function(e) {
          vm.previewImage = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      // ファイルプレビューを削除
      removePreviewImage: function() {
        this.previewImage = '';
      },
      // ファイルをupload
      addImage (id, filename) {
        storage.ref().child(`images/${filename}`).put(this.uploadFile)
          .then((snapshot) => {
            snapshot.ref.getDownloadURL().then((downloadURL) => {
              db.collection('items').doc(id).update({"imgPath": downloadURL})
            })
          });
      },
      // アイテム追加
      addItem() {
        // アイテムデータ作成
        const now = new Date();
        var id = String(now.getTime());
        var filename = this.uploadFile.name + '_' + id;
        db.collection('items').doc(id).set({
          name: this.inputItemName,
          referee: this.inputItemReferee,
          filename: filename,
          count: 0,
          createdAt: now,
        });
        // storageへの画像追加
        this.addImage(id, filename);
        // ダイアログを閉じる
        this.hideCreateForm();
      },
      // Formの初期化
      clear() {
        this.removePreviewImage();
        this.$refs.form.reset();
      },
      // Formダイアログの表示
      showCreateForm() {
        this.displayForm = true;
      },
      //
      // Formダイアログの非表示
      hideCreateForm() {
        this.clear();
        this.displayForm = false;
      },
    },
  }
</script>

<style scoped>
  .preview {
    color: #808080;
  }
  .addItemBtn {
    text-align: center;
  }
</style>
