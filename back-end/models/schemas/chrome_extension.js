const {REGEX} = require('../../constants/appContants');

exports.getSummarySchema = {
  type: 'object',
  properties: {
    url: {
      type: 'string',
      pattern: REGEX.URL
    },
    response_token: {
      type: 'string',
      pattern: REGEX.NUMBER_STRING
    }
  },
  required: ['url']
};

exports.getPdfSchema = {
    type: 'object',
    properties: {
        text: {
            type: 'string'
        }
    },
    required: ['text']
};