const { EventEmitter } = require('events');

const ee = new EventEmitter();

ee.addListener('asyncError', () => {
  console.debug('asyncError event emitted'); // potential solution: this is where error-handling could live
});

// NOTE: No idea why adding a listener to the event-emitter cannot be done after some of these functions are defined... Some weird quirks of the JavaScript runtime still to be understood (this strange RT error may come up, instead of what's expected: `TypeError: ee.addListener(...) is not a function`).

const trueAsyncThrowingFunction = async () => new Promise(() => {
  setTimeout(() => {
    // throw new Error('Error thrown in timeout!');
    ee.emit('asyncError', new Error('Error thrown in timeout!'));
  }, 100);
});

const trueAsyncFunctionWithError = async () => new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('Error returned in timeout'));
  });
});

const asyncTestOfTrueAsyncFunctionsWithErrors = async () => {
  try {
    await trueAsyncThrowingFunction();
    await trueAsyncFunctionWithError();
  } catch (err) {
    console.error(err.stack);
  }
  console.debug('Successfully reached the end of asyncTestOfTrueAsyncFunctionsWithErrors without crashing');
};

(async () => {
  await asyncTestOfTrueAsyncFunctionsWithErrors();
})();