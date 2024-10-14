'use strict';

const online_list = (title) => {
    let id = '1gTkcU8G4240QNNcMdFWTwr4JKBBd1Qdjwpu8nE8gY7E',
    range = 'A3:H'; 

    let url = 'https://docs.google.com/spreadsheets/d/' + id + '/gviz/tq?sheet=' + title + '&range=' + range;

    return fetch(url)
    .then(res => res.text())
    .then(rep => {
        let data = JSON.parse(rep.substr(47).slice(0, -2)).table.rows;

        document.querySelector('.online_shop').innerHTML =
        '<tr><th>獨家</th><th>IG/店舖名</th><th>福利</th><th>適用時段</th><th>備注</th></tr>';

        for (let i in data) {
            if (data[i].c[0].v == '❌'|| data[i].c[4].v != 'N/A') continue;
            let temp = '<tr>';
            for (let j in data[i].c) {
                if (j == 0 || j == 3 || j == 4) continue;
                if (j == 2) {
                    if ((data[i].c[3].v).indexOf('IG') != -1) {
                        temp += '<td>' + `<a href="https://instagram.com/${data[i].c[j]?.v}">${data[i].c[j]?.v}</a>` + '</td>';
                    };
                } else {
                    temp += '<td>' + data[i].c[j]?.v || 'N/A' + '</td>';
                };
            };
            document.querySelector('.online_shop').innerHTML =
            document.querySelector('.online_shop').innerHTML + temp + '</tr>';
        };
    });
};

window.onload = () => {
    online_list(document.querySelector('#type > option').value);
};