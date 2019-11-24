const xlsx = require('node-xlsx');
const path = require('path');

function getUITestData() {
    let sheets = xlsx.parse(path.resolve(__dirname, 'UITest.xlsx'));
    let dataSheet = sheets.filter((sheet) => {
        return sheet['name'] === 'Sheet1'
    });
    let data = dataSheet[0];
    if (!data['data'] || data['data'].length <= 1) {
        console.log('execute excel no data');
        return [];
    }
    return data['data'].filter((ds,index) => {
        return index > 0;
    });
}

exports.getUITestData = getUITestData;