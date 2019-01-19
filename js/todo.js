(function() {
    'use strict';
  
    var vm = new Vue({
      el: '#app',
      //isDoneキーで完了しているかどうかを管理
      data: {
        newItem: '',
        todos:[]
        //[{
            //title: 'task 1',
            //isDone: false
          //}, {
            //title: 'task 2',
            //isDone: false
          //}, {
            //title: 'task 3',
            //isDone: true
          //}]
        },
        //指定したデータの変更を監視
        watch: {
            todos: {
              handler: function() {
                //LocalStorage を使ってデータを保存。Developer ToolsのApplication パネルでデータを確認できる
                //JSON.stringify() でJavaScript の値を JSON 文字列に変換
                localStorage.setItem('todos', JSON.stringify(this.todos));
                //alert('Data saved!');
              },
              deep: true
            }
          },
          //ページにマウント(配置)されるタイミングでデータを読み込む
          mounted: function() {
            //parse(JSON 文字列をJavaScript の値に変換) が上手くいかなかった場合は、空の配列にする
            this.todos = JSON.parse(localStorage.getItem('todos')) || [];
          },
      methods: {
        // addItem: function(e) {
        //   e.preventDefault(); ←規定のページが遷移することを無効化するメソッド
        //   this.todos.push(this.newItem);
        // }
        addItem: function() {
            //(独自追加)未入力なら追加しない
            if(this.newItem=='')return;
            var item = {
                title: this.newItem,
                isDone: false
              };
        //pushメソッドで配列の末尾に要素(item)を追加
          this.todos.push(item);
          this.newItem = '';
        },
        deleteItem: function(index) {
            //confirmメソッドで、引数に設定した文字列をダイアログに表示
            if (confirm('are you sure?')) {
            //slice()は配列の置換え(vue?)のメソッド。配列todosのindex番目から数えて1つ目の配列にする
              this.todos.splice(index, 1);
            }
          },
          purge: function() {
            if (!confirm('delete finished?')) {
              return;
            }
            this.todos = this.remaining;
          }
        },
        //データから動的にプロパティを計算する算出プロパティ
        computed: {
          remaining: function() {
            //filterで特定の条件に合致した配列要素だけを取り出す
            return this.todos.filter(function(todo) {
                return !todo.isDone;
            });
          }
      }
    });
  })();