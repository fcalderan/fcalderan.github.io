(function(opts){var _dt=new Date(),_dc=document.cookie,_cn=document.getElementById(opts.dialogID),_sc,_link_accept;if(!_cn){return false}_sc=_cn.querySelector("[data-opt-scroll]")||null,_link_accept=_cn.querySelector('a[href="#accept"]');var cookieDays=opts.cookieDays||365,cookieName=opts.cookieName||"cookie-notice-accepted",cookieValue=opts.cookieValue||"yes",acceptByScroll=(opts.acceptByScroll===undefined)?true:!!opts.acceptByScroll;var _getCookie=function(){return(_dc.match("(^|; )"+cookieName+"=([^;]*)")||0)[2]};var _acceptCookie=function(){_dt.setTime(_dt.getTime()+(cookieDays*86400000));document.cookie=cookieName+"="+cookieValue+"; expires="+_dt.toGMTString()+"; path=/";_cn.setAttribute("aria-hidden","true");_cn.removeAttribute("role");_cn.className="accepted";if(typeof opts.acceptCallback==="function"){opts.acceptCallback()}};if(!_getCookie(cookieName)){_link_accept.addEventListener("click",function(evt){evt.preventDefault();_acceptCookie()},false);if(acceptByScroll&&!!_sc){_sc.setAttribute("data-opt-scroll","true");window.setTimeout(function(){window.addEventListener("scroll",function _acceptCookieByScroll(){_acceptCookie();window.removeEventListener("scroll",_acceptCookieByScroll)},false)},5000)}window.setTimeout(function(){_cn.removeAttribute("aria-hidden");_cn.setAttribute("role","alert")},200)}}({dialogID:"cookie-notice",cookieName:"cookie-notice-accepted",cookieValue:"yes",cookieDays:365,acceptByScroll:true,acceptCallback:function(){}}));window.addEventListener("load",function(){var me=document.querySelectorAll("#me img");if(!!me&&me.length===1){}},false);(function(fonts){var cb=function(){var h=document.getElementsByTagName("head")[0];var l=document.createElement("link");for(var i=0,c;i<fonts.length;i++){c=l.cloneNode();c.rel="stylesheet";c.href=fonts[i];h.appendChild(c)}};var raf=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;if(raf){raf(cb)}else{window.addEventListener("load",cb)}}(["http://fonts.googleapis.com/css?family=Montserrat","http://fonts.googleapis.com/css?family=Lato:300,400"]));