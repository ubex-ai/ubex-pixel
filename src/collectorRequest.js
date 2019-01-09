'use strict';

/**
 * For sending requests to server
 * @returns {{getPixel: (function(*=): Promise<any>)}}
 * @constructor
 */

function CollectorRequest(apiURL) {
    function encodeParams(params) {
        return Object.keys(params).map(function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
        }).join('&');
    }

    function sendRequest(url, params, method = 'GET', body = null) {
        return new Promise(function (resolve, reject) {
            // check XMLHttpRequest support onload. if not, that is IE8,9, and use XDomainRequest.
            var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
            var xhr = new XHR();
            xhr.open(method, `//${url}?${encodeParams(params)}`, true);
            xhr.send(body);
            xhr.onload = function (arg) {
                resolve(this, arg);
            };
            xhr.onerror = function (arg) {
                reject(this, arg);
            }
        });
    }

    return {
        getPixel: function (params) {
            return sendRequest(apiURL, params);
        },
        sendAction: function (type, label, value) {
            return sendRequest(apiURL, {type, label, value});
        }
    }
}

export default CollectorRequest;