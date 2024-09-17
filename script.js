'use strict';

window.onload = () => {
  if (location.protocol != 'https:') {
    location.replace(location.href.replace('http', 'https'));
  };
  document.querySelector('#submit').addEventListener('click', {
    fetch('a', {
          method: 'POST',
          body: 
          '> 發送者：' + document.querySelector('#user').value + '\n' +
          '> 發送原因：' + document.querySelector('#reason').value + '\n\n' +
          document.querySelector('#textbox').value
    });
  });
};
