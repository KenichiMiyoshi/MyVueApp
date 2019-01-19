(function() {
    'use strict';
  
    // Components(UI部品とその機能の再利用) 
    var likeComponent = Vue.extend({
        //propsキーでカスタム属性をComponentで受け取る
        props: {
            message: {
              type: String,
              default: 'Like'
            }
          },
        //Component の data は関数で返す
        data: function() {
            return {
              count: 0
            }
          },
        //template に書ける要素は 1 つのみ
        template: '<button @click="countUp">{{ message }} {{ count }}</button>',
        methods: {
          countUp: function() {
            this.count++;
            //emitでイベント発火
            this.$emit('increment');
          }
        }
    });
  
    var app = new Vue({
      el: '#app',
      components: {
        'like-component': likeComponent
    },
    data: {
      total: 0
    },
    methods: {
      incrementTotal: function() {
        this.total++;
      }
    }
    });
  
  })();