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
<!-- TODO: 矢印で移動, 縦のmargin-->

<template>
  <modal name='book-detail' @before-open="beforeOpen" :resizable="false" :draggable="true" :scrollable="true"
         :width="600" :height="465">
    <div v-bind:class='isDark? modal_area_inner_dark : modal_area_inner_light'>
      <div v-bind:class='isDark? turn_grid_dark:turn_grid_light'>
        <fw-turn :options="{ display: display, autoCenter:autoCenter,page:page,width:450,height:315,pages:1,acceleration:acceleration,direction:direction}">

          <!-- 表紙を表示．1ページ目に表紙+あらすじ一ページ目を出すために表紙を二回表示している -->
            <div class="flip_page_double_cover hard"><v-img class="book" :src="largeImageUrl"/> </div>
            <div class="flip_page_double_cover hard"><v-img class="book" :src="largeImageUrl"/> </div>

            <!-- ページが3ページにおさまる想定でループじゃなくてベタ書きしてる -->
            <!-- {{itemCaptino | truncate(ページ番号}} でそのページのあらすじを表示 -->

            <!-- 1ページ目 -->
            <div v-bind:class='isDark? flip_page_double_summary_even_dark:flip_page_double_summary_even_light'>
            <div v-if="isVertical">
               <div class="vertical">
                  {{ itemCaption | truncate(1) }}

                 <!-- あらすじが1ページ (約130字) を超える時に"次ページへ続く"を表示            -->
                 <p>
                   <span style="margin-top: 170px;">
                     {{ isExistNextPageVertical(itemCaption) }}
                   </span>
                 </p>
               </div>
            </div>
            <div v-else>
              <div class="summary">
                {{ itemCaption | truncate(1) }}
              </div>
              <!-- あらすじが1ページ (約130字) を超える時に"次ページへ続く"を表示            -->
              <p>
                <span style="margin-left: auto; margin-right: 5px;  float: right; text-align: right;">
                  {{ isExistNextPage(itemCaption) }}
                </span>
              </p>
             </div>
            </div>

            <!-- 2ページ目 -->
            <div v-bind:class='isDark? flip_page_double_summary_odd_dark:flip_page_double_summary_odd_light'>
              <div v-if="isVertical">
                <div class="vertical">
                  {{ itemCaption | truncate(2) }}
                </div>
              </div>
              <div v-else>
                <div class="summary">
                  {{ itemCaption | truncate(2) }}
                </div>
              </div>
              <!-- あらすじが1ページにおさまる時に何もない見開きが表示される対策 -->
              <div class="last_page">
                {{ isLastPage(itemCaption) }}
              </div>
            </div>

            <!-- 3ページ目 -->
            <div v-bind:class='isDark? flip_page_double_summary_even_dark:flip_page_double_summary_even_light'>
               <div v-if="isVertical">
                 <div class="vertical">
                   {{ itemCaption | truncate(3) }}
                 </div>
               </div>
              <div v-else>
                <div class="summary">
                  {{ itemCaption | truncate(3) }}
                </div>
              </div>
            </div>
        </fw-turn>
      </div>

       <div style="padding-left: 120px;white-space: nowrap;" v-bind:class='isDark? toggle_dark:toggle_light'>
          <!-- ダークモード用のトグル -->
          ダークモード <toggle-button @change="onChangeColorMode" :value="false" :labels="{checked: 'On', unchecked: 'Off'}"
                                height="25" width="50"></toggle-button>
         <!-- 縦読み用のトグル -->
          <span style="margin-left: 65px">縦読み</span> <toggle-button style="margin-right: 5px" @change="onChangeVerticalHorizontalMode" :value="false" :labels="{checked: 'On', unchecked: 'Off'}" height="25" width="50"></toggle-button>
       </div>

       <hr v-bind:class='isDark? divider_dark:divider_light'>

      <!-- FIX ME: ボタンデザイン，内容 -->
       <div v-if="this.isDark">
        <v-btn class="button-css" color="secondary"
               v-bind:href="'https://www.amazon.co.jp/s?k='+title+'&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&ref=nb_sb_noss_1'"
               target="_blank" rel="noopener noreferrer"> Amazon </v-btn>
        <v-btn class="button-css" color="secondary"
               v-bind:href="'https://books.rakuten.co.jp/search?sitem='+title+'&l-id=pc-search-box&x=0&y=0'"
               target="_blank"
               rel="noopener noreferrer"> 楽天 </v-btn>
        <v-btn class="button-css" color="secondary" v-bind:href="'https://www.tulips.tsukuba.ac.jp/search/?q='+title"
               target="_blank"
               rel="noopener noreferrer"> 図書館 </v-btn>
      </div>
      <div v-else>
        <v-btn class="button-css white--text" color=#6D4C41
               v-bind:href="'https://www.amazon.co.jp/s?k='+title+'&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&ref=nb_sb_noss_1'"
               target="_blank" rel="noopener noreferrer"> Amazon </v-btn>
        <v-btn class="button-css white--text" color=#6D4C41
               v-bind:href="'https://books.rakuten.co.jp/search?sitem='+title+'&l-id=pc-search-box&x=0&y=0'"
               target="_blank"
               rel="noopener noreferrer"> 楽天 </v-btn>
        <v-btn class="button-css white--text" color=#6D4C41
               v-bind:href="'https://www.tulips.tsukuba.ac.jp/search/?q='+title" target="_blank"
               rel="noopener noreferrer"> 図書館 </v-btn>
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
    isVertical: false,
    // numWordsPerPage:150, // うまく動かない．置き方違う?

    // lightモード用のCSS変数
    modal_area_inner_light: 'modal-area-inner-light',
    turn_grid_light: 'turn-grid-light',
    flip_page_double_summary_even_light: 'flip-page-double-summary-even-light hard',
    flip_page_double_summary_odd_light: 'flip-page-double-summary-odd-light hard',
    toggle_light: 'toggle-light',
    divider_light: 'divider-light',

    // Darkモード用のCSS変数
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
    acceleration: true,
    direction: "ltr",
  }),

  methods: {
    // あらすじが1ページにおさまらない時 "次ページへ続く" を返す．
    isExistNextPage(summary) {
      return (String(summary).length > 137 ? '(次ページへ続く) ' : "");
    },
    isExistNextPageVertical(summary) {
      return (String(summary).length > 137 ? '次ページへ続く ' : "");
    },
    // あらすじが1ページにおさまる時2ページ目にLast pageを出力
    isLastPage(summary) {
      return (String(summary).length < 137 ? "Last page" : "");
    },

    // Modalが開かれる前に実行される関数
    // 渡された本の情報 (item) を使って変数を初期化，モードをlightへ
    beforeOpen(item) {
      this.author = item.params.author
      this.title = item.params.title
      this.itemCaption = item.params.itemCaption
      this.largeImageUrl = item.params.largeImageUrl
      this.isDark = false
      this.isVertical = false
      this.direction = "ltr"
    },

    // ダークモードのトグルが押された時
    onChangeColorMode() {
      this.isDark = !this.isDark
    },

    onChangeVerticalHorizontalMode() {
      this.isVertical = !this.isVertical
      this.direction = this.direction === "rtl" ? "ltr" : "rtl"
    },

  },
  filters: {
    // あらすじを各ページにおさまるサイズに切り取り
    // 今だと各ページが130ページになるようにしている．
    // Usage: {itemCaption | truncate(ページ番号)}
    truncate: function (itemCaption, page_num) {
      return String(itemCaption).substr((Number(page_num) - 1) * 137, 137 + Number(page_num) - Number(page_num));
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

.book {
  display: inline-block;
  width: 450px;
  height: 315px;
  /*padding: 10px 10px 10px 10px;*/
  /*margin: 10px 10px 10px 10px;*/
  /*background-color: #DEB887;*/
}

.summary {
  width: 95%;
  margin: 5px 5px 0 5px;
}

.vertical {
  text-orientation: upright; /* uprightだと英単語も縦書きになる */
  writing-mode: vertical-rl;
  -webkit-writing-mode: vertical-rl;
  -ms-writing-mode: tb-rl;
  position: absolute;
  right: 0;
  width: 95%;
  height: 95%;
  margin: 5px 5px 5px 5px;
}


/* 通常モードのCSS */
.turn-grid-light {
  width: 453px;
  height: 321px;
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
  background: rgb(129, 129, 129); /* 本の背景色*/
}

.modal-area-inner-light {
  color: #121212;
  background: #3e311f;; /* モーダルの背景色用 */
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
  width: 45px;
  height: 30px;
  background: rgb(245, 245, 228);
  color: #121212;
  text-align: left;
  float: left;
  vertical-align: middle;
  margin-right: 1px;
}

.flip-page-double-summary-even-light {
  width: 45px;
  height: 31px;
  background: rgb(245, 245, 228);
  color: #121212;
  text-align: left;
  float: left;
  vertical-align: middle;
  margin-left: 1px;
}

.flip-page-double-summary-odd-light-vertical {
  width: 45px;
  height: 30px;
  background: rgb(245, 245, 228);
  color: #121212;
  text-align: left;
  float: left;
  vertical-align: middle;
  margin-left: 1px;
}

.flip-page-double-summary-even-light-vertical {
  width: 45px;
  height: 31px;
  background: rgb(245, 245, 228);
  color: #121212;
  text-align: left;
  float: left;
  vertical-align: middle;
  margin-right: 1px;
}



.toggle-light {
  color: #dddcdc;
  padding-top: 25px;
  padding-right: 280px;
}

/* ダークモード用のCSS */
.turn-grid-dark {
  width: 453px;
  height: 321px;
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
  margin-right: 1px;
}

.flip-page-double-summary-even-dark {
  color: #dddcdc;
  background: #121212;
  text-align: left;
  float: left;
  vertical-align: middle;
  margin-left: 1px;
}


.toggle-dark {
  color: #dddcdc;
  padding-top: 25px;
  padding-right: 280px;
}

</style>