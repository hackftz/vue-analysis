// 创建子组件Vnode过程
function createComponent(Ctordata, context, children, tag) {
  // abstract是内置组件(抽象组件)的标志
  if (isTrue(Ctor.options.abstract)) {
    // 只保留slot属性，其他标签属性都被移除，在vnode对象上不再存在
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }
}

// 首次渲染
