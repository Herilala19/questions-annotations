const mongoose = require('mongoose');

const { Schema, Types } = mongoose;

const schema = new Schema(
  {
    /**
     * Topic text
     */
    text: { type: String, unique: true },

    hash: { type: String, unique: true },

    /**
     * Parent direct attached to the topic
     */
    parent: {
      type: Types.ObjectId,
      ref: 'Topic',
    },

    /**
     * Direct child attached to topic
     */
    child: [
      {
        type: Types.ObjectId,
        ref: 'Topic',
      },
    ],

    /**
     * All child in subtree includes his _id
     */
    childTrees: [
      {
        type: Types.ObjectId,
        ref: 'Topic',
      },
    ],

    /**
     * Questions that the current topic is assigned
     */
    questions: [
      {
        _id: {
          type: Types.ObjectId,
          ref: 'Question',
        },
        indexQuestion: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

schema.index({ hash: 1 });

module.exports = mongoose.model('Topic', schema);
