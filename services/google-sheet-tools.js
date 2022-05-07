/**
 * EVERY SPREADSHEET DOCUMENT NEEDS A DEDICATED Service accounts KEY FROM GOOGLE CLOUD PLATFORM
 */
const Configurator = require('@modules/configurator');
const { google } = require('googleapis');

const configurator = new Configurator();
const { googleAccessApi } = configurator.getAll('app');

/**
 * supervision
 *
 */
const accountsSupervision_client = new google.auth.JWT(
  googleAccessApi.client_email,
  null,
  googleAccessApi.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

accountsSupervision_client.authorize((err, tokens) => {
  if (err) {
    console.log({ err });
    return;
  }
  console.log({ message: 'connected to google sheets API' });
});

const accountsSupervision_gsapi = google.sheets({
  version: 'v4',
  auth: accountsSupervision_client,
});

//end supervision
/**
 * read a google sheet cells
 * @param {String} range example A1, A1:A5, B6:F12
 */
async function readSheetService(range, spreadsheetId) {
  return accountsSupervision_gsapi.spreadsheets.values
    .get({
      spreadsheetId,
      range,
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log({ err });
      return null;
    });
}

module.exports = { readSheetService };
