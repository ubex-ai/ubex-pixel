import {expect} from 'chai';
import CookieHelper from "../../src/cookieHelper";


describe('CookieHelper', () => {
    const cookieHelper = new CookieHelper();
    describe('defined and object structure', () => {

        it('should return object', () => {
            expect(cookieHelper).to.be.an('object');
        });

        it('should has create method', () => {
            expect(cookieHelper.create).to.be.an('function');
        });

        it('should has read method', () => {
            expect(cookieHelper.read).to.be.an('function');
        });

        it('should has erase method', () => {
            expect(cookieHelper.erase).to.be.an('function');
        });
    });

    describe('cookie lifecycle', () => {
        const cookieName = 'testCookie', cookieVal = 'myCookie';
        it('should create cookie', () => {
            cookieHelper.create(cookieName, cookieVal);
            expect(document.cookie.indexOf(cookieVal) >= 0).to.be.true;
        });

        it('should read cookie', () => {
            expect(cookieHelper.read(cookieName)).equal(cookieVal);
        });
        it('should erase cookie', () => {
            cookieHelper.erase(cookieName);
            expect(document.cookie.indexOf(cookieVal)).equal(-1);
        });
    });
});