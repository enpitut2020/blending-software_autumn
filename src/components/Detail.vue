<!-- https://github.com/euvl/vue-js-toggle-button?ref=kabanoki.net -->
<!-- https://github.com/euvl/vue-js-modal -->
<!-- https://github.com/Reidond/vue-turnjs -->

<template>
  <modal name='book-detail' @before-open="beforeOpen" :resizable="false" :draggable="true" :scrollable="true"
         :width="600" :height="450">
    <div v-bind:class='isDark? modal_area_inner_dark:modal_area_inner_light'>
      <div class="modal-css">
        <div>
          <v-img class="book" :src="largeImageUrl"/>
            ダークモード <toggle-button @change="onChangeColorMode" :value=isDark :labels="{checked: 'On', unchecked: 'Off'}" height="25" width="50"></toggle-button>
        </div>

        <div>
          <!-- タイトル -->
          <div class="title">
            {{ title }}
            <span v-if="isDark">
              <button type="button"><img class="clippy-author" src="../assets/clippy_dark.svg" v-on:click="onCopyTitle"/></button>
            </span>
            <span v-else>
              <button type="button"><img class="clippy-author" src="../assets/clippy.svg" v-on:click="onCopyTitle"/></button>
            </span>
            <span style="text-align: right;margin-left:5px; font-weight: bold;font-size: 7px" v-if="copyTitleFlag">
              copied
            </span>
            <span style="text-align: right;margin-left:39px; font-weight: bold;font-size: 7px" v-else/>
          </div>

          <!-- 著者 -->
          <div class="author">
            <a style="color: #4c9eeb" v-bind:href="'https://ja.wikipedia.org/w/index.php?search=' + removeSpace(author) + '&title=%E7%89%B9%E5%88%A5%3A%E6%A4%9C%E7%B4%A2&go=%E8%A1%A8%E7%A4%BA&ns0=1'" target="_blank" rel="noopener noreferrer">
              {{ author }}
            </a>
            <span v-if="isDark">
              <button type="button"><img class="clippy-author" src="../assets/clippy_dark.svg" v-on:click="onCopyAuthor"/></button>
            </span>
            <span v-else>
              <button type="button"><img class="clippy-author" src="../assets/clippy.svg" v-on:click="onCopyAuthor"/></button>
            </span>

            <span style="text-align: right;margin-left:5px; font-weight: bold;font-size: 7px" v-if="copyAuthorFlag">
              copied
            </span>
            <span style="text-align: right;margin-left:40px; font-weight: bold;font-size: 7px" v-else/>
          </div>

          <!-- あらすじ -->
          <div class="summary">
            {{ itemCaption }}
          </div>

          <!-- リンク -->
          <div v-if="this.isDark">
            <v-btn small style="color: #FF9900;" class="button-css" color="#333E48"
                   v-bind:href="'https://www.amazon.co.jp/s?k='+title+'&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&ref=nb_sb_noss_1'"
                   target="_blank" rel="noopener noreferrer"> アマゾン </v-btn>
            <v-btn small style="color: #bf0000;" class="button-css" color="#dddcdc"
                   v-bind:href="'https://books.rakuten.co.jp/search?sitem='+title+'&l-id=pc-search-box&x=0&y=0'"
                   target="_blank"
                   rel="noopener noreferrer"> 楽天 </v-btn>
            <v-btn small style="color: #f3f3f3" class="button-css" color="#6600CC"
                   v-bind:href="'https://www.tulips.tsukuba.ac.jp/search/?q='+title"
                   target="_blank"
                   rel="noopener noreferrer"> 図書館で探す </v-btn>
          </div>
          <div v-else>
            <v-btn small style="color: #FF9900;" class="button-css" color="#333E48"
                   v-bind:href="'https://www.amazon.co.jp/s?k='+title+'&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&ref=nb_sb_noss_1'"
                   target="_blank" rel="noopener noreferrer"> アマゾン </v-btn>
            <v-btn small style="color: #bf0000;" class="button-css" color="white"
                   v-bind:href="'https://books.rakuten.co.jp/search?sitem='+title+'&l-id=pc-search-box&x=0&y=0'"
                   target="_blank"
                   rel="noopener noreferrer"> 楽天 </v-btn>
            <v-btn small style="color: whitesmoke" class="button-css" color="#6600CC"
                   v-bind:href="'https://www.tulips.tsukuba.ac.jp/search/?q='+title"
                   target="_blank"
                   rel="noopener noreferrer"> 図書館で探す </v-btn>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
  export default {
    name: "Detail",
    data: () => ({
      /*
      変数itemでCover.vueでクリックされた本の情報が渡される
        title: タイトル
        author: 著者
        itemCaption: あらすじ
        largeImageUrl: 画像へのリンク
      template中で使うときは{{変数名}} e.g. タイトルを表示: {{title}}
      */

      // Modal上で用いる変数
      author: "",
      title: "",
      itemCaption: "",
      largeImageUrl: "",
      isDark: false,
      copyAuthorFlag: false,
      copyTitleFlag: false,
      modal_area_inner_light: 'modal-area-inner-light',
      modal_area_inner_dark: 'modal-area-inner-dark',
    }),

    methods: {
      // Modalが開かれる前に実行される関数
      // 渡された本の情報 (item) を使って変数を初期化
      beforeOpen(item) {
        this.author = item.params.author
        this.title = item.params.title
        this.itemCaption = item.params.itemCaption
        this.largeImageUrl = item.params.largeImageUrl
        this.copyAuthorFlag = false
        this.copyTitleFlag = false
      },

      // Modalが閉じられる前に実行される関数
      closed() {
      },

      // ダークモードのトグルが押された時
      onChangeColorMode() {
        this.isDark = !this.isDark
      },

      // 著者名のコピー
      onCopyAuthor() {
        navigator.clipboard.writeText(this.author)
        this.copyAuthorFlag = true
        this.copyTitleFlag = false
        setTimeout(() => { this.copyAuthorFlag = false }, 1200)
      },

      // タイトルのコピー
      onCopyTitle() {
        navigator.clipboard.writeText(this.title)
        this.copyTitleFlag = true
        this.copyAuthorFlag = false
        setTimeout(() => { this.copyTitleFlag = false }, 1200)
      },

      // 空白の除去
      removeSpace(author) {
        return String(author).replace(/\s+/g, "")
      },
    },
  }
</script>

<style>
  .modal-css {
    display: flex;
  }

  .book {
    width: 185px;
    height: 260px;
    padding: 10px 10px 10px 10px;
    margin: 85px 30px 10px 50px;
    background-color: #DEB887;
  }

  .modal-area-inner-light {
    color: #121212;
    background: #eceaea;; /* モーダルの背景色用 */
    width: 600px;
    height: 450px;
  }

  .modal-area-inner-dark {
    background: #121212; /* モーダルの背景色用 */
    color: #dddcdc;
    width: 600px;
    height: 450px;
  }

  .title {
    margin-top: 18px;
    font-weight: bold
  }

  .author {
    text-align: right;
    margin-right: 5px;
    margin-top: -5px;
  }

  .clippy-author {
    margin-left: 3px;
    margin-right: 3px;
  }

  .summary {
    margin-top: 10px;
    text-align: left;
    font-size: 13px;
    margin-right: 10px;
  }

  .button-css {
    margin: 15px 25px 0 0;
    font-weight: bold;
  }
</style>

