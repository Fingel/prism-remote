export class PrismRemote extends HTMLElement {
    constructor() {
        super();
    }

    async fetchSrc(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch source.");
        }
        const result = await response.text();
        return result;
    }

    async connectedCallback() {
        let srcUrl;
        if (this.hasAttribute("src")) {
            srcUrl = this.getAttribute("src");
        } else {
            console.error("src attribute must be set");
            return;
        }

        let rawUrl;
        if (srcUrl.includes("github.com")) {
            rawUrl = srcUrl
                .replace("github.com", "raw.githubusercontent.com")
                .replace("/blob/", "/");
        } else {
            rawUrl = srcUrl;
        }

        let lang;
        if (this.hasAttribute("lang")) {
            lang = this.getAttribute("lang");
        } else {
            console.error("lang attribute must be set");
            return;
        }

        let code = await this.fetchSrc(rawUrl);
        let codeLines = code.split("\n");
        let start = 1;
        if (this.hasAttribute("start")) {
            start = this.getAttribute("start");
            srcUrl = `${srcUrl}#L${start}`;
        }
        let end = codeLines.length + 1;
        if (this.hasAttribute("end")) {
            end = this.getAttribute("end");
            if (this.hasAttribute("start")) {
                srcUrl = `${srcUrl}-L${end}`;
            }
        }
        codeLines = codeLines.splice(start - 1, end - start + 1);
        code = codeLines.join("\n");

        const codePre = document.createElement("pre");
        const codeBlock = document.createElement("code");
        codeBlock.setAttribute("class", `language-${lang}`);
        codeBlock.textContent = code;
        codePre.appendChild(codeBlock);

        const attribution = document.createElement("div");
        attribution.setAttribute("class", "prism-remote-attribution");
        const attributionLink = document.createElement("a");
        attributionLink.setAttribute("href", srcUrl);
        attributionLink.textContent = srcUrl;
        attribution.appendChild(attributionLink);

        const style = document.createElement("style");
        style.textContent = `
            .prism-remote-attribution a::before {
                content: "⇒ ";
            }
        `;

        this.appendChild(style);
        this.appendChild(codePre);
        this.appendChild(attribution);

        Prism.highlightAllUnder(this);
    }
}

customElements.define("prism-remote", PrismRemote);
