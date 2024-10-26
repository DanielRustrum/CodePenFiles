console.log("Testings")

{
    var CPCore = {}

    CPCore.use = (module_name) => {
        const ModuleLoader = document.querySelector("script[data-module-loader]")
        const ScriptElement = document.createElement("script")
        ScriptElement.setAttribute("src", `https://daniel.rustrum.net/CodePenFiles/modules/${module_name}.js`)

        ModuleLoader.after(ScriptElement)
    }
}