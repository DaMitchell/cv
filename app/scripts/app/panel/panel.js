/* global define */
define(['jquery'], function($)
{
    'use strict';

    var panel = $('#side-panel');
    var buttons = $('#side-panel .buttons .button');
    var content = $('#side-panel .content');
    var panels = $('#side-panel .content > div');
    var closeButton = $('#side-panel .buttons .button.close');

    buttons.on('click', function()
    {
        if($(this).hasClass('close'))
        {
            panel.removeClass('show').addClass('hide');
            closeButton.removeClass('show').addClass('hide');

            return false;
        }

        if(!panel.hasClass('show'))
        {
            panel.removeClass('hide').addClass('show');
            closeButton.removeClass('hide').addClass('show');
        }

        panels.show().not('.' + $(this).data().tab).hide();

        return false;
    });
});