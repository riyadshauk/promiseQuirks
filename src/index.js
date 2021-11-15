const syncThrowingFunction = () => {
  throw new Error('Error thrown!'); // not possible to return a thrown error, by syntax, interestingly.
};

const syncErroringFunction = () => new Error('Error returned');

const trivialTest = () => {
  try {
    const a = 1;
  } catch (err) {
    console.error(err);
  } finally {
    console.debug('Finally clause of trivialTest run, clearly no error thrown or returned'); // this gets called no matter what
  }
  console.debug('Successfully reached the end of trivialTest without crashing');
};

const syncTestWithErrors = () => {
  try {
    syncThrowingFunction();
    syncErroringFunction();
  } catch (err) {
    console.error(err.stack);
  }
  console.debug('Successfully reached the end of syncTestWithErrors without crashing');
};

const asyncTestOfSyncFunctionsWithErrors = async () => {
  try {
    await syncThrowingFunction();
    await syncErroringFunction();
  } catch (err) {
    console.error(err.stack);
  }
  console.debug('Successfully reached the end of asyncTestOfSyncFunctionsWithErrors without crashing');
};

const asyncThrowingFunction = async () => new Promise(() => {
  throw new Error('Error thrown!'); // not possible to return a thrown error, by syntax, interestingly.
});

const asyncErroringFunction = async () => new Promise((resolve, reject) => {
  reject(new Error('Error returned'));
});

const asyncTestOfAsyncFunctionsWithErrors = async () => {
  try {
    await asyncThrowingFunction();
    await asyncErroringFunction();
  } catch (err) {
    console.error(err.stack);
  }
  console.debug('Successfully reached the end of asyncTestOfAsyncFunctionsWithErrors without crashing');
};

const trueAsyncThrowingFunction = async () => new Promise(() => {
  setTimeout(() => {
    throw new Error('Error thrown in timeout!');
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
  trivialTest();
  await syncTestWithErrors();
  await asyncTestOfSyncFunctionsWithErrors();
  await asyncTestOfAsyncFunctionsWithErrors();
  await asyncTestOfTrueAsyncFunctionsWithErrors();
})();