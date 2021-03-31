// ###############################################################
// computed watch

// var vm = new Vue({
//   el: '#app',
//   data: {
//     msg: 'hello',
//   },
//   computed: {
//     reversedMsg() {
//       console.log(1111);
//       // this 指向 vm 实例
//       return this.msg.split('').reverse().join('');
//     },
//   },
//   methods: {
//     reversedMsg1() {
//       console.log(2222);
//       // this 指向 vm 实例
//       return this.msg.split('').reverse().join('');
//     },
//   },

//   beforeUpdate() {
//     console.log(this.msg);
//   },
// });

// ###############################################################
// watch deep watch

// var vm = new Vue({
//   el: '#app',
//   data: {
//     obj: {
//       basicMsg: '',
//       age: 31,
//       single: '单身',
//     },
//   },
//   watch: {
//     'obj.age': {
//       handler(newVal, oldVal) {
//         console.log('%c%s', 'color: #735656', newVal);
//         this.obj.basicMsg = '今年' + newVal + '岁' + ' ' + this.obj.single;
//         // this.obj.basicMsg = '今年'
//       },
//       immediate: true,
//       deep: true,
//     },
//   },
// });

// ###############################################################
// computed实现
var vm = new Vue({
  el: '#app',
  data: {
    msg: 'hello'
  },
  computed: {
    reversedMsg() {
      // this 指向 vm 实例
      return this.msg.split('').reverse().join('')
    }
  }
});