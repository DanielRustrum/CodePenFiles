let CPEC = {}
CPEC._hidden = {}
CPEC._hidden.modules = {}
CPEC._hidden.m_map = {}

CPEC.import = async (module_name, dev=false) => {
    return new Promise((resolve, reject) => {     
        if(Object.keys(CPEC._hidden.modules).includes(module_name)) 
            resolve(CPEC._hidden.modules[module_name]);

        const ModuleLoader = document.querySelector("script[data-module-loader]")
        const ScriptElement = document.createElement("script")

        let module_url = "https://daniel.rustrum.net/CodePenFiles/modules"
        if(dev) module_url = "./modules";

        const uuid = crypto.randomUUID();
        const script_url = `${module_url}/${module_name}.js?v=${uuid}`
        CPEC._hidden.m_map[module_name] = script_url

        ScriptElement.setAttribute("src", script_url)
        ScriptElement.addEventListener("load", () => {
            resolve(CPEC._hidden.modules[module_name])
        })
    
        ModuleLoader.after(ScriptElement)
    })
}

CPEC._hidden.export = async (module_name, api) => {
    CPEC._hidden.modules[module_name] = api
}