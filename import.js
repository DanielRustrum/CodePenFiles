async function importScript(module_name) {
    return new Promise((resolve, reject) => {     
        const ModuleLoader = document.querySelector("script[data-module-loader]")
        const ScriptElement = document.createElement("script")
        ScriptElement.setAttribute("src", `https://daniel.rustrum.net/CodePenFiles/modules/${module_name}.js`)
        ScriptElement.addEventListener("load", () => {
            resolve()
        })
    
        ModuleLoader.after(ScriptElement)
    })
}