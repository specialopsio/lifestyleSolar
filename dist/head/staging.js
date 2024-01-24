if (window.location.href.indexOf("lifestyle-solar.webflow.io") !== -1) {
  ! function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
      var f;
      "undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self), f.sbjs = e()
    }
  }(function() {
    var define, module, exports;
    return (function e(t, n, r) {
      function s(o, u) {
        if (!n[o]) {
          if (!t[o]) {
            var a = typeof require == "function" && require;
            if (!u && a) return a(o, !0);
            if (i) return i(o, !0);
            var f = new Error("Cannot find module '" + o + "'");
            throw f.code = "MODULE_NOT_FOUND", f
          }
          var l = n[o] = {
            exports: {}
          };
          t[o][0].call(l.exports, function(e) {
            var n = t[o][1][e];
            return s(n ? n : e)
          }, l, l.exports, e, t, n, r)
        }
        return n[o].exports
      }
      var i = typeof require == "function" && require;
      for (var o = 0; o < r.length; o++) s(r[o]);
      return s
    })({
      1: [function(_dereq_, module, exports) {
        "use strict";

        var init = _dereq_('./init');

        var sbjs = {
          init: function(prefs) {
            this.get = init(prefs);
            if (prefs && prefs.callback && typeof prefs.callback === 'function') {
              prefs.callback(this.get);
            }
          }
        };

        module.exports = sbjs;
      }, {
        "./init": 6
      }],
      2: [function(_dereq_, module, exports) {
        "use strict";

        var terms = _dereq_('./terms'),
          utils = _dereq_('./helpers/utils');

        var data = {

          containers: {
            current: 'sbjs_current',
            current_extra: 'sbjs_current_add',
            first: 'sbjs_first',
            first_extra: 'sbjs_first_add',
            session: 'sbjs_session',
            udata: 'sbjs_udata',
            promocode: 'sbjs_promo'
          },

          service: {
            migrations: 'sbjs_migrations'
          },

          delimiter: '|||',

          aliases: {

            main: {
              type: 'typ',
              source: 'src',
              medium: 'mdm',
              campaign: 'cmp',
              content: 'cnt',
              term: 'trm'
            },

            extra: {
              fire_date: 'fd',
              entrance_point: 'ep',
              referer: 'rf'
            },

            session: {
              pages_seen: 'pgs',
              current_page: 'cpg'
            },

            udata: {
              visits: 'vst',
              ip: 'uip',
              agent: 'uag'
            },

            promo: 'code'

          },

          pack: {

            main: function(sbjs) {
              return (
                data.aliases.main.type + '=' + sbjs.type + data.delimiter +
                data.aliases.main.source + '=' + sbjs.source + data.delimiter +
                data.aliases.main.medium + '=' + sbjs.medium + data.delimiter +
                data.aliases.main.campaign + '=' + sbjs.campaign + data.delimiter +
                data.aliases.main.content + '=' + sbjs.content + data.delimiter +
                data.aliases.main.term + '=' + sbjs.term
              );
            },

            extra: function(timezone_offset) {
              return (
                data.aliases.extra.fire_date + '=' + utils.setDate(new Date, timezone_offset) + data.delimiter +
                data.aliases.extra.entrance_point + '=' + document.location.href + data.delimiter +
                data.aliases.extra.referer + '=' + (document.referrer || terms.none)
              );
            },

            user: function(visits, user_ip) {
              return (
                data.aliases.udata.visits + '=' + visits + data.delimiter +
                data.aliases.udata.ip + '=' + user_ip + data.delimiter +
                data.aliases.udata.agent + '=' + navigator.userAgent
              );
            },

            session: function(pages) {
              return (
                data.aliases.session.pages_seen + '=' + pages + data.delimiter +
                data.aliases.session.current_page + '=' + document.location.href
              );
            },

            promo: function(promo) {
              return (
                data.aliases.promo + '=' + utils.setLeadingZeroToInt(utils.randomInt(promo.min, promo.max), promo.max.toString().length)
              );
            }

          }
        };

        module.exports = data;
      }, {
        "./helpers/utils": 5,
        "./terms": 9
      }],
      3: [function(_dereq_, module, exports) {
        "use strict";

        var delimiter = _dereq_('../data').delimiter;

        module.exports = {

          encodeData: function(s) {
            return encodeURIComponent(s).replace(/\!/g, '%21')
              .replace(/\~/g, '%7E')
              .replace(/\*/g, '%2A')
              .replace(/\'/g, '%27')
              .replace(/\(/g, '%28')
              .replace(/\)/g, '%29');
          },

          decodeData: function(s) {
            try {
              return decodeURIComponent(s).replace(/\%21/g, '!')
                .replace(/\%7E/g, '~')
                .replace(/\%2A/g, '*')
                .replace(/\%27/g, "'")
                .replace(/\%28/g, '(')
                .replace(/\%29/g, ')');
            } catch (err1) {
              // try unescape for backward compatibility
              try {
                return unescape(s);
              } catch (err2) {
                return '';
              }
            }
          },

          set: function(name, value, minutes, domain, excl_subdomains) {
            var expires, basehost;

            if (minutes) {
              var date = new Date();
              date.setTime(date.getTime() + (minutes * 60 * 1000));
              expires = '; expires=' + date.toGMTString();
            } else {
              expires = '';
            }
            if (domain && !excl_subdomains) {
              basehost = ';domain=.' + domain;
            } else {
              basehost = '';
            }
            document.cookie = this.encodeData(name) + '=' + this.encodeData(value) + expires + basehost + '; path=/';
          },

          get: function(name) {
            var nameEQ = this.encodeData(name) + '=',
              ca = document.cookie.split(';');

            for (var i = 0; i < ca.length; i++) {
              var c = ca[i];
              while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
              }
              if (c.indexOf(nameEQ) === 0) {
                return this.decodeData(c.substring(nameEQ.length, c.length));
              }
            }
            return null;
          },

          destroy: function(name, domain, excl_subdomains) {
            this.set(name, '', -1, domain, excl_subdomains);
          },

          parse: function(yummy) {

            var cookies = [],
              data = {};

            if (typeof yummy === 'string') {
              cookies.push(yummy);
            } else {
              for (var prop in yummy) {
                if (yummy.hasOwnProperty(prop)) {
                  cookies.push(yummy[prop]);
                }
              }
            }

            for (var i1 = 0; i1 < cookies.length; i1++) {
              var cookie_array;
              data[this.unsbjs(cookies[i1])] = {};
              if (this.get(cookies[i1])) {
                cookie_array = this.get(cookies[i1]).split(delimiter);
              } else {
                cookie_array = [];
              }
              for (var i2 = 0; i2 < cookie_array.length; i2++) {
                var tmp_array = cookie_array[i2].split('='),
                  result_array = tmp_array.splice(0, 1);
                result_array.push(tmp_array.join('='));
                data[this.unsbjs(cookies[i1])][result_array[0]] = this.decodeData(result_array[1]);
              }
            }

            return data;

          },

          unsbjs: function(string) {
            return string.replace('sbjs_', '');
          }

        };

      }, {
        "../data": 2
      }],
      4: [function(_dereq_, module, exports) {
        "use strict";

        module.exports = {

          parse: function(str) {
            var o = this.parseOptions,
              m = o.parser[o.strictMode ? 'strict' : 'loose'].exec(str),
              uri = {},
              i = 14;

            while (i--) {
              uri[o.key[i]] = m[i] || '';
            }

            uri[o.q.name] = {};
            uri[o.key[12]].replace(o.q.parser, function($0, $1, $2) {
              if ($1) {
                uri[o.q.name][$1] = $2;
              }
            });

            return uri;
          },

          parseOptions: {
            strictMode: false,
            key: ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'],
            q: {
              name: 'queryKey',
              parser: /(?:^|&)([^&=]*)=?([^&]*)/g
            },
            parser: {
              strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
              loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
            }
          },

          getParam: function(custom_params) {
            var query_string = {},
              query = custom_params ? custom_params : window.location.search.substring(1),
              vars = query.split('&');

            for (var i = 0; i < vars.length; i++) {
              var pair = vars[i].split('=');
              if (typeof query_string[pair[0]] === 'undefined') {
                query_string[pair[0]] = pair[1];
              } else if (typeof query_string[pair[0]] === 'string') {
                var arr = [query_string[pair[0]], pair[1]];
                query_string[pair[0]] = arr;
              } else {
                query_string[pair[0]].push(pair[1]);
              }
            }
            return query_string;
          },

          getHost: function(request) {
            return this.parse(request).host.replace('www.', '');
          }

        };
      }, {}],
      5: [function(_dereq_, module, exports) {
        "use strict";

        module.exports = {

          escapeRegexp: function(string) {
            return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
          },

          setDate: function(date, offset) {
            var utc_offset = date.getTimezoneOffset() / 60,
              now_hours = date.getHours(),
              custom_offset = offset || offset === 0 ? offset : -utc_offset;

            date.setHours(now_hours + utc_offset + custom_offset);

            var year = date.getFullYear(),
              month = this.setLeadingZeroToInt(date.getMonth() + 1, 2),
              day = this.setLeadingZeroToInt(date.getDate(), 2),
              hour = this.setLeadingZeroToInt(date.getHours(), 2),
              minute = this.setLeadingZeroToInt(date.getMinutes(), 2),
              second = this.setLeadingZeroToInt(date.getSeconds(), 2);

            return (year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second);
          },

          setLeadingZeroToInt: function(num, size) {
            var s = num + '';
            while (s.length < size) {
              s = '0' + s;
            }
            return s;
          },

          randomInt: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          }

        };

      }, {}],
      6: [function(_dereq_, module, exports) {
        "use strict";

        var data = _dereq_('./data'),
          terms = _dereq_('./terms'),
          cookies = _dereq_('./helpers/cookies'),
          uri = _dereq_('./helpers/uri'),
          utils = _dereq_('./helpers/utils'),
          params = _dereq_('./params'),
          migrations = _dereq_('./migrations');

        module.exports = function(prefs) {

          var p = params.fetch(prefs);
          var get_param = uri.getParam();
          var domain = p.domain.host,
            isolate = p.domain.isolate,
            lifetime = p.lifetime;

          migrations.go(lifetime, domain, isolate);

          var __sbjs_type,
            __sbjs_source,
            __sbjs_medium,
            __sbjs_campaign,
            __sbjs_content,
            __sbjs_term;

          function mainData() {
            var sbjs_data;
            if (
              typeof get_param.utm_source !== 'undefined' ||
              typeof get_param.utm_medium !== 'undefined' ||
              typeof get_param.utm_campaign !== 'undefined' ||
              typeof get_param.utm_content !== 'undefined' ||
              typeof get_param.utm_term !== 'undefined' ||
              typeof get_param.gclid !== 'undefined' ||
              typeof get_param.yclid !== 'undefined' ||
              typeof get_param[p.campaign_param] !== 'undefined' ||
              typeof get_param[p.term_param] !== 'undefined' ||
              typeof get_param[p.content_param] !== 'undefined'
            ) {
              setFirstAndCurrentExtraData();
              sbjs_data = getData(terms.traffic.utm);
            } else if (checkReferer(terms.traffic.organic)) {
              setFirstAndCurrentExtraData();
              sbjs_data = getData(terms.traffic.organic);
            } else if (!cookies.get(data.containers.session) && checkReferer(terms.traffic.referral)) {
              setFirstAndCurrentExtraData();
              sbjs_data = getData(terms.traffic.referral);
            } else if (!cookies.get(data.containers.first) && !cookies.get(data.containers.current)) {
              setFirstAndCurrentExtraData();
              sbjs_data = getData(terms.traffic.typein);
            } else {
              return cookies.get(data.containers.current);
            }

            return sbjs_data;
          }

          function getData(type) {

            switch (type) {

              case terms.traffic.utm:

                __sbjs_type = terms.traffic.utm;

                if (typeof get_param.utm_source !== 'undefined') {
                  __sbjs_source = get_param.utm_source;
                } else if (typeof get_param.gclid !== 'undefined') {
                  __sbjs_source = 'google';
                } else if (typeof get_param.yclid !== 'undefined') {
                  __sbjs_source = 'yandex';
                } else {
                  __sbjs_source = terms.none;
                }

                if (typeof get_param.utm_medium !== 'undefined') {
                  __sbjs_medium = get_param.utm_medium;
                } else if (typeof get_param.gclid !== 'undefined') {
                  __sbjs_medium = 'cpc';
                } else if (typeof get_param.yclid !== 'undefined') {
                  __sbjs_medium = 'cpc';
                } else {
                  __sbjs_medium = terms.none;
                }

                if (typeof get_param.utm_campaign !== 'undefined') {
                  __sbjs_campaign = get_param.utm_campaign;
                } else if (typeof get_param[p.campaign_param] !== 'undefined') {
                  __sbjs_campaign = get_param[p.campaign_param];
                } else if (typeof get_param.gclid !== 'undefined') {
                  __sbjs_campaign = 'google_cpc';
                } else if (typeof get_param.yclid !== 'undefined') {
                  __sbjs_campaign = 'yandex_cpc';
                } else {
                  __sbjs_campaign = terms.none;
                }

                if (typeof get_param.utm_content !== 'undefined') {
                  __sbjs_content = get_param.utm_content;
                } else if (typeof get_param[p.content_param] !== 'undefined') {
                  __sbjs_content = get_param[p.content_param];
                } else {
                  __sbjs_content = terms.none;
                }

                if (typeof get_param.utm_term !== 'undefined') {
                  __sbjs_term = get_param.utm_term;
                } else if (typeof get_param[p.term_param] !== 'undefined') {
                  __sbjs_term = get_param[p.term_param];
                } else {
                  __sbjs_term = getUtmTerm() || terms.none;
                }

                break;

              case terms.traffic.organic:
                __sbjs_type = terms.traffic.organic;
                __sbjs_source = __sbjs_source || uri.getHost(document.referrer);
                __sbjs_medium = terms.referer.organic;
                __sbjs_campaign = terms.none;
                __sbjs_content = terms.none;
                __sbjs_term = terms.none;
                break;

              case terms.traffic.referral:
                __sbjs_type = terms.traffic.referral;
                __sbjs_source = __sbjs_source || uri.getHost(document.referrer);
                __sbjs_medium = __sbjs_medium || terms.referer.referral;
                __sbjs_campaign = terms.none;
                __sbjs_content = uri.parse(document.referrer).path;
                __sbjs_term = terms.none;
                break;

              case terms.traffic.typein:
                __sbjs_type = terms.traffic.typein;
                __sbjs_source = p.typein_attributes.source;
                __sbjs_medium = p.typein_attributes.medium;
                __sbjs_campaign = terms.none;
                __sbjs_content = terms.none;
                __sbjs_term = terms.none;
                break;

              default:
                __sbjs_type = terms.oops;
                __sbjs_source = terms.oops;
                __sbjs_medium = terms.oops;
                __sbjs_campaign = terms.oops;
                __sbjs_content = terms.oops;
                __sbjs_term = terms.oops;
            }
            var sbjs_data = {
              type: __sbjs_type,
              source: __sbjs_source,
              medium: __sbjs_medium,
              campaign: __sbjs_campaign,
              content: __sbjs_content,
              term: __sbjs_term
            };

            return data.pack.main(sbjs_data);

          }

          function getUtmTerm() {
            var referer = document.referrer;
            if (get_param.utm_term) {
              return get_param.utm_term;
            } else if (referer && uri.parse(referer).host && uri.parse(referer).host.match(/^(?:.*\.)?yandex\..{2,9}$/i)) {
              try {
                return uri.getParam(uri.parse(document.referrer).query).text;
              } catch (err) {
                return false;
              }
            } else {
              return false;
            }
          }

          function checkReferer(type) {
            var referer = document.referrer;
            switch (type) {
              case terms.traffic.organic:
                return (!!referer && checkRefererHost(referer) && isOrganic(referer));
              case terms.traffic.referral:
                return (!!referer && checkRefererHost(referer) && isReferral(referer));
              default:
                return false;
            }
          }

          function checkRefererHost(referer) {
            if (p.domain) {
              if (!isolate) {
                var host_regex = new RegExp('^(?:.*\\.)?' + utils.escapeRegexp(domain) + '$', 'i');
                return !(uri.getHost(referer).match(host_regex));
              } else {
                return (uri.getHost(referer) !== uri.getHost(domain));
              }
            } else {
              return (uri.getHost(referer) !== uri.getHost(document.location.href));
            }
          }

          function isOrganic(referer) {

            var y_host = 'yandex',
              y_param = 'text',
              g_host = 'google';

            var y_host_regex = new RegExp('^(?:.*\\.)?' + utils.escapeRegexp(y_host) + '\\..{2,9}$'),
              y_param_regex = new RegExp('.*' + utils.escapeRegexp(y_param) + '=.*'),
              g_host_regex = new RegExp('^(?:www\\.)?' + utils.escapeRegexp(g_host) + '\\..{2,9}$');

            if (
              !!uri.parse(referer).query &&
              !!uri.parse(referer).host.match(y_host_regex) &&
              !!uri.parse(referer).query.match(y_param_regex)
            ) {
              __sbjs_source = y_host;
              return true;
            } else if (!!uri.parse(referer).host.match(g_host_regex)) {
              __sbjs_source = g_host;
              return true;
            } else if (!!uri.parse(referer).query) {
              for (var i = 0; i < p.organics.length; i++) {
                if (
                  uri.parse(referer).host.match(new RegExp('^(?:.*\\.)?' + utils.escapeRegexp(p.organics[i].host) + '$', 'i')) &&
                  uri.parse(referer).query.match(new RegExp('.*' + utils.escapeRegexp(p.organics[i].param) + '=.*', 'i'))
                ) {
                  __sbjs_source = p.organics[i].display || p.organics[i].host;
                  return true;
                }
                if (i + 1 === p.organics.length) {
                  return false;
                }
              }
            } else {
              return false;
            }
          }

          function isReferral(referer) {
            if (p.referrals.length > 0) {
              for (var i = 0; i < p.referrals.length; i++) {
                if (uri.parse(referer).host.match(new RegExp('^(?:.*\\.)?' + utils.escapeRegexp(p.referrals[i].host) + '$', 'i'))) {
                  __sbjs_source = p.referrals[i].display || p.referrals[i].host;
                  __sbjs_medium = p.referrals[i].medium || terms.referer.referral;
                  return true;
                }
                if (i + 1 === p.referrals.length) {
                  __sbjs_source = uri.getHost(referer);
                  return true;
                }
              }
            } else {
              __sbjs_source = uri.getHost(referer);
              return true;
            }
          }

          function setFirstAndCurrentExtraData() {
            cookies.set(data.containers.current_extra, data.pack.extra(p.timezone_offset), lifetime, domain, isolate);
            if (!cookies.get(data.containers.first_extra)) {
              cookies.set(data.containers.first_extra, data.pack.extra(p.timezone_offset), lifetime, domain, isolate);
            }
          }

          (function setData() {

            // Main data
            cookies.set(data.containers.current, mainData(), lifetime, domain, isolate);
            if (!cookies.get(data.containers.first)) {
              cookies.set(data.containers.first, cookies.get(data.containers.current), lifetime, domain, isolate);
            }

            // User data
            var visits, udata;
            if (!cookies.get(data.containers.udata)) {
              visits = 1;
              udata = data.pack.user(visits, p.user_ip);
            } else {
              visits = parseInt(cookies.parse(data.containers.udata)[cookies.unsbjs(data.containers.udata)][data.aliases.udata.visits]) || 1;
              visits = cookies.get(data.containers.session) ? visits : visits + 1;
              udata = data.pack.user(visits, p.user_ip);
            }
            cookies.set(data.containers.udata, udata, lifetime, domain, isolate);

            // Session
            var pages_count;
            if (!cookies.get(data.containers.session)) {
              pages_count = 1;
            } else {
              pages_count = parseInt(cookies.parse(data.containers.session)[cookies.unsbjs(data.containers.session)][data.aliases.session.pages_seen]) || 1;
              pages_count += 1;
            }
            cookies.set(data.containers.session, data.pack.session(pages_count), p.session_length, domain, isolate);

            // Promocode
            if (p.promocode && !cookies.get(data.containers.promocode)) {
              cookies.set(data.containers.promocode, data.pack.promo(p.promocode), lifetime, domain, isolate);
            }

          })();

          return cookies.parse(data.containers);

        };
      }, {
        "./data": 2,
        "./helpers/cookies": 3,
        "./helpers/uri": 4,
        "./helpers/utils": 5,
        "./migrations": 7,
        "./params": 8,
        "./terms": 9
      }],
      7: [function(_dereq_, module, exports) {
        "use strict";

        var data = _dereq_('./data'),
          cookies = _dereq_('./helpers/cookies');

        module.exports = {

          go: function(lifetime, domain, isolate) {

            var migrate = this.migrations,
              _with = {
                l: lifetime,
                d: domain,
                i: isolate
              };

            var i;

            if (!cookies.get(data.containers.first) && !cookies.get(data.service.migrations)) {

              var mids = [];
              for (i = 0; i < migrate.length; i++) {
                mids.push(migrate[i].id);
              }

              var advance = '';
              for (i = 0; i < mids.length; i++) {
                advance += mids[i] + '=1';
                if (i < mids.length - 1) {
                  advance += data.delimiter;
                }
              }
              cookies.set(data.service.migrations, advance, _with.l, _with.d, _with.i);

            } else if (!cookies.get(data.service.migrations)) {

              // We have only one migration for now, so just
              for (i = 0; i < migrate.length; i++) {
                migrate[i].go(migrate[i].id, _with);
              }

            }

          },

          migrations: [

            {
              id: '1418474375998',
              version: '1.0.0-beta',
              go: function(mid, _with) {

                var success = mid + '=1',
                  fail = mid + '=0';

                var safeReplace = function($0, $1, $2) {
                  return ($1 || $2 ? $0 : data.delimiter);
                };

                try {

                  // Switch delimiter and renew cookies
                  var _in = [];
                  for (var prop in data.containers) {
                    if (data.containers.hasOwnProperty(prop)) {
                      _in.push(data.containers[prop]);
                    }
                  }

                  for (var i = 0; i < _in.length; i++) {
                    if (cookies.get(_in[i])) {
                      var buffer = cookies.get(_in[i]).replace(/(\|)?\|(\|)?/g, safeReplace);
                      cookies.destroy(_in[i], _with.d, _with.i);
                      cookies.destroy(_in[i], _with.d, !_with.i);
                      cookies.set(_in[i], buffer, _with.l, _with.d, _with.i);
                    }
                  }

                  // Update `session`
                  if (cookies.get(data.containers.session)) {
                    cookies.set(data.containers.session, data.pack.session(0), _with.l, _with.d, _with.i);
                  }

                  // Yay!
                  cookies.set(data.service.migrations, success, _with.l, _with.d, _with.i);

                } catch (err) {
                  // Oops
                  cookies.set(data.service.migrations, fail, _with.l, _with.d, _with.i);
                }
              }
            }

          ]

        };
      }, {
        "./data": 2,
        "./helpers/cookies": 3
      }],
      8: [function(_dereq_, module, exports) {
        "use strict";

        var terms = _dereq_('./terms'),
          uri = _dereq_('./helpers/uri');

        module.exports = {

          fetch: function(prefs) {

            var user = prefs || {},
              params = {};

            // Set `lifetime of the cookie` in months
            params.lifetime = this.validate.checkFloat(user.lifetime) || 6;
            params.lifetime = parseInt(params.lifetime * 30 * 24 * 60);

            // Set `session length` in minutes
            params.session_length = this.validate.checkInt(user.session_length) || 30;

            // Set `timezone offset` in hours
            params.timezone_offset = this.validate.checkInt(user.timezone_offset);

            // Set `campaign param` for AdWords links
            params.campaign_param = user.campaign_param || false;

            // Set `term param` and `content param` for AdWords links
            params.term_param = user.term_param || false;
            params.content_param = user.content_param || false;

            // Set `user ip`
            params.user_ip = user.user_ip || terms.none;

            // Set `promocode`
            if (user.promocode) {
              params.promocode = {};
              params.promocode.min = parseInt(user.promocode.min) || 100000;
              params.promocode.max = parseInt(user.promocode.max) || 999999;
            } else {
              params.promocode = false;
            }

            // Set `typein attributes`
            if (user.typein_attributes && user.typein_attributes.source && user.typein_attributes.medium) {
              params.typein_attributes = {};
              params.typein_attributes.source = user.typein_attributes.source;
              params.typein_attributes.medium = user.typein_attributes.medium;
            } else {
              params.typein_attributes = {
                source: '(direct)',
                medium: '(none)'
              };
            }

            // Set `domain`
            if (user.domain && this.validate.isString(user.domain)) {
              params.domain = {
                host: user.domain,
                isolate: false
              };
            } else if (user.domain && user.domain.host) {
              params.domain = user.domain;
            } else {
              params.domain = {
                host: uri.getHost(document.location.hostname),
                isolate: false
              };
            }

            // Set `referral sources`
            params.referrals = [];

            if (user.referrals && user.referrals.length > 0) {
              for (var ir = 0; ir < user.referrals.length; ir++) {
                if (user.referrals[ir].host) {
                  params.referrals.push(user.referrals[ir]);
                }
              }
            }

            // Set `organic sources`
            params.organics = [];

            if (user.organics && user.organics.length > 0) {
              for (var io = 0; io < user.organics.length; io++) {
                if (user.organics[io].host && user.organics[io].param) {
                  params.organics.push(user.organics[io]);
                }
              }
            }

            params.organics.push({
              host: 'bing.com',
              param: 'q',
              display: 'bing'
            });
            params.organics.push({
              host: 'yahoo.com',
              param: 'p',
              display: 'yahoo'
            });
            params.organics.push({
              host: 'about.com',
              param: 'q',
              display: 'about'
            });
            params.organics.push({
              host: 'aol.com',
              param: 'q',
              display: 'aol'
            });
            params.organics.push({
              host: 'ask.com',
              param: 'q',
              display: 'ask'
            });
            params.organics.push({
              host: 'globososo.com',
              param: 'q',
              display: 'globo'
            });
            params.organics.push({
              host: 'go.mail.ru',
              param: 'q',
              display: 'go.mail.ru'
            });
            params.organics.push({
              host: 'rambler.ru',
              param: 'query',
              display: 'rambler'
            });
            params.organics.push({
              host: 'tut.by',
              param: 'query',
              display: 'tut.by'
            });

            params.referrals.push({
              host: 't.co',
              display: 'twitter.com'
            });
            params.referrals.push({
              host: 'plus.url.google.com',
              display: 'plus.google.com'
            });


            return params;

          },

          validate: {

            checkFloat: function(v) {
              return v && this.isNumeric(parseFloat(v)) ? parseFloat(v) : false;
            },

            checkInt: function(v) {
              return v && this.isNumeric(parseInt(v)) ? parseInt(v) : false;
            },

            isNumeric: function(v) {
              return !isNaN(v);
            },

            isString: function(v) {
              return Object.prototype.toString.call(v) === '[object String]';
            }

          }

        };
      }, {
        "./helpers/uri": 4,
        "./terms": 9
      }],
      9: [function(_dereq_, module, exports) {
        "use strict";

        module.exports = {

          traffic: {
            utm: 'utm',
            organic: 'organic',
            referral: 'referral',
            typein: 'typein'
          },

          referer: {
            referral: 'referral',
            organic: 'organic',
            social: 'social'
          },

          none: '(none)',
          oops: '(Houston, we have a problem)'

        };

      }, {}]
    }, {}, [1])(1)
  });
  let selectedPlaceHero
  let selectedPlaceNav
  let selectedPlaceCTA
  let selectedPlaceExit
  let selectedPlace
  let sliderValueHero = 150
  let sliderValueNav = 150
  let sliderValueCTA = 150
  let sliderValueExit = 150

  // Initialises the autocomplete
  function initAutocomplete() {
    var inputElements = document.querySelectorAll('.address-input')
    inputElements.forEach(function(element) {
      if (!element.id) {
        return
      }
      var autocomplete = new google.maps.places.Autocomplete(element)
      autocomplete.addListener('place_changed', function() {
        if (element.closest('div').parentElement.id === 'hero-calc') {
          window.selectedPlaceHero = autocomplete.getPlace()
          updateButtonState('hero')
        } else if (element.closest('div').parentElement.id === 'nav-calc') {
          window.selectedPlaceNav = autocomplete.getPlace()
          updateButtonState('nav')
        } else if (element.closest('div').parentElement.id === 'cta-calc') {
          window.selectedPlaceCTA = autocomplete.getPlace()
          updateButtonState('cta')
        } else if (element.closest('div').parentElement.id === 'exit-calc') {
          window.selectedPlaceExit = autocomplete.getPlace()
          updateButtonState('exit')
        } else if (element.closest('div').parentElement.parentElement.id === 'hero-calc') {
          window.selectedPlaceHero = autocomplete.getPlace()
          updateButtonState('hero')
        } else if (element.closest('div').parentElement.parentElement.id === 'nav-calc') {
          window.selectedPlaceNav = autocomplete.getPlace()
          updateButtonState('nav')
        } else if (element.closest('div').parentElement.parentElement.id === 'cta-calc') {
          window.selectedPlaceCTA = autocomplete.getPlace()
          updateButtonState('cta')
        } else if (element.closest('div').parentElement.parentElement.id === 'exit-calc') {
          window.selectedPlaceExit = autocomplete.getPlace()
          updateButtonState('exit')
        }
      });
    });
  }
  window.initAutoComplete = initAutocomplete

  google.maps.event.addDomListener(window, 'load', initAutocomplete)

  // Generates the "hash" that differentiates requests
  function generateRandomString() {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const length = 6
    let result = ''

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      result += characters.charAt(randomIndex)
    }

    return result
  }

  function updateButtonState(area) {
    const button = document.querySelector(`#${area}-calc button`)
    if (button && button.classList.contains("disabled")) {
      if ((area === 'hero' && window.selectedPlaceHero) || (area === 'nav' && window.selectedPlaceNav) || (area === 'cta' && window.selectedPlaceCTA) || (area === 'exit' && window.selectedPlaceExit)) {
        button.classList.remove("disabled")
      }
    }
  }

  // This function acquires the autocomplete value and slider data on button click
  function getAutocompleteValue(area) {
    const selected_place = selectedPlace ? window.selectedPlace : area === 'hero' ? window.selectedPlaceHero : area === 'cta' ? window.selectedPlaceCTA : area === 'exit' ? window.selectedPlaceExit : window.selectedPlaceNav
    const is_quote = window.location.pathname.match('/quote')
    if (is_quote) {
      if (selected_place) {
        document.getElementById('quote1').style.display = 'none'
      } else {
        displayError('Please input your address.')
      }
    }
    // const sliderValue = area === 'hero' ? sliderValueHero : area === 'cta' ? sliderValueCTA : area === 'exit' ? sliderValueExit : sliderValueNav
    let elementsWithSharedId = document.querySelectorAll('[id="calculateButton"]');
    elementsWithSharedId.forEach(function(element) {
      var onClickAttribute = element.getAttribute('onclick')
      var regex = /getAutocompleteValue\('(.+?)'\)/
      var match = regex.exec(onClickAttribute)

      if (match && match[1] && !is_quote) {
        if (match[1] === area) {
          element.innerHTML = "One moment..."
        }
      }
    })
    if (selected_place.geometry && selected_place.formatted_address) {
      const lat = selected_place.geometry.location.lat()
      const long = selected_place.geometry.location.lng()
      const display_address = selected_place.formatted_address
      const hash = generateRandomString()
      if (is_quote) {
        getCurrentBill(display_address, hash)
        fetch(`https://vj61befm45.execute-api.us-east-1.amazonaws.com/default/solar_hash?data_hash=${hash}&set_hash=True&lat=${lat}&long=${long}&display_address=${display_address}`)
          .then(response => response.json())
          .then(data => {
            window.hash_vals = data
            if (window.current_bill) {
              window.page_data_loaded = true
            }
            document.getElementById('formAddress').value = hash_vals.display_address
            if (window.load_bar_filled) {
              setPageData()
              showPage()
            }
          }).catch(error => {
            console.error("ERROR", error)
          })

      } else {
        document.cookie = `lat=${lat}; path=/`
        document.cookie = `long=${long}; path=/`
        document.cookie = `display_address=${encodeURIComponent(display_address)}; path=/`
        window.location.href = `/quote?hash=${hash}`
      }
    } else {
      console.debug("NO VALID ADDRESS INPUT")
    }
  }
  window.getAutocompleteValue = getAutocompleteValue

  // Just for visibilities sake this edits the input slider value so I can validate what was received
  function updateSliderValue(value, area) {
    if (area === 'hero') {
      sliderValueHero = value
    } else if (area === 'nav') {
      sliderValueNav = value
    } else if (area === 'cta') {
      sliderValueCTA = value
    } else if (area === 'exit') {
      sliderValueExit = value
    }
    updateButtonState(area)
  }

  window.updateSliderValue = updateSliderValue;

  // second script

  document.addEventListener("DOMContentLoaded", function() {
    // Get all the slider-container elements by their class name
    const sliderContainers = document.querySelectorAll('.slider-container');

    // Loop through each slider-container
    sliderContainers.forEach(function(container) {
      // Find the slider and billValue elements within the current container
      const billSlider = container.querySelector('input[type="range"]');
      const billValue = container.querySelector('span');

      // Attach an input event listener to the slider
      billSlider.addEventListener('input', function() {
        // Update the billValue innerText with the current value of the slider
        billValue.innerText = `$${this.value}`;
      });
    });
  })
  if (window.location.href.indexOf('feedback') !== -1) {
    document.addEventListener("DOMContentLoaded", function() {
      const params = new URLSearchParams(window.location.search);
      const password = params.get("password");
      const userId = params.get("user");
      const formId = params.get("form");
      const customHeading = params.get("heading");
      const makeTableId = "MnVGNFo3NA==";
      const validFormIds = ["1", "10", "22", "50", "0", "99"];
      let submitPressed

      // URL parameter checks
      if (
        !password ||
        !userId ||
        !formId ||
        btoa(password) !== makeTableId ||
        !validFormIds.includes(formId)
      ) {
        window.location.href = "https://www.lifestylesolar.com";
        return;
      } else {
        document.getElementById("mainApp").classList.remove("hidden");
      }

      document.getElementById("customerId").value = userId;
      document.getElementById("formId").value = formId;

      // Display the relevant form section
      if (formId != "1") {
        document.getElementById("nps").classList.remove("hidden");
        initNPSValidation();
      }

      if (formId === "0") {
        document.getElementById("heading").innerText = "We miss hearing from you!";
      } else if (formId === "10") {
        document.getElementById("heading").innerText = "How was your consultation?";
      } else if (formId === "22") {
        document.getElementById("heading").innerText = "Ready for your install?";
      } else if (formId === "50") {
        document.getElementById("heading").innerText = "Enjoying solar so far?";
      } else {
        document.getElementById("heading").innerText = customHeading;
      }

      function initNPSValidation() {
        // Initialize event listeners for each button in the NPS rating scale
        document.querySelectorAll(".rating-scale button").forEach((button) => {
          button.addEventListener("click", () => {
            document.querySelectorAll(".rating-scale button").forEach((btn) => {
              // Remove all styling classes from each button
              btn.classList.remove(
                "selected",
                "bg-red-500",
                "border-red-500",
                "focus:ring-red-500",
                "bg-yellow-400",
                "border-yellow-400",
                "focus:ring-yellow-400",
                "bg-[#00BA81]",
                "border-[#00BA81]",
                "focus:ring-[#00BA81]",
                "text-white"
              );
            });

            // Add the selected class to the clicked button
            button.classList.add("selected");
            const rating = parseInt(button.textContent);

            // Apply specific styles based on the rating value
            if (rating >= 1 && rating <= 3) {
              button.classList.add(
                "bg-red-500",
                "border-red-500",
                "focus:ring-red-500",
                "text-white"
              );
            } else if (rating >= 4 && rating <= 7) {
              button.classList.add(
                "bg-yellow-400",
                "border-yellow-400",
                "focus:ring-yellow-400"
              );
            } else if (rating >= 8 && rating <= 10) {
              button.classList.add(
                "bg-[#00BA81]",
                "border-[#00BA81]",
                "focus:ring-[#00BA81]",
                "text-white"
              );
            }

            // Validate the NPS form
            validateNPSForm();
          });
        });
      }

      function validateNPSForm() {
        const selected = document.querySelector(".rating-scale .selected");
        const label = document.querySelector("label[for='rating']");
        // Check if any rating button is selected
        if (!selected) {
          label.classList.add("text-red-600");
          document.getElementById("ratingLabel").classList.add("text-red-500");
          document.getElementById("error").classList.remove("opacity-0");
          return false;
        } else {
          label.classList.remove("text-red-600");
          document.getElementById("error").classList.add("opacity-0");
          document.getElementById("ratingLabel").classList.remove("text-red-500");
          return true;
        }
      }

      document
        .getElementById("propertyForm")
        .addEventListener("submit", function(event) {
          submitPressed = true
          event.preventDefault();
          // Determine which form to validate based on a condition (formId)
          let valid = formId === "1" ? true : validateNPSForm();

          // If the form is valid, get the form data and post it
          if (valid) {
            const formData = getFormData();
            postFormData(formData);
          }
        });

      // Event listeners for input changes to remove error indicators
      document.querySelectorAll("#preInstall select").forEach((select) => {
        select.addEventListener("change", () => {
          const label = document.querySelector(`label[for='${select.id}']`);
          if (select.value !== "Select your answer") {
            label.classList.remove("text-red-600");
          }
          if (validatePreInstallForm()) {
            document.getElementById("error").classList.add("opacity-0");
          }
        });
      });

      document.querySelectorAll(".rating-scale button").forEach((button) => {
        button.addEventListener("click", () => {
          const label = document.querySelector("label[for='rating']");
          label.classList.remove("text-red-600");
          document.getElementById("error").classList.add("opacity-0");
        });
      });

      function getFormData() {
        const formData = {
          customerId: document.getElementById("customerId").value,
          formId: document.getElementById("formId").value,
        };

        if (
          document.getElementById("preInstall").classList.contains("hidden") ===
          false
        ) {
          formData.motivation = window.form_array.motivation;
          formData.blocker = window.form_array.blocker;
          formData.knowledge = window.form_array.knowledge;
          formData.concern = window.form_array.concern;
          formData.comments = document.getElementById("comments").value;
        } else {
          const selectedRating = document.querySelector(".rating-scale .selected");
          formData.rating = selectedRating ? selectedRating.innerText : null;
          formData.feedback = document.getElementById("feedback").value;
        }

        return formData;
      }

      function postFormData() {
        const formData = getFormData();
        fetch("https://hook.us1.make.com/vlol7xw9f5kvv1lsun0ck8c0qb9vzt1a", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.text();
          })
          .then((text) => {
            if (text === "Accepted") {
              handleFormSuccess();
            } else {
              console.error("An error occurred while submitting the form.");
            }
          })
          .catch((error) => {
            console.error("An error occurred while submitting the form.");
          });
      }

      function handleFormSuccess() {
        // Hide the form container
        document.getElementById("app").classList.add("hidden");
        document.getElementById("surveyHeading").classList.add("hidden");
        document.getElementById("error").classList.add("hidden");
        // Show the success message
        document.getElementById("surveySuccess").classList.remove("hidden");
      }
    });
  }

  function updateYear() {
    const yearElement = document.getElementById('dateYear');
    // Only update if the element is found
    if (yearElement) {
      const currentYear = new Date().getFullYear();
      yearElement.innerText = currentYear;
    }
  }

  // Update the year immediately on page load
  updateYear();

  // Set up an interval to update the year at the start of each new year
  // Assuming the page stays open across years, which is unlikely but possible
  const now = new Date();
  const startOfNextYear = new Date(now.getFullYear() + 1, 0, 1);
  const millisecondsTillNextYear = startOfNextYear - now;

  setTimeout(() => {
    updateYear();
    // Use setInterval only if the element exists
    if (document.getElementById('dateYear')) {
      setInterval(updateYear, 365 * 24 * 60 * 60 * 1000); // Update yearly
    }
  }, millisecondsTillNextYear);
  (function() {
    // Backup original methods
    const originalAppendChild = Node.prototype.appendChild;
    const originalInsertBefore = Node.prototype.insertBefore;

    // Function to check if the node has specific classes
    function hasTargetClasses(node) {
      return node.classList && node.classList.contains('tawk-flex') &&
        node.classList.contains('tawk-flex-center') &&
        node.classList.contains('tawk-text-center') &&
        node.classList.contains('tawk-padding-small');
    }

    // Override appendChild
    Node.prototype.appendChild = function(node) {
      if (!hasTargetClasses(node)) {
        return originalAppendChild.call(this, node);
      }
    };

    // Override insertBefore
    Node.prototype.insertBefore = function(newNode, referenceNode) {
      if (!hasTargetClasses(newNode)) {
        return originalInsertBefore.call(this, newNode, referenceNode);
      }
    };

    // CSS to hide the elements, as a fallback
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
        .tawk-flex.tawk-flex-center.tawk-text-center.tawk-padding-small {
            display: none !important;
        }
    `;
    document.head.appendChild(style);
  })();
  window.form_array = {
    "blocker": "",
    "concern": "",
    "knowledge": "",
    "motivation": ""
  }
  window.formSteps = [{
      id: "motivation",
      question: "What is your #1 reason to go solar?",
      options: [{
          text: "Helping the environment",
          svg: '<svg class="h-auto w-6 mr-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ph" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="M228.74 188.32L180.27 126H208a6 6 0 0 0 4.76-9.66l-80-104a6 6 0 0 0-9.52 0l-80 104A6 6 0 0 0 48 126h27.73l-48.47 62.32A6 6 0 0 0 32 198h90v42a6 6 0 0 0 12 0v-42h90a6 6 0 0 0 4.74-9.68M44.27 186l48.47-62.32A6 6 0 0 0 88 114H60.19L128 25.84L195.81 114H168a6 6 0 0 0-4.74 9.68L211.73 186Z"></path></svg>',
          value: 0
        },
        {
          text: "Saving money monthly",
          svg: '<svg class="h-auto w-6 mr-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--iconoir" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5"><path stroke-linecap="round" d="M14.5 8.5c-.78-.202-1.866-.5-2.735-.5C7.476 8 4 10.668 4 13.958c0 1.891 1.148 3.577 2.938 4.668l-.485 1.6a.6.6 0 0 0 .574.774h1.764a.6.6 0 0 0 .36-.12l1.395-1.047h2.437l1.395 1.047a.6.6 0 0 0 .36.12h1.764a.6.6 0 0 0 .574-.774l-.485-1.6c1.067-.65 1.905-1.511 2.409-2.501M14.5 8.5L19 7l-.084 3.628L21 11.5V15l-1.926 1"></path><path fill="currentColor" stroke-linecap="round" d="M15.5 13a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1"></path><path stroke-linecap="round" d="M2 10s0 2.4 2 3"></path><path d="M12.8 7.753c.13-.372.2-.772.2-1.188C13 4.596 11.433 3 9.5 3S6 4.596 6 6.565c0 .941.358 1.798.944 2.435"></path></g></svg>',
          value: 1
        },
        {
          text: "Stabilizing energy bills",
          svg: '<svg class="h-auto w-6 mr-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--fe" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M5 19h15a1 1 0 0 1 0 2H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 2 0zm5-4a1 1 0 0 1-2 0V6a1 1 0 1 1 2 0zm2 0V8a1 1 0 0 1 2 0v7a1 1 0 0 1-2 0m4-11a1 1 0 0 1 2 0v11a1 1 0 0 1-2 0z"></path></svg>',
          value: 2
        },
        {
          text: "Energy independence",
          svg: '<svg class="h-auto w-6 mr-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--carbon" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M29 14h-1v-4h-2v4h-2v-4h-2v4h-1a1 1 0 0 0-1 1v4a5.008 5.008 0 0 0 4 4.899V27a1 1 0 0 1-1 1H5a1 1 0 0 1 0-2h5a3 3 0 0 0 0-6H5a1 1 0 0 1 0-2h5a3.003 3.003 0 0 0 3-3v-4h1a4.005 4.005 0 0 0 4-4V4h-3a3.979 3.979 0 0 0-2.747 1.106A6.004 6.004 0 0 0 7 2H4v3a6.007 6.007 0 0 0 6 6h1v4a1 1 0 0 1-1 1H5a3 3 0 0 0 0 6h5a1 1 0 0 1 0 2H5a3 3 0 0 0 0 6h18a3.003 3.003 0 0 0 3-3v-3.101A5.008 5.008 0 0 0 30 19v-4a1 1 0 0 0-1-1M13 8a2.002 2.002 0 0 1 2-2h1v1a2.002 2.002 0 0 1-2 2h-1Zm-3 1a4.005 4.005 0 0 1-4-4V4h1a4.005 4.005 0 0 1 4 4v1Zm18 10a3 3 0 0 1-6 0v-3h6Z"></path></svg>',
          value: 3
        },
      ],
    },
    {
      id: "blocker",
      question: "Why have you waited until now?",
      options: [{
          text: "Lack of information",
          svg: '<svg class="h-auto w-6 mr-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--iconoir" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><path d="M9 9c0-3.5 5.5-3.5 5.5 0c0 2.5-2.5 2-2.5 5m0 4.01l.01-.011"></path><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0 0 12 22"></path></g></svg>',
          value: 0
        },
        {
          text: "Concerns about costs",
          svg: '<svg class="h-auto w-6 mr-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ph" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="M128 88a40 40 0 1 0 40 40a40 40 0 0 0-40-40m0 64a24 24 0 1 1 24-24a24 24 0 0 1-24 24m112-96H16a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h224a8 8 0 0 0 8-8V64a8 8 0 0 0-8-8m-46.35 128H62.35A56.78 56.78 0 0 0 24 145.65v-35.3A56.78 56.78 0 0 0 62.35 72h131.3A56.78 56.78 0 0 0 232 110.35v35.3A56.78 56.78 0 0 0 193.65 184M232 93.37A40.81 40.81 0 0 1 210.63 72H232ZM45.37 72A40.81 40.81 0 0 1 24 93.37V72ZM24 162.63A40.81 40.81 0 0 1 45.37 184H24ZM210.63 184A40.81 40.81 0 0 1 232 162.63V184Z"></path></svg>',
          value: 1
        },
        {
          text: "Haven't considered it",
          svg: '<svg class="h-auto w-6 mr-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--iconoir" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 3.6a.6.6 0 0 1 .6-.6h16.8a.6.6 0 0 1 .6.6v13.8a.6.6 0 0 1-.6.6h-4.14a.6.6 0 0 0-.438.189l-3.385 3.597a.6.6 0 0 1-.874 0l-3.385-3.597A.6.6 0 0 0 7.74 18H3.6a.6.6 0 0 1-.6-.6z"></path><path stroke-linecap="round" stroke-linejoin="round" d="m12 7l1.425 2.575L16 11l-2.575 1.425L12 15l-1.425-2.575L8 11l2.575-1.425z"></path></g></svg>',
          value: 2
        },
        {
          text: "New homeowner",
          svg: '<svg class="h-auto w-6 mr-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--heroicons" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m2.25 12l8.955-8.955a1.124 1.124 0 0 1 1.59 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path></svg>',
          value: 3
        },
      ],
    },
    {
      id: "concern",
      question: "What is your biggest concern?",
      options: [{
          text: "Price",
          svg: '<svg class="h-auto w-6 mr-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--tabler" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"></path><path d="M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2m5 6h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3H10m2 0v1m0-8v1"></path></g></svg>',
          value: 0
        },
        {
          text: "Installation",
          svg: '<svg class="h-auto w-6 mr-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--tabler" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 10h3V7L6.5 3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1-3 3l-6-6a6 6 0 0 1-8-8z"></path></svg>',
          value: 1
        },
        {
          text: "Knowledge needed",
          svg: '<svg class="h-auto w-6 mr-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--fe" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16m-1-4h2v2h-2zm0-1.992s2-.008 2 0C13 13.006 16 12 16 10c0-2.21-1.773-4-3.991-4A4 4 0 0 0 8 10h2c0-1.1.9-2 2-2s2 .9 2 2c0 .9-3 2.367-3 4.008"></path></svg>',
          value: 2
        },
        {
          text: "Timeline",
          svg: '<svg class="h-auto w-6 mr-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8m.5-13H11v6l5.25 3.15l.75-1.23l-4.5-2.67z"></path></svg>',
          value: 3
        },
      ],
    },
    {
      id: "knowledge",
      question: "What is your solar knowledge level?",
      options: [{
          text: "Not very knowledgeable",
          svg: '<svg class="h-auto w-6 mr-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ph" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="M225.9 102.8c-3.8-3.9-7.7-8-9.2-11.5s-1.4-8.7-1.5-14c-.1-9.7-.3-20.8-8-28.5s-18.8-7.9-28.5-8c-5.3-.1-10.7-.2-14-1.5s-7.6-5.4-11.5-9.2C146.3 23.5 138.4 16 128 16s-18.3 7.5-25.2 14.1c-3.9 3.8-8 7.7-11.5 9.2s-8.7 1.4-14 1.5c-9.7.1-20.8.3-28.5 8s-7.9 18.8-8 28.5c-.1 5.3-.2 10.7-1.5 14s-5.4 7.6-9.2 11.5C23.5 109.7 16 117.6 16 128s7.5 18.3 14.1 25.2c3.8 3.9 7.7 8 9.2 11.5s1.4 8.7 1.5 14c.1 9.7.3 20.8 8 28.5s18.8 7.9 28.5 8c5.3.1 10.7.2 14 1.5s7.6 5.4 11.5 9.2c6.9 6.6 14.8 14.1 25.2 14.1s18.3-7.5 25.2-14.1c3.9-3.8 8-7.7 11.5-9.2s8.7-1.4 14-1.5c9.7-.1 20.8-.3 28.5-8s7.9-18.8 8-28.5c.1-5.3.2-10.7 1.5-14s5.4-7.6 9.2-11.5c6.6-6.9 14.1-14.8 14.1-25.2s-7.5-18.3-14.1-25.2Zm-11.6 39.3c-4.8 5-9.7 10.2-12.4 16.5s-2.6 13.1-2.7 19.8s-.2 14.4-3.3 17.5s-10.4 3.2-17.5 3.3s-13.7.2-19.8 2.7s-11.5 7.6-16.5 12.4S132 224 128 224s-9.1-4.9-14.1-9.7s-10.2-9.7-16.5-12.4s-13.1-2.6-19.8-2.7s-14.4-.2-17.5-3.3s-3.2-10.4-3.3-17.5s-.2-13.7-2.7-19.8s-7.6-11.5-12.4-16.5S32 132 32 128s4.9-9.1 9.7-14.1s9.7-10.2 12.4-16.5s2.6-13.1 2.7-19.8s.2-14.4 3.3-17.5s10.4-3.2 17.5-3.3s13.7-.2 19.8-2.7s11.5-7.6 16.5-12.4S124 32 128 32s9.1 4.9 14.1 9.7s10.2 9.7 16.5 12.4s13.1 2.6 19.8 2.7s14.4.2 17.5 3.3s3.2 10.4 3.3 17.5s.2 13.7 2.7 19.8s7.6 11.5 12.4 16.5S224 124 224 128s-4.9 9.1-9.7 14.1ZM140 180a12 12 0 1 1-12-12a12 12 0 0 1 12 12Zm24-72a36 36 0 0 1-28 35.1v.9a8 8 0 0 1-16 0v-8a8 8 0 0 1 8-8a20 20 0 1 0-20-20a8 8 0 0 1-16 0a36 36 0 0 1 72 0Z"></path></svg>',
          value: 0
        },
        {
          text: "I've done some research",
          svg: '<svg class="h-auto w-6 mr-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--heroicons" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"></path></svg>',
          value: 1
        },
        {
          text: "I know a lot",
          svg: '<svg class="h-auto w-6 mr-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ph" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="currentColor" d="m251.76 88.94l-120-64a8 8 0 0 0-7.52 0l-120 64a8 8 0 0 0 0 14.12L32 117.87v48.42a15.91 15.91 0 0 0 4.06 10.65C49.16 191.53 78.51 216 128 216a130 130 0 0 0 48-8.76V240a8 8 0 0 0 16 0v-40.49a115.63 115.63 0 0 0 27.94-22.57a15.91 15.91 0 0 0 4.06-10.65v-48.42l27.76-14.81a8 8 0 0 0 0-14.12M128 200c-43.27 0-68.72-21.14-80-33.71V126.4l76.24 40.66a8 8 0 0 0 7.52 0L176 143.47v46.34c-12.6 5.88-28.48 10.19-48 10.19m80-33.75a97.83 97.83 0 0 1-16 14.25v-45.57l16-8.53Zm-20-47.31l-.22-.13l-56-29.87a8 8 0 0 0-7.52 14.12L171 128l-43 22.93L25 96l103-54.93L231 96Z"></path></svg>',
          value: 2
        },
        {
          text: "I'm in the industry",
          svg: '<svg class="h-auto w-6 mr-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--carbon" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="m16 6.52l2.76 5.58l.46 1l1 .15l6.16.89l-4.38 4.3l-.75.73l.18 1l1.05 6.13l-5.51-2.89L16 23l-.93.49l-5.51 2.85l1-6.13l.18-1l-.74-.77l-4.42-4.35l6.16-.89l1-.15l.46-1L16 6.52M16 2l-4.55 9.22l-10.17 1.47l7.36 7.18L6.9 30l9.1-4.78L25.1 30l-1.74-10.13l7.36-7.17l-10.17-1.48Z"></path></svg>',
          value: 3
        },
      ],
    },
  ];

  function createSelectableStep(stepData, stepIndex) {
    console.debug("STEP")
    const stepDiv = document.createElement("div");
    stepDiv.id = `step${stepIndex}`;
    stepDiv.classList.add("step", "flex", "flex-col", "gap-2");
    if (stepIndex !== 1) {
      stepDiv.classList.add("hidden");
    }
    
    const label = document.createElement("label");
    label.setAttribute("for", stepData.id);
    label.textContent = stepData.question;
    label.classList.add("block", "text-lg", "font-bold", "mb-4", "text-center");
    stepDiv.appendChild(label);
    
    stepData.options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.index_val = stepIndex;
      button.dataset.value = option.value;
      button.text_val = option.text;
      button.tag_val = stepData.id;
      const svgContainer = document.createElement("span");
      svgContainer.innerHTML = option.svg;
      svgContainer.classList.add("svg-icon");
      button.appendChild(svgContainer);
      
      // Wrap the button text in a span with the specified classes
      const textSpan = document.createElement("span");
      textSpan.classList.add("w-full", "pr-6");
      textSpan.textContent = option.text;
      button.appendChild(textSpan);
      
      button.classList.add(
        "option-button",
        "text-center",
        "w-full", // Changed from max-w-100 to w-full
        "flex",
        "items-center",
        "justify-center",
        "gap-2",
        "py-4",
        "px-4",
        "border-2",
        "border-gray-300",
        "rounded-md",
        "text-left",
        "border-solid",
        "border-2",
        "border-gray-100",
        "hover:border-[#00BA81]",
        "hover:text-[#00BA81]",
        "pointer"
        );
        stepDiv.appendChild(button);
      });
      if (stepIndex > 1) {
        const backButton = document.createElement("button");
        backButton.type = "button";
        backButton.textContent = "Back";
        backButton.classList.add(
          "back-button",
          "self-start",
          "pb-2",
          "px-4",
          "border-2",
          "border-gray-300",
          "rounded-md",
          "m-auto",
          "mt-4",
          "rounded-md",
          "cursor-pointer",
          "absolute",
          "left-[47%]",
          "bottom-[19rem]",
          "z-10"
        );
        backButton.onclick = () => navigateToStep(stepIndex - 1);
        stepDiv.appendChild(backButton);
      }

    return stepDiv;
  }


  // Function to create the final step with a text area and submit button
  function createFinalStep(stepIndex) {
    const stepDiv = document.createElement("div");
    const app = document.getElementById("app");
    stepDiv.id = `step${stepIndex}`;
    stepDiv.classList.add("step", "hidden", "flex", "flex-col", "gap-4");

    const label = document.createElement("label");
    label.setAttribute("for", "comments");
    label.textContent = "Do you have any questions, comments, or concerns?";
    label.classList.add("block", "text-lg", "font-bold", "mb-4", "text-center");
    stepDiv.appendChild(label);

    const textarea = document.createElement("textarea");
    textarea.id = "comments";
    textarea.name = "comments";
    textarea.classList.add(
      "textarea",
      "py-2",
      "px-4",
      "border-2",
      "border-gray-300",
      "rounded-md",
      "h-32"
    );
    stepDiv.appendChild(textarea);

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.classList.add(
      "submit-button",
      "mt-4",
      "py-2",
      "px-4",
      "bg-green-500",
      "text-white",
      "rounded-md"
    );
    submitButton.onclick = () => submitForm();
    // stepDiv.appendChild(submitButton);

    stepDiv.insertBefore(textarea);

    const backButton = document.createElement("button");
    backButton.textContent = "Back";
    backButton.type = "button";
    backButton.classList.add(
      "back-button",
      "self-start",
      "pb-2",
      "px-4",
      "border-2",
      "border-gray-300",
      "rounded-md",
      "m-auto",
      "mt-4",
      "rounded-md",
      "cursor-pointer",
      "absolute",
      "left-[47%]",
      "bottom-[21rem]",
      "z-10"
    );
    backButton.onclick = () => navigateToStep(stepIndex - 1);
    stepDiv.appendChild(backButton)
    return stepDiv;
  }

  // Function to handle navigation between steps
  function navigateToStep(stepIndex) {
    document
      .querySelectorAll(".step")
      .forEach((step) => step.classList.add("hidden"));
    document.getElementById(`step${stepIndex}`).classList.remove("hidden");
    if (stepIndex - 1 === 4) {
      document.querySelector('button.w-full.mt-4.text-white.rounded-md.py-2.px-4').classList.remove('hidden')
    } else {
      document.querySelector('button.w-full.mt-4.text-white.rounded-md.py-2.px-4').classList.add('hidden')
    }
  }

  // Function to handle form submission
  function submitForm() {
    document.getElementById("formContainer").style.display = 'none';
    document.getElementById("surveyHeading").style.display = 'none';
    document.getElementById("surveySuccess").style.display = 'block';
  }

  document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const formId = params.get("form");
    // Initialize the form with steps
    if (formId === '1') {
      const button = document.querySelector('button.w-full.mt-4.text-white.rounded-md.py-2.px-4')
      button.classList.add('hidden')
      const form = document.getElementById("preInstall");
      form.classList.remove('hidden');
      document.getElementById('heading').textContent = 'Pre-Install survey'
      formSteps.forEach((step, index) =>
        form.appendChild(createSelectableStep(step, index + 1))
      );
      form.appendChild(createFinalStep(formSteps.length + 1));

      // Event delegation for option buttons
      form.addEventListener("click", (event) => {
        const optionButton = event.target.closest(".option-button");

        if (optionButton) {
          const currentStep = optionButton.closest(".step");
          currentStep.querySelectorAll(".option-button").forEach(button => {
            button.classList.remove("selected");
          });

          optionButton.classList.add("selected");
          window.form_array[optionButton.tag_val] = optionButton.text_val;

          setTimeout(
            () =>
            navigateToStep(
              parseInt(optionButton.closest(".step").id.replace("step", "")) + 1
            ),
            250
          );
        }
      });
    }
  })
};