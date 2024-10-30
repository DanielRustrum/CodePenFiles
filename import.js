let CPEC = {}
CPEC.prototype.modules = {}

CPEC.import = async (module_name) => {
    return new Promise((resolve, reject) => {     
        const ModuleLoader = document.querySelector("head")
        const ScriptElement = document.createElement("script")
        ScriptElement.setAttribute("src", `https://daniel.rustrum.net/CodePenFiles/modules/${module_name}.js`)
        ScriptElement.addEventListener("load", () => {
            resolve(CPEC.prototype.modules[module_name])
        })
    
        ModuleLoader.appendChild(ScriptElement)
    })
}

CPEC.prototype.export = async (module_name, api) => {
    CPEC.prototype.modules[module_name] = api
}