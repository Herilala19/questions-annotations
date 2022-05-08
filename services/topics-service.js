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
const getTopicByQueryWithPopulate = (query, populate) => {
  return Topic.findOne(query)
    .populate(populate)
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
      console.log(iterator[index]);
      createdTopic = await createTopicWithoutQuestion(
        String(iterator[index]).trim(),
        createdTopic ? createdTopic._id : null
      );
      idTopics.push(createdTopic._id);
    }
    --index;
  }
  console.log(iterator);
  return idTopics;
};

/**
 *
 * @param {*} topic
 * @param {*} lists
 * @returns
 */
const getTopicDownTree = async (topic, lists) => {
  const response = await Topic.findById(topic).lean();
  if (lists.length === 0) lists.push(response._id);
  for (const iterator of response.child) {
    lists.push(iterator);
    await getTopicDownTree(iterator, lists);
  }
  return lists;
};

/**
 * 
 * @param {*} query 
 * @param {*} queryUpdate 
 * @returns 
 */
const updateTopicByQuery = (query, queryUpdate) => {
  return Topic.findByIdAndUpdate(query, queryUpdate).catch((_) => {
    return null;
  });
};

module.exports = {
  createTopicWithoutQuestion,
  addQuestionsToTopic,
  getTopicByQuery,
  getTopicsByQuery,
  updateTopicsByQuery,
  addChildoTopic,
  saveTopicsFromIteratorSheet,
  getTopicDownTree,
  updateTopicByQuery,
  getTopicByQueryWithPopulate
};
