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

        for (let i in data) {
            let temp2 = new Array();
            for (let j in data[i].c) {
                temp2.push(data[i].c[j]?.v || 'N/A');
            };
            temp.push(temp2.join(' | '));
        };
        document.querySelector('.online_shop').innerHTML = temp.join('<br>');
    });
};

window.onload = () => {
    online_list(document.querySelector('#type > option').value);
};