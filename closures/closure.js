function init() {
  var name = "Mozilla";          // name is a local variable created by init
  function displayName() {      // this is the inner function that forms a closure
    console.log(name);        // use variable declared in the parent function
  }
  displayName();
}
//Thanks to the closure, here we can still have access to name variable even if it was a local variable
init();

// Note that the displayName() function has no local variables of its own. However, since inner 
// functions have access to the variables of outer scopes, displayName() can access the variable 
// name declared in the parent function, init().
// Traditionally (before ES6), JavaScript variables only had two kinds of scopes: function scope and 
// global scope. Variables declared with var are either function-scoped or global-scoped, depending on
// whether they are declared within a function or outside a function. 
// blocks don't create scopes for var, the var statements here actually create a global variable.
// let and const declarations allow you to create block-scoped variables.
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
//here same thing for count variable
function createCounter() {
    let count = 0;
  
    return {
      increment() {
        count++;
        return count;
      },
      reset() {
        count = 0;
      }
    };
  }
  
  const counter = createCounter();
  console.log(counter.increment()); // 1 the closure keeps the value of that variable
  console.log(counter.increment()); // 2 so that everytime a function is called again, the value increments