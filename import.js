let CPEC = {}
CPEC._hidden = {}
CPEC._hidden.modules = {}

CPEC.import = async (module_name, dev=false) => {
    return new Promise((resolve, reject) => {     
        const ModuleLoader = document.querySelector("script[data-module-loader]")
        const ScriptElement = document.createElement("script")

        let module_url = "https://daniel.rustrum.net/CodePenFiles/modules"
        if(dev) module_url = "./modules";

        ScriptElement.setAttribute("src", `${module_url}/${module_name}.js`)
        ScriptElement.addEventListener("load", () => {
            resolve(CPEC._hidden.modules[module_name])
        })
    
        ModuleLoader.after(ScriptElement)
    })
}

CPEC._hidden.export = async (module_name, api) => {
    CPEC._hidden.modules[module_name] = api
}