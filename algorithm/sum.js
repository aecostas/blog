const { performance, PerformanceObserver} = require('perf_hooks')

let values = {};

const obs = new PerformanceObserver((items) => {
    const FIRST_PARAM = '0';

    items.getEntries().forEach((item) => {
        if (values[item.name] === undefined) {
            values[item.name] = {};
        }

        if (values[item.name][item[FIRST_PARAM].length] === undefined) {
            values[item.name][item[FIRST_PARAM].length] = [];
        }

        values[item.name][item[FIRST_PARAM].length].push(item.duration);
    })
})

obs.observe({entryTypes: ['function']})

const target = 7;
const trials = 10;

let i, j;

let datasets = [];

for (let size of [250, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 64000*2, 64000*4]) {
    let data = [];

    for (let i= 10; i<size + 10- 3; i++) {
        data.push(i);
    }
    
    data.push(2);
    data.push(3);
    data.push(5);

    datasets.push(data);
}


function searchPairSimple(data, target) {
    for (i = 0; i < data.length; i++) {
        for (j = 0; j < data.length; j++) {
            if (i == j) continue;

            if (data[i] + data[j] === target) {
                return [i, j];
            }
        }
    }
}

function searchPairSimpleOptimized(data, target) {
    for (i = 0; i < data.length - 1; i++) {
        for (j = i+1; j < data.length; j++) {
    
            if (data[i] + data[j] === target) {
                return [i, j];
            }    
        }
    }
}

function searchPairDictionary(data, target) {

    let dict = {}
    for (let i = 0; i < data.length; i++) {
      dict[data[i]] = i; 
    
      if (dict[ target - data[i] ] !== undefined && 
          dict[ target - data[i] ]  !== i) {
 
            return [i, dict[ target - data[i]]];
      }
    }
}

const functions = [
    /*performance.timerify(searchPairSimple),
    performance.timerify(searchPairSimpleOptimized),*/
    performance.timerify(searchPairDictionary)
];

for (let func of functions) {
    for (let data of datasets) {
        for (let i = 0; i<trials; i++) {
            let [a, b] = func(data, target);
        }
    }
}

for (key of Object.keys(values)) {
    for (size of Object.keys(values[key])) {

        sum = values[key][size].reduce(function(a, b) { return a + b; });
        avg = sum / values[key][size].length;

        console.log(key, size, avg);
    }
}
