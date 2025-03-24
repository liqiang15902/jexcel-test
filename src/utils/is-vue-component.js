export function isVueComponent(object) {
    if (object instanceof Array) {   // 先判断Array，再判断Object，否则都是Object
        return false
    } else if (object instanceof Object) {
        return object._isVue
    }
    return false
}
