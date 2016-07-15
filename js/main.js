/* cookie notice script */

(function(opts) {

    var _dt = new Date(),
        _dc = document.cookie,
        _cn = document.getElementById(opts.dialogID),
        _sc, _link_accept;

    if (!_cn) {
        return false;
    }

    _sc = _cn.querySelector('[data-opt-scroll]') || null,
    _link_accept = _cn.querySelector('a[href="#accept"]');

    var cookieDays  = opts.cookieDays  || 365,
        cookieName  = opts.cookieName  || 'cookie-notice-accepted',
        cookieValue = opts.cookieValue || 'yes',
        acceptByScroll = (opts.acceptByScroll === undefined)? true : !!opts.acceptByScroll;

    var _getCookie = function() {
        return(_dc.match('(^|; )'+ cookieName +'=([^;]*)') || 0)[2];
    };

    var _acceptCookie = function() {
        _dt.setTime(_dt.getTime() + (cookieDays * 86400000));
        document.cookie = cookieName + '='+ cookieValue +'; expires=' + _dt.toGMTString() + '; path=/';

        _cn.setAttribute('aria-hidden', 'true');
        _cn.removeAttribute('role');
        _cn.className = 'accepted';

        if (typeof opts.acceptCallback === 'function') {
            opts.acceptCallback();
        }
    };

    if (!_getCookie(cookieName)) {

       /* accept cookie by closing the dialog */
       _link_accept.addEventListener('click', function(evt) {
           evt.preventDefault();
           _acceptCookie();
       }, false);

       /* accept cookie on window scroll (the handler fires once) */
       if (acceptByScroll && !!_sc) {
           _sc.setAttribute('data-opt-scroll', 'true');
           window.setTimeout(function() {
               window.addEventListener('scroll', function _acceptCookieByScroll() {
                   _acceptCookie();
                   window.removeEventListener('scroll', _acceptCookieByScroll);
               }, false);
           }, 5000);
       }

       /* provide some accessibility hints */
       window.setTimeout(function() {
           _cn.removeAttribute('aria-hidden');
           _cn.setAttribute('role', 'alert');
       }, 200);
    }


}({
    dialogID    : 'cookie-notice',           /* required */
    cookieName  : 'cookie-notice-accepted',  /* optional */
    cookieValue : 'yes',                     /* optional */
    cookieDays  : 365,                       /* optional */
    acceptByScroll : true,                   /* optional */

    acceptCallback : function() {

    }
}));


/* Font Loading */
(function(fonts) {
    var cb = function() {
        var h = document.getElementsByTagName('head')[0];
        var l = document.createElement('link');

        for (var i = 0, c; i < fonts.length; i++) {
            c = l.cloneNode();
            c.rel  = 'stylesheet';
            c.href = fonts[i];
            h.appendChild(c);
        }
    };

    var raf = window.requestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.msRequestAnimationFrame;

    if (raf) {
        raf(cb);
    }
    else {
        window.addEventListener('load', cb);
    }
}([
  'http://fonts.googleapis.com/css?family=Montserrat',
  'http://fonts.googleapis.com/css?family=Lato:300,400'
  //'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,600'
]));


/* Stackexchange API */
$.ready().then(function() {
    var soReputation    = $('#so-reputation'),
        soAnswers       = $('#so-answers'),
        APIurl          = 'https://api.stackexchange.com/2.2/users/1098851';

    /* get rep. */
    $.fetch(APIurl + '?site=stackoverflow', { responseType : 'json' })
    .then(function(data) {
        var soRep = +data.response.items[0].reputation;
        soReputation.className = 'loaded';
        soReputation.textContent = ~~(soRep/100)/10;
    });

    /* get answers */
    $.fetch(APIurl + '/answers?site=stackoverflow&filter=total', { responseType : 'json' })
    .then(function(data) {
        soAnswers.className = 'loaded';
        soAnswers.textContent = data.response.total;
    });
});
