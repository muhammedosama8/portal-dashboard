const print = (title, headRow, lang, data) =>{
    let printWindow = window.open("", "_blank");
    let rowsData= ``
    let dataContent = ``

    for( let i = 0 ; i < headRow?.length; i++){
        rowsData += `<th style="text-wrap: nowrap; font-size: 16px; text-align: ${lang==='en' ? 'left' : 'right'};padding: 18px; border-bottom: 1px solid #dedede">
            <strong>${headRow[i]}</strong>
        </th>`
    }
    for( let i = 0 ; i < data?.length; i++){
        let row = ``
        for (const key in data[i]) {
            if (data[i].hasOwnProperty(key)) {
                if(Array.isArray(data[i][key])){
                    let arrInfo = ``
                    for(let x = 0; x < data[i][key].length; x++){
                        arrInfo += `<span style='border: 1px solid #dedede; padding: 5px 8px; border-radius: 5px; font-size: 16px;
                        margin-right: 3px; margin-left: 3px;'>
                            ${data[i][key][x]}
                        </span>`
                    }
                    row += `<td style="padding: 18px; border-bottom: 1px solid #dedede; text-align: ${lang==='en' ? 'left' : 'right'}">
                        ${arrInfo}
                    </td>`
                } else {
                    row += `<td style="padding: 18px; border-bottom: 1px solid #dedede; text-align: ${lang==='en' ? 'left' : 'right'}">${data[i][key]}</td>`
                }
              
            }
          }
        dataContent += `<tr>
              ${row}
      </tr>`
    }

    let page = `
    <div style="min-height: 100vh; margin-top: 3rem; margin-bottom: 1rem">
    <div style="width: 98%; margin: auto">
    <table style='width: 100%;'>
        <thead>
            <tr>
                ${rowsData}
            </tr>
        </thead>
        <tbody>
            ${dataContent}
        </tbody>
    </table>
    </div>
    </div>`


    let htmlCode = `
        <html>
            <head>
                <title>${title}</title>
            </head>
            <body style="direction: ${lang==='en' ? 'ltr' : 'rtl'}; font-family: Cairo, sans-serif; margin: 0; padding: 0">
                ${page}
            </body>
        </html>
    `;
    printWindow.document.write(htmlCode);

    // printWindow.document.close();

    // setTimeout(() => {
    //   printWindow.print();
    // }, 2500);
}
export default print