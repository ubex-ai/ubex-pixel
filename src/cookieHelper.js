'use strict';

/**
 * Help to work with cookies
 * @type {{_domain: string, erase: module.exports.erase, read: (function(*): string), create: module.exports.create}}
 */
function CookieHelper() {
    return {
        read: function (name) {
            try {
                var b = document.cookie;
            } catch (e) {}
            var matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            ));
            return b && matches ? decodeURIComponent(matches[1]) : undefined;
        },
        create: function (name, value, seconds = 1000000) {
            name = [name + "\x3d" + encodeURIComponent(value)];
            seconds && (value = new Date, value.setTime(value.getTime() + 6E4 * seconds), name.push("expires\x3d" + value.toGMTString()));
            name.push("path\x3d/");
            try {
                document.cookie = name.join(";")
            } catch (d) {
            }
        },
        //todo: remove not only value
        erase: function (name) {
            this.create(name, "", {
                expires: -1
            })
        }
    }
}

export default CookieHelper;