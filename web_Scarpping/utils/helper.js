const processText = (text) => {
    return text.replace(/\r?\n|\r|\t|\s\s+/g, ' ').replace(/<[^>]*>?/gm, '').trim();
}

module.exports = { processText };