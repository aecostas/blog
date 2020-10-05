const { PerformanceObserver, performance } = require('perf_hooks');

const obs = new PerformanceObserver((items) => {
  const entries = items.getEntries();

  console.log(`${entries[0].name}:  ${entries[0].duration}`)

  //performance.clearMarks();
 });
 obs.observe({ entryTypes: ['measure'] });


 const MAX_SIZE = 10000000;

 for (let size = 1; size <= MAX_SIZE; size *= 2) {
    let a = Array(size).fill('').map( (item, i) => Object.assign({x:i, y:i}));
    let b = Array(size).fill('').map( (item, i) => Object.assign({x:i, y:i}));

    performance.mark(`push_start_${size}`);
    a.push({x:11,y:11})
    performance.mark(`push_end_${size}`);

    performance.mark(`spread_start_${size}`);
    b = [...b, {x:11, y:11}]
    performance.mark(`spread_end_${size}`);

    performance.measure(`push_${size}`, `push_start_${size}`, `push_end_${size}`);
    performance.measure(`spread_${size}`, `spread_start_${size}`, `spread_end_${size}`);
 }

