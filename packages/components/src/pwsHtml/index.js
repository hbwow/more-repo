// const curScript = document.currentScript;
// const curScript = document.querySelector(`script[src="${import.meta.url}"]`);
const curScript = document.querySelector('script[src*="/pwsHtml/index.js"]');
// console.log('🚀🚀🚀 ~ curScript:', curScript.dataset);

const xhr = new XMLHttpRequest();

xhr.open('GET', '/pwsHtml/pws.html', true);

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    document.getElementById(
      curScript && curScript.dataset && curScript.dataset.warpid
        ? curScript.dataset.warpid
        : 'root',
    ).innerHTML = xhr.responseText;
  }
};
xhr.send();
