// 1.1 getters and setters

// #####################################

const obj = {
  foo: 'bar',
};

let realValue;

// defineProperty
Object.defineProperty(obj, 'foo', {
  // configurable: true
  // writable: false,
  // enumerable: false,

  get() {
    return internalValue;
  },

  set(newValue) {
    realValue = newValue;
  },
});

const obj = {
  foo: 'bar',
};

// #####################################

// exercise
function convert(obj) {
  Object.keys(obj).forEach((key) => {
    let internalValue = obj[key];

    Object.defineProperty(obj, key, {
      get() {
        console.log(`getting key "${key}": ${internalValue}`);
      },

      set(newValue) {
        console.log(`setting key "${key}": ${internalValue}`);
        internalValue = newValue;
      },
    });
  });
}
