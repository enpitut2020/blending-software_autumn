<template>
    <div>
        <!-- <v-container>
            <v-row v-for="(row_items, row_key) in reshapeItems(items)" :key="row_key" class="book-nav">
                <v-col v-for="(item, item_key) in row_items" :key="item_key" :class="assignColor(item_key)" 
                id="back-cover" 
                @click="openDetail(item)"
                :cols="getBackCoverWidth(item)">
                  <span>{{ item.title }}</span>
                </v-col>
                <detail :item="content" v-show="showDetail" @close="closeDetail"/>
            </v-row>
        </v-container> -->
        <ul v-for="(row_items, row_key) in reshapeItems(items)" :key="row_key" class="book-nav">
          <li v-for="(item, item_key) in row_items" :key="item_key" 
          :class="assignColor(item_key)"
          :style="styles(item)" 
          id="back-cover" 
          @click="openDetail(item)" 
          >
            <fitty :options="fittyOptions"><template v-slot:content><span>{{ item.title }}</span></template></fitty>
          </li>
          <detail :item="content" v-show="showDetail" @close="closeDetail"/>
        </ul>
    </div>
</template>

<script>
import Detail from "@/components/Detail";
import Vue from 'vue';
import Fitty from 'vue-fitty' ;
// Install plugin 
Vue.use(Fitty);

