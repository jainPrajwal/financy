export const loadScript = (scriptSource: string) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = scriptSource;

        script.onload = () => resolve(true);

        script.onerror = () => reject(false);

        document.body.appendChild(script)

    })
}