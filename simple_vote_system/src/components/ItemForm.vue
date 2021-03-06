<template>
  <div v-show="!loading">
    <!--フォームの表示ボタン-->
    <v-btn
        color="#0068b7"
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
          <v-form ref="form" v-model="validation" lazy-validation>
            <v-text-field
                v-model="inputItemName"
                :rules="nameRule"
                label="アイテム名"
                required
            ></v-text-field>
            <v-text-field
                v-model="inputItemReferee"
                :rules="refereeRule"
                label="投稿者"
                required
            ></v-text-field>
            <br>
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
                :disabled="!validation || !previewImage"
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
  import {db} from "../plugins/firebase";
  import {storage} from "../plugins/firebase";

  export default {
    components: {
    },
    data () {
      return {
        theme: this.$route.params.theme,
        loading: true,
        inputItemName: "",
        inputItemReferee: "",
        previewImage: "",
        uploadFile: null,
        validation: false,
        nameRule: [
          v => !!v || "アイテム名は必須項目です",
          v => !this.existSameItemName(v) || "既にそのアイテム名は存在します",
        ],
        refereeRule: [
          v => !!v || "投稿者は必須項目です",
        ],
        displayForm: false,
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
      // ファイル選択時の処理
      changeFile: function(e){
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
          return;
        }
        this.createPreviewImage(files[0]);
        this.uploadFile = files[0];
      },
      createPreviewImage (file) {
        var reader = new FileReader();
        var vm = this;
        reader.onload = function(e) {
          vm.previewImage = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      removePreviewImage () {
        this.previewImage = "";
      },
      // 同じnameのitemが存在するかどうか
      existSameItemName (name) {
        for (let item of this.items) {
          if (name == item.name) {
            return true;
          }
        }
        return false;
      },
      // ファイルをupload
      addImage (id, filename) {
        storage.ref().child(`images/${filename}`).put(this.uploadFile)
          .then((snapshot) => {
            snapshot.ref.getDownloadURL().then((downloadURL) => {
              db.collection("items").doc(id).update({"imgPath": downloadURL})
            })
          });
      },
      addItem () {
        // アイテムデータ作成
        const now = new Date();
        var id = String(now.getTime());
        var filename = this.uploadFile.name + "_" + id;
        db.collection("items").doc(id).set({
          theme: this.theme,
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
      clear () {
        this.removePreviewImage();
        this.$refs.form.reset();
      },
      // Formダイアログの表示
      showCreateForm () {
        this.displayForm = true;
      },
      // Formダイアログの非表示
      hideCreateForm () {
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
