export function getChildByClassName (element, className) {
    for (let i in element.children) {
        let child = element.children[i]
        if (child.className && child.className.split(' ').indexOf(className) >= 0) {
            return child
        }

        let ret = getChildByClassName(child, className)
        if (ret) {
            return ret
        }
    }
    return null
}

export function getChildByNodeName (element, nodeName) {
    for (let i in element.children) {
        let child = element.children[i]
        if (child.nodeName && child.nodeName.toUpperCase() == nodeName.toUpperCase()) {
            return child
        }

        let ret = getChildByNodeName(child, nodeName)
        if (ret) {
            return ret
        }
    }
    return null
}

export function getElementValue (element) {
    if (element.value) return element.value
    if (element.children && element.children.length > 0) {
        for (let i = 0; i < element.children.length; i++) {
            let ret = getElementValue(element.children[i])
            if (ret) return ret
        }
    }
    return null
}

export function destroyVues(element) {
    // todo 未实现
    // console.log('destroyVues', element)
}
