# JSON Cycle ES

ESModule distribution of the famous [cycle.js from Douglas Crockford](https://github.com/douglascrockford/JSON-js/blob/master/cycle.js). This module exports two functions `decycle` and `retrocycle`. The implementation remains the same with slight modifications that should not alter the behavior of those functions.

## Usage

```Javascript
import { decycle, retrocycle } from 'json-cycle-es';

const decycledObj = decycle(cyclicObj);

// or

const cyclicObj = retrocycle(decycledObj);
```

The additional arguments in the signature can be ignored and are only used for recusrive calls.

# License

Public Domain

NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
