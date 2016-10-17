'use strict';

import Command from './command';
import Events from '../events';

class Split extends Command {
    constructor() {
        super('split');
    }

    getDescription() {
        return 'Split the console window';
    }

    execute(args) {
        var direction;

        switch(args[0]) {
            case 'horiz':
            case 'vert':
                direction = args[0];
                break;
        }

        if(direction) {
            if(direction === 'vert') {
                var left = $('<div>').addClass('left');
                var right = $('<div>').addClass('right').append(this._console.containerClone.clone());

                this._console.container.parent().append(left);
                this._console.container.parent().append(right);

                this._console.container.appendTo(left);

                this._console.hierarchy.addChild(this._console.create(right.find('.console')).start());
            } else if(direction === 'horiz') {
                var top = $('<div>').addClass('top');
                var bottom= $('<div>').addClass('bottom').append(this._console.containerClone.clone());

                this._console.container.parent().append(top);
                this._console.container.parent().append(bottom);

                this._console.container.appendTo(top);

                this._console.hierarchy.addChild(this._console.create(bottom.find('.console')).start());
            }

            return true;
        }

        this._eventDispatcher.trigger(Events.OUTPUT, {
            content: 'Sorry "' + args[0] + '" is an invalid split direction.'
        });
    }
}

export default Split;
