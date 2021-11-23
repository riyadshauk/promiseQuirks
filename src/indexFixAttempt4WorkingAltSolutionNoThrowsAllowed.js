const { EventEmitter } = require('events');

// const trueAsyncThrowingFunction = async () => new Promise((resolve, reject) => {
//   setTimeout(() => {
//     throw new Error('Error thrown in timeout!');
//   }, 100);
// });

const trueAsyncFunctionWithError = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('Error in timeout, rejecting promise'));
  }, 100);
});

const asyncTestOfTrueAsyncFunctionsWithErrors = async () => {
  try {
    // await trueAsyncThrowingFunction();
    await trueAsyncFunctionWithError();
  } catch (err) {
    console.error(err.stack);
  }
  console.debug('Successfully reached the end of asyncTestOfTrueAsyncFunctionsWithErrors without crashing -- solution: just don\'t throw errors, return or reject them instead!');
};

process.addListener('uncaughtException', err => {
  console.debug('uncaughtException, err:', err);
});

process.addListener('exit', () => {
  console.debug('exit');
}); // this code still exits, no solution here for undoing an exception

(async () => {
  await asyncTestOfTrueAsyncFunctionsWithErrors();
})();