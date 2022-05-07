const Topic = require('@models/topic');
const hashText = require('./hash-text');

/**
 * Create topic without parent
 * @param {*} text
 * @param {*} parent
 * @returns
 */
const createTopicWithoutQuestion = async (text, child) => {
  const hash = hashText.hashText(text);
  return getTopicByQuery({ hash }).then((response) => {
    if (!response) {
      return Topic.create({
        text,
        hash,
        child: child != null ? [child] : [],
      })
        .then((topic) => {
          return topic;
        })
        .catch((error) => {
          console.log({ error });
          return null;
        });
    } else {
      return addChildoTopic(response._id, child);
    }
  });
};

/**
 * @param {*} id
 * @param {*} questions
 * @returns
 */
const addQuestionsToTopic = (id, questions) => {
  return Topic.findByIdAndUpdate(id, {
    $push: {
      questions,
    },
  }).catch((_) => {
    return null;
  });
};

/**
 *
 * @param {*} id
 * @param {*} child
 * @returns
 */
const addChildoTopic = (id, child) => {
  return Topic.findByIdAndUpdate(id, {
    $addToSet: {
      child,
    },
  }).catch((_) => {
    return null;
  });
};

/**
 *
 * @param {*} query
 * @returns
 */
const getTopicByQuery = (query) => {
  return Topic.findOne(query)
    .lean()
    .catch((_) => {
      return null;
    });
};

/**
 *
 * @param {*} query
 * @returns
 */
const getTopicsByQuery = (query) => {
  return Topic.find(query)
    .lean()
    .catch((_) => {
      return null;
    });
};

/**
 *
 * @param {*} query
 * @returns
 */
const updateTopicsByQuery = (query, queryUpdate) => {
  return Topic.updateMany(query, queryUpdate).catch((_) => {
    return null;
  });
};

/**
 *
 * @param {*} iterator
 * @returns
 */
const saveTopicsFromIteratorSheet = async (iterator) => {
  let index = 2,
    createdTopic,
    idTopics = [];
  while (index > -1) {
    if (iterator[index]) {
      createdTopic = await createTopicWithoutQuestion(
        iterator[index],
        createdTopic ? createdTopic._id : null
      );
      idTopics.push(createdTopic._id);
    }
    --index;
  }
  return idTopics;
};

/**
 * 
 * @param {*} topic 
 * @param {*} lists 
 * @returns 
 */
const getTopicDownTree = async (topic, lists = []) => {
  const response = await Topic.findById(topic).lean();
  if (!response) return lists;
  if (lists.length === 0) lists.push(response._id);
  if (response.child && (response.child[0] != null)) {
    lists = [...lists, response.child];
    for (const iterator of response.child) {
      await getTopicDownTree(iterator, lists);
    }
  }
  return lists;
};

module.exports = {
  createTopicWithoutQuestion,
  addQuestionsToTopic,
  getTopicByQuery,
  getTopicsByQuery,
  updateTopicsByQuery,
  addChildoTopic,
  saveTopicsFromIteratorSheet,
};
