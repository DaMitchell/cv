define("config",["command/about","command/clear","command/help","command/test","command/window","exports"],function(n,t,e,o,i,a){"use strict";function r(n,t){a[n]=t}var c;c=n["default"];var u;u=t["default"];var f;f=e["default"];var s;s=o["default"];var l;l=i["default"],r("default",{title:"Console CV",version:"2.0.0",commands:[new l,new f,new c,new u,new s],loading:$("#loading"),container:$("#console"),input:$("#input"),output:$("#output"),initOutput:["Type help to get a list of commands"," "]})}),define("events",["exports"],function(n){"use strict";function t(t,e){n[t]=e}t("default",{INIT_OUTPUT:"cv.console.init.output",READY:"cv.console.ready",INPUT_SHOW:"cv.console.input.show",INPUT_HIDE:"cv.console.input.hide",OUTPUT:"cv.console.output",OUTPUT_CLEAR:"cv.console.outputclear",COMMAND_SUBMIT:"cv.console.command.submit",COMMAND_ERROR:"cv.console.command.error",COMMAND_NOT_FOUND:"cv.console.command.not.found",COMMAND_COMPLETE:"cv.console.command.complete"})}),define("main",["events","config","core/runner","core/tracking","view/input","view/output","exports"],function(n,t,e,o,i,a,r){"use strict";function c(n,t){r[n]=t}function u(n){n.views.input=new g(n),n.views.output=new p(n),n.runner=new d(n),n.tracking=new m(n)}function f(n){var t=n.config;if(t.commands&&$.isArray(t.commands))for(var e=0,o=t.commands.length;o>e;e++)"object"==typeof t.commands[e]&&(n.commands.push(t.commands[e]),"function"==typeof n.commands[e].init&&n.commands[e].init(n))}var s;s=n["default"];var l;l=t["default"];var d;d=e["default"];var m;m=o["default"];var g;g=i["default"];var p;p=a["default"];var v={config:l,commands:[],views:{input:null,output:null,prompt:null},runner:null,tracking:null};c("default",function(n){return n=n||{},v.config=$.extend({},v.config,n||{}),u(v),f(v),$(v).trigger(s.READY),v})}),define("command/about",["events","exports"],function(n,t){"use strict";function e(n,e){t[n]=e}var o;o=n["default"],e("default",function(){function n(n){a=n}function t(){return"about"}function e(){return"Information on what this is all about."}function i(){function n(){$(a).trigger(o.COMMAND_ERROR,"There was an error getting fetching the about information.")}function t(n){for(var t=0;t<n.lines.length;t++)$(a).trigger(o.OUTPUT,{content:n.lines[t],classes:["white","fade-in"]})}$.getJSON("data/about.json").done(t).fail(n)}var a;return{init:n,getCommand:t,getDescription:e,execute:i}})}),define("command/clear",["events","exports"],function(n,t){"use strict";function e(n,e){t[n]=e}var o;o=n["default"],e("default",function(){function n(n){a=n}function t(){return"clear"}function e(){return"Clear the window of all past output."}function i(){$(a).trigger(o.OUTPUT_CLEAR)}var a;return{init:n,getCommand:t,getDescription:e,execute:i}})}),define("command/help",["events","exports"],function(n,t){"use strict";function e(n,e){t[n]=e}var o;o=n["default"],e("default",function(){function n(n){c=n}function t(){return"help"}function e(){return["This is the help commands description","It is a multi-line example of a description","Just a 3rd one for example"]}function i(){var n,t,e=[{content:c.config.title+' <span class="white">version</span> <span class="yellow">'+c.config.version+"</span>"},{},{classes:["yellow"],content:"Usage:"},{classes:["white","fade-in"],content:"  command [arguments]"},{},{classes:["yellow"],content:"Available commands:"}];for(n=0,t=e.length;t>n;n++)$(c).trigger(o.OUTPUT,e[n]);a()}function a(){var n,t,e,i,a,u=[],f=0;for(n=0,t=c.commands.length;t>n;n++)e=c.commands[n],"function"==typeof e.getCommand&&(i={name:e.getCommand(),description:"function"==typeof e.getDescription?e.getDescription():""},i.name.length>f&&(f=i.name.length),u.push(i));for(n=0;n<u.length;n++)if(i=u[n],$.isArray(i.description)){var s;for(s=0;s<i.description.length;s++)a=0===s?"  "+i.name+r(i.description[s],f-i.name.length+4):"  "+r(i.description[s],f+4),$(c).trigger(o.OUTPUT,{content:a,classes:["white","fade-in"]})}else a="  "+i.name+r(i.description,f-i.name.length+4),$(c).trigger(o.OUTPUT,{content:a,classes:["white","fade-in"]})}function r(n,t){var e,o="";for(e=0;t>e;e++)o+=" ";return o+n}var c;return{init:n,getCommand:t,getDescription:e,execute:i}})}),define("command/test",["events","exports"],function(n,t){"use strict";function e(n,e){t[n]=e}var o;o=n["default"],e("default",function(){function n(n){a=n}function t(){return"test"}function e(){return"Some test lines to see the different theme colors"}function i(){var n="This is some test text to see the colors",t=["black","red","green","yellow","blue","magenta","cyan","white"];t.map(function(t){$(a).trigger(o.OUTPUT,{content:n,classes:[t]})})}var a;return{init:n,getCommand:t,getDescription:e,execute:i}})}),define("command/window",["events","exports"],function(n,t){"use strict";function e(n,e){t[n]=e}var o;o=n["default"],e("default",function(){function n(n){a=n}function t(){return"window"}function e(){return["Allows you to change the size of the window.","Will work depending on you screen size."]}function i(n){var t=$(a.config.container),e=n[0];if(!("full"===e&&t.hasClass("full")||"small"===e&&t.hasClass("small"))){var i;switch(e){case"full":case"small":i=e}i?t.removeClass("full small").addClass(i):$(a).trigger(o.OUTPUT,{content:'Sorry "'+e+'" is an invalid size'})}}var a;return{init:n,getCommand:t,getDescription:e,execute:i}})}),define("core/runner",["events","exports"],function(n,t){"use strict";function e(n,e){t[n]=e}var o;o=n["default"],e("default",function(n){function t(t,e){var i,a,r;for(i=0,a=n.commands.length;a>i;i++)if(r=n.commands[i],("function"==typeof r.getCommand||"function"==typeof r.execute)&&r.getCommand()===$.trim(e.command))return void r.execute(e.args,n.views.output);e.command.length&&$(n).trigger(o.COMMAND_NOT_FOUND,e)}return $(n).off(o.COMMAND_SUBMIT,t).on(o.COMMAND_SUBMIT,t),{execute:t}})}),define("core/tracking",["events","exports"],function(n,t){"use strict";function e(n,e){t[n]=e}var o;o=n["default"],e("default",function(n){function t(n,t){"function"==typeof ga&&ga("send","event","command",t.command,t.args.join(" "))}$(n).off(o.COMMAND_SUBMIT,t).on(o.COMMAND_SUBMIT,t)})}),define("util/command-history",["exports"],function(n){"use strict";function t(t,e){n[t]=e}function e(){c=r.length}function o(n){r.push(n)}function i(){return 0>c-1?r[c]:(c--,r[c])}function a(){return c++,r[c]}var r=[],c=0;t("default",{resetIndex:e,addHistory:o,getNextCommand:i,getPreviousCommand:a})}),define("view/input",["events","view/prompt","util/command-history","exports"],function(n,t,e,o){"use strict";function i(n,t){o[n]=t}var a;a=n["default"];var r;r=t["default"];var c;c=e["default"],i("default",function(n){function t(){$(n.config.input).show().addClass("fade-in"),u.focus()}function e(){$(n.config.input).hide()}function o(t){var e;if(t.keyCode===f.enter){var o=u.val(),i=o.split(" "),r=i.shift();$(n).trigger(a.COMMAND_SUBMIT,{prompt:s.getPromptText(),command:r,args:i}),o.length&&c.addHistory(o),c.resetIndex(),u.val("")}else t.keyCode===f.up?(e=c.getNextCommand(),u.val(void 0===e?"":e)):t.keyCode===f.down&&(e=c.getPreviousCommand(),u.val(void 0===e?"":e))}function i(){u[0].selectionStart=u[0].selectionEnd=u[0].value.length}var u=$(n.config.input).find("input"),f={enter:13,up:38,down:40},s=new r(n);return $(n).off(a.READY,t).on(a.READY,t),$(n).off(a.INPUT_SHOW,t).on(a.INPUT_SHOW,t),$(n).off(a.INPUT_HIDE,e).on(a.INPUT_HIDE,e),u.off("keydown",o).on("keydown",o),u.off("keyup",i).on("keyup",i),$(n.config.container).click(function(){u.focus()}),{}})}),define("view/output",["events","exports"],function(n,t){"use strict";function e(n,e){t[n]=e}var o;o=n["default"],e("default",function(n){function t(n,t){var e=["line"];void 0!==t&&$.isArray(t)&&(e=e.concat(t));var o=$("<div>").addClass(e.join(" ")).html(u(n));f.append(o),s.scrollTop(s[0].scrollHeight)}function e(n,e){t(e.prompt+" "+e.command+" "+e.args.join(" "))}function i(n,e){t('The command "'+e.command+'" could not be found.')}function a(n,e){t(e,["red"])}function r(n,e){t(e.content,e.classes)}function c(){f.find(".line").remove()}function u(n){if(void 0===n)return"";var t=/\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim,e=/(^|[^\/])(www\.[\S]+(\b|$))/gim,o=/\w+@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6})+/gim;return n.replace(t,'<a href="$&" target="_blank">$&</a>').replace(e,'$1<a href="http://$2" target="_blank">$2</a>').replace(o,'<a href="mailto:$&">$&</a>')}var f=$(n.config.output),s=$(n.config.container).find(".console-content");$(n).on(o.COMMAND_NOT_FOUND,i),$(n).on(o.COMMAND_ERROR,a),$(n).on(o.COMMAND_SUBMIT,e),$(n).on(o.OUTPUT_CLEAR,c),$(n).on(o.OUTPUT,r);for(var l=0,d=n.config.initOutput.length;d>l;l++)t(n.config.initOutput[l],["fade-in"]);return{addOutputLine:t}})}),define("view/prompt",["events","exports"],function(n,t){"use strict";function e(n,e){t[n]=e}var o;o=n["default"],e("default",function(n){function t(n,t){for(n=n.toString();n.length<t;)n="0"+n;return n}function e(){var n=new Date,e=t(n.getHours(),2)+":"+t(n.getMinutes(),2)+":"+t(n.getSeconds(),2);a.find(".time").text(e)}function i(){return a.text()}var a=$(n.config.input).find(".prompt");return $(n).on(o.COMMAND_SUBMIT,e),$(n).on(o.READY,e),{getPromptText:i}})});