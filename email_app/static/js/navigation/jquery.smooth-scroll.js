!function(t){"use strict";function e(t){return t.replace(/(:|\.)/g,"\\$1")}var l={},o={exclude:[],excludeWithin:[],offset:0,direction:"top",scrollElement:null,scrollTarget:null,beforeScroll:function(){},afterScroll:function(){},easing:"swing",speed:1e3,autoCoefficent:2,preventDefault:!0},s=function(e){var l=[],o=!1,s=e.dir&&"left"==e.dir?"scrollLeft":"scrollTop";return this.each(function(){if(this!=document&&this!=window){var e=t(this);e[s]()>0?l.push(this):(e[s](1),(o=e[s]()>0)&&l.push(this),e[s](0))}}),l.length||this.each(function(t){"BODY"===this.nodeName&&(l=[this])}),"first"===e.el&&l.length>1&&(l=[l[0]]),l};document;t.fn.extend({scrollable:function(t){var e=s.call(this,{dir:t});return this.pushStack(e)},firstScrollable:function(t){var e=s.call(this,{el:"first",dir:t});return this.pushStack(e)},smoothScroll:function(l,o){if("options"===(l=l||{}))return o?this.each(function(){var e=t(this),l=t.extend(e.data("ssOpts")||{},o);t(this).data("ssOpts",l)}):this.first().data("ssOpts");var s=t.extend({},t.fn.smoothScroll.defaults,l),n=t.smoothScroll.filterPath(location.pathname);return this.unbind("click.smoothscroll").bind("click.smoothscroll",function(l){var o=this,r=t(this),i=t.extend({},s,r.data("ssOpts")||{}),c=s.exclude,a=i.excludeWithin,f=0,h=0,u=!0,d={},p=location.hostname===o.hostname||!o.hostname,m=i.scrollTarget||(t.smoothScroll.filterPath(o.pathname)||n)===n,S=e(o.hash);if(i.scrollTarget||p&&m&&S){for(;u&&f<c.length;)r.is(e(c[f++]))&&(u=!1);for(;u&&h<a.length;)r.closest(a[h++]).length&&(u=!1)}else u=!1;u&&(i.preventDefault&&l.preventDefault(),t.extend(d,i,{scrollTarget:i.scrollTarget||S,link:o}),t.smoothScroll(d))}),this}}),t.smoothScroll=function(e,o){if("options"===e&&"object"==typeof o)return t.extend(l,o);var s,n,r,i,c=0,a="offset",f="scrollTop",h={},u={};"number"==typeof e?(s=t.extend({link:null},t.fn.smoothScroll.defaults,l),r=e):(s=t.extend({link:null},t.fn.smoothScroll.defaults,e||{},l)).scrollElement&&(a="position","static"==s.scrollElement.css("position")&&s.scrollElement.css("position","relative")),f="left"==s.direction?"scrollLeft":f,s.scrollElement?(n=s.scrollElement,/^(?:HTML|BODY)$/.test(n[0].nodeName)||(c=n[f]())):n=t("html, body").firstScrollable(s.direction),s.beforeScroll.call(n,s),r="number"==typeof e?e:o||t(s.scrollTarget)[a]()&&t(s.scrollTarget)[a]()[s.direction]||0,h[f]=r+c+s.offset,"auto"===(i=s.speed)&&(i=h[f]||n.scrollTop(),i/=s.autoCoefficent),u={duration:i,easing:s.easing,complete:function(){s.afterScroll.call(s.link,s)}},s.step&&(u.step=s.step),n.length?n.stop().animate(h,u):s.afterScroll.call(s.link,s)},t.smoothScroll.version="1.4.13",t.smoothScroll.filterPath=function(t){return t.replace(/^\//,"").replace(/(?:index|default).[a-zA-Z]{3,4}$/,"").replace(/\/$/,"")},t.fn.smoothScroll.defaults=o}(jQuery);