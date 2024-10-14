'use strict';

const online_list = (title) => {
    let id = '1gTkcU8G4240QNNcMdFWTwr4JKBBd1Qdjwpu8nE8gY7E',
    range = 'A3:I'; 

    let url = 'https://docs.google.com/spreadsheets/d/' + id + '/gviz/tq?sheet=' + title + '&range=' + range;

    return fetch(url)
    .then(res => res.text())
    .then(rep => {
        let data = JSON.parse(rep.substr(47).slice(0, -2)).table.rows;

        for (let i in data) {
            if (data[i].c[0].v == '❌'|| data[i].c[4].v == 'N/A') continue;
            let temp = '<tr>';
            for (let j in data[i].c) {
                if (j == 0) continue;
                temp += '<td>' + data[i].c[j]?.v || 'N/A' + '</td>';
            };
            let list = document.querySelector('.online_shop_list').innerHTML;
            list = list + temp + '</tr>'
        };
    });
};

window.onload = () => {
    online_list(document.querySelector('#type > option').value);
};