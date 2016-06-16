//spatial interpolations
var spint={};

function pointValue(x,y,power,smoothing,data){
	var nominator=0;
    var denominator=0;
    for (var i=0;i<data[0].length;i++){
    	var dist = Math.sqrt((x-data[0][i])*(x-data[0][i])+(y-data[1][i])*(y-data[1][i])+smoothing*smoothing);
        //If the point is really close to one of the data points, return the data point value to avoid singularities
        if(dist<0.0000000001){
        	return data[2][i];
        }
            
        nominator=nominator+(data[2][i]/Math.pow(dist,power));
        denominator=denominator+(1/Math.pow(dist,power));
    }
        
    //Return null if the denominator is zero
    var value;
    if (denominator > 0){
    	value = nominator/denominator;
    }else{
    	value = null;
    }
        
    return value;
}

idw = function (data,grid,power,smoothing){
	var valuesGrid = [];
    for(var i=1;i<=grid.xcellcount;i++){
    	var yvalues = [];
    	for(var j=1;j<=grid.ycellcount;j++){
    		yvalues.push(pointValue(grid.y0+j*grid.xcellsize,grid.x0+i*grid.xcellsize,power,smoothing,data));
    	}
    	valuesGrid.push(yvalues);
    }		            
    return valuesGrid;
}

module.exports = {
	idw : idw
}