const {REGEX} = require('../../constants/appContants');

exports.getSummaryAndKeypointsSchema = {
  type: 'object',
  properties: {
    url: {
      type: 'string',
      pattern: REGEX.URL
    },
    response_token: {
      type: 'string',
      pattern: REGEX.NUMBER_STRING
    },
    regenerate: {
      type: 'string'
    }
  },
  required: ['url','response_token']
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