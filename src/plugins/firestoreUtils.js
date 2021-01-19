import firebase from "@/firebase/firestore.js";
const db = firebase.firestore()


// const getUserRowset = () => {
//   var res = {};
//   db.collection("users").get().then((query) => {
//     var buff = [];
//     query.forEach((doc) => {
//       var data = doc.data();
//       buff.push([doc.id, data.name, data.age]);
//       res[doc.id] = data;
//     });
//   }).catch((error)=>{
//     console.log(`データの取得に失敗しました (${error})`);
//   });
//   return res;

// }

// export default getUserRowset;

const Db = {
  install(Vue) {
    Vue.prototype.$getBooksData = async function getBooksData() {
      var last_isbn;
      const booksData = await db
            .collection("test_books")
            .orderBy('isbn')
            .limit(20)
            .get()
            .then(querySnapshot => {
              console.debug("キャッシュからデータを取得しました");
              const booksData = [];
              querySnapshot.forEach(data => {
                // 配列
                booksData.push(data.data());
                // object
                // booksData[data.id] = data.data();
              });
              // 最後尾の書籍のISBNを保存
              last_isbn = booksData[booksData.length-1].isbn
              // booksDataをランダムにシャッフル
              for (let i = booksData.length - 1; i >= 0; i--) {
                const randomNumber = Math.floor(Math.random() * (i + 1));
                [booksData[i], booksData[randomNumber]] = [booksData[randomNumber], booksData[i]];
               }
              return booksData;
            })
            .catch(()=>{
              alert("firestoreからのデータの取得でエラーが発生しました")
            });
      return {data: booksData, last_isbn: last_isbn};
    };

    Vue.prototype.$addBooksData = async function addBooksData(current_last_isbn) {
      var last_isbn;
      const booksData = await db
            .collection("test_books")
            .orderBy('isbn')
            .startAfter(current_last_isbn)
            .limit(20)
            .get()
            .then(querySnapshot => {
              console.debug("キャッシュからデータを取得しました");
              const booksData = [];
              querySnapshot.forEach(data => {
                // 配列
                booksData.push(data.data());
                // object
                // booksData[data.id] = data.data();
              });
              // 最後尾の書籍のISBNを保存
              last_isbn = booksData[booksData.length-1].isbn
              // booksDataをランダムにシャッフル
              for (let i = booksData.length - 1; i >= 0; i--) {
                const randomNumber = Math.floor(Math.random() * (i + 1));
                [booksData[i], booksData[randomNumber]] = [booksData[randomNumber], booksData[i]];
               }
              return booksData;
            })
            .catch(()=>{
              alert("firestoreからのデータの取得でエラーが発生しました")
            });
      return {data: booksData, last_isbn: last_isbn};
    };

    Vue.prototype.$getUsersData = async function getUsersData() {
      const usersData = await db
            .collection("users")
            .get()
            .then(querySnapshot => {
              console.debug("キャッシュからデータを取得しました");
              const usersData = [];
              querySnapshot.forEach(data => {
                // 配列
                usersData.push(data.data());
                // object
                // usersData[data.id] = data.data();
              });
              return usersData;
            })
            .catch(()=>{
              alert("firestoreからのデータの取得でエラーが発生しました")
            });
      // console.debug(`usersData (getUsersData() in firebaseUtils.js) : ${usersData}`);
      return usersData;
    };
  }
}

export default Db;


