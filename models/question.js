const _ = require('lodash');
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const schema = new mongoose.Schema(
  {

  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Question', schema);
