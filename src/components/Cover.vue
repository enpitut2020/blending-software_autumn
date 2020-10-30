// 書籍の表紙を表示するためのコンポーネント

<template>
        <v-main id="books">
         <v-img class="book" v-for="(item, key) in items" :key="key" :src="item.img_path" @click="openDetail(item)"
                alt=""></v-img>
            <detail :item="content" v-show="showDetail" @close="closeDetail"/>
        </v-main>
</template>

<script>
import Detail from "@/components/Detail";

export default {
    components: {
      Detail
    },
    data () {
        return {
          showDetail: false,
          content: "",
            items: [
                {
                  title: "5分間リアル脱出ゲーム",
                  author: "SCRAP",
                  summary:"全世界を熱狂の渦に巻き込んでいる参加型謎解きイベント「リアル脱出ゲーム」のエッセンスを凝縮した、いつでもどこでも楽しめる謎解きゲーム集。通勤・通学の時間、休憩時間、待ち合わせまでの時間など、ちょっとした日常の合間に楽しんでください!",
                  img_path: require("../assets/images/5分間リアル脱出ゲーム.png"),
                },
                {
                  title: "86―エイティシックス―",
                  author:"安里 アサト",
                  summary: "サンマグノリア共和国。そこは日々、隣国である「帝国」の無人兵器“レギオン”による侵略を受けていた。しかしその攻撃に対して、共和国側も同型兵器の開発に成功し、辛うじて犠牲を出すことなく、その脅威を退けていたのだった。そう―表向きは。本当は誰も死んでいないわけではなかった。共和国全85区画の外。“存在しない“第86区””。そこでは「エイティシックス」の烙印を押された少年少女たちが日夜“有人の無人機”として戦い続けていた―。死地へ向かう若者たちを率いる少年・シンと、遙か後方から、特殊通信で彼らの指揮を執る“指揮管制官”となった少女・レーナ。二人の激しくも悲しい戦いと、別れの物語が始まる―!第23回電撃小説大賞“大賞”の栄冠に輝いた傑作、堂々発進!",
                  img_path: require("../assets/images/86―エイティシックス― (電撃文庫).png"),
                },
                {
                  title: "My Humanity",
                  author:"長谷 敏司",
                  summary: "擬似神経制御言語ITPによる経験伝達と個人の文化的背景との相克を描く「地には豊穣」、ITPによる小児性愛者の矯正がグロテスクな結末を導く「allo,toi,toi」―長篇『あなたのための物語』と同設定の2篇にくわえ、軌道ステーションで起きたテロの顛末にして長篇『BEATLESS』のスピンオフ「Hollow Vision」、自己増殖ナノマシン禍に対峙する研究者を描いた書き下ろし「父たちの時間」の全4篇を収録した著者初の作品集。" ,
                  img_path: require("../assets/images/My Humanity (ハヤカワ文庫JA).png"),
                },
                {
                  title: "Self-Reference ENGINE",
                  author:"円城 塔",
                  summary: "彼女のこめかみには弾丸が埋まっていて、我が家に伝わる箱は、どこかの方向に毎年一度だけ倒される。老教授の最終講義は鯰文書の謎を解き明かし、床下からは大量のフロイトが出現する。そして小さく白い可憐な靴下は異形の巨大石像へと挑みかかり、僕らは反乱を起こした時間のなか、あてのない冒険へと歩みを進める―軽々とジャンルを越境し続ける著者による驚異のデビュー作、2篇の増補を加えて待望の文庫化。" ,
                  img_path: require("../assets/images/Self-Reference ENGINE (ハヤカワ文庫JA).png"),
                },
                {
                  title: "×ゲーム",
                  author:"山田 悠介",
                  summary: "小久保英明は小学校時代「×ゲーム」と称し、仲間4人で蕪木鞠子をいじめ続けた。段ボール箱にいじめの内容を書いたクジを入れ、それを引いては書かれたことを実行するのだ。ある日、英明は「蕪木に告白する」というクジを引き、やむなく愛を告げる。それから12年、突然、彼らの前に現れた蕪木は、英明への偏執的な愛を抱き壮絶な復讐を始める。" ,
                  img_path: require("../assets/images/×ゲーム (幻冬舎文庫).png") ,
                },
                {
                  title: "氷菓",
                  author:"米澤 穂信",
                  summary: "いつのまにか密室になった教室。毎週必ず借り出される本。あるはずの文集をないと言い張る少年。そして『氷菓』という題名の文集に秘められた三十三年前の真実──。何事にも積極的には関わろうとしない“省エネ”少年・折木奉太郎は、なりゆきで入部した古典部の仲間に依頼され、日常に潜む不思議な謎を次々と解き明かしていくことに。さわやかで、ちょっぴりほろ苦い青春ミステリ、登場！" ,
                  img_path: require("../assets/images/氷菓 (角川文庫).png"),
                },
                {
                  title: "小説 言の葉の庭",
                  author:"新海 誠",
                  summary: "また会うかもね。もしかしたら。雨が降ったら―。雨の朝、静かな庭で2人は出会った。靴職人を志す高校生の孝雄と、謎めいた年上の女性・雪野。迷いながらも前に進もうとする2人は、どこへ足を踏み出すのか。圧倒的な支持を受けた劇場アニメーション『言の葉の庭』を、新海誠監督みずから小説化。アニメでは描かれなかった人物やエピソードを多数織り込み、小説版ならではの新たなる作品世界を作り上げた傑作。" ,
                  img_path: require("../assets/images/小説 言の葉の庭 (角川文庫).png"),
                },
                {
                  title: "日本SFの臨界点[怪奇篇] ちまみれ家族",
                  author:"伴名 練",
                  summary: "「2010年代、世界で最もSFを愛した作家」と称された伴名練が、全身全霊で贈る傑作アンソロジー。日常的に血まみれになってしまう奇妙な家族のドタバタを描いた津原泰水の表題作、中島らもの怪物的なロックノベル「DECO‐CHIN」、幻の第一世代SF作家・光波耀子の「黄金珊瑚」など、幻想・怪奇テーマの隠れた名作11本を精選。全作解題のほか、日本SF短篇史60年を現代の読者へと再接続する渾身の編者解説1万字超を併録。" ,
                  img_path: require("../assets/images/日本SFの臨界点[怪奇篇] ちまみれ家族 (ハヤカワ文庫JA).png"),
                },
                {
                  title: "日本SFの臨界点[恋愛篇] 死んだ恋人からの手紙",
                  author:"伴名 練",
                  summary: "『なめらかな世界と、その敵』の著者・伴名練が、全力のSF愛を捧げて編んだ傑作アンソロジー。恋人の手紙を通して異星人の思考体系に迫った中井紀夫の表題作、高野史緒の改変歴史SF「G線上のアリア」、円城塔の初期の逸品「ムーンシャイン」など、現在手に入りにくい、短篇集未収録作を中心とした恋愛・家族愛テーマの9本を厳選。それぞれの作品への解説と、これからSFを読みたい読者への完全入門ガイドを併録。" ,
                  img_path: require("../assets/images/日本SFの臨界点[恋愛篇] 死んだ恋人からの手紙 (ハヤカワ文庫JA).png"),
                },
                {
                  title: "容疑者Xの献身",
                  author:"東野 圭吾",
                  summary: "天才数学者でありながら不遇な日日を送っていた高校教師の石神は、一人娘と暮らす隣人の靖子に秘かな想いを寄せていた。彼女たちが前夫を殺害したことを知った彼は、二人を救うため完全犯罪を企てる。だが皮肉にも、石神のかつての親友である物理学者の湯川学が、その謎に挑むことになる。ガリレオシリーズ初の長篇、直木賞受賞作。" ,
                  img_path: require("../assets/images/容疑者Xの献身 (文春文庫).png"),
                },
                /*
                { img_path: require("../assets/images/カラフル (文春文庫).png") },
                { img_path: require("../assets/images/舟を編む (光文社文庫).png") },
                { img_path: require("../assets/images/虐殺器官 (ハヤカワ文庫JA).png") },
                { img_path: require("../assets/images/空の境界 未来福音 (星海社文庫).png") },
                { img_path: require("../assets/images/空の境界(上) (講談社文庫).png") },
                { img_path: require("../assets/images/ＺＯＯ 1 (集英社文庫).png") },
                { img_path: require("../assets/images/羊と鋼の森 (文春文庫).png") },
                { img_path: require("../assets/images/ハーモニー (ハヤカワSFシリーズ Jコレクション).png") },
                { img_path: require("../assets/images/新世界より(上) (講談社文庫).png") },
                { img_path: require("../assets/images/オレがマリオ (文春文庫).png") },
                { img_path: require("../assets/images/コンビニ人間 (文春文庫).png") },
                { img_path: require("../assets/images/夏美のホタル (角川文庫).png") },
                { img_path: require("../assets/images/凍りのくじら (講談社文庫).png") },
                { img_path: require("../assets/images/虚無への供物 (講談社文庫).png") },
                { img_path: require("../assets/images/ののはな通信.png") },
                { img_path: require("../assets/images/グラスホッパー (角川文庫).png") },
                { img_path: require("../assets/images/黒死館殺人事件 (河出文庫).png") },
                { img_path: require("../assets/images/ドグラ・マグラ.png") },
                { img_path: require("../assets/images/ビター・ブラッド (幻冬舎文庫).png") },
                { img_path: require("../assets/images/ホームレス中学生 (幻冬舎よしもと文庫).png") },
                { img_path: require("../assets/images/涼宮ハルヒの憂鬱 (角川スニーカー文庫).png") },
                { img_path: require("../assets/images/クライマーズ・ハイ (文春文庫).png") },
                { img_path: require("../assets/images/スイッチを押すとき (角川文庫).png") },
                { img_path: require("../assets/images/夜は短し歩けよ乙女 (角川文庫).png") },
                { img_path: require("../assets/images/君は月夜に光り輝く (メディアワークス文庫).png") },
                { img_path: require("../assets/images/君と会えたから・・・.png") },
                { img_path: require("../assets/images/イニシエーション・ラブ (文春文庫).png") },
                { img_path: require("../assets/images/バナナ剥きには最適の日々 (ハヤカワ文庫JA).png") },
                { img_path: require("../assets/images/心霊探偵八雲１ 赤い瞳は知っている (角川文庫).png") },
                { img_path: require("../assets/images/「また、必ず会おう」と誰もが言った。.png") },
                */
            ]
        }
    },
    methods: {
      openDetail(item) {
        this.showDetail = true
        this.content = item
      },

      closeDetail() {
        this.showDetail = false
      }
    }
}
</script>

<style scoped>
main {
    background-color: #422602;
}

.book {
    display: inline-block;
    width: 100px;
    height: 150px;
    padding: 10px 10px 10px 10px;
    margin: 10px 10px 10px 10px;
    background-color: #DEB887;
}
.book:hover {
    width: 150px;
    height: 200px;
}
</style>