/* global $, describe, it, expect */
'use strict';

import Console from 'console';
import Hierarchy from 'core/hierarchy';

describe('Hierarchy', () => {
    it('is accessible', () => {
        Hierarchy.should.be.a('function');
    });

    describe('parent', () => {
        it('is undefined when not set', () => {
            expect((new Hierarchy()).getParent()).to.equal(undefined);
        });

        it('hasParent should return false', () => {
            expect((new Hierarchy()).hasParent()).to.be.false;
        });

        it('parent is set', () => {
            var parent = new Console();
            expect((new Hierarchy(parent)).getParent()).to.equal(parent);
        });

        it('parent cannot be set as a string', () => {
            expect(() => new Hierarchy('parent')).to.throw(Error);
        });

        it('parent cannot be set as a object', () => {
            expect(() => new Hierarchy({a: 123})).to.throw(Error);
        });

        it('parent cannot be set as a array', () => {
            expect(() => new Hierarchy([1, 2, 3])).to.throw(Error);
        });

        it('parent cannot be set as a int', () => {
            expect(() => new Hierarchy(123)).to.throw(Error);
        });
    });

    describe('children', () => {

    });
});
