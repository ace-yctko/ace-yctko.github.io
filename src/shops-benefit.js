'use strict';

const list = () => {
    const id = '1gTkcU8G4240QNNcMdFWTwr4JKBBd1Qdjwpu8nE8gY7E',
    range = 'A3:H'; 

    let temp = '';

    document.querySelectorAll('#type > option').forEach(async title => {
        let url = 'https://docs.google.com/spreadsheets/d/' + id + '/gviz/tq?sheet=' + title.id + '&range=' + range;

        fetch(url)
        .then(res => res.text())
        .then(rep => {
            let data = JSON.parse(rep.substr(47).slice(0, -2)).table.rows;

            for await (let i in data) {
                if (data[i].c[0].v == '❌') continue;
                temp += `<tr class="${title.id} disable">`;
                for (let j in data[i].c) {
                    if (j == 2 && (data[i].c[3].v).indexOf('IG') != -1) {
                        temp += '<td>' + `<iframe src="https://www.instagram.com/${data[i].c[j]?.v}/embed" scrolling="no" frameborder="0"></iframe>` + '</td>';
                    } else if (j == 2 || j > 4) {
                        temp += '<td>' + data[i].c[j]?.v || 'N/A' + '</td>';
                    };
                };
                temp += '</tr>';
            };
        });
    });
    document.querySelector('.shops').innerHTML = temp;
},
    filter = title => {
        document.querySelector(`#${title}`).selected = true;
        localStorage.type = title;
    };

window.onload = () => {
    document.querySelectorAll('option').forEach(x => {
        x.innerHTML = x.id;
        x.value = x.id;
    });
    list(localStorage.type || document.querySelector('#type > option').id);
};