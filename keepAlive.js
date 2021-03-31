var child1 = {
  template: '<div><button @click="add">add</button><p>{{num}}</p></div>',
  data() {
    return {
      num: 1,
    };
  },
  methods: {
    add() {
      this.num++;
    },
  },
};
var child2 = {
  template: '<div>child2</div>',
};
var vm = new Vue({
  el: '#app',
  components: {
    child1,
    child2,
  },
  data() {
    return {
      chooseTabs: 'child1',
    };
  },
  methods: {
    changeTabs(tab) {
      this.chooseTabs = tab;
    },
  },
});
