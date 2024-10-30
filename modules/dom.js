
const listToElement = (list, elementCallback) => {
    const ContainerElement = new DocumentFragment()
    list.forEach(item => {
        ContainerElement.appendChild(elementCallback(item))
    })
    return ContainerElement
}

CPEC._hidden.export("dom", {
    listToElement
})