// #################################################################
// 响应式基类
class MyVue {
  constructor(options) {
    this.options = options;

    // 数据的初始化
    this.initData(options);

    // dom元素id
    let el = this.options.id;

    // 实例的挂载
    this.$mount(el);
  }

  initData(options) {
    if (!options.data) {
      return;
    }

    // 缓存data
    this._data = options.data;

    // data属性 get、set方法重写
    new Observer(options.data);
  }

  $mount(el) {
    let innerHtml = document.querySelector(`#${el}`).innerHTML;
    // 直接改写innerHTML
    const updateView = _ => {
      let key = innerHtml.match(/{(\w+)}/)[1];

      // 第一次挂载到dom元素上的时候 调用了data属性值的get方法
      document.querySelector(`#${el}`).innerHTML = this.options.data[key]; // 调用get方法 首次添加 Dep.target
    };

    // 创建key属性值绑定的 会触发界面渲染更新的 依赖
    const watcher = new Watcher(updateView, true);
    console.log('%c MyVue => $mount => watcher: ⧭', 'color: #e57373', watcher);
  }
}

// #################################################################
// 观察者
class Observer {
  constructor(data) {
    // 对每个对象属性重写getter、setter方法
    this.walk(data);
  }

  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      // 数据响应
      defineReactive(obj, key);
    }
  }
}

// #################################################################
// 定义响应数据
const defineReactive = (obj, key) => {
  // 每个属性都有一个依赖管理
  const dep = new Dep();
  console.log('%c defineReactive => dep: ⧭', 'color: #cc0088', dep);

  const property = Object.getOwnPropertyDescriptor(obj, key);
  let val = obj[key];

  // 存在且不可配置
  if (property && property.configurable === false) {
    return;
  }

  Object.defineProperty(obj, key, {
    // 可配置
    configurable: true,
    // 可枚举
    enumerable: true,

    get() {
      // 做依赖的收集
      console.log('%c defineReactive => defineProperty => get: ⧭', 'color: #bfffc8', Dep.target);
      if (Dep.target) {
        dep.depend();
      }

      return val;
    },

    set(newVal) {
      if (newVal === val) {
        return;
      }

      val = newVal;

      // 派发更新
      dep.notify();
    },
  });
};

// #################################################################
// 监听者
class Watcher {
  constructor(expOrFn, isRenderWatcher) {
    // 绑定更新回调函数
    this.getter = expOrFn;

    // 会进行状态的更新
    this.get();
  }

  get() {
    console.log('%c Watcher get: ⧭', 'color: #007300', this);
    // 当前执行的watcher
    Dep.target = this;
    this.getter();
    Dep.target = null;
  }

  update() {
    this.get();
  }
}

let uid = 0;

// #################################################################
// 管理依赖 Dep
class Dep {
  constructor() {
    this.id = uid++;
    this.subs = [];
  }

  // 收集依赖
  depend() {
    if (Dep.target) {
      // Dep.target是当前的watcher，将当前的watcher（依赖）推到subs中
      this.subs.push(Dep.target);
    }
  }

  // 派发更新
  notify() {
    // 浅拷贝引用
    const subs = this.subs.slice();

    // 遍历dep中的依赖，对每个依赖执行更新操作
    for (let i = 0; i < subs.length; i++) {
      const sub = subs[i];
      sub.update();
    }
  }

  static target = null;
}

var myVue = new MyVue({
  id: 'box',
  data: {
    name: 'sara',
  },
});

const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: null,
  set: null,
};

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

const keys = Object.keys(myVue._data);
let i = keys.length;
while (i--) {
  const key = keys[i];
  proxy(myVue, '_data', key);
}

console.log('%c myVue: ⧭', 'color: #807160', myVue);
