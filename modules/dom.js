const listToElement = (list, elementCallback) => {
    const ContainerElement = new DocumentFragment()
    list.forEach(item => {
        ContainerElement.appendChild(elementCallback(item))
    })
    return ContainerElement
}


function createElement(selector) {
    let in_attr_string = false,
        encountered_special_char = false,
        keyword = "",
        last_state = "element",
        value = [],
        element = null,
        char = ""

    const specialChar = (special_chars, action, disallow_string_usage = false) => {
        if(special_chars.includes(char)) {
            encountered_special_char = true
            if(in_attr_string && !disallow_string_usage) {
                keyword += char
                return
            }
            if(action !== null) action();
        }
    }

    const buildElement = () => {
        if(last_state === "element") element = document.createElement(value[0]);
        if(last_state === "class") element.classList.add(value[0]);
        if(last_state === "id") element.setAttribute("id", value[0]);

        if(last_state === "attribute") {
            if (value.length === 1)
                element.setAttribute(value[0], "");
            else
                element.setAttribute(value[0], value[1]);
        }
    }

    const prepareElement = (state = "") => {
        value.push(keyword)
        buildElement()
        
        keyword = ""
        last_state = state
        value = []
    }

    for(char of selector) {
        specialChar(["."], () => prepareElement("class"))
        specialChar(["#"], () => prepareElement("id"))
        specialChar(["["], () => prepareElement("attribute"))
        specialChar(["]"], null)
        specialChar(["="], () => {
            value.push(keyword)
            keyword = ""
        })
        specialChar(
            ["'", '"'],
            ()=>{ in_attr_string = !in_attr_string }, 
            disallow_string_usage=true
        )

        if(!encountered_special_char) keyword += char;
        encountered_special_char = false
    }

    prepareElement()
    return element
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
