exports.task2 = function() {
    let fs = require("fs");
    const csv = require('csv-parser');
    
    var csvdata = [];
    var result = {};
    var begintime = Date.now();
    
    fs.createReadStream('../node-data-processing-medium-data.csv')
      .pipe(csv())
      .on('data', (row) => {
        csvdata.push(row);
      })
      .on('end', () => {
            console.log("Task 2. Read data into Array in: " + (Date.now() - begintime) + " ms");
            let prelimresult = {};
            csvdata.forEach((r) =>
            {
                let priority = r["Order Priority"];
                let date = r["Order Date"];
                let month = date.split("/")[0];
                let year = date.split("/")[2];
                if (month.length === 1){
                    month = "0" + month;//example has "05"
                }
    
                if (prelimresult.hasOwnProperty(year + ":" + month + ":" + priority)){
                    prelimresult[year + ":" + month + ":" + priority] = parseInt(prelimresult[year + ":" + month + ":" + priority]) + 1;
                }
                else{
                    prelimresult[year + ":" + month + ":" + priority] = 1;
                }
            })
            for (let key in prelimresult){
                let value = prelimresult[key];
                let arrkey = key.split(":");
                let year = arrkey[0];
                let month = arrkey[1];
                let priority = arrkey[2];
                if (result.hasOwnProperty(year)){
                    if (result[year].hasOwnProperty(month)){
                        result[year][month][priority] = value;
                    }
                    else{
                        result[year][month] = {};
                        result[year][month][priority] = value;
                    }
                }
                else{
                    result[year] = {};
                    result[year][month] = {};
                    result[year][month][priority] = value;
                }
            };
            //console.log(JSON.stringify(result));
            console.log("Task 2. Overall result: " + (Date.now() - begintime) + " ms.");
            fs.writeFileSync('task2_result.json', JSON.stringify(result));
        });
}