export default {
    components: {
      Detail
    },
    data () {
        return {
          showDetail: false,
          content: "",
          fittyOptions: {
            minSize: 1,
            maxSize: 15,
            multiLine: true,
          },
          items: [
              {
                title: "5分間リアル脱出ゲーム",
                author: "SCRAP",
                summary:"全世界を熱狂の渦に巻き込んでいる参加型謎解きイベント「リアル脱出ゲーム」のエッセンスを凝縮した、いつでもどこでも楽しめる謎解きゲーム集。通勤・通学の時間、休憩時間、待ち合わせまでの時間など、ちょっとした日常の合間に楽しんでください!",
                img_path: require("../assets/images/5分間リアル脱出ゲーム.png"),
                pages: 119,
              },
              {
                title: "86―エイティシックス―",
                author:"安里 アサト",
                summary: "サンマグノリア共和国。そこは日々、隣国である「帝国」の無人兵器“レギオン”による侵略を受けていた。しかしその攻撃に対して、共和国側も同型兵器の開発に成功し、辛うじて犠牲を出すことなく、その脅威を退けていたのだった。そう―表向きは。本当は誰も死んでいないわけではなかった。共和国全85区画の外。“存在しない“第86区””。そこでは「エイティシックス」の烙印を押された少年少女たちが日夜“有人の無人機”として戦い続けていた―。死地へ向かう若者たちを率いる少年・シンと、遙か後方から、特殊通信で彼らの指揮を執る“指揮管制官”となった少女・レーナ。二人の激しくも悲しい戦いと、別れの物語が始まる―!第23回電撃小説大賞“大賞”の栄冠に輝いた傑作、堂々発進!",
                img_path: require("../assets/images/86―エイティシックス― (電撃文庫).png"),
                pages: 201,
              },
              {
                title: "My Humanity",
                author:"長谷 敏司",
                summary: "擬似神経制御言語ITPによる経験伝達と個人の文化的背景との相克を描く「地には豊穣」、ITPによる小児性愛者の矯正がグロテスクな結末を導く「allo,toi,toi」―長篇『あなたのための物語』と同設定の2篇にくわえ、軌道ステーションで起きたテロの顛末にして長篇『BEATLESS』のスピンオフ「Hollow Vision」、自己増殖ナノマシン禍に対峙する研究者を描いた書き下ろし「父たちの時間」の全4篇を収録した著者初の作品集。" ,
                img_path: require("../assets/images/My Humanity (ハヤカワ文庫JA).png"),
                pages: 401,
              },
              {
                title: "Self-Reference ENGINE",
                author:"円城 塔",
                summary: "彼女のこめかみには弾丸が埋まっていて、我が家に伝わる箱は、どこかの方向に毎年一度だけ倒される。老教授の最終講義は鯰文書の謎を解き明かし、床下からは大量のフロイトが出現する。そして小さく白い可憐な靴下は異形の巨大石像へと挑みかかり、僕らは反乱を起こした時間のなか、あてのない冒険へと歩みを進める―軽々とジャンルを越境し続ける著者による驚異のデビュー作、2篇の増補を加えて待望の文庫化。" ,
                img_path: require("../assets/images/Self-Reference ENGINE (ハヤカワ文庫JA).png"),
                pages: 601,
              },
              {
                title: "×ゲーム",
                author:"山田 悠介",
                summary: "小久保英明は小学校時代「×ゲーム」と称し、仲間4人で蕪木鞠子をいじめ続けた。段ボール箱にいじめの内容を書いたクジを入れ、それを引いては書かれたことを実行するのだ。ある日、英明は「蕪木に告白する」というクジを引き、やむなく愛を告げる。それから12年、突然、彼らの前に現れた蕪木は、英明への偏執的な愛を抱き壮絶な復讐を始める。" ,
                img_path: require("../assets/images/×ゲーム (幻冬舎文庫).png"),
                pages: 164,
              },
              {
                title: "氷菓",
                author:"米澤 穂信",
                summary: "いつのまにか密室になった教室。毎週必ず借り出される本。あるはずの文集をないと言い張る少年。そして『氷菓』という題名の文集に秘められた三十三年前の真実──。何事にも積極的には関わろうとしない“省エネ”少年・折木奉太郎は、なりゆきで入部した古典部の仲間に依頼され、日常に潜む不思議な謎を次々と解き明かしていくことに。さわやかで、ちょっぴりほろ苦い青春ミステリ、登場！" ,
                img_path: require("../assets/images/氷菓 (角川文庫).png"),
                pages: 289,
              },
              {
                title: "小説 言の葉の庭",
                author:"新海 誠",
                summary: "また会うかもね。もしかしたら。雨が降ったら―。雨の朝、静かな庭で2人は出会った。靴職人を志す高校生の孝雄と、謎めいた年上の女性・雪野。迷いながらも前に進もうとする2人は、どこへ足を踏み出すのか。圧倒的な支持を受けた劇場アニメーション『言の葉の庭』を、新海誠監督みずから小説化。アニメでは描かれなかった人物やエピソードを多数織り込み、小説版ならではの新たなる作品世界を作り上げた傑作。" ,
                img_path: require("../assets/images/小説 言の葉の庭 (角川文庫).png"),
                pages: 500,
              },
              {
                title: "日本SFの臨界点[怪奇篇] ちまみれ家族",
                author:"伴名 練",
                summary: "「2010年代、世界で最もSFを愛した作家」と称された伴名練が、全身全霊で贈る傑作アンソロジー。日常的に血まみれになってしまう奇妙な家族のドタバタを描いた津原泰水の表題作、中島らもの怪物的なロックノベル「DECO‐CHIN」、幻の第一世代SF作家・光波耀子の「黄金珊瑚」など、幻想・怪奇テーマの隠れた名作11本を精選。全作解題のほか、日本SF短篇史60年を現代の読者へと再接続する渾身の編者解説1万字超を併録。" ,
                img_path: require("../assets/images/日本SFの臨界点[怪奇篇] ちまみれ家族 (ハヤカワ文庫JA).png"),
                pages: 121,
              },
              {
                title: "日本SFの臨界点[恋愛篇] 死んだ恋人からの手紙",
                author:"伴名 練",
                summary: "『なめらかな世界と、その敵』の著者・伴名練が、全力のSF愛を捧げて編んだ傑作アンソロジー。恋人の手紙を通して異星人の思考体系に迫った中井紀夫の表題作、高野史緒の改変歴史SF「G線上のアリア」、円城塔の初期の逸品「ムーンシャイン」など、現在手に入りにくい、短篇集未収録作を中心とした恋愛・家族愛テーマの9本を厳選。それぞれの作品への解説と、これからSFを読みたい読者への完全入門ガイドを併録。" ,
                img_path: require("../assets/images/日本SFの臨界点[恋愛篇] 死んだ恋人からの手紙 (ハヤカワ文庫JA).png"),
                pages: 687,
              },
              {
                title: "容疑者Xの献身",
                author:"東野 圭吾",
                summary: "天才数学者でありながら不遇な日日を送っていた高校教師の石神は、一人娘と暮らす隣人の靖子に秘かな想いを寄せていた。彼女たちが前夫を殺害したことを知った彼は、二人を救うため完全犯罪を企てる。だが皮肉にも、石神のかつての親友である物理学者の湯川学が、その謎に挑むことになる。ガリレオシリーズ初の長篇、直木賞受賞作。" ,
                img_path: require("../assets/images/容疑者Xの献身 (文春文庫).png"),
                pages: 390,
              },
              {
                title: "カラフル",
                author:"森 絵都",
                summary:"生前の罪により、輪廻のサイクルから外されたぼくの魂。だが天使業界の抽選にあたり、再挑戦のチャンスを得た。自殺を図った少年、真の体にホームステイし、自分の罪を思い出さなければならないのだ。真として過ごすうち、ぼくは人の欠点や美点が見えてくるようになるのだが…。不朽の名作ついに登場。",
                img_path: require("../assets/images/カラフル (文春文庫).png"),
                pages: 490,
              },
              {
                title: "舟を編む",
                author:"三浦 しをん",
                summary:"出版社の営業部員・馬締光也は、言葉への鋭いセンスを買われ、辞書編集部に引き抜かれた。新しい辞書『大渡海』の完成に向け、彼と編集部の面々の長い長い旅が始まる。定年間近のベテラン編集者。日本語研究に人生を捧げる老学者。辞書作りに情熱を持ち始める同僚たち。そして馬締がついに出会った運命の女性。不器用な人々の思いが胸を打つ本屋大賞受賞作!",
                img_path: require("../assets/images/舟を編む (光文社文庫).png"),
                pages: 350,
              },
              {
                title: "虐殺器官",
                author:"伊藤 計劃",
                summary:"9・11以降の、“テロとの戦い”は転機を迎えていた。先進諸国は徹底的な管理体制に移行してテロを一掃したが、後進諸国では内戦や大規模虐殺が急激に増加していた。米軍大尉クラヴィス・シェパードは、その混乱の陰に常に存在が囁かれる謎の男、ジョン・ポールを追ってチェコへと向かう…彼の目的とはいったいなにか?大量殺戮を引き起こす“虐殺の器官”とは?現代の罪と罰を描破する、ゼロ年代最高のフィクション。",
                img_path: require("../assets/images/虐殺器官 (ハヤカワ文庫JA).png"),
                pages: 146,
              },
              {
                title: "空の境界 未来福音",
                author:"奈須 きのこ",
                summary:"新伝綺ムーブメントを打ち立てた歴史的傑作、『空の境界』の唯一にして正統なる継承作品として発表された伝説の同人作品を、満を持して星海社文庫化。未来視の少女・瀬尾静音と出会った黒桐幹也と、同じく未来視の連続爆弾魔・倉密メルカと出会った両儀式。ふたつの“未来”が重なり合う結末の行方は―!?これぞ未来と過去を繋ぐ空白にして未来への福音。",
                img_path: require("../assets/images/空の境界 未来福音 (星海社文庫).png"),
                pages: 187,
              },
              {
                title: "空の境界(上)",
                author:"奈須 きのこ",
                summary:"二年間の昏睡から目覚めた両儀式が記憶喪失と引き換えに手に入れた、あらゆるモノの死を視ることのできる“直死の魔眼”。式のナイフに映る日常の世界は、非日常の世界と溶け合って存在している…!もはや伝説となった同人小説から出発し、“新伝綺”ムーブメントを打ち立てた歴史的傑作―。",
                img_path: require("../assets/images/空の境界(上) (講談社文庫).png"),
                pages: 267,
              },
              {
                title: "ＺＯＯ　1",
                author:"乙一",
                summary:"何なんだこれは!天才・乙一のジャンル分け不能の傑作短編集が「1」、「2」に分かれて、ついに文庫化。双子の姉妹なのになぜか姉のヨーコだけが母から虐待され…(「カザリとヨーコ」)、謎の犯人に拉致監禁された姉と弟がとった脱出のための手段とは?(「SEVEN ROOMS」)など、本書「1」には映画化された5編をセレクト。文庫版特別付録として、漫画家・古屋兎丸氏との対談も収録。 --このテキストは、paperback_bunko版に関連付けられています。",
                img_path: require("../assets/images/ＺＯＯ　1 (集英社文庫).png"),
                pages: 310,
              },
              {
                title: "羊と鋼の森",
                author:"宮下 奈都",
                summary:"高校生の時、偶然ピアノ調律師の板鳥と出会って以来、調律に魅せられた外村は、念願の調律師として働き始める。ひたすら音と向き合い、人と向き合う外村。個性豊かな先輩たちや双子の姉妹に囲まれながら、調律の森へと深く分け入っていく―。一人の青年が成長する姿を温かく静謐な筆致で描いた感動作。",
                img_path: require("../assets/images/羊と鋼の森 (文春文庫).png"),
                pages: 101,
              },
              {
                title: "ハーモニー ",
                author:"伊藤 計劃",
                summary:"「一緒に死のう、この世界に抵抗するために」―御冷ミァハは言い、みっつの白い錠剤を差し出した。21世紀後半、「大災禍」と呼ばれる世界的な混乱を経て、人類は医療経済を核にした福祉厚生社会を実現していた。誰もが互いのことを気遣い、親密に“しなければならない”ユートピア。体内を常時監視する医療分子により病気はほぼ消滅し、人々は健康を第一とする価値観による社会を形成したのだ。そんな優しさと倫理が真綿で首を絞めるような世界に抵抗するため、3人の少女は餓死することを選択した―。それから13年後、医療社会に襲いかかった未曾有の危機に、かつて自殺を試みて死ねなかった少女、現在は世界保健機構の生命監察機関に所属する霧慧トァンは、あのときの自殺の試みで唯ひとり死んだはずの友人の影を見る。これは“人類”の最終局面に立ち会ったふたりの女性の物語―。『虐殺器官』の著者が描く、ユートピアの臨界点。",
                img_path: require("../assets/images/ハーモニー (ハヤカワSFシリーズ Jコレクション).png"),
                pages: 311,
              },
              {
                title: "新世界より(上)",
                author:"貴志祐介",
                summary:"1959年大阪府生まれ。京都大学経済学部卒業。生命保険会社に勤務後、作家に。1996年、『十三番目の人格――ISOLA』が第3回日本ホラー小説大賞長編賞佳作に選ばれる。1997年『黒い家』で第4回日本ホラー小説大賞、2005年『硝子のハンマー』で日本推理作家協会賞長編賞を受賞。その他の著書に、『天使の囀り』『クリムゾンの迷宮』などがある。『十三番目の人格――ISOLA』『黒い家』『青の炎』が映画化されるなど、つねに話題作を発表し続ける、エンターテインメント界の鬼才。 --このテキストは、絶版本またはこのタイトルには設定されていない版型に関連付けられています。",
                img_path: require("../assets/images/新世界より(上) (講談社文庫).png"),
                pages: 119,
              },
              {
                title: "オレがマリオ",
                author:"俵 万智",
                summary:"“ゆきずりの人に貰いしゆでたまご子よ忘れるなそのゆでたまご”。震災から五日後、息子の手を引き西へ向かい、そのまま石垣島に住むことになる親子。豊かな自然、地域の人との触れ合いは、様々な変化をもたらした。“「オレが今マリオなんだよ」島に来て子はゲーム機に触れなくなりぬ”。新しい光に満ちた第五歌集。",
                img_path: require("../assets/images/オレがマリオ (文春文庫).png"),
                pages: 410,
              },
              {
                title: "コンビニ人間",
                author:"村田 沙耶香",
                summary:"「いらっしゃいませー!」お客様がたてる音に負けじと、私は叫ぶ。古倉恵子、コンビニバイト歴18年。彼氏なしの36歳。日々コンビニ食を食べ、夢の中でもレジを打ち、「店員」でいるときのみ世界の歯車になれる。ある日婚活目的の新入り男性・白羽がやってきて…。現代の実存を軽やかに問う第155回芥川賞受賞作。",
                img_path: require("../assets/images/コンビニ人間 (文春文庫).png"),
                pages: 178,
              },
              {
                title: "夏美のホタル",
                author:"森沢 明夫",
                summary:"写真家志望の大学生・相羽慎吾。卒業制作間近、彼女の夏美と出かけた山里で、古びたよろず屋「たけ屋」を見付ける。そこでひっそりと暮らす母子・ヤスばあちゃんと地蔵さんに、温かく迎え入れられた慎吾たちは、夏休みを「たけ屋」の離れで暮らすことに。夏空の下で過ごす毎日は、飽きることなくシャッターを切らせる。やがて、地蔵さんの哀しい過去を知った慎吾は、自らできることを探し始めるが…。心の故郷の物語。",
                img_path: require("../assets/images/夏美のホタル (角川文庫).png"),
                pages: 190,
              },
              {
                title: "凍りのくじら",
                author:"辻村 深月",
                summary:"藤子・F・不二雄を「先生」と呼び、その作品を愛する父が失踪して5年。高校生の理帆子は、夏の図書館で「写真を撮らせてほしい」と言う一人の青年に出会う。戸惑いつつも、他とは違う内面を見せていく理帆子。そして同じ頃に始まった不思議な警告。皆が愛する素敵な“道具”が私たちを照らすとき―。",
                img_path: require("../assets/images/凍りのくじら (講談社文庫).png"),
                pages: 267,
              },
              {
                title: "虚無への供物",
                author:"中井 英夫",
                summary:"戦後の推理小説ベスト3に数えられ、闇の世界にひときわ孤高な光芒を放ち屹立する巨篇ついにその姿を現す！井戸の底に潜む3人の兄弟。薔薇と不動と犯罪の神秘な妖かしに彩られた4つの密室殺人は、魂を震撼させる終章の悲劇の完成とともに。漆黒の翼に読者を乗せ、めくるめく反世界へと飛翔する。",
                img_path: require("../assets/images/虚無への供物 (講談社文庫).png"),
                pages: 119,
              },
              {
                title: "ののはな通信",
                author:"三浦 しをん",
                summary:"横浜で、ミッション系のお壌様学校に通う、野々原茜(のの)と牧田はな。庶民的な家庭で育ち、頭脳明晰、クールで毒舌なののと、外交官の家に生まれ、天真爛漫で甘え上手のはな。二人はなぜか気が合い、かけがえのない親友同士となる。しかし、ののには秘密があった。いつしかはなに抱いた、友情以上の気持ち。それを強烈に自覚し、ののは玉砕覚悟ではなに告白する。不器用にはじまった、密やかな恋。けれどある裏切りによって、少女たちの楽園は、音を立てて崩れはじめ…。運命の恋を経て、少女たちは大人になる。女子の生き方を描いた傑作小説。女子校で出会い、運命の恋を得た少女たちの20年超を、全編書簡形式で紡いだ、女子大河小説の最高峰。",
                img_path: require("../assets/images/ののはな通信.png"),
                pages: 280,
              },
              {
                title: "グラスホッパー",
                author:"伊坂 幸太郎",
                summary:"グラスホッパー (角川文庫);伊坂 幸太郎;「人は誰でも、死にたがっている」「世界は絶望と悲惨に塗れている」でも僕は戦おうと思うんだ。君との記憶だけを武器にして―待望の書き下ろし長編。",
                img_path: require("../assets/images/グラスホッパー (角川文庫).png"),
                pages: 120,
              },
              {
                title: "黒死館殺人事件",
                author:"小栗 虫太郎",
                summary:"黒死館の当主降矢木算哲博士の自殺後、屋敷住人を血腥い連続殺人事件が襲う。奇々怪々な殺人事件の謎に、刑事弁護士・法水麟太郎がエンサイクロペディックな学識を駆使して挑む。江戸川乱歩も絶賛した本邦三大ミステリのひとつ、悪魔学と神秘科学の結晶した、めくるめく一大ペダントリー。",
                img_path: require("../assets/images/黒死館殺人事件 (河出文庫).png"),
                pages: 119,
              },
              {
                title: "ドグラ・マグラ",
                author:"夢野 久作",
                summary:"精神医学の未開の領域に挑んで、久作一流のドグマをほしいままに駆使しながら、遺伝と夢中遊行病、唯物化学と精神科学の対峙、ライバル学者の闘争、千年前の伝承など、あまりにもりだくさんの趣向で、かえって読者を五里霧中に導いてしまう。それがこの大作の奇妙な魅力であって、千人が読めば千人ほどの感興が湧くにちがいない。探偵小説の枠を無視した空前絶後の奇想小説。--このテキストは、絶版本またはこのタイトルには設定されていない版型に関連付けられています。",
                img_path: require("../assets/images/ドグラ・マグラ.png") ,
                pages: 310,
              },
              {
                title: "ビター・ブラッド",
                author:"雫井 脩介",
                summary:"新人刑事の佐原夏輝がはじめての現場でコンビを組まされたのは、ベテラン刑事で、少年時代に別離した実の父親・島尾明村だった。ある日、捜査一課の係長が何者かに殺害された。捜査本部は内部の犯行を疑い、その矛先は明村にも向かう。夏輝は単独で事件の核心に迫ろうとするが…。幾重にも絡み合った因縁が読者を欺き続ける傑作長編ミステリー。",
                img_path: require("../assets/images/ビター・ブラッド (幻冬舎文庫).png"),
                pages: 105,
              },
              {
                title: "ホームレス中学生",
                author:"田村 裕",
                summary:"父親の解散宣言で、13歳の僕は突然家を失う。そんな僕の新しい家は公園のウンコ形遊具の中。雨で体を洗い、食べられるものはないか色々試す。そんな中で手を差し伸べてくれるたくさんの人、兄姉、友達。そして改めて考えるお母さんの事、人と関わるという事。いつしか描いた芸人という夢…。大ベストセラーとなった笑って泣ける貧乏自叙伝。",
                img_path: require("../assets/images/ホームレス中学生 (幻冬舎よしもと文庫).png"),
                pages: 279,
              },
              {
                title: "涼宮ハルヒの憂鬱",
                author:"谷川 流",
                summary:"「ただの人間には興味ありません。この中に宇宙人、未来人、超能力者がいたら、あたしのところに来なさい。以上」。入学早々、ぶっ飛んだ挨拶をかましてくれた涼宮ハルヒ。そんなSF小説じゃあるまいし…と誰でも思うよな。俺も思ったよ。だけどハルヒは心の底から真剣だったんだ。それに気づいたときには俺の日常は、もうすでに超常になっていた―。第8回スニーカー大賞大賞受賞作。",
                img_path: require("../assets/images/涼宮ハルヒの憂鬱 (角川スニーカー文庫).png"),
                pages: 310,
              },
              {
                title: "クライマーズ・ハイ",
                author:"横山 秀夫",
                summary:"1985年、御巣鷹山に未曾有の航空機事故発生。衝立岩登攀を予定していた地元紙の遊軍記者、悠木和雅が全権デスクに任命される。一方、共に登る予定だった同僚は病院に搬送されていた。組織の相剋、親子の葛藤、同僚の謎めいた言葉、報道とは―。あらゆる場面で己を試され篩に掛けられる、著者渾身の傑作長編。",
                img_path: require("../assets/images/クライマーズ・ハイ (文春文庫).png"),
                pages: 280,
              },
              {
                title: "スイッチを押すとき",
                author:"山田 悠介",
                summary:"青少年自殺抑制プロジェクトセンターで、監視員として勤務する南洋平。ここでは、4人の少年少女に、自らの命を絶つ“赤いスイッチ”を持たせ、実験をしていた。極限状態で軟禁され、孤独に耐えられず次々と命を絶つはずが、この4人は“7年間もスイッチを押さない”という異例の子供だったのだ。彼らが生きたいと願うその理由を聞き、南たちは脱出を図るが、そこには非情な運命が待ちうけており―。",
                img_path: require("../assets/images/スイッチを押すとき (角川文庫).png"),
                pages: 321,
              },
              {
                title: "夜は短し歩けよ乙女",
                author:"森見 登美彦",
                summary:"「黒髪の乙女」にひそかに想いを寄せる「先輩」は、夜の先斗町に、下鴨神社の古本市に、大学の学園祭に、彼女の姿を追い求めた。けれど先輩の想いに気づかない彼女は、頻発する“偶然の出逢い”にも「奇遇ですねえ!」と言うばかり。そんな2人を待ち受けるのは、個性溢れる曲者たちと珍事件の数々だった。山本周五郎賞を受賞し、本屋大賞2位にも選ばれた、キュートでポップな恋愛ファンタジーの傑作。",
                img_path: require("../assets/images/夜は短し歩けよ乙女 (角川文庫).png"),
                pages: 267,
              },
              {
                title: "君は月夜に光り輝く",
                author:"佐野 徹夜",
                summary:"大切な人の死から、どこかなげやりに生きてる僕。高校生になった僕のクラスには、「発光病」で入院したままの少女がいた。月の光を浴びると体が淡く光ることからそう呼ばれ、死期が近づくとその光は強くなるらしい。彼女の名前は、渡良瀬まみず。余命わずかな彼女に、死ぬまでにしたいことがあると知り…「それ、僕に手伝わせてくれないかな?」「本当に?」この約束から、止まっていた僕の時間が再び動きはじめた。今を生きるすべての人に届けたい最高のラブストーリー。",
                img_path: require("../assets/images/君は月夜に光り輝く (メディアワークス文庫).png"),
                pages: 309,
              },
              {
                title: "君と会えたから・・・",
                author:"喜多川 泰",
                summary:"将来に対する漠とした不安を抱えながらも、自分のやるべきこともやりたいことも見つけられずに何もせず、無気力に過ごしていた平凡な高校生の僕のもとに、ある夏の日、美しい女の子がやってきた。そして、彼女から、その後の僕の人生を変える教えを聞くことになる。いつしか彼女に恋心を募らせていた彼の前に次第に明らかになっていく彼女の秘密とは……",
                img_path: require("../assets/images/君と会えたから・・・.png"),
                pages: 210,
              },
              {
                title: "イニシエーション・ラブ",
                author:"乾 くるみ",
                summary:"目次から仕掛けられた大胆な罠、全編にわたる絶妙な伏線、そして最後に明かされる真相…。80’sのほろ苦くてくすぐったい恋愛ドラマはそこですべてがくつがえり、2度目にはまったく違った物語が見えてくる…。",
                img_path: require("../assets/images/イニシエーション・ラブ (文春文庫).png"),
                pages: 119,
              },
              {
                title: "バナナ剥きには最適の日々",
                author:"円城 塔",
                summary:"どこまで行っても、宇宙にはなにもなかった―空っぽの宇宙空間でただよい続け、いまだ出会うことのないバナナ型宇宙人を夢想し続ける無人探査機を描く表題作、淡々と受け継がれる記憶のなかで生まれ、滅びゆく時計の街を描いた「エデン逆行」など全10篇。円城作品はどうして「わからないけどおもしろい」のか、その理由が少しわかるかもしれない作品集、ついに文庫化。ボーナストラック「コンタサル・パス」を追加収録。",
                img_path: require("../assets/images/バナナ剥きには最適の日々 (ハヤカワ文庫JA).png"),
                pages: 316,
              },
              {
                title: "心霊探偵八雲１　赤い瞳は知っている",
                author:"神永 学",
                summary:"学内で幽霊騒動に巻き込まれた友人について相談するため、晴香は、不思議な力を持つ男がいるという「映画同好会」を訪ねた。しかしそこで彼女を出迎えたのは、ひどい寝癖と眠そうな目をした、スカした青年。思い切って相談を持ちかける晴香だったが!?女子大生監禁殺人事件、自殺偽装殺人…次々と起こる怪事件に、死者の魂を見ることができる名探偵・斉藤八雲が挑む、驚異のハイスピード・スピリチュアル・ミステリー登場。",
                img_path: require("../assets/images/心霊探偵八雲１　赤い瞳は知っている (角川文庫).png"),
                pages: 102,
              },
              {
                title: "「また、必ず会おう」と誰もが言った。",
                author:"喜多川 泰",
                summary:"市井の大人たちとの縁から、少年は一生忘れることのない思い出を手にした。ベストセラー作家が描く、輝きの物語。",
                img_path: require("../assets/images/「また、必ず会おう」と誰もが言った。.png"),
                pages: 601,
              },
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
      },
      assignColor(key) {
        return "book-nav-items" + String(key % 6);
      },
      reshapeItems(items) {
        let arr = [];
        let row_arr = [];
        for (let i=0; i<items.length; i++) {
            row_arr.push(items[i]);
            if (i%10 == 9 || i == items.length-1) {
                arr.push(row_arr);
                row_arr = [];
            }
        }
        return arr;
      },
      styles(item) {
        let coverWidth = Math.floor(item.pages/4);
        let titleWidth = Math.floor(coverWidth * 0.8);
        return {
          '--coverWidth': String(coverWidth) + "px",
          '--titleWidth': String(titleWidth) + "px"
        }
      },
    }
}
</script>

<style scoped>
/* アニメーションの時間指定 */
#back-cover, .book-nav-items::before, #back-cover:hover span {
  transition: all .4s;
}

