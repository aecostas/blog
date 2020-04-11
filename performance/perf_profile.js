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
