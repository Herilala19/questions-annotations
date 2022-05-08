const httpStatus = require('http-status');
const googleSheetTools = require('@services/google-sheet-tools');
const topicsService = require('@services/topics-service');
const questionsService = require('@services/questions-service');
const autoBind = require('auto-bind');

module.exports = class ImportData {
  constructor(models) {
    autoBind(this);
    this._topicModel = models.Topic;
  }

  async handler(req, res) {
    const range = req.query.range;
    const sheetId = '1Ti55VxyW5MAWG8B9zNf6kynVdMXTY_W9ZyHzTB5VqmE';
    return googleSheetTools
      .readSheetService(range, sheetId)
      .then(async (response) => {
        if (!response) {
          return res
            .status(httpStatus.INTERNAL_SERVER_ERROR)
            .json(httpStatus['500_MESSAGE']);
        }

        const allCreatedDocuments = [];
        if (range === 'Topics!A2:I') {
          for (const iterator of response.data.values) {
            allCreatedDocuments.push(
              await topicsService.saveTopicsFromIteratorSheet(iterator)
            );
          }
        }

        if (range === 'Questions!A2:I') {
          for (const iterator of response.data.values) {
            allCreatedDocuments.push(
              await questionsService.createQuestion(
                parseInt(iterator[0]),
                iterator.splice(1, iterator.length)
              )
            );
          }
        }
        return res.status(httpStatus.OK).json(allCreatedDocuments);
      });
  }
};