/* 本体の装飾 */
.book-nav {
  font-size: 16px;
  display: -webkit-flex;
  display:         flex;
  margin: 50px;
  padding: 5px 0 1px 0;
  border: 10px solid #967848;
  background-color: #564934;
  box-shadow: 0 -1px 0 0 #bfb19c, 0 5px 2px 0 rgba(0,0,0,.4),0 1px 0 0 #443721,0 -1px 0 0 #bfb19c inset;
}
#back-cover {
  position: relative;
  list-style: none;
  display: block;
  height: 150px;
  width: var(--coverWidth);
  padding: 10px 3px 0 3px;
  transition: all .4s ;
  text-decoration: none;
}
#back-cover span {
  display: flex;
  height: 130px;
  margin-left: auto;
  margin-right: auto;
  width: var(--titleWidth);
  word-break: break-all;
  -ms-writing-mode: tb-rl;
  -webkit-writing-mode: vertical-rl;
  writing-mode: vertical-rl;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: #e8e6dc;
}

.book-nav-items0 {
  border-top: 1px solid #f28279;
  border-right: 2px solid #ba3c32;
  border-bottom: 1px solid #ba3c32;
  border-left: 2px solid #f28279;
  background-color: #ea5549;
}
.book-nav-items1 {
  border-top: 1px solid #e5a77b;
  border-right: 2px solid #c45e17;
  border-bottom: 1px solid #c45e17;
  border-left: 2px solid #e5a77b;
  background-color: #e17b34;
}
.book-nav-items2 {
  border-top: 1px solid #f2df93;
  border-right: 2px solid #997b00;
  border-bottom: 1px solid #997b00;
  border-left: 2px solid #f2df93;
  background-color: #e9bc00;
}
.book-nav-items3 {
  border-top: 1px solid #50ce9d;
  border-right: 2px solid #02663f;
  border-bottom: 1px solid #02663f;
  border-left: 2px solid #50ce9d;
  background-color: #00a968;
}
.book-nav-items4 {
  border-top: 1px solid #5acec5;
  border-right: 2px solid #015952;
  border-bottom: 1px solid #015952;
  border-left: 2px solid #5acec5;
  background-color: #00a497;
}
.book-nav-items5 {
  border-top: 1px solid #3d84ba;
  border-right: 2px solid #024272;
  border-bottom: 1px solid #024272;
  border-left: 2px solid #3d84ba;
  background-color: #0068b7;
}

