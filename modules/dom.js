
const listToElement = (list, elementCallback) => {
    const ContainerElement = new DocumentFragment()
    list.forEach(item => {
        ContainerElement.appendChild(elementCallback(item))
    })
    return ContainerElement
}


function createElement(selector, ...content) {
    let in_attr_string = false,
        in_attr_key = false,
        in_attr_value = false,
        in_attr = false,
        string_is_double = false,
        string_is_single = false

    let keyword = "",
        last_state = "element",
        value = []

    let element = null

    for(let char of selector) {
        switch(char) {
            case ".":
                if(in_attr_string) {
                    keyword += char
                    break
                }

                [last_state, element, value, keyword] = iterateElement("class", keyword, value, last_state, element)
                value = []
                break
            case "#":
                if(in_attr_string) {
                    keyword += char
                    break
                }
    
                [last_state, element, value, keyword] = iterateElement("id", keyword, value, last_state, element)
                value = []
                break
            case "[":
                if(in_attr_string) {
                    keyword += char
                    break
                }

                in_attr_key = true
                in_attr = true
                [last_state, element, value, keyword] = iterateElement("attribute", keyword, value, last_state, element)
                last_state = "attribute"
                value = []
                keyword=""
                break
            case "]":
                if(in_attr_string) {
                    keyword += char
                    break
                }

                in_attr = false
                in_attr_key = false         
                in_attr_value = false
                break
            case "=":
                if(in_attr_string) {
                    keyword += char
                    break
                }

                in_attr_value = true
                in_attr_key = false
                value.push(keyword)
                keyword = ""
                break
            case '"':
            case "'":
                if(in_attr_value) in_attr_string = !in_attr_string;
                break
                
            default:
                keyword += char
                break
        }
    }
    [last_state, element, value, keyword] = iterateElement("end", keyword, value, last_state, element)  
    return element
}

function iterateElement(state, keyword, value, old_state, element) {
    value.push(keyword)
    element = elementBuilder(old_state, value, element)
    return [state, element, [], ""]
}

function elementBuilder(state, value, element) {
    switch(state) {
        case "element":
            return document.createElement(value[0])
        case "class":
            element.classList.add(value[0])
            return element
        case "id":
            element.setAttribute("id", value[0])
            return element
        case "attribute":
            if (value.length === 1)
                element.setAttribute(value[0], "");
            else
                element.setAttribute(value[0], value[1]);
            return element
        case "child":
            return element.appendChild(value[0])
    }
}

const mountFragment = (where, selector, fragment) => {
    const containers = document.querySelectorAll(selector)
    for (const container of containers) {
        switch (where) {
            case "before":
                container.before(fragment)
                break
            case "front":
                container.prepend(fragment)
                break
            case "back":
                container.append(fragment)
                break
            case "after":
                container.after(fragment)
                break
        }
    }
}



CPEC._hidden.export("dom", {
    listToElement,
    createElement,
    mountFragment
})
