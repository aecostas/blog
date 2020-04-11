En un post anterior, https://dev.to/andres_aec/complejidad-algoritmica-o-como-mejorar-el-tiempo-de-ejecucion-3hfc, se explicaba cómo se puede mejorar el rendimiento de una aplicación sin necesidad de reimplementarla en otro lenguaje más rápido. La propuesta consistía en refactorizarla usando otros tipos de datos y algoritmos que proporcionasen un mayor rendimiento.

Ahora bien, ¿cómo detectamos y decidimos que debemos reimplementar una parte de nuestro código? Por una sospecha. Intuimos que alguna parte de nuestro código es la que está limitando el tiempo de ejecución total de la aplicación, así que es ahí donde debemos actuar. Sin embargo, esta intuición puede ser errónea, y la mejora de rendimiento puede no compensar el tiempo que dediquemos a reimplemetar esta parte del código. Por tanto, antes de reimplementar nada, verifiquemos que nuestra intuición es acertada. Es decir, midamos cuánto tiempo tarda en ejecutarse esa parte del código y comparémoslo con el tiempo total. Si supone un porcentaje significativo entonces estaremos ante un fragmento de código donde merece la pena dedicar esfuerzo a mejorar el rendimiento.

# Midiendo el tiempo en NodeJS
En NodeJS existen varios mecanismos para medir el tiempo de ejecución. Algunos de ellos se caracterizar por obligar al programador a indicar cuáles son las zonas de código a medir, como `console.time` o la `Performance Timing API`. Otra aproximación es el `profiling`, o análisis de rendimiento en tiempo de ejecución. Veremos que una aplicación `NodeJS` se puede ejecutar en modo `profiling` y, al finalizar, se genera automáticamente un informe con los tiempos de ejecución de cada función. La interpretación de este informe puede ser un tanto tediosa y difícil, por lo que se han desarrollado herramientas visuales que ayuda a su interpretación, como `clinicjs`

A continuación explico cada uno de los métodos usando el siguiente código como ejemplo. Se trata de una funcíon `slowFunc` que llama a otras dos, `add` y `div`. Al ejecutarlo nos daremos cuenta de que hay un cierto retardo, cuando el código debería ser inmediato, ya que realiza simplemente una suma y una división. Veamos cómo depurar el rendimiento.


   ```javascript
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

      const result = div(sum, 10);
   }

   slowFunc(10, 20);

   ```

## console.time
Con esta herramienta podemos medir el tiempo de ejecución entre dos puntos de nuestro código. El primero será aquel en el que escribimos `console.time(<etiqueta>)`, y el segundo `console.timeEnd(<etiqueta>)`. Los instantes de paso se grabarán de manera transparente y, en la terminal veremos cómo se escribe el tiempo transcurrido entre ambos. Para nuestro código de ejemplo, tendríamos:


   ```javascript
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
      console.time('slowFunc');
      const sum = add(a, b);

      console.time('div');
      const result = div(sum, 10);
      console.timeEnd('div');

      console.timeEnd('slowFunc');
   }

   slowFunc(10, 20);

   ```

En la terminal aparecerá:

```
div: 1000.220ms
slowFunc: 1002.300ms
```
Observamos lo siguiente:

 * es posible poner un bloque `time... timeEnd` dentro de otro
 * la etiqueta que pusimos en el código, `div` y `slowFunc` se usan para identificar en la terminal cada uno de los tiempos medidos.
 * se observa que hay una fragmento del código que ocupa casi todo el tiempo total. En este caso, el código del `div` representa casi el total de `slowFunc`. Por tanto este será el código a refactorizar para mejorar su eficiencia.
 * se trata de un mecanismo invasivo, ya que es necesario introducir líneas de código en el propio código que queremos probar


## Performance API
`NodeJS` proporciona una interfaz de menor nivel para medir el rendimiento, que permite realizar cálculos más sofisticados y dar más control al desarrollador. Se trata de una API bastante amplia, por lo que en este post nos ceñiremos a lo siguiente:
 * medir el tiempo entre dos puntos del código
 * medir el tiempo de ejecución de una función 

### Tiempo entre dos puntos del código
Para esta tarea se realizará un proceso similar al explicado en `console.time`: indicaremos el principio y final del bloque de código que queremos medir:

```javascript
   performance.mark(<etiqueta de inicio>);
   <código a medir>
   performance.mark(<etiqueta de fin>)
```

La primera diferencia con el mecanismo anterior viene ahora: el valor medido no aparece automáticamente en pantalla. Para obtenerlo es necesario que lo pidamos explícitamente:

```javascript
   performance.mark(<etiqueta de inicio>);
   <código a medir>
   performance.mark(<etiqueta de fin>);
   performance.measure(<etiqueta de la medición>, <etiqueta de inicio>, <etiqueta de fin>);

```

¿Y dónde aparece el valor medido? La API proporciona un mecanismo para monitorizar las mediciones realizadas:

```
const obs = new PerformanceObserver((items) => {
   console.log(items.getEntries());
 });

obs.observe({ entryTypes: ['measure'] });
```

Lo cuál escribiría en pantalla lo siguiente:

```javascript
[
  PerformanceEntry {
    name: 'slowFunc',
    entryType: 'measure',
    startTime: 36.153894,
    duration: 999.870955
  }
]
[
  PerformanceEntry {
    name: 'div',
    entryType: 'measure',
    startTime: 36.186445,
    duration: 999.804569
  }
]
```

Notad cómo este mecanismo es mucho más potente que el `console.time` ya que nos permite gestionar por código las mediciones. Es decir, podemos recoger los valores medidos, almacenarlos, procesarlos, etc.

### Tiempo de ejecución de una función
Otro mecanismo que nos ofrece la `Performance API` es `timerify`. Se trata de sustituir la llamada de la función a medir por un `wrapper` que incorpora mediciones de rendimiento. Así, donde antes teníamos una llamada a `dummy()`, ahora llamaremos a otra función, llamémosla `dummy_timerify`, que abremos obtenido de la siguiente forma:

```javascript
const dummy_timerify = performance.timerify(dummy);
```

Para la obtención de los resultados del análisis usamos el mismo mecanismo basado en `callbacks` visto en el punto anterior. Nuestro código de ejemplo quedaría de la siguiente manera:

```javascript
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
```

Notemos lo siguiente:
 
 * a la función `observe` hay que pasarle `function`, como `entryType`, en lugar de `measure`
 * se trata de un mecanismo invasivo. Otra vez es necesario añadir código a propósito de la medición. Sin embargo, a diferencia de los anteriores, el impacto es menor ya que solo es necesario modificar la línea de la llamada a la función de interés. De hecho se podría llegar a evitar usando una inyección de dependencias, por ejemplo si la llamada la paremetrizamos en una configuración inicial.

El resultado que veríamos en pantalla es (notad cómo también se incluyen los valores pasados como parámetros a la función, 30 y 10 en este caso):

```javascript
[ PerformanceEntry {
    '0': 30,
    '1': 10,
    name: 'div',
    entryType: 'function',
    startTime: 67.022801,
    duration: 999.952593 } ]
```


## NodeJS profiler
`NodeJS` inluye un `profiler` nativo. Para emplearlo es necesario ejecutar la aplicación en modo `profiler`. En este paso la aplicación se ejecutará normalmente y además creará un fichero con información sobre la ejecución. Dicho fichero no es interpretable directamente, por lo que es necesario transformarlo. El siguiente fragmento de código muestra el proceso completo:

```
node --prof perf_profile.js
node --prof-process isolate-0x27c5960-v8.log > processed.txt
```

El fichero generado tiene una apariencia similar a este:

```bash
 [JavaScript]:
   ticks  total  nonlib   name
    395   38.7%   47.6%  Builtin: GetProperty
     44    4.3%    5.3%  Builtin: Subtract
     28    2.7%    3.4%  Builtin: OrdinaryToPrimitive_Number
     23    2.3%    2.8%  LazyCompile: *div /home/andres/blog/perf_profile.js:5:13
     15    1.5%    1.8%  Builtin: NonNumberToNumeric
     10    1.0%    1.2%  Builtin: NonPrimitiveToPrimitive_Number
      9    0.9%    1.1%  Builtin: CallFunction_ReceiverIsNotNullOrUndefined
      8    0.8%    1.0%  Builtin: CEntry_Return1_DontSaveFPRegs_ArgvOnStack_NoBuiltinExit
      6    0.6%    0.7%  Builtin: DatePrototypeValueOf
      4    0.4%    0.5%  Builtin: DatePrototypeToPrimitive
      4    0.4%    0.5%  Builtin: Call_ReceiverIsNotNullOrUndefined
      1    0.1%    0.1%  Builtin: StoreIC
      1    0.1%    0.1%  Builtin: LoadIC_Uninitialized

```

Y este es el resultado de otra aplicación, un poco más larga que la de ejemplo, donde se pueden ver las llamadas a métodos de la librería [turfjs](https://turfjs.org/)

```
 [JavaScript]:
   ticks  total  nonlib   name
  10109   13.8%   13.8%  LazyCompile: *bearing /home/andres/dev/outtrack/node_modules/@turf/turf/turf.js:7273:17
   9264   12.6%   12.7%  LazyCompile: *distance /home/andres/dev/outtrack/node_modules/@turf/turf/turf.js:4742:18
   7148    9.7%    9.8%  LazyCompile: *<anonymous> /home/andres/dev/outtrack/node_modules/@turf/turf/turf.js:9883:32
   3196    4.4%    4.4%  LazyCompile: *degreesToRadians /home/andres/dev/outtrack/node_modules/@turf/turf/turf.js:598:26
   2517    3.4%    3.4%  LazyCompile: *searchFirstBoundingBox /home/andres/dev/outtrack/gis.js:41:26
   2023    2.8%    2.8%  LazyCompile: *bearingToAzimuth /home/andres/dev/outtrack/node_modules/@turf/turf/turf.js:569:26
   1743    2.4%    2.4%  Builtin: CompileLazy
   1651    2.2%    2.3%  LazyCompile: *coordEach /home/andres/dev/outtrack/node_modules/@turf/turf/turf.js:832:19
   1641    2.2%    2.2%  LazyCompile: *getCoord /home/andres/dev/outtrack/node_modules/@turf/turf/turf.js:1755:18
   1616    2.2%    2.2%  LazyCompile: *<anonymous> /home/andres/dev/outtrack/node_modules/@turf/turf/turf.js:1518:42
   1227    1.7%    1.7%  LazyCompile: *<anonymous> /home/andres/dev/outtrack/node_modules/@turf/turf/turf.js:1379:32
   1006    1.4%    1.4%  LazyCompile: *getCoords /home/andres/dev/outtrack/node_modules/@turf/turf/turf.js:1780:19
    989    1.3%    1.4%  LazyCompile: *geomEach /home/andres/dev/outtrack/node_modules/@turf/turf/turf.js:1222:18
    865    1.2%    1.2%  LazyCompile: *searchBoundingBox /home/andres/dev/outtrack/gis.js:51:21
    844    1.2%    1.2%  LazyCompile: *feature /home/andres/dev/outtrack/node_modules/@turf/turf/turf.js:93:17
    767    1.0%    1.0%  LazyCompile: *<anonymous> /home/andres/dev/outtrack/node_modules/@turf/turf/turf.js:1508:35

```

Como se puede ver, la interpretación de este fichero no es trivial. Por ello han surgido herramientas que muestran la misma información de manera más visual. [clinicjs](https://clinicjs.org/) es un buen ejemplo. Se trata de una `suite` de análisis de rendimiento que incluye varias herramientas:

* `clinic doctor`, para el análisis de uso de CPU, memoria o retardo del `event loop`
* `clinick flame`, que muestra un `flamegraph`, esto, una representación de las llamadas a funciones, donde en el eje Y se muestra el anidamiento de las mismas, y en el eje X el tiempo que se estuvieron ejecutando. Este tipo de gráfica es lo más paracido, en versión visual, a la `Performance API`





// https://nodejs.org/uk/docs/guides/simple-profiling/
// https://hackernoon.com/debug-node-js-with-chrome-devtools-aca7cf83af6b

// https://developer.ibm.com/tutorials/learn-nodejs-debugging-and-profiling-node-applications/

// https://www.npmjs.com/package/clinic

En este post se explicará cómo medir el tiempo de ejecución de un fragmento de código. 

- comparativa lenguajes de programación
   - https://benchmarksgame-team.pages.debian.net/benchmarksgame/fastest/node-gpp.html
   - https://benchmarksgame-team.pages.debian.net/benchmarksgame/fastest/python.html

- de qué depende qué sea rápido o no
   - compilación vs interpretado: https://ingenieriadesoftware.es/diferencia-compilador-interprete-transpilador/
   - 


- recordar que antes de refactorizar una parte del código, tengamos tests para 
asegurar que no hemos roto nada (referencia a @talkingbits?)

- nodejs native addons