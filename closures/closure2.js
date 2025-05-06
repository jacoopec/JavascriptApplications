//example1
for (let i = 1; i <= 3; i++) {
    setTimeout(() => console.log(i), 1000 * i); // prints 1, 2, 3 correctly
  }

//example2
function makeAdder(x) {
    return function(y) {
      return x + y;
    };
  }
  
  const add5 = makeAdder(5);
  console.log(add5(10)); // 15


//example3

function createSecretHolder(secret) {
return {
    getSecret: () => secret,
    setSecret: (newSecret) => { secret = newSecret; }
};
}

const holder = createSecretHolder('shhh');
console.log(holder.getSecret()); // "shhh"
holder.setSecret('new secret');
console.log(holder.getSecret()); // "new secret"


//example4

function createCounter() {
    let count = 0;
    return function () {
      count++;
      return count;
    };
  }
  
  const counter = createCounter();
  console.log(counter()); // 1
  console.log(counter()); // 2
  console.log(counter()); // 3
  //🧠 count is remembered across function calls 

//example5
  function secretHolder(secret) {
    return {
      get: () => secret,
      set: (newSecret) => secret = newSecret
    };
  }
  
  const sh = secretHolder("top-secret");
  console.log(sh.get()); // top-secret
  sh.set("new-secret");
  console.log(sh.get()); // new-secret
  //🧠 No one can access secret directly, only via get and set.


//example6  function factory
function multiplier(x) {
    return function(y) {
      return x * y;
    };
  }
  
  const double = multiplier(2);
  const triple = multiplier(3);
  
  console.log(double(5)); // 10
  console.log(triple(5)); // 15

//The inner function remembers x even after multiplier() has finished.


//example 7
//DOM Event Handler (Closures in Callbacks)



function setupButtons() {
  const buttons = document.querySelectorAll('button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      console.log(`Button ${i} clicked`);
    });
  }
}
//🧠 Each click handler retains access to its own index i.