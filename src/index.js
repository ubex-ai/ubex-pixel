'use strict';

import CollectorRequest from './collectorRequest';
import CookieHelper from './cookieHelper';
import FingerprintWrapper from './fingerprintWrapper';

(function (window) {
    const COOKIE_NAME = 'UID';
    const collectorRequest = new CollectorRequest(UBEX_URL);
    const cookieHelper = new CookieHelper();
    const fw = new FingerprintWrapper({
        requiredComponents: [
            'language',
            'colorDepth',
            'deviceMemory',
            'availableScreenResolution',
            'timezoneOffset',
            'cpuClass',
            'platform',
            'adBlock',
            'touchSupport'
        ]
    });

    let hash = cookieHelper.read(COOKIE_NAME);

    if (window.requestIdleCallback) {
        requestIdleCallback(onInit);
    } else {
        setTimeout(onInit, 500);
    }

    function onInit() {
        fw.getComponents().then(function (components) {
            console.log(components);
            if (!hash || !hash.length || typeof hash === 'undefined') {
                hash = fw.generateHashFromComponents(components);
                cookieHelper.create(COOKIE_NAME, hash);
            }
            return collectorRequest.getPixel({
                fid: hash,
                cid: window.ubx && window.ubx.q && window.ubx.q[0] && window.ubx.q[0][1],
                uri: window.location.href,
                title: document.title,
                ...fw.generateParamsFromComponents(components)
            });
        }).then(function (response, arg) {
            console.log('Pixel successfully loaded');
        }).catch(function (e) {
            console.error('Pixel not loaded', e);
        });
    }

})(window);