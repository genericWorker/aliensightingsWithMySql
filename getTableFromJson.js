
    function CreateTableFromJSON(sitings) { 

        // EXTRACT VALUE FOR HTML HEADER. 
        // ('date', 'creatureType', 'weight','height','numberEyes", "numberArms", "numberLegs","color")
        var col = [];
        for (var i = 0; i < sitings.length; i++) {
            for (var key in sitings[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        console.log("length = " + sitings.length);
        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < sitings.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = sitings[i][col[j]];
            }
        }
        return table;      
    }