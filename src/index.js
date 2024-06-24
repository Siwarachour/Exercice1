const dataForge = require('data-forge');
const dataArray = require('./sData');

const countSurveyGroupByStatusDataForge = (data) => {
    let df = new dataForge.DataFrame(data);
    let result = df.groupBy(row => row.status)
        .select(group => ({
            status: group.first().status,
            count: group.count(),
            totalResponses: group.deflate(row => row.numberOfResponses).sum()
        }))
        .inflate();
    return result.toArray().reduce((acc, row) => {
        acc[row.status] = { count: row.count, totalResponses: row.totalResponses };
        return acc;
    }, {});
};

console.time("countSurveyGroupByStatusDataForge");
const result = countSurveyGroupByStatusDataForge(dataArray);
console.timeEnd("countSurveyGroupByStatusDataForge");
console.log(result);
