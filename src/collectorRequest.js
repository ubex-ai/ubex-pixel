'use strict';

/**
 * For sending requests to server
 * @returns {{getPixel: (function(*=): Promise<any>)}}
 * @constructor
 */

function CollectorRequest(apiURL) {
    const pixelImage = new Image();
    function encodeParams(params) {
        return Object.keys(params).map(function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
        }).join('&');
    }

    function imageRequest(apiURL, params){
        document.getElementsByTagName('body')[0].appendChild(pixelImage);
        pixelImage.src = '//' + apiURL + `?${encodeParams(params)}`;
        pixelImage.style.width = 0;
        pixelImage.style.height = 0;
    }

    return {
        imageRequest: function (params) {            return imageRequest(apiURL + '/pixel.gif', params);
        },
        sendAction: function (type, label, value) {
            return sendRequest(apiURL, {type, label, value});
        }
    }
}

export default CollectorRequest;