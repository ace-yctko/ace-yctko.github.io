'use strict';

const online_list = (title) => {
    let id = '1gTkcU8G4240QNNcMdFWTwr4JKBBd1Qdjwpu8nE8gY7E',
    range = 'A3:I'; 

    let url = 'https://docs.google.com/spreadsheets/d/' + id + '/gviz/tq?sheet=' + title + '&range=' + range;

    return fetch(url)
    .then(res => res.text())
    .then(rep => {
        let data = JSON.parse(rep.substr(47).slice(0, -2)).table.rows;

        document.querySelector('.online_shop').innerHTML = data;
    });
};

const titles = [
    '食肆/食品零售',
    '文具/教育',
    '服飾',
    '精品',
    '娛樂',
    '其他'
];

window.onload = () => {
    online_list(titles[0]);
};
