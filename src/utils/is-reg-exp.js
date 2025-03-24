export function isRegExp (v) {
    // 判断是否是正则表达式
    return Object.prototype.toString.call(v) === '[object RegExp]';
}

export function isStringOrRegExpEqual(v1, v2) {
    if (isRegExp(v1) && isRegExp(v2)) return v1.toString() === v2.toString()
    return v1 === v2
}

export function isStringMatchedByStringOrRegExp(s, strOrRegExp) {
    if (isRegExp(strOrRegExp)) {
        return strOrRegExp.exec(s) !== null
    }
    return strOrRegExp === s
}
