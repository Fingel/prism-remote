# prism-remote
Easily embed remote code with syntax highlighting provided by [Prism](https://prismjs.com/) using a custom HTML
element. No other dependencies other than Prism itself.

Example:

```html
<prism-remote
    src="https://github.com/Fingel/prism-remote/blob/main/prism-remote.js"
    start="1"
    end="10"
    lang="javascript"
>
</prism-remote>
```
Would result in:

![highlight](https://github.com/Fingel/prism-remote/assets/3046397/a2f5ea68-f0ee-4a37-9bc6-be35b9502e9d)

### Usage
Provide the following attributes to the `<prism-remote>` tag:
- `src` (required) The URL to the text you want to display.
- `lang` (required) The language for highlighting.
- `start` The first line to display (1 indexed).
- `end` The last line to display.

If you are using Github it's possible to provide the natural URL instead of the raw URL. For 
example: https://github.com/Fingel/prism-remote/blob/main/prism-remote.js instead of https://raw.githubusercontent.com/Fingel/prism-remote/main/prism-remote.js
. The attribution link at the bottom will poin to the natural URL.

The attribution link has a class of `prism-remote-attribution` so you can style it (or hide it alltogether).

### Installation
Make sure you have [Prism](https://prismjs.com/) available.

Include [prism-remote.js](prism-remote.js) on your page.
