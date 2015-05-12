'use strict';

/**
 * @type {string}
 */
var transition;

function whichTransitionEvent(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
        'transition':'transitionend',
        'OTransition':'oTransitionEnd',
        'MozTransition':'transitionend',
        'WebkitTransition':'webkitTransitionEnd'
    };

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}

export default function() {
    if(!transition) {
        transition = whichTransitionEvent();
    }

    return transition;
}
