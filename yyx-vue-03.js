// plugin

const myPlugin = {
  install(Vue) {
    Vue.mixin({
      created() {
        if (this.$options.rules) {
          // we can do something
        }
      },
    });
  },
};


const vm = new Vue({
  data: {
    foo: 10
  },
  rules: {
    foo: {
      validate: value => value > 1;
      message: 'foo must be greater than 10'
    }
  }
});

vm.foo = 0

// implement
const RulesPlugin = {
  install(Vue) {
    Vue.mixin({
      created() {
        if (this.$options.rules) {
          Object.keys(this.$options.rules).forEach(key => {
            const rule = this.$options.rules[key]
            this.$watch(key, newValue => {
              const result = rule.validate(newValue)
              if (!result) {
                console.log(rule.message)
              }
            })
          })
        }
      }
    })
  }
}