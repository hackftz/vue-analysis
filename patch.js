/*
 * @Author: hackftz
 * @Date: 2021-03-12 17:59:27
 * @LastEditTime: 2021-03-12 18:01:45
 * @LastEditors: hackftz
 * @Description:
 * @FilePath: /html-test/patch.js
 */

function patch(oldVnode, vnode, hydrating, removeOnly) {
  const insertedVnodeQueue = [];
  if (sameVnode(oldVnode, vnode)) {
    // patch existing root node
    patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
  } else {
    const oldElm = oldVnode.elm;
    const parentElm = nodeOps.parentNode(oldElm);

    // create new node
    createElm(vnode, insertedVnodeQueue, oldElm._leaveCb ? null : parentElm, nodeOps.nextSibling(oldElm));

    // destroy old node
    if (isDef(parentElm)) {
      removeVnodes([oldVnode], 0, 0);
    }
  }
  return vnode.elm;
}
