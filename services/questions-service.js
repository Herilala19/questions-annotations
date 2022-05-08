const Question = require('@models/question');
const topicsService = require('./topics-service');
const { hashText } = require('./hash-text');

/**
 *
 * @param {*} indexQuestion
 * @param {*} topics
 * @returns
 */
const createQuestion = async (indexQuestion, topics = []) => {
  const question = await getQuestionByQuery({ indexQuestion });
  if (question) {
    return question;
  }
  return Question.create({
    indexQuestion,
  })
    .then(async (response) => {
      console.log(response._id);
      if (topics.length) {
        const hashTopics = topics.map((elem) => hashText(String(elem).trim()));
        // get all topics details
        const topicsDetails = await topicsService.getTopicsByQuery({
          hash: { $in: hashTopics },
        });
        // update question with the topics details
        const updateQuestionWithTopics = await updateQuestionWithTopicsDetails(
          topicsDetails,
          response
        );
        // update topics with the selected question
        await updateTopicsWithQuestionDetails(hashTopics, response);
        return updateQuestionWithTopics;
      }
      return response;
    })
    .catch((error) => {
      console.log({ error });
      return null;
    });
};

/**
 *
 * @param {*} topicsDetails
 * @param {*} question
 * @returns
 */
const updateQuestionWithTopicsDetails = (topicsDetails, question) => {
  return Question.findByIdAndUpdate(question._id, {
    $push: {
      topics: {
        $each: topicsDetails.map((elem) => {
          return {
            _id: elem._id,
            hash: elem.hash,
          };
        }),
      },
    },
  }).lean();
};

/**
 *
 * @param {*} hashTopics
 * @param {*} question
 * @returns
 */
const updateTopicsWithQuestionDetails = (hashTopics, question) => {
  return topicsService.updateTopicsByQuery(
    {
      hash: { $in: hashTopics },
      'questions._id': { $ne: question._id },
    },
    {
      $push: {
        questions: {
          _id: question._id,
          indexQuestion: question.indexQuestion,
        },
      },
    }
  );
};

/**
 *
 * @param {*} query
 * @returns
 */
const getQuestionByQuery = (query) => {
  return Question.findOne(query).catch((_) => {
    return null;
  });
};

module.exports = {
  createQuestion,
  getQuestionByQuery,
};
