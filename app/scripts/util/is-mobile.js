'use strict';

var _isConsoleMobile;

export default () => {
    if(_isConsoleMobile === undefined) {
        _isConsoleMobile = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch
    }

    return _isConsoleMobile
}
