'use strict';

const online_list = (title) => {
    let id = '1gTkcU8G4240QNNcMdFWTwr4JKBBd1Qdjwpu8nE8gY7E',
    range = 'A3:I'; 

    let url = 'https://docs.google.com/spreadsheets/d/' + id + '/gviz/tq?sheet=' + title + '&range=' + range;

    return fetch(url)
    .then(res => res.text())
    .then(rep => {
        let data = JSON.parse(rep.substr(47).slice(0, -2)).table.rows,
        temp = new Array();

        for (let i ; i < data.length ; i ++) {
            temp.push(data[i].c)
        };

        document.querySelector('.online_shop').innerHTML = temp.join('\n');
    });
};

window.onload = () => {
    online_list(document.querySelector('#type > option').value);
};
