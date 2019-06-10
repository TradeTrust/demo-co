import debug from "debug";

export const info = namespace => debug(`tradetrust-website:info:${namespace}`);
export const warning = namespace => debug(`tradetrust-website:warning:${namespace}`);
export const error = namespace => debug(`tradetrust-website:error:${namespace}`);

export const getLogger = namespace => ({
    info: info(namespace),
    warning: warning(namespace),
    error: error(namespace)
});

export const enableLogger = () => {
    localStorage.setItem("debug", "*");
}

export const disableLogger = () => {
    if(localStorage.getItem("debug")) {
        localStorage.removeItem("debug");
    }
}