function convertText(str) {
    return str
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')  // remove non-alphanumeric characters
        .replace(/\s+/g, '-')  // replace spaces with hyphens
}
export default convertText