(function () {
    if (window.__swiftHtmxWidgetsBound) {
        return;
    }
    window.__swiftHtmxWidgetsBound = true;

    var auth = window.swiftHtmxAuth = window.swiftHtmxAuth || {
        token: null,
        tokenPromise: null,
        ensureToken: function () {
            var self = this;
            if (this.token) {
                return Promise.resolve(this.token);
            }
            if (!this.tokenPromise) {
                this.tokenPromise = fetch('/dwapi/users/token', { method: 'POST', credentials: 'include' })
                    .then(function (r) {
                        if (!r.ok) {
                            throw new Error();
                        }
                        return r.json();
                    })
                    .then(function (data) {
                        self.token = data.token;
                        return self.token;
                    })
                    .catch(function () {
                        self.tokenPromise = null;
                        return null;
                    });
            }
            return this.tokenPromise;
        }
    };

    function registerExtension() {
        if (window.swiftHtmxAuthExtensionDefined || !window.htmx) {
            return;
        }
        htmx.defineExtension('swift-auth', {
            onEvent: function (name, e) {
                if (name === 'htmx:configRequest' && auth.token) {
                    e.detail.headers.Authorization = 'Bearer ' + auth.token;
                }
            }
        });
        window.swiftHtmxAuthExtensionDefined = true;
    }

    var pending = '[data-swift-htmx-widget]:not([data-swift-htmx-started])';

    function findWidgets(scope) {
        if (!scope || scope === document || scope.nodeType === 9) {
            return [].slice.call(document.querySelectorAll(pending));
        }
        var list = [];
        if (scope.nodeType === 1) {
            if (scope.matches && scope.matches(pending)) {
                list.push(scope);
            }
            if (scope.querySelectorAll) {
                var nodes = scope.querySelectorAll(pending);
                for (var i = 0; i < nodes.length; i++) {
                    list.push(nodes[i]);
                }
            }
        }
        return list;
    }

    function boot(scope) {
        registerExtension();
        if (!window.htmx) {
            return;
        }
        var widgets = findWidgets(scope || document);
        if (!widgets.length) {
            return;
        }
        auth.ensureToken().then(function (token) {
            if (!token) {
                return;
            }
            for (var j = 0; j < widgets.length; j++) {
                var w = widgets[j];
                if (w.getAttribute('data-swift-htmx-started') !== null) {
                    continue;
                }
                w.setAttribute('data-swift-htmx-started', '');
                w.dispatchEvent(new CustomEvent(w.getAttribute('data-swift-load-event') || 'swift:load'));
            }
        });
    }

    function start() {
        boot(document);
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }

    document.addEventListener('htmx:afterSwap', function (e) {
        if (e.detail && e.detail.target) {
            boot(e.detail.target);
        }
    });
})();
