const { PerformanceObserver, performance } = require('perf_hooks');

const obs = new PerformanceObserver((items) => {
   console.log(items.getEntries());
   //performance.clearMarks();
 });

obs.observe({ entryTypes: ['function'] });


const add = (a, b) => {
   return a+b
}

const div = (a, b) => {
   const startAt = new Date();
   if (b === 0) {
      throw Error;
   }

   // code to consume CPU cycles
   while (Date.now() - startAt < 1000) {}

   return a/b;
}

const slowFunc = (a, b) => {
   const sum = add(a, b);

   const result = div_timerify(sum, 10);
}

const div_timerify = performance.timerify(div);

slowFunc(10, 20);
