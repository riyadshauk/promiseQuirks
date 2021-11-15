# promiseQuirks

A repo exploring potential solutions/work-arounds to the use case around the problem of throwing an error inside of asynchronous code, in JavaScript, which may (if actually inside asynchronous code, and not just wrapped with trivial async/await etc) cause the script to halt.

## Problem

Output of `index.js`, notice the end output (telling us that an error is thrown, but that the function that it is thrown from does not exit / the program crashes), which seems originally unfortunate:

```bash
% nvm use 14
Now using node v14.17.6 (npm v6.14.15)
% node src/index.js 
Finally clause of trivialTest run, clearly no error thrown or returned
Successfully reached the end of trivialTest without crashing
Error: Error thrown!
    at syncThrowingFunction (/Users/riyad/repos/promiseQuirks/src/index.js:2:9)
    at syncTestWithErrors (/Users/riyad/repos/promiseQuirks/src/index.js:20:5)
    at /Users/riyad/repos/promiseQuirks/src/index.js:80:9
    at Object.<anonymous> (/Users/riyad/repos/promiseQuirks/src/index.js:84:3)
    at Module._compile (internal/modules/cjs/loader.js:1072:14)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1101:10)
    at Module.load (internal/modules/cjs/loader.js:937:32)
    at Function.Module._load (internal/modules/cjs/loader.js:778:12)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:76:12)
    at internal/main/run_main_module.js:17:47
Successfully reached the end of syncTestWithErrors without crashing
Error: Error thrown!
    at syncThrowingFunction (/Users/riyad/repos/promiseQuirks/src/index.js:2:9)
    at asyncTestOfSyncFunctionsWithErrors (/Users/riyad/repos/promiseQuirks/src/index.js:30:11)
    at /Users/riyad/repos/promiseQuirks/src/index.js:81:9
    at processTicksAndRejections (internal/process/task_queues.js:95:5)
Successfully reached the end of asyncTestOfSyncFunctionsWithErrors without crashing
Error: Error thrown!
    at /Users/riyad/repos/promiseQuirks/src/index.js:39:9
    at new Promise (<anonymous>)
    at asyncThrowingFunction (/Users/riyad/repos/promiseQuirks/src/index.js:38:43)
    at asyncTestOfAsyncFunctionsWithErrors (/Users/riyad/repos/promiseQuirks/src/index.js:48:11)
    at /Users/riyad/repos/promiseQuirks/src/index.js:82:9
    at processTicksAndRejections (internal/process/task_queues.js:95:5)
Successfully reached the end of asyncTestOfAsyncFunctionsWithErrors without crashing
/Users/riyad/repos/promiseQuirks/src/index.js:58
    throw new Error('Error thrown in timeout!');
    ^

Error: Error thrown in timeout!
    at Timeout._onTimeout (/Users/riyad/repos/promiseQuirks/src/index.js:58:11)
    at listOnTimeout (internal/timers.js:557:17)
    at processTimers (internal/timers.js:500:7)
% 
```

This repo explores solutions to this problem.