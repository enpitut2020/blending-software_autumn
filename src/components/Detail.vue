<!-- https://github.com/euvl/vue-js-toggle-button?ref=kabanoki.net -->
<!-- https://github.com/euvl/vue-js-modal -->
<!-- https://github.com/Reidond/vue-turnjs -->

<!--
  モーダルの呼び出し
    呼び出したい方で
         @click="openDetail(item)
    を呼ぶ.
  openDetailはCover.vue参照

-->

<!-- TODO: レイアウト直す-->

<template>
  <modal name='book-detail' @before-open="beforeOpen" :resizable="false" :draggable="true" :scrollable="true"
         :width="570" :height="450">
    <div v-bind:class='isDark? modal_area_inner_dark : modal_area_inner_light'>
      <div v-bind:class='isDark? turn_grid_dark:turn_grid_light'>
          <fw-turn :options="{ display: display, autoCenter:autoCenter,page:page,width:420,height:300,pages:1,acceleration:acceleration}">

          <!-- 表紙を表示．1ページ目に表紙+あらすじ一ページ目を出すために表紙を二回表示している -->
            <div class="flip_page_double_cover hard"><v-img class="book" :src="largeImageUrl"/> </div>
            <div class="flip_page_double_cover hard"><v-img class="book" :src="largeImageUrl"/> </div>

            <!-- {{itemCaptino | truncate(ページ番号}} でそのページのあらすじを表示 -->
            <div v-bind:class='isDark? flip_page_double_summary_even_dark:flip_page_double_summary_even_light'>
              <p>
                {{ itemCaption | truncate(1) }}
                <span style="margin-left: auto;  float: right; text-align: right;">
                   <br>
                  <!-- あらすじが1ページ (約130字) を超える時に"次ページへ続く"を表示            -->
                    {{ isExistNextPage(itemCaption) }}
                </span>
              </p>
            </div>

              <div v-bind:class='isDark? flip_page_double_summary_odd_dark:flip_page_double_summary_odd_light'>
              {{ itemCaption | truncate(2) }}

              <div class="last_page">
              <!-- あらすじが一ページにおさまる時に何もない見開きが表示される対策 -->
               {{ isLastPage(itemCaption) }}
              </div>

            </div>

            <div v-bind:class='isDark? flip_page_double_summary_even_dark:flip_page_double_summary_even_light'>
             <p>
                {{ itemCaption | truncate(3) }}
              </p>

              </div>
          </fw-turn>
      </div>


       <div v-bind:class='isDark? toggle_dark:toggle_light'>
          ダークモード <toggle-button @change="onChangeColorMode" :value="false" :labels="{checked: 'On', unchecked: 'Off'}" height="25" width="50"></toggle-button>
       </div>

       <hr v-bind:class='isDark? divider_dark:divider_light'>

       <!-- FIX ME: ボタンデザイン，内容 -->
       <div v-if="this.isDark">
        <v-btn class="button-css" color="secondary" href="https://www.amazon.co.jp/"> アマゾン </v-btn>
        <v-btn class="button-css" color="secondary" href="https://www.rakuten.co.jp/"> 楽天 </v-btn>
        <v-btn class="button-css" color="secondary" href="https://www.tulips.tsukuba.ac.jp/lib/"> 図書館 </v-btn>
      </div>
      <div v-else>
        <v-btn class="button-css white--text" color=#6D4C41 href="https://www.amazon.co.jp/"> アマゾン </v-btn>
        <v-btn class="button-css white--text" color=#6D4C41 href="https://www.rakuten.co.jp/"> 楽天 </v-btn>
        <v-btn class="button-css white--text" color=#6D4C41 href="https://www.tulips.tsukuba.ac.jp/lib/"> 図書館 </v-btn>
      </div>

    </div>

  </modal>

</template>


<script>
export default {
  name: "Detail",
  /*
  変数itemでCover.vueでクリックされた本の情報が渡される
    title: タイトル
    author: 著者
    itemCaption: あらすじ
    largeImageUrl: 画像へのリンク
   template中で使うときは{{変数名}} e.g. タイトルを表示: {{title}}
 */

  data: () => ({
    // Modal上で用いる変数
    author: "",
    title: "",
    itemCaption: "",
    largeImageUrl: "",


    // 初期値ではlightモード
    isDark: false,

    // lightモード用のCSS変数
    modal_area_inner_light: 'modal-area-inner-light',
    turn_grid_light: 'turn-grid-light',
    flip_page_double_summary_even_light: 'flip-page-double-summary-even-light hard',
    flip_page_double_summary_odd_light: 'flip-page-double-summary-odd-light hard',
    toggle_light: 'toggle-light',
    divider_light: 'divider-light',

    // Darモード用のCSS変数
    modal_area_inner_dark: 'modal-area-inner-dark',
    turn_grid_dark: 'turn-grid-dark',
    flip_page_double_summary_even_dark: 'flip-page-double-summary-even-dark hard',
    flip_page_double_summary_odd_dark: 'flip-page-double-summary-odd-dark hard',
    toggle_dark: 'toggle-dark',
    divider_dark: 'divider-dark',

    // 本のエフェクトのオプション
    display: "double",
    autoCenter: true,
    page: 2,
    turnCorners: "tl,tr",
    acceleration: true
  }),

  methods: {
    isExistNextPage(summary) {
      return (String(summary).length > 130 ? '(次ページへ続く) ' : "");
    },
    // あらすじが1ページにおさまる時2ページ目にLast pageを出力
    isLastPage(summary) {
      return (String(summary).length < 130 ? "Last page" : "");
    },

    // Modalが開かれる前に実行される関数
    // 渡された本の情報 (item) を使って変数を初期化，モードをlightへ
    beforeOpen(item) {
      this.author = item.params.author
      this.title = item.params.title
      this.itemCaption = item.params.itemCaption
      this.largeImageUrl = item.params.largeImageUrl
      this.isDark = false
    },

    // ダークモードのトグルが押された時
    onChangeColorMode() {
      this.isDark = !this.isDark
    }
  },
  filters: {
    // あらすじを各ページにおさまるサイズに切り取り
    // 今だと各ページが130ページになるようにしている．
    // Usage: {itemCaption | truncate(ページ番号)}
    truncate: function (itemCaption, page_num) {
      return String(itemCaption).substr((Number(page_num) - 1) * 130, 130 + Number(page_num) - Number(page_num));
    }
  }
}
</script>

<style>

/* 共通のCSS */
.button-css {
  margin: 25px 15px 15px 15px;
}

.toggle {
  color: #dddcdc;
  padding-top: 25px;
  padding-right: 300px;
}

.last_page {
  text-align: center;
}

.flip_page_double_cover {
  text-align: center;
  line-height: 300px;
  vertical-align: middle;
}


/* 通常モードのCSS */
.turn-grid-light {
  width: 423px;
  height: 306px;
  margin-left: 75px;
  margin-right: 65px;
  padding-top: 2px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  -webkit-box-shadow: 0 4px 10px rgb(129, 129, 129);
  -moz-box-shadow: 0 4px 10px rgb(129, 129, 129);
  -ms-box-shadow: 0 4px 10px rgb(129, 129, 129);
  -o-box-shadow: 0 4px 10px rgb(129, 129, 129);
  box-shadow: 0 4px 10px rgb(129, 129, 129);
  background: rgb(129, 129, 129); /* モーダルの背景色用 */
}

.modal-area-inner-light {
  color: #121212;
  background: whitesmoke;
}

.divider-light {
  display: block;
  width: 100%;
  height: 2px;
  margin-top: 15px;
  background-color: rgb(185, 184, 184);
  border: 0;
}

.flip-page-double-summary-odd-light {
  background: rgb(245, 245, 228);
  color: #121212;
  text-align: left;
  float: left;
  vertical-align: middle;
}

.flip-page-double-summary-even-light {
  background: rgb(245, 245, 228);
  color: #121212;
  text-align: left;
  float: left;
  vertical-align: middle;
  margin-left: 2px;
}

.toggle-light {
  color: #121212;
  padding-top: 25px;
  padding-right: 280px;
}

/* ダークモード用のCSS */
.turn-grid-dark {
  width: 423px;
  height: 306px;
  margin-left: 75px;
  margin-right: 65px;
  padding-top: 2px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  -webkit-box-shadow: 0 4px 10px #666;
  -moz-box-shadow: 0 4px 10px #666;
  -ms-box-shadow: 0 4px 10px #666;
  -o-box-shadow: 0 4px 10px #666;
  box-shadow: 0 4px 10px #666;
  background: #666; /* モーダルの背景色用 */
}

.modal-area-inner-dark {
  background: #121212; /* モーダルの背景色用 */
  color: #dddcdc;
}


.divider-dark {
  display: block;
  width: 100%;
  height: 2px;
  margin-top: 15px;
  background-color: #363636;
  border: 0;
}

.flip-page-double-summary-dark {
  color: #dddcdc;
  background: #121212;
  text-align: left;
  float: left;
  vertical-align: middle;
  border-left-style: ridge;
}


.flip-page-double-summary-odd-dark {
  color: #dddcdc;
  background: #121212;
  text-align: left;
  float: left;
  vertical-align: middle;
}

.flip-page-double-summary-even-dark {
  color: #dddcdc;
  background: #121212;
  text-align: left;
  float: left;
  vertical-align: middle;
  margin-left: 2px;
}


.toggle-dark {
  color: #dddcdc;
  padding-top: 25px;
  padding-right: 280px;
}

</style>