'use strict';

import Events from './events';
import Config from './config';
import Defaults from './defaults';

import EventDispatcher from './event-dispatcher';
import Runner from './core/runner';
import Tracking from './core/tracking';
import Hierarchy from './core/hierarchy';

import Views from './views';

class Console {
    /**
     * @param {jQuery} container
     * @param {Object} options
     * @param {Console} parent
     */
    constructor(container, options, parent) {
        /**
         * @type {boolean}
         * @private
         */
        this._started = false;

        this.container = container;
        this.containerClone = container.clone();
        this.options = $.extend({}, Config, options || {});
        this.commands = [];

        this.eventDispatcher = new EventDispatcher(this);
        this.hierarchy = new Hierarchy(parent);
        this.tracking = new Tracking(this.eventDispatcher);

        if(this.options.commands) {
            this.addCommands(this.options.commands);
        }

        this.views = new Views(this.container, this.eventDispatcher, this.options.views || []);
        this.runner = new Runner(this.commands, this.eventDispatcher);
    }

    /**
     * @param {Array} commands
     */
    addCommands(commands) {
        commands.forEach((command) => {
            this.addCommand(command);
        }, this);
    }

    /**
     * @param {Command} command
     */
    addCommand(command) {
        command.con = this;
        command.eventDispatcher = this.eventDispatcher;
        this.commands.push(command);
    }

    /**
     * @returns {Console}
     */
    start() {
        //Render view
        this.views.render();

        var data = {
            container: this.container,
            hasParent: this.hierarchy.hasParent()
        };

        //add event listeners
        $(document.documentElement || window).on('click.console', (e) => {
            if (!($(e.target).parents('.console')[0] == this.container[0]) ||
                !$(e.target).closest(this.container).hasClass('console')
            ) {
                this.eventDispatcher.trigger(Events.DISABLE, data);
            }
        });

        this.container.on('click.console', () => this.eventDispatcher.trigger(Events.ENABLE, data));

        this._started = true;
        this.eventDispatcher.trigger(Events.READY, data);

        this.options.initOutput.forEach((line) => this.eventDispatcher.trigger(Events.OUTPUT, {content: line}));

        return this;
    }

    create(container, options) {
      options = options || {};

      (options.views = options.views || []).push.apply(options.views, Defaults.defaultViews());
      (options.commands = options.commands || []).push.apply(options.commands, Defaults.defaultCommands());

      return new Console(container, options, this);
    }
}

export default Console;
