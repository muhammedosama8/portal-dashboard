import logo from '../../images/logo-color.svg'

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
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${title}</title>
            </head>
            <body style="direction: ${lang==='en' ? 'ltr' : 'rtl'}; font-family: Cairo, sans-serif; margin: 0; padding: 0">
                <div style='text-align: left'>
                    <img src=${logo} alt='logo' style="height: 100px; margin-top: 24px; margin-left: 24px" />  
                </div>  
                ${page}
                <div style="position: fixed; bottom: 0; left: 0;
                    width: 100%; text-align: left;
                    font-size: 12px; padding: 0.5cm 0;
                    margin-top: 24px; background: #fff;
                    border-top: 1px solid #000;
                ">
                    <p style='margin-bottom: 4px; margin-top: 0'>info@cloudliftsolution.com</p>
                    <p style='margin-bottom: 4px; margin-top: 0'>www.cloudliftsolution.com</p>
                    <p style='margin: 0'>Office# 26, 7th floor, Jawharat Al Khaleej, Fahad al Salem street, Kuwait City.</p>
                </div>
            </body>
        </html>
    `;
    printWindow.document.write(htmlCode);

    printWindow.document.close();

    setTimeout(() => {
      printWindow.print();
    }, 1500);
}
export default print