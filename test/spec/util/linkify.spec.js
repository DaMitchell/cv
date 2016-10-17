'use strict';

import linkify from 'util/linkify';

describe('Linkify', function() {
    it('convert https text to link', function() {
        expect(linkify('https://google.com')).to
            .equal('<a href="https://google.com" target="_blank">https://google.com</a>')
    });

    it('convert http text to link', function() {
        expect(linkify('http://google.com')).to
            .equal('<a href="http://google.com" target="_blank">http://google.com</a>')
    });

    it('convert email address to mailto link', function() {
        expect(linkify('test@test.com')).to
            .equal('<a href="mailto:test@test.com">test@test.com</a>')
    });
});
