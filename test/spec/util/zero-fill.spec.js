'use strict';

import zeroFill from 'util/zero-fill';

describe('Zero fill', function() {
    it('fill in 2 zeros on int', function() {
        expect(zeroFill(1, 2)).to.equal('01');
    });

    it('fill in 2 zeros on string int', function() {
        expect(zeroFill('1', 2)).to.equal('01');
    });
});
