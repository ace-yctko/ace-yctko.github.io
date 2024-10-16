'use strict';

const filter = (title, prev) => {
    localStorage.type = title;
    document.querySelectorAll(`.${title}`).forEach(x => {
        x.removeAttribute('style');
    });
    if (prev) document.querySelectorAll(`.${prev}`).forEach(x => {
        x.style.display = 'none';
    });
};

window.onload = () => {
    let type = localStorage.type || document.querySelector('#type > option').id,
        titles = new Array();
    
    document.querySelector(`#${type}`).selected = true;

    document.querySelectorAll('#type > option').forEach(title => {
        title.innerHTML = title.id;
        title.value = title.id;
        titles.push(title.id);
    });
    
    [titles[titles.indexOf(type)], titles[0]] = [titles[0], titles[titles.indexOf(type)]];
    
    titles.forEach(id => {
        fetch('https://docs.google.com/spreadsheets/d/1gTkcU8G4240QNNcMdFWTwr4JKBBd1Qdjwpu8nE8gY7E/gviz/tq?sheet=' + id + '&range=A3:H')
        .then(res => res.text())
        .then(rep => {
            let data = JSON.parse(rep.substr(47).slice(0, -2)).table.rows,
                temp = '';
                
            for (let i in data) {
                if (data[i].c[0].v == '❌') continue;
                temp += `<tr class="${id}"${type == id ? '' : ' style="display: none;"'}>`;
                for (let j in data[i].c) {
                    if (j == 2 && (data[i].c[3].v).indexOf('IG') != -1) {
                        temp += '<td>' + `<span onclick="window.open('https://instagram.com/${data[i].c[j]?.v}');">@${data[i].c[j]?.v}</span><br><br><iframe src="https://www.instagram.com/${data[i].c[j]?.v}/embed" scrolling="no" frameborder="0"></iframe>` + '</td>';
                    } else if (j == 2 || j > 4) {
                        temp += '<td>' + data[i].c[j]?.v || 'N/A' + '</td>';
                    };
                };
                temp += '</tr>';
            };
            document.querySelector('.shops').innerHTML = document.querySelector('.shops').innerHTML + temp;
        });
    });
};