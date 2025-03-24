/**
 * 判断对象的类型
 * @param object
 * @returns {string}
 */
import Vue from "vue";

export function whatIsIt (object) {
    if (typeof object === 'null') {
        return 'null'
    } else if (typeof object === 'undefined') {
        return 'undefined'
    } else if (typeof object === 'string') {
        return 'string'
    } else if (object instanceof Array) {   // 先判断Array，再判断Object，否则都是Object
        return 'Array'
    } else if (object instanceof Object) {
        return 'Object'
    } else if (object instanceof Vue) {
        return 'Object'
    } else if (typeof object === 'boolean') {
        return 'boolean'
    } else if (typeof object === 'number') {
        return 'number'
    } else {
        // JS标准没有新的类型定义之前不会触发这里
        return "don't know"
    }
}
