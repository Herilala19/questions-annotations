const httpStatus = require('http-status');
const autoBind = require('auto-bind');
const topicsService = require('@service/topics-service');
const { hashText } = require('@service/hash-text');

module.exports = class Search {
  constructor(models) {
    autoBind(this);
  }

  async handler(req, res) {
    const hash = hashText(req.query.q);
    const topicDetails = await topicsService.getTopicByQuery({ hash });
    if (!topicDetails) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: 'Topic not found' });
    }
    
  }
};
