let CPEC = {}
CPEC._hidden = {}
CPEC._hidden.modules = {}
console.log(CPEC)

CPEC.import = async (module_name) => {
    return new Promise((resolve, reject) => {     
        const ModuleLoader = document.querySelector("script[data-module-loader]")
        const ScriptElement = document.createElement("script")
        ScriptElement.setAttribute("src", `https://daniel.rustrum.net/CodePenFiles/modules/${module_name}.js`)
        ScriptElement.addEventListener("load", () => {
            resolve(CPEC._hidden.modules[module_name])
        })
    
        ModuleLoader.after(ScriptElement)
    })
}

CPEC._hidden.export = async (module_name, api) => {
    CPEC._hidden.modules[module_name] = api
}