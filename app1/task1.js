exports.task1 = function() {
    let fs = require("fs");
    const csv = require('csv-parser');
    
    var result = {
        "Regions":{
        },
        "ItemTypes":{
        }
    };
    
    var begintime = Date.now();
    
    fs.createReadStream('../node-data-processing-medium-data.csv')
      .pipe(csv())
      .on('data', (row) => {
        let region = row["Region"];
        let country = row["Country"];
        let itemType = row["Item Type"];
        //regions
        if (result.Regions.hasOwnProperty([region])){
            result.Regions[region].Total.Revenue = (parseFloat(result.Regions[region].Total.Revenue) + parseFloat(row["Total Revenue"])).toFixed(2);
            result.Regions[region].Total.Cost = (parseFloat(result.Regions[region].Total.Cost) + parseFloat(row["Total Cost"])).toFixed(2);
            result.Regions[region].Total.Profit = (parseFloat(result.Regions[region].Total.Profit) + parseFloat(row["Total Profit"])).toFixed(2);
            //countries
            if (result.Regions[region].Countries.hasOwnProperty([country])){
                result.Regions[region].Countries[country].Total.Revenue = (parseFloat(result.Regions[region].Countries[country].Total.Revenue) + parseFloat(row["Total Revenue"])).toFixed(2);
                result.Regions[region].Countries[country].Total.Cost = (parseFloat(result.Regions[region].Countries[country].Total.Cost) + parseFloat(row["Total Cost"])).toFixed(2);
                result.Regions[region].Countries[country].Total.Profit = (parseFloat(result.Regions[region].Countries[country].Total.Profit) + parseFloat(row["Total Profit"])).toFixed(2);
                if (result.Regions[region].Countries[country].ItemTypes.hasOwnProperty([itemType])){
                    result.Regions[region].Countries[country].ItemTypes[itemType].Revenue = (parseFloat(result.Regions[region].Countries[country].ItemTypes[itemType].Revenue) + parseFloat(row["Total Revenue"])).toFixed(2);
                    result.Regions[region].Countries[country].ItemTypes[itemType].Cost = (parseFloat(result.Regions[region].Countries[country].ItemTypes[itemType].Cost) + parseFloat(row["Total Cost"])).toFixed(2);
                    result.Regions[region].Countries[country].ItemTypes[itemType].Profit = (parseFloat(result.Regions[region].Countries[country].ItemTypes[itemType].Profit) + parseFloat(row["Total Profit"])).toFixed(2);
                }
                else{
                    result.Regions[region].Countries[country].ItemTypes[itemType] = {};
                    result.Regions[region].Countries[country].ItemTypes[itemType]["Revenue"] = parseFloat(row["Total Revenue"]);
                    result.Regions[region].Countries[country].ItemTypes[itemType]["Cost"] = parseFloat(row["Total Cost"]);
                    result.Regions[region].Countries[country].ItemTypes[itemType]["Profit"] = parseFloat(row["Total Profit"]);
                }
            }
            else{
                result.Regions[region].Countries[country] = {};//country init
                result.Regions[region].Countries[country].Total = {};
                result.Regions[region].Countries[country].Total["Revenue"] = parseFloat(row["Total Revenue"]);
                result.Regions[region].Countries[country].Total["Cost"] = parseFloat(row["Total Cost"]);
                result.Regions[region].Countries[country].Total["Profit"] = parseFloat(row["Total Profit"]);
                result.Regions[region].Countries[country].ItemTypes = {};
                result.Regions[region].Countries[country].ItemTypes[itemType] = {};
                result.Regions[region].Countries[country].ItemTypes[itemType]["Revenue"] = parseFloat(row["Total Revenue"]);
                result.Regions[region].Countries[country].ItemTypes[itemType]["Cost"] = parseFloat(row["Total Cost"]);
                result.Regions[region].Countries[country].ItemTypes[itemType]["Profit"] = parseFloat(row["Total Profit"]);
            }
        }
        else {
            result.Regions[region] = {};//region init
            result.Regions[region].Total = {};
            result.Regions[region].Countries = {};
            result.Regions[region].Total["Revenue"] = parseFloat(row["Total Revenue"]);
            result.Regions[region].Total["Cost"] = parseFloat(row["Total Cost"]);
            result.Regions[region].Total["Profit"] = parseFloat(row["Total Profit"]);
        }
        //item types
        if (result.ItemTypes.hasOwnProperty([itemType])){
            result.ItemTypes[itemType].Revenue = (parseFloat(result.ItemTypes[itemType].Revenue) + parseFloat(row["Total Revenue"])).toFixed(2);
            result.ItemTypes[itemType].Cost = (parseFloat(result.ItemTypes[itemType].Cost) + parseFloat(row["Total Cost"])).toFixed(2);
            result.ItemTypes[itemType].Profit = (parseFloat(result.ItemTypes[itemType].Profit) + parseFloat(row["Total Profit"])).toFixed(2);
        }
        else{
            result.ItemTypes[itemType] = {};
            result.ItemTypes[itemType]["Revenue"] = parseFloat(row["Total Revenue"]);
            result.ItemTypes[itemType]["Cost"] = parseFloat(row["Total Cost"]);
            result.ItemTypes[itemType]["Profit"] = parseFloat(row["Total Profit"]);
        }
      })
      .on('end', () => {
        //console.log(JSON.stringify(result));
        console.log("Task 1. Processed in: " + (Date.now() - begintime) + " ms");
        //.toFixed(2) calls slows it down by ~30%
        fs.writeFileSync('task1_result.json', JSON.stringify(result));
    });
}
