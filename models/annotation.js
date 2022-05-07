const mongoose = require('mongoose');
const _ = require('lodash');

const { Schema } = mongoose;

const schema = new Schema(
  {},
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

module.exports = mongoose.model('Annotation', schema);
