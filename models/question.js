const mongoose = require('mongoose');

const { Schema, Types } = mongoose;

const schema = new Schema(
  {
    /**
     * question number id
     */
    indexQuestion: { type: Number, unique: true },

    /**
     * Topics list directly attached to the current question
     */
    topics: [
      {
        _id: {
          type: Types.ObjectId,
          ref: 'Topic',
        },
        hash: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

schema.index({ indexQuestion: 1 });

module.exports = mongoose.model('Question', schema);
