// 書籍の表紙を表示するためのコンポーネント

<template>
        <v-main id="books">
            <v-img class="book" v-for="(image, key) in images" :key="key" v-bind:src="image.path" alt=""></v-img>
        </v-main> 
</template>

<script>
export default {
    data () {
        return {
            images: [
                { path: "https://images-na.ssl-images-amazon.com/images/I/51XC9MUeLnL._SX353_BO1,204,203,200_.jpg" },
                { path: "https://images-na.ssl-images-amazon.com/images/I/51tYCgqMbKL._SX348_BO1,204,203,200_.jpg" },
                { path: "https://images-na.ssl-images-amazon.com/images/I/51vtJ-Vs54L._SX354_BO1,204,203,200_.jpg" },
                { path: "https://images-na.ssl-images-amazon.com/images/I/51B8qX55TkL._SX340_BO1,204,203,200_.jpg" },
                { path: "https://m.media-amazon.com/images/I/51k7B4UP7jL.jpg" },
                { path: "https://images-na.ssl-images-amazon.com/images/I/51l5Ck236PL._SX356_BO1,204,203,200_.jpg" },
                { path: "https://images-na.ssl-images-amazon.com/images/I/61dTn+rLR9L._SX351_BO1,204,203,200_.jpg" },
                { path: "https://images-na.ssl-images-amazon.com/images/I/51sH+ay0QZL._SX335_BO1,204,203,200_.jpg" },
                { path: "https://images-na.ssl-images-amazon.com/images/I/41Z6OGxZKwL._SX339_BO1,204,203,200_.jpg" },
                { path: "https://images-na.ssl-images-amazon.com/images/I/51NIr+waJzL._SX353_BO1,204,203,200_.jpg" },
                { path: "https://images-na.ssl-images-amazon.com/images/I/51S2CvHGUrL._SX347_BO1,204,203,200_.jpg" },
                { path: "https://images-na.ssl-images-amazon.com/images/I/21D9WADQVVL._BO1,204,203,200_.jpg" },
                { path: "https://images-na.ssl-images-amazon.com/images/I/51lA9iI7deL._SX339_BO1,204,203,200_.jpg" },
                { path: "https://images-na.ssl-images-amazon.com/images/I/512tXSg3R4L._SX337_BO1,204,203,200_.jpg" },
                { path: "https://images-na.ssl-images-amazon.com/images/I/41melSke6TL._SX351_BO1,204,203,200_.jpg" },
                { path: "https://images-na.ssl-images-amazon.com/images/I/41GIvGDbhML._SX347_BO1,204,203,200_.jpg" },
                { path: "https://images-na.ssl-images-amazon.com/images/I/51MEZAig6qL._SX361_BO1,204,203,200_.jpg" },
                { path: "https://images-na.ssl-images-amazon.com/images/I/51kNae7J5gL._SX350_BO1,204,203,200_.jpg" },
                { path: "https://images-na.ssl-images-amazon.com/images/I/51HwfAH7l2L._SX331_BO1,204,203,200_.jpg" },
                { path: "https://images-na.ssl-images-amazon.com/images/I/51RIkpfcrVL._SX335_BO1,204,203,200_.jpg" },
                { path: "https://images-na.ssl-images-amazon.com/images/I/51++PHMufbL._SX339_BO1,204,203,200_.jpg" },
                { path: "https://m.media-amazon.com/images/I/518+7XZPcYL.jpg" },
                { path: "https://images-na.ssl-images-amazon.com/images/I/519299lUP4L._SX336_BO1,204,203,200_.jpg" },
                { path: "https://m.media-amazon.com/images/I/41AI-una3hL.jpg" },
                { path: "https://m.media-amazon.com/images/I/51V4tBjO9jL.jpg" },
                { path: "https://images-na.ssl-images-amazon.com/images/I/51Tzi1BG4rL._SX356_BO1,204,203,200_.jpg" },
                { path: "https://images-na.ssl-images-amazon.com/images/I/31YV6wKK4SL._SX345_BO1,204,203,200_.jpg" },
                { path: "https://images-na.ssl-images-amazon.com/images/I/61YPiB8fy1L._SX298_BO1,204,203,200_.jpg" },
                { path: "https://images-na.ssl-images-amazon.com/images/I/51pCh7DRrGL._SX357_BO1,204,203,200_.jpg" },
                { path: "https://images-na.ssl-images-amazon.com/images/I/31gv8PngeiL._SX343_BO1,204,203,200_.jpg" },
                { path: "https://images-na.ssl-images-amazon.com/images/I/51TuORREg8L._SX337_BO1,204,203,200_.jpg" },
                { path: "https://images-na.ssl-images-amazon.com/images/I/41vZ58HqbAL._SX352_BO1,204,203,200_.jpg" },
                { path: "https://images-na.ssl-images-amazon.com/images/I/51l+xAOJ61L._SX355_BO1,204,203,200_.jpg" },
                { path: "https://images-na.ssl-images-amazon.com/images/I/41nQiE2nAgL._SX336_BO1,204,203,200_.jpg" },
                { path: "https://images-na.ssl-images-amazon.com/images/I/51dRqxvlg7L._SX335_BO1,204,203,200_.jpg" },
                { path: "https://images-na.ssl-images-amazon.com/images/I/51CfCcofrIL._SX342_BO1,204,203,200_.jpg" }
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