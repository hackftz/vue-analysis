/*
  vm = {
    $attrs: {},
    $children: [],
    $listeners: {},
    $options: {
      components: {},
      computed: {
        reversedMsg() {
          // this 指向 vm 实例
          return this.msg.split('').reverse().join('')
        }
      },
      el: '#app',
      ..... 更多属性值
    },
    .... 更多属性
  };
  expOrFn = function reversedMsg() {}; expOrFn 是我们上面获取到的getter函数.
  cb的值是一个回调函数。
  options = {lazy: true};
  isRenderWatcher = undefined;
*/
export default class Watcher {
  ....
  constructor (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    this.vm = vm
    if (isRenderWatcher) {
      vm._watcher = this
    }
    /*
      当前的watcher添加到vue的实列上, 因此:
      vm._watchers = [
        Watcher
      ];
      即 vm._watchers[0].vm = {
        $attrs: {},
        $children: [],
        $listeners: {},
        $options: {
          components: {},
          computed: {
            reversedMsg() {}
          }
        }
      }
      ....
    */
    vm._watchers.push(this);
    // options
    /*
      options = {lazy: true};
      因此：
      // 如果deep为true的话，会对getter返回的对象再做一次深度的遍历
      this.deep = !!options.deep;　即　this.deep = false; 
      // user 是用于标记这个监听是否由用户通过$watch调用的
      this.user = !!options.user;　即: this.user = false;

      // lazy用于标记watcher是否为懒执行,该属性是给 computed data 用的，当 data 中的值更改的时候，不会立即计算 getter 
      // 获取新的数值，而是给该 watcher 标记为dirty，当该 computed data 被引用的时候才会执行从而返回新的 computed 
      // data，从而减少计算量。

      this.lazy = !!options.lazy; 即: this.lazy = true;

      // 表示当 data 中的值更改的时候，watcher 是否同步更新数据，如果是 true，就会立即更新数值，否则在 nextTick 中更新。

      this.sync = !!options.sync; 即: this.sync = false;
      this.before = options.before; 即: this.before = undefined;
    */
    if (options) {
      this.deep = !!options.deep
      this.user = !!options.user
      this.lazy = !!options.lazy
      this.sync = !!options.sync
      this.before = options.before
    } else {
      this.deep = this.user = this.lazy = this.sync = false
    }
    // cb 为回调函数
    this.cb = cb
    this.id = ++uid // uid for batching
    this.active = true
    // this.dirty = true;
    this.dirty = this.lazy // for lazy watchers
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set();
    /*
      把函数转换成字符串的形式(不是正式环境下)
      this.expression = "reversedMsg() { return this.msg.split('').reverse().join('') }"
    */
    this.expression = process.env.NODE_ENV !== 'production'
      ? expOrFn.toString()
      : ''
    // parse expression for getter
    /*
      判断expOrFn是否是一个函数, 如果是一个函数, 直接赋值给　this.getter;
      否则的话, 它是一个表达式的话, 比如 'a.b.c' 这样的，因此调用　this.getter = parsePath(expOrFn); 
      parsePath函数的代码在：vue/src/core/util/lang.js 中。
    */
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
      if (!this.getter) {
        this.getter = noop
        process.env.NODE_ENV !== 'production' && warn(
          `Failed watching path: "${expOrFn}" ` +
          'Watcher only accepts simple dot-delimited paths. ' +
          'For full control, use a function instead.',
          vm
        )
      }
    }
    // 不是懒加载类型调用get
    this.value = this.lazy
      ? undefined
      : this.get()
  }
}