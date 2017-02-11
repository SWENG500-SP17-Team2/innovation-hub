import test from 'tape';
import { store, actions } from './app';

test('app store', t => {
    t.test('gets initial state', t => {
        t.equal(store.getState().innovations, [{Name:"Loading...",Description:""}]);
        t.end();
    });

    
});
