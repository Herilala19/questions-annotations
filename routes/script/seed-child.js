const httpStatus = require('http-status');
const autoBind = require('auto-bind');
const topicsService = require('@services/topics-service');

module.exports = class SeedChild {
  constructor() {
    autoBind(this);
  }

  async handler(req, res) {
    try {
      const allTopicsDetails = await topicsService.getTopicsByQuery({});
      const response = [];
      for (const iterator of allTopicsDetails) {
        console.time(iterator._id);
        let allTopics = [];
        allTopics = await topicsService.getTopicDownTree(
          iterator._id,
          allTopics
        );
        response.push(
          await topicsService.updateTopicByQuery(
            { _id: iterator._id },
            {
              $set: {
                childTrees: allTopics,
              },
            }
          )
        );
        console.timeEnd(iterator._id);
      }
      return res.status(httpStatus.OK).json(response);
    } catch (error) {
      console.log({ error });
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }
};
