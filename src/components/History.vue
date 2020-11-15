// 履歴を表示するためのコンポーネント

<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark v-bind="attrs" v-on="on">
            <v-icon color="grey lighten-1">
                mdi-clock-outline
            </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-2">
          履歴
        </v-card-title>
        <v-list dense>
            <v-list-item-group v-model="selectedItem" color="primary">
                <v-list-item
                v-for="(item, i) in items"
                :key="i" 
                @click="openDetail(item)"
                >
                {{ item.title }}
                </v-list-item>
            </v-list-item-group>
        </v-list>
      </v-card>
    </v-dialog>
    <detail :item="content" v-show="showDetail" @close="closeDetail"/>
  </div>
</template>


<script>
import Detail from "@/components/Detail";

  export default {
    components: {
      Detail
    },
    data: () => ({
      selectedItem: 0,
      showDetail: false,
      content: "",
      items: [
        {
          title: "Self-Reference ENGINE",
          author:"円城 塔",
          summary: "彼女のこめかみには弾丸が埋まっていて、我が家に伝わる箱は、どこかの方向に毎年一度だけ倒される。老教授の最終講義は鯰文書の謎を解き明かし、床下からは大量のフロイトが出現する。そして小さく白い可憐な靴下は異形の巨大石像へと挑みかかり、僕らは反乱を起こした時間のなか、あてのない冒険へと歩みを進める―軽々とジャンルを越境し続ける著者による驚異のデビュー作、2篇の増補を加えて待望の文庫化。" ,
          img_path: require("../assets/images/Self-Reference ENGINE (ハヤカワ文庫JA).png"),
        },
        {
          title: "虐殺器官",
          author:"伊藤 計劃",
          summary:"9・11以降の、“テロとの戦い”は転機を迎えていた。先進諸国は徹底的な管理体制に移行してテロを一掃したが、後進諸国では内戦や大規模虐殺が急激に増加していた。米軍大尉クラヴィス・シェパードは、その混乱の陰に常に存在が囁かれる謎の男、ジョン・ポールを追ってチェコへと向かう…彼の目的とはいったいなにか?大量殺戮を引き起こす“虐殺の器官”とは?現代の罪と罰を描破する、ゼロ年代最高のフィクション。",
          img_path: require("../assets/images/虐殺器官 (ハヤカワ文庫JA).png"),
        },
        {
          title: "ハーモニー ",
          author:"伊藤 計劃",
          summary:"「一緒に死のう、この世界に抵抗するために」―御冷ミァハは言い、みっつの白い錠剤を差し出した。21世紀後半、「大災禍」と呼ばれる世界的な混乱を経て、人類は医療経済を核にした福祉厚生社会を実現していた。誰もが互いのことを気遣い、親密に“しなければならない”ユートピア。体内を常時監視する医療分子により病気はほぼ消滅し、人々は健康を第一とする価値観による社会を形成したのだ。そんな優しさと倫理が真綿で首を絞めるような世界に抵抗するため、3人の少女は餓死することを選択した―。それから13年後、医療社会に襲いかかった未曾有の危機に、かつて自殺を試みて死ねなかった少女、現在は世界保健機構の生命監察機関に所属する霧慧トァンは、あのときの自殺の試みで唯ひとり死んだはずの友人の影を見る。これは“人類”の最終局面に立ち会ったふたりの女性の物語―。『虐殺器官』の著者が描く、ユートピアの臨界点。",
          img_path: require("../assets/images/ハーモニー (ハヤカワSFシリーズ Jコレクション).png"),
        }
      ],
      dialog: false,
    }
    ),
    methods: {
      openDetail(item) {
        this.showDetail = true
        this.dialog = false
        this.content = item
      },

      closeDetail() {
        this.showDetail = false
      }
    }
  }
</script>

<style scoped>
.hist {
  position: fixed;
  top: 380px !important;
}
</style>
