const { PerformanceObserver, performance } = require('perf_hooks');

const obs = new PerformanceObserver((items) => {
   console.log(items.getEntries());
   //performance.clearMarks();
 });

obs.observe({ entryTypes: ['measure'] });

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
   performance.mark('slowFunc_start');

   const sum = add(a, b);

   performance.mark('div_start');
   const result = div(sum, 10);
   performance.mark('div_end');


   performance.mark('slowFunc_end');
   
   performance.measure('slowFunc', 'slowFunc_start', 'slowFunc_end');
   performance.measure('div', 'div_start', 'div_end');

}

slowFunc(10, 20);
