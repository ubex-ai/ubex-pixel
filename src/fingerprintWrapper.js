'use strict';

import Fingerprint2 from 'fingerprintjs2';

function FingerprintWrapper(options) {
    if (!Fingerprint2) {
        throw new Error('Fingerprint not found');
    }
    const requiredComponents = options && options.requiredComponents || [];

    /**
     * Get array of components from fingerprint
     * @returns {Promise<any>}
     */
    function getComponents() {
        return new Promise(function (resolve, reject) {
            try {
                Fingerprint2.get(function (components) {
                    resolve(components);
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    /**
     * Generate hash from fingerprint's components
     * @param components
     * @returns String
     */
    function generateHashFromComponents(components) {
        try {
            return Fingerprint2.x64hash128(components.map(function (pair) {
                return pair.value
            }).join(), 31);
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Get required data from fingerprint's components. That data will send to server
     * @param components
     * @returns Array
     */
    function generateParamsFromComponents(components) {
        const fc = {};
        components.filter(c => requiredComponents.indexOf(c.key) >= 0)
            .forEach((c) => {
                switch (c.key) {
                    case 'touchSupport':
                        fc[c.key] = c.value[0] > 0;
                        break;
                    case 'availableScreenResolution':
                        fc[c.key] = c.value[0] + 'x' + c.value[1];
                        break;
                    case 'cpuClass' && c.value === 'not available':
                        fc[c.key] = '';
                    default:
                        fc[c.key] = c.value;
                        break;
                }
            });
        fc['wis']= getWindowResolution();
        return fc;
    }

    function getWindowResolution() {
        return window.innerHeight + 'x' + window.innerHeight;
    }

    return {
        getComponents,
        generateHashFromComponents,
        generateParamsFromComponents
    }
}

export default  FingerprintWrapper;