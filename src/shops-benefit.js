'use strict';

const list = title => {
    fetch('https://docs.google.com/spreadsheets/d/1gTkcU8G4240QNNcMdFWTwr4JKBBd1Qdjwpu8nE8gY7E/gviz/tq?sheet=' + title + '&range=A3:H')
    .then(res => res.text())
    .then(rep => {
        let data = JSON.parse(rep.substr(47).slice(0, -2)).table.rows,
            temp = '';
            
        for (let i in data) {
            if (data[i].c[0].v == '❌') continue;
            temp += `<tr class="${title}">`;
            for (let j in data[i].c) {
                if (j == 2 && (data[i].c[3].v).indexOf('IG') != -1) {
                    temp += '<td>' + `<iframe src="https://www.instagram.com/${data[i].c[j]?.v}/embed" scrolling="no" frameborder="0"></iframe>` + '</td>';
                } else if (j == 2 || j > 4) {
                    temp += '<td>' + data[i].c[j]?.v || 'N/A' + '</td>';
                };
            };
            temp += '</tr>';
        };
        document.querySelector('.shops').innerHTML = document.querySelector('.shops').innerHTML + temp;
    });
}, filter = (title, prev) => {
    if (document.querySelector(`.${title}`) == null) {
        list(title);
    } else {
        document.querySelectorAll(`.${title}`).forEach(x => {
            x.removeAttribute('style');
        });
    }
    if (prev) document.querySelectorAll(`.${prev}`).forEach(x => {
        x.style.display = 'none';
    });
    localStorage.type = title;
};

window.onload = () => {
    const params = new URLSearchParams(location.search);
    if (params.get('type')) {
        localStorage.type = params.get('type');
        location.replace(location.href.split('?')[0]);
    };
    if (! localStorage.type) localStorage.type = document.querySelector('#type > option').id;
    
    document.querySelector(`#${localStorage.type}`).selected = true;

    document.querySelectorAll('#type > option').forEach(title => {
        title.innerHTML = title.id;
        title.value = title.id;
    });

    list(localStorage.type);
};