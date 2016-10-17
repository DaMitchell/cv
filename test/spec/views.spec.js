/* global $, describe, it, expect */
'use strict';

import EventDispatcher from 'event-dispatcher';
import Views from 'views';
import Output from 'view/output';

describe('Views', () => {
    var container, eventDispatcher, views;

    beforeEach(function() {
        container = $('<div>');
        eventDispatcher = new EventDispatcher(container);
        views = new Views(container, eventDispatcher);
    });

    it('can add a view', function() {
        var output = new Output();
        views.addView(output);

        expect(views._views.length).to.equal(1);
        expect(views._views[0]).to.equal(output);
    });

    it('can add multiple views', function() {
        var expected = [new Output(), new Output()];
        views.addViews(expected);

        views.forEach((view, index) => expect(view).to.equal(expected[index]));
    });

    it('calling render will attach the view', function() {
        var output = new Output();
        views.addView(output);
        views.render();

        expect(container.find('> div.console-content').length).to.equal(1);
        expect(views.element.find('> div.output-holder').length).to.equal(1);
    })
});
