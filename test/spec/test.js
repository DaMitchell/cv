/* global describe, it */
'use strict';

import Hierarchy from 'core/hierarchy';

console.log('asdas');

describe('Give it some context', function() {
    describe('maybe a bit more context here', function() {
        it('should run here few assertions', function() {
            expect(2).to.be.greaterThan(1);
        });
    });
});
