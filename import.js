async function importScript(module_name) {
    return new Promise((resolve, reject) => {     
        const ModuleLoader = document.querySelector("head")
        const ScriptElement = document.createElement("script")
        ScriptElement.setAttribute("src", `https://daniel.rustrum.net/CodePenFiles/modules/${module_name}.js`)
        ScriptElement.addEventListener("load", () => {
            resolve()
        })
    
        ModuleLoader.appendChild(ScriptElement)
    })
}