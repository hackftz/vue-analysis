// 1.2 dependency tracking

// #################################

// goal

// const dep = new Dep();

// autoRun(() => {
//   dep.depend();
// });

// dep.notify();

// #################################

// window.Dep = class Dep {
class Dep {
  constructor() {
    // init the subscribers
    this.subscribers = new Set();
  }

  // collect the dependency
  depend() {
    if (activeUpdate) {
      this.subscribers.add(activeUpdate);
    }
  }

  // make the update invoked
  notify() {
    // invoke all the subscribers
    this.subscribers.forEach((sub) => sub());
  }
}

const dep = new Dep();

let activeUpdate;

function autoRun(update) {
  // wrap the update function
  function wrappedUpdate() {
    activeUpdate = wrappedUpdate;
    update();
    activeUpdate = null;
  }

  wrappedUpdate();
}

autoRun(() => {
  dep.depend();
  console.log('update');
});
