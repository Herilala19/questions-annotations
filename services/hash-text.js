const crypto = require('crypto');

const hashText = (text) => {
  return crypto.createHash('sha1').update(text).digest('hex');
};

module.exports = {
    hashText,
};
