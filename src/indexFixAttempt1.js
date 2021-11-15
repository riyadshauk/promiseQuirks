const { EventEmitter } = require('events');

const ee = new EventEmitter();

ee.emit('blah');

ee.addListener('blah', () => console.log('blah emitted'));

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

console.debug('ee:', ee);

console.debug('Huh? Notice that ee has a "blah" event registered, with eventsCount of 1, but nothing else...');

ee.addListener('asyncError', () => {
  console.debug('asyncError event emitted');
})

(async () => {
  await asyncTestOfTrueAsyncFunctionsWithErrors();
})();