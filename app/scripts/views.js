'use strict';

import Input from 'view/input';
import Events from 'events';

import runLoop from 'run-loop';
import template from 'template/console';

const nanoConfig = {
    paneClass : 'console-pane',
    sliderClass : 'console-slider',
    contentClass : 'console-content'
};

class Views {
    constructor(container, eventDispatcher, views) {
        /**
         * @type {Array}
         */
        this._views = [];

        /**
         * @type {EventDispatcher}
         */
        this._eventDispatcher = eventDispatcher;

        /**
         * @type {jQuery}
         */
        this.container = container;

        /**
         * @type {jQuery}
         */
        this.element = $(template());

        this._eventDispatcher.on(Events.COMMAND_COMPLETE, () => runLoop.deferOnce('complete', this, 'nanoScroller'));
        this._eventDispatcher.on(Events.READY, this.nanoScroller.bind(this));

        this.addViews(views || []);
    }

    nanoScroller() {
        this.container.nanoScroller(nanoConfig);
        //setTimeout(() => this.element.scrollTop(this.element[0].scrollHeight), 0);
        setTimeout(() => this.element.animate({scrollTop: this.element[0].scrollHeight}, 100), 0);
    }

    addViews(views) {
        views.forEach((view) => this.addView(view));
    }

    addView(view) {
        view.eventDispatcher = this._eventDispatcher;
        this._views.push(view);
    }

    forEach(...args) {
        return this._views.forEach(...args);
    }

    render() {
        //render wrapping view
        this.container.html(this.element);
        //render added views
        this.forEach((view) => {
            if(typeof view.render !== 'function') {
                throw new Error('Views must have a render method');
            }

            view.parent = this.element;

            this.element.append(view.element);
        });
    }
}

export default Views;
