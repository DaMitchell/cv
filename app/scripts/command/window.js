'use strict';

import Command from './command';
import Events from 'events';
import transitionEvent from 'util/transition-event';

class Window extends Command {
    constructor() {
        super('window');
    }

    getDescription() {
        return [
            'Allows you to change the size of the window.',
            'Will work depending on you screen size.'
        ];
    }

    getHelp() {
        return [
            {content: 'Usage:', classes: ['yellow']},
            {content: '  window &lt;size&gt;', classes: ['fade-in']},
            {content: 'Sizes:', classes: ['yellow']},
            {content: '  min', classes: ['fade-in']},
            {content: '  max', classes: ['fade-in']},
            {content: 'Description:', classes: ['yellow']},
            {content: '  Allow you to change the size of the console window', classes: ['fade-in']},
            {content: '  If you are using this command on a mobile device nothing will happen as the console is always at max.', classes: ['fade-in']}
        ];
    }

    execute(args) {
        var deferred = $.Deferred();
        var container = this._console.container.parents('#console');
        var size = args[0];

        if (container.hasClass(size)) {
            return;
        }

        var sizeClass;

        switch (size) {
            case 'min':
            case 'max':
                sizeClass = size;
                break;
        }

        if (sizeClass) {
            var transition = transitionEvent();

            if(transition) {
                container.one(transition, () => deferred.resolve());
            }

            container.removeClass('min max').addClass(sizeClass);

            return transition ? deferred.promise() : deferred.resolve();
        }

        this._eventDispatcher.trigger(Events.OUTPUT, {
            content: 'Sorry "' + size + '" is an invalid size'
        });
    }
}

export default Window;
