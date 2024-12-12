import {cache} from 'react';
 
// The first component that calls `getNow()` will
// trigger the creation of the `Date` instance.
const getNow = cache(() => new Date());
 
export default getNow;