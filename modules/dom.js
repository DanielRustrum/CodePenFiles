
const listToElement = (list, elementCallback) => {
    const ContainerElement = new DocumentFragment()
    list.forEach(item => {
        ContainerElement.appendChild(elementCallback(item))
    })
    return ContainerElement
}

/**
 * Create a DOM element from a CSS query with option to include content
 *
 * @author Laurent Blanes <laurent.blanes@gmail.com>
 * @package https://github.com/hekigan/dom-create-element-query-selector/blob/master/src/index.js
 * 
 * @param {String} querySelector (optional) default to div
 * @param {...*} [content] (optional) String|Number|DOMElement
 * @return DOMElement
 *
 */
function createElement (querySelector = 'div', ...content) {
    let nodeType = querySelector.match(/^[a-z0-9]+/i);
    let id = querySelector.match(/#([a-z]+[a-z0-9-]*)/gi);
    let classes = querySelector.match(/\.([a-z]+[a-z0-9-]*)/gi);
    let attributes = querySelector.match(/\[([a-z][a-z-]+)(=['|"]?([^\]]*)['|"]?)?\]/gi);
    let node = (nodeType) ? nodeType[0] : 'div';

    if (id && id.length > 1) {
        throw CreateElementException('only 1 ID is allowed');
    }

    const elt = document.createElement(node);

    if (id) {
        elt.id = id[0].replace('#', '');
    }

    if (classes) {
        const attrClasses = classes.join(' ').replace(/\./g, '');
        elt.setAttribute('class', attrClasses);
    }

    if (attributes) {
        attributes.forEach(item => {
            item = item.slice(0, -1).slice(1);
            let [label, value] = item.split('=');
            if (value) {
                value = value.replace(/^['"](.*)['"]$/, '$1');
            }
            elt.setAttribute(label, value || '');
        });
    }

    content.forEach(item => {
        if (typeof item === 'string' || typeof item === 'number') {
            elt.appendChild(document.createTextNode(item));
        } else if (item.nodeType === document.ELEMENT_NODE) {
            elt.appendChild(item);
        }
    });

    return elt;
}

function CreateElementException (message) {
    this.message = message;
    this.name = 'CreateElementException';
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
