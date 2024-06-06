var numberPoints = 10;
var slope = 5;
var randomness = 25;

$("#numPoints").val(numberPoints);
$("#slope").val(slope);
$("#randomness").val(randomness);
$("#lineDef").text("y = " + slope + "x + 0");

$("#newRegression").on("click", function(){
    numberPoints = $("#numPoints").val();
    slope = $("#slope").val();
    randomness = $("#randomness").val();

    if((!$.isNumeric(numberPoints) || parseInt(numberPoints) <= 0)
        || (!$.isNumeric(slope))
        || (!$.isNumeric(randomness) || parseInt(randomness) <= 0)){
        $("#linearError").show();
        return;
    } else{
        $("#linearError").hide();
    }

    DrawChart();
    $("#lineDef").text("y = " + slope + "x + 0");
});

/**
 * This function takes a value to determine the size of an array and a slope
 * provided by the user and generates an array based on those values.
 * @param {int} numberPoints determines array size
 * @param {int} slope determine rough slope for the linear regression
 * @return {array} with semi-randomized values for points
 */
function buildArray(numberPoints, slope){
    var returnArray = [];
    // example slope 3, x=0, value~0, x=1, value~3
    // Math.random() -> 0-1 -> -(0.5) and 0.5 * value -> random value +-50%
    // 1.251 or 1.752 -> floor(1.xxx) -> 1
    // 1.251123*1000 = floor(1251.123)/1000 = 1.251
    for(var i = 0; i <= numberPoints; i++){
        var randAsDec = randomness / 100;
        var randomAmount = 1 + ((Math.random() - 0.5) * randAsDec);
        returnArray[i] = ((randomAmount * (i * slope)) * 1000).toFixed(2) / 1000;
    }

    return returnArray;
}

/**
 * This function performs a simple linear regression algorithm using the
 * Sum of Least Square Method and returns the slop and intercept of the 
 * Best Fit Line
 * @param {array} pointsArray array of floats
 * @return {object} contain intercept and slope
 */
function buildSLRModel(pointsArray){
    var yBar = 0;
    var xBar = 0;
    var yBxB = 0;
    var xBxB = 0;
    var Sxy = 0;
    var Sxx = 0;
    var arrayLength = pointsArray.length;
    //console.log("arrayLength: " + arrayLength);

    for(var i = 0; i < arrayLength; i++){
        yBar += pointsArray[i];
        xBar += i;
    }
    yBar = yBar / arrayLength;
    xBar = xBar / arrayLength;
    
    //console.log("yBar: " + yBar);
    //console.log("xBar: " + xBar);

    for(var i = 0; i < arrayLength; i++){
        xBxB += ((i - xBar) * (i - xBar));
        yBxB += ((i - xBar) * (pointsArray[i] - yBar));
    }

    Sxy = yBxB / arrayLength;
    Sxx = xBxB / arrayLength;
    var slope = Sxy / Sxx;

    return {intercept:(yBar - slope * xBar), slope:slope}
}

/**
 * This function predicts an output for a user given input
 * @param {float} value input for user
 * @param {object} model which has a slope and intercept
 * @returns {float} expected output
 */
function GeneratePrediction(value, model){
    return model.intercept + (model.slope * value);
}
/**
 * This function take in 2 arrays and builds a 2-d rectagular array which 
 * will have a shared independent variable set and 
 * corresponding dependent variables
 * @param {*} xValues array of values representing the independent variable
 * @param {*} yValues double array of values representing the dependent variables
 * @returns 2-d array of values
 */
function BuildDataRows(xValues, yValues){
    const xLength = xValues.length;
    const yLength = yValues.length;
    var rows = Array();

    for (let i = 0; i < xLength; i++){
        rows[i] = Array(yLength + 1);
        rows[i][0] =xValues[i];

        for (let j = 0; j < yLength; j++){
            rows[i][j + 1] = yValues[j][i];
        }
    }
    return rows;
}

/**
 * This function builds a model, gets predictions,
 * and returns the information for use in a chart.
 * @returns two arrays of data
 */
function BuildChartData(){
    // buid array with labels
    var pointsArray = buildArray(numberPoints, slope);
    //console.log("PA" + pointsArray);
    var xValues = [];
    var yValues = [[],[]];

    for(var i = 0; i < pointsArray.length; i++){
        xValues.push(i);
        yValues[0].push(pointsArray[i]);
    }

    // build model
    var model = buildSLRModel(pointsArray);
    for(var i = 0; i < pointsArray.length; i++){
        var prediction = GeneratePrediction(i, model);
        yValues[1].push(prediction);
    }

    $("#predDef").text("y = " + model.slope.toFixed(2) + "x + " + model.intercept.toFixed(2));
    return BuildDataRows(xValues, yValues);
    }

/**
 * Google Chart Basic Code
 */
    google.charts.load('current', {packages: ['corechart']});
    google.charts.load('current', {packages: ['table']});
    google.charts.setOnLoadCallback(DrawChart);

    function DrawChart() {
        var xLabels = "X Values";
        var yLabels = ["Random Points", "Linear Regression"];

        // assign data to the chart
        var data = new google.visualization.DataTable();
        data.addColumn('number', xLabels);
        yLabels.forEach(yLabel => { data.addColumn('number', yLabel); })

        var dataRows = BuildChartData();
        data.addRows(dataRows);

        // set options for display
        var options = {
            title: "Simple Linear Regression",
            hAxis: {title: "Independent"},
            vAxis: {title: "Dependent"},
            legend: "none",
            series: {
                1:{
                    lineWidth: 3,
                    pointSize: 0,
                    curveType: "function"
                },
            },
        };

        // Instantiate and draw the chart.
        var chart = new google.visualization
            .ScatterChart(document.getElementById("simpleLinearRegression"));
        chart.draw(data, options);

        //draw data table
        data = new google.visualization.DataTable();
        data.addColumn('number', xLabels);
        yLabels.forEach(yLabel => { data.addColumn('number', yLabel); })

        var dataRows = BuildChartData();
        data.addRows(dataRows);

        var options = {
            showRowNumber: false,
        }

        chart = new google.visualization.Table(document.getElementById("scatterData"));
        chart.draw(data, options);
    }