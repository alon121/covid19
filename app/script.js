function init() {
    (async () => {
        let response = await fetch('https://corona-virus-stats.herokuapp.com/api/v1/cases/general-stats');
        let data = await response.json();
        return data;
    })()
        .then(responseData => {
            (() => {
                const dataTable = responseData ? responseData.data : `לא התקבל תשובה מהשרת`;
                const table = document.createElement('table');
                for (var key in dataTable) {
                    if (dataTable.hasOwnProperty(key)) {
                        let newRow = table.insertRow();
                        let cell1 = newRow.insertCell(0);
                        let cell2 = newRow.insertCell(1);
                        cell1.textContent = key;
                        cell2.textContent = dataTable[key];
                    }
                }
                let newRow = table.insertRow();
                let cell1 = newRow.insertCell(0);
                let cell2 = newRow.insertCell(1);
                cell1.textContent = 'recovery percaentage';
                cell2.textContent = (parseFloat(dataTable.recovered_closed_cases.replace(/,/g, '')) /parseFloat(dataTable.total_cases.replace(/,/g, ''))).toFixed(3)*100 + '%';
                document.body.appendChild(table);
            })()
        })
}


window.addEventListener('load', init)

