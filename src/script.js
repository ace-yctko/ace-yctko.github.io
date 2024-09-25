'use strict';

window.onload = () => {
  if (location.protocol != 'https:') {
    location.replace(location.href.replace('http', 'https'));
  };
};
