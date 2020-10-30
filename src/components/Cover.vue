// 書籍の表紙を表示するためのコンポーネント

<template>
    <v-app>
        <v-main id="books">
            <v-img class="book" v-for="(image, key) in images" :key="key" v-bind:src="image.path" alt=""></v-img>
        </v-main> 
    </v-app> 
</template>

<script>
export default {
    data () {
        return {
            images: [
                { "path": require("../assets/images/5分間リアル脱出ゲーム.png") },
                { "path": require("../assets/images/86―エイティシックス― (電撃文庫).png") },
                { "path": require("../assets/images/My Humanity (ハヤカワ文庫JA).png") },
                { "path": require("../assets/images/Self-Reference ENGINE (ハヤカワ文庫JA).png") },
                { "path": require("../assets/images/×ゲーム (幻冬舎文庫).png") },
                { "path": require("../assets/images/氷菓 (角川文庫).png") },
                { "path": require("../assets/images/小説 言の葉の庭 (角川文庫).png") },
                { "path": require("../assets/images/日本SFの臨界点[怪奇篇] ちまみれ家族 (ハヤカワ文庫JA).png") },
                { "path": require("../assets/images/日本SFの臨界点[恋愛篇] 死んだ恋人からの手紙 (ハヤカワ文庫JA).png") },
                { "path": require("../assets/images/容疑者Xの献身 (文春文庫).png") },
                { "path": require("../assets/images/カラフル (文春文庫).png") },
                { "path": require("../assets/images/舟を編む (光文社文庫).png") },
                { "path": require("../assets/images/虐殺器官 (ハヤカワ文庫JA).png") },
                { "path": require("../assets/images/空の境界 未来福音 (星海社文庫).png") },
                { "path": require("../assets/images/空の境界(上) (講談社文庫).png") },
                { "path": require("../assets/images/ＺＯＯ　1 (集英社文庫).png") },
                { "path": require("../assets/images/羊と鋼の森 (文春文庫).png") },
                { "path": require("../assets/images/ハーモニー (ハヤカワSFシリーズ Jコレクション).png") },
                { "path": require("../assets/images/新世界より(上) (講談社文庫).png") },
                { "path": require("../assets/images/オレがマリオ (文春文庫).png") },
                { "path": require("../assets/images/コンビニ人間 (文春文庫).png") },
                { "path": require("../assets/images/夏美のホタル (角川文庫).png") },
                { "path": require("../assets/images/凍りのくじら (講談社文庫).png") },
                { "path": require("../assets/images/虚無への供物 (講談社文庫).png") },
                { "path": require("../assets/images/ののはな通信.png") },
                { "path": require("../assets/images/グラスホッパー (角川文庫).png") },
                { "path": require("../assets/images/黒死館殺人事件 (河出文庫).png") },
                { "path": require("../assets/images/ドグラ・マグラ.png") },
                { "path": require("../assets/images/ビター・ブラッド (幻冬舎文庫).png") },
                { "path": require("../assets/images/ホームレス中学生 (幻冬舎よしもと文庫).png") },
                { "path": require("../assets/images/涼宮ハルヒの憂鬱 (角川スニーカー文庫).png") },
                { "path": require("../assets/images/クライマーズ・ハイ (文春文庫).png") },
                { "path": require("../assets/images/スイッチを押すとき (角川文庫).png") },
                { "path": require("../assets/images/夜は短し歩けよ乙女 (角川文庫).png") },
                { "path": require("../assets/images/君は月夜に光り輝く (メディアワークス文庫).png") },
                { "path": require("../assets/images/君と会えたから・・・.png") },
                { "path": require("../assets/images/イニシエーション・ラブ (文春文庫).png") },
                { "path": require("../assets/images/バナナ剥きには最適の日々 (ハヤカワ文庫JA).png") },
                { "path": require("../assets/images/心霊探偵八雲１　赤い瞳は知っている (角川文庫).png") },
                { "path": require("../assets/images/「また、必ず会おう」と誰もが言った。.png") },
            ]
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