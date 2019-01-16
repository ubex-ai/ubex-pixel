import {expect} from 'chai';
import FingerprintWrapper from "../../src/fingerprintWrapper";


describe('FingerprintWrapper', () => {
    const fingerprintWrapper = new FingerprintWrapper();
    let components = null;
    it('should return FP component', async () => {
        components = await fingerprintWrapper.getComponents();
        expect(components).to.be.an('array');
        expect(components).to.have.lengthOf(32);
    });

    it('should generate hash string from given array of components', () => {
        const hash = fingerprintWrapper.generateHashFromComponents(components);
        expect(hash).to.be.an('string');
    });

    it('should return error when no components passed', () => {
        try {
            const hash = fingerprintWrapper.generateHashFromComponents();
        } catch (e) {
            console.log(e);
        }

    });
});