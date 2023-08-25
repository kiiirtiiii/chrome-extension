exports.OPEN_AI_MODELS = {
    DAVINCI_003: {
        MODEL: 'text-davinci-003',
        MAX_TOKEN: 4096
    }
}

exports.REGEX = {
    NUMBER_STRING: '^-?(0|[1-9]\\d*)(\\.\\d+)?([eE][+-]?\\d+)?$',
    URL: '/^(ftp|http|https):\/\/[^ "]+$/'
}