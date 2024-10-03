'use strict';

const list = (title) => {
    let id = '1gTkcU8G4240QNNcMdFWTwr4JKBBd1Qdjwpu8nE8gY7E',
    range = 'A:I'; 

    let url = 'https://docs.google.com/spreadsheets/d/' + id + '/gviz/tq?sheet=' + title + '&range=' + range;

    fetch(url)
    .then(res => res.text())
    .then(rep => {
        let data = JSON.parse(rep.substr(47).slice(0, -2));
        return data;
        console.log(data);
    });
};

window.onload = () => {
    console.log(list('食肆/食品零售'));
};
