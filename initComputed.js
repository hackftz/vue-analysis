/*
 @param {vm} 值如下:
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
 @param {computed} Object
 computed = {
   reversedMsg() {
     // this 指向 vm 实例
     return this.msg.split('').reverse().join('')
   }
 };
*/

const computedWatcherOptions = { lazy: true };
function initComputed(vm: Component, computed: Object) {
  // $flow-disable-line
  const watchers = (vm._computedWatchers = Object.create(null));
  // computed properties are just getters during SSR
  const isSSR = isServerRendering();

  for (const key in computed) {
    const userDef = computed[key];
    const getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(`Getter is missing for computed property "${key}".`, vm);
    }
    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
    }
    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(`The computed property "${key}" is already defined in data.`, vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(`The computed property "${key}" is already defined as a prop.`, vm);
      }
    }
  }
}
