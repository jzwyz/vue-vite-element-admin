export function setHtmlDark(dark: boolean) {
    if (dark) {
        document.querySelector('html').setAttribute('class', 'dark')

    } else {
        document.querySelector('html').setAttribute('class', "")
    }
}