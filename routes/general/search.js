const httpStatus = require('http-status');
const autoBind = require('auto-bind');
const topicsService = require('@services/topics-service');
const { hashText } = require('@services/hash-text');

module.exports = class Search {
  constructor(models) {
    autoBind(this);
    this._topicModel = models.Topic;
  }

  async handler(req, res) {
    try {
      const hash = hashText(String(req.query.q).trim());
      const topicDetails = await topicsService.getTopicByQueryWithPopulate(
        {
          hash,
        },
        'childTrees'
      );
      if (!topicDetails) {
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ message: 'Topic not found' });
      }
      const questions = topicDetails.childTrees
        .map((elem) => {
          return elem.questions
            ? elem.questions.map((question) => question.indexQuestion)
            : [];
        })
        .filter((elem) => elem.length)
        .flatMap((elem) => elem)
        .filter((elem, index, array) => {
          return array.indexOf(elem) === index;
        })
        .sort((a, b) => a - b);
      return res.status(httpStatus.OK).json(questions);
    } catch (error) {
      console.log(error);
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }
};