#back-cover::before {
  position: absolute;
  z-index: -1;
  top: 0;
  left: -2px;
  display: block;
  width: 100%;
  height: 0;
  content: '';
  background-color: #e8e6dc;
}
.book-nav-items0::before {
  border-right: 2px solid #ba3c32;
  border-left: 2px solid #f28279;
}
.book-nav-items1::before {
  border-right: 2px solid #c45e17;
  border-left: 2px solid #e5a77b;
}
.book-nav-items2::before {
  border-right: 2px solid #997b00;
  border-left: 2px solid #f2df93;
}
.book-nav-items3::before {
  border-right: 2px solid #02663f;
  border-left: 2px solid #50ce9d;
}
.book-nav-items4::before {
  border-right: 2px solid #015952;
  border-left: 2px solid #5acec5;
}
.book-nav-items5::before {
  border-right: 2px solid #024272;
  border-left: 2px solid #3d84ba;
}

/* hover時の挙動 */
#back-cover:hover {
  transform: translateY(5px) scale(1,.95);
  transform-origin: center bottom 0;
  box-shadow: 0 20px 2px 0 rgba(0,0,0,.4);
  border-left-color: rgba(0,0,0,.2);
}
#back-cover:hover::before {
  top: -10px;
  height: 11px;
}
#back-cover:hover {
  background-color: rgba(0,0,0,.3);
}
#back-cover:hover span {
  background-color: #bcbaaf;
}

/* detail.vueの位置調整 */
.detail {
  position: fixed;
  top: 200px !important;
}
</style>