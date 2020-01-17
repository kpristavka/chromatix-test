exports.task3 = function() {
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
            console.log("Task 3. Read data into Array in: " + (Date.now() - begintime) + " ms");
            csvdata.forEach((r) =>
            {
                let strOrderdate = r["Order Date"];
                let strShipdate = r["Ship Date"];
                let region =  r["Region"];
                let country =  r["Country"];
                
                let arrOrderdate = strOrderdate.split("/");
                let arrShipdate = strShipdate.split("/");
                let dateOrderdate = new Date (arrOrderdate[2], arrOrderdate[0], arrOrderdate[1]);
                let dateShipdate = new Date (arrShipdate[2], arrShipdate[0], arrShipdate[1]);
                let daysToShip = ((dateShipdate - dateOrderdate) /86400000).toFixed(0);
    
                let monthOrderdate = arrOrderdate[0];
                let yearOrderdate = arrOrderdate[2];
    
                if (monthOrderdate.length === 1){
                    monthOrderdate = "0" + monthOrderdate;
                }
    
                if (result.hasOwnProperty(yearOrderdate)){
                    if (result[yearOrderdate].hasOwnProperty(monthOrderdate)){
                        result[yearOrderdate][monthOrderdate].NumberOfOrders = parseInt(result[yearOrderdate][monthOrderdate].NumberOfOrders) + 1;
                        result[yearOrderdate][monthOrderdate].DaysToShip = parseInt(result[yearOrderdate][monthOrderdate].DaysToShip) + parseInt(daysToShip);
                        result[yearOrderdate][monthOrderdate].AvgDaysToShip = Math.round((parseInt(result[yearOrderdate][monthOrderdate].DaysToShip) + parseInt(daysToShip))/parseInt(result[yearOrderdate][monthOrderdate].NumberOfOrders) + 1);
                        if (result[yearOrderdate][monthOrderdate].Regions.hasOwnProperty(region)){
                            result[yearOrderdate][monthOrderdate].Regions[region].NumberOfOrders = parseInt(result[yearOrderdate][monthOrderdate].Regions[region].NumberOfOrders) + 1;
                            result[yearOrderdate][monthOrderdate].Regions[region].DaysToShip = parseInt(result[yearOrderdate][monthOrderdate].Regions[region].DaysToShip) + parseInt(daysToShip);
                            result[yearOrderdate][monthOrderdate].Regions[region].AvgDaysToShip = Math.round((parseInt(result[yearOrderdate][monthOrderdate].Regions[region].DaysToShip) + parseInt(daysToShip))/parseInt(result[yearOrderdate][monthOrderdate].Regions[region].NumberOfOrders) + 1);
                            if (result[yearOrderdate][monthOrderdate].Regions[region].Countries.hasOwnProperty(country)){
                                result[yearOrderdate][monthOrderdate].Regions[region].Countries[country].NumberOfOrders = parseInt(result[yearOrderdate][monthOrderdate].Regions[region].Countries[country].NumberOfOrders) + 1;
                                result[yearOrderdate][monthOrderdate].Regions[region].Countries[country].DaysToShip = parseInt(result[yearOrderdate][monthOrderdate].Regions[region].Countries[country].DaysToShip) + parseInt(daysToShip);
                                result[yearOrderdate][monthOrderdate].Regions[region].Countries[country].AvgDaysToShip = Math.round((parseInt(result[yearOrderdate][monthOrderdate].Regions[region].Countries[country].NumberOfOrders) + 1)/parseInt(result[yearOrderdate][monthOrderdate].Regions[region].Countries[country].DaysToShip) + parseInt(daysToShip));
                            }
                            else{
                                result[yearOrderdate][monthOrderdate].Regions[region].Countries[country] = {};
                                result[yearOrderdate][monthOrderdate].Regions[region].Countries[country].AvgDaysToShip = parseInt(daysToShip);
                                result[yearOrderdate][monthOrderdate].Regions[region].Countries[country].NumberOfOrders = 1;
                                result[yearOrderdate][monthOrderdate].Regions[region].Countries[country].DaysToShip = parseInt(daysToShip);
                            }
                        }
                        else{
                            result[yearOrderdate][monthOrderdate].Regions[region] = {};
                            result[yearOrderdate][monthOrderdate].Regions[region].AvgDaysToShip = parseInt(daysToShip);
                            result[yearOrderdate][monthOrderdate].Regions[region].NumberOfOrders = 1;
                            result[yearOrderdate][monthOrderdate].Regions[region].DaysToShip = parseInt(daysToShip);
                            result[yearOrderdate][monthOrderdate].Regions[region].Countries = {};
                            result[yearOrderdate][monthOrderdate].Regions[region].Countries[country] = {};
                            result[yearOrderdate][monthOrderdate].Regions[region].Countries[country].AvgDaysToShip = parseInt(daysToShip);
                            result[yearOrderdate][monthOrderdate].Regions[region].Countries[country].NumberOfOrders = 1;
                            result[yearOrderdate][monthOrderdate].Regions[region].Countries[country].DaysToShip = parseInt(daysToShip);
                        }
                    }
                    else{
                        result[yearOrderdate][monthOrderdate] = {};
                        result[yearOrderdate][monthOrderdate].AvgDaysToShip = parseInt(daysToShip);
                        result[yearOrderdate][monthOrderdate].NumberOfOrders = 1;
                        result[yearOrderdate][monthOrderdate].DaysToShip = parseInt(daysToShip);
                        result[yearOrderdate][monthOrderdate].Regions = {};
                        result[yearOrderdate][monthOrderdate].Regions[region] = {};
                        result[yearOrderdate][monthOrderdate].Regions[region].AvgDaysToShip = parseInt(daysToShip);
                        result[yearOrderdate][monthOrderdate].Regions[region].NumberOfOrders = 1;
                        result[yearOrderdate][monthOrderdate].Regions[region].DaysToShip = parseInt(daysToShip);
                        result[yearOrderdate][monthOrderdate].Regions[region].Countries = {};
                        result[yearOrderdate][monthOrderdate].Regions[region].Countries[country] = {};
                        result[yearOrderdate][monthOrderdate].Regions[region].Countries[country].AvgDaysToShip = parseInt(daysToShip);
                        result[yearOrderdate][monthOrderdate].Regions[region].Countries[country].NumberOfOrders = 1;
                        result[yearOrderdate][monthOrderdate].Regions[region].Countries[country].DaysToShip = parseInt(daysToShip);
                    }
                }
                else{
                    result[yearOrderdate] = {};
                    result[yearOrderdate][monthOrderdate] = {};
                    result[yearOrderdate][monthOrderdate].AvgDaysToShip = parseInt(daysToShip);
                    result[yearOrderdate][monthOrderdate].NumberOfOrders = 1;
                    result[yearOrderdate][monthOrderdate].DaysToShip = parseInt(daysToShip);
                    result[yearOrderdate][monthOrderdate].Regions = {};
                    result[yearOrderdate][monthOrderdate].Regions[region] = {};
                    result[yearOrderdate][monthOrderdate].Regions[region].AvgDaysToShip = parseInt(daysToShip);
                    result[yearOrderdate][monthOrderdate].Regions[region].NumberOfOrders = 1;
                    result[yearOrderdate][monthOrderdate].Regions[region].DaysToShip = parseInt(daysToShip);
                    result[yearOrderdate][monthOrderdate].Regions[region].Countries = {};
                    result[yearOrderdate][monthOrderdate].Regions[region].Countries[country] = {};
                    result[yearOrderdate][monthOrderdate].Regions[region].Countries[country].AvgDaysToShip = parseInt(daysToShip);
                    result[yearOrderdate][monthOrderdate].Regions[region].Countries[country].NumberOfOrders = 1;
                    result[yearOrderdate][monthOrderdate].Regions[region].Countries[country].DaysToShip = parseInt(daysToShip);
                }
            })
            //console.log(JSON.stringify(result));
            console.log("Task 3. Overall result: " + (Date.now() - begintime) + " ms.");
            fs.writeFileSync('task3_result.json', JSON.stringify(result));
        });
}