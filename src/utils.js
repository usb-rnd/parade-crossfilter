export function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};


export function parseData(rows) {

    // Various rows might have different keys (column names)
    // if coming from Map Annotations...
    // Compile column names from keys of ALL rows
    let colnames = rows.reduce((prev, row) => {
        Object.keys(row).forEach(c => {prev.add(c)});
        return prev;
    }, new Set());


    // Process keys (column names):
    // Remove whitespace, image_id -> Image
    let columns = [];
    for(let name of colnames.values()) {
        let newName = name.trim();
        if (newName === 'image_id') {
            newName = 'Image';
        }
        if (newName === 'roi_id') {
            newName = 'ROI';
        }
        if (newName === 'shape_id') {
            newName = 'Shape';
        }
        if (newName === 'well_id') {
            newName = 'Well';
        }
        columns.push({name: newName,
                origName: name,
                type: undefined,
                empty: true});
    };

    // Go through all rows in the table
    // Read from data (using original col names)
    // and create parsedData with new col names (no whitespace)
    let parsedData = rows.map(function (d, index) {
        // Coerce strings to number for named columns
        let rowEmpty = true;
        columns.forEach(col => {
            // ignore empty cells
            if (!d[col.origName] || d[col.origName].length === 0) return;
            rowEmpty = false;
            col.empty = false;
            let parsedValue = d[col.origName];
            // coerce to number
            if (col.type === 'number') {
                let numValue = +parsedValue;
                if (!isNaN(numValue)) {
                    parsedValue = numValue;
                }
            } else if (col.type === undefined) {
                // don't know type yet - check for number
                let val = +parsedValue;
                if (isNaN(val)) {
                    col.type = 'string';
                } else {
                    col.type = 'number';
                    // update the value to use number
                    parsedValue = val;
                }
            }
            // assign using new column name
            d[col.name] = parsedValue;
        });
        // Return nothing if empty - filtered out below
        if (!rowEmpty) {
            // Add unique ID for each row
            d._rowID = index;
            return d;
        }
    }).filter(Boolean);

    // Now filter out any empty Columns
    columns = columns.filter(col => {
        return !col.empty;
    });

    return {columns, parsedData}
}

export function isInt(n){
    return typeof n== "number" && isFinite(n) && n%1===0;
}

export function filesizeformat(bytes, round) {
    /*
    Formats the value like a 'human-readable' file size (i.e. 13 KB, 4.1 MB,
    102 bytes, etc).*/

    if (round === undefined || !isInt(round)) round = 2;

    if (bytes < 1024) {
        return bytes + ' B';
    } else if (bytes < (1024*1024)) {
        return (bytes / 1024).toFixed(round) + ' KB';
    } else if (bytes < (1024*1024*1024)) {
        return (bytes / (1024*1024)).toFixed(round) + ' MB';
    } else if (bytes < (1024*1024*1024*1024)) {
        return (bytes / (1024*1024*1024)).toFixed(round) + ' GB';
    } else if (bytes < (1024*1024*1024*1024*1024)) {
        return (bytes / (1024*1024*1024*1024)).toFixed(round) + ' TB';
    } else {
        return (bytes / (1024*1024*1024*1024*1024)).toFixed(round) + ' PB';
    }

};

export function getShapeBbox(roi) {
    // Use first shape (only 1)
    // Only support Points for now...
    if (roi.shapes[0] && roi.shapes[0].Points) {
        let xy = roi.shapes[0].Points.split(" ").map(coord => coord.split(','));
        let xx = xy.map(coord => parseFloat(coord[0]));
        let yy = xy.map(coord => parseFloat(coord[1]));
        let xMin = xx.reduce((prev, x) => Math.min(prev, x));
        let xMax = xx.reduce((prev, x) => Math.max(prev, x));
        let yMin = yy.reduce((prev, y) => Math.min(prev, y));
        let yMax = yy.reduce((prev, y) => Math.max(prev, y));
        return {x:xMin, y:yMin, width:xMax-xMin, height: yMax-yMin}
    }
}
