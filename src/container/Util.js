export function hideMenu() {
  var header = document.getElementsByTagName('header')[0];
  var main = document.getElementsByTagName('main')[0];
  var searchResult = document.getElementById('search-result');
  header.classList.remove('show-menu');
  if (main) {
    main.classList.remove('show-search');
    document.body.classList.remove('show-search');
  }
  if (searchResult) {
    if (window.location.hash === "#/") {
      searchResult.classList.remove('show');
      document.getElementById('search-input').value = "";
    }
  }
}
  
export function setFooterOpacity(opacity) {
  document.getElementsByTagName("footer")[0].style.opacity = opacity;
}

export function getCurrentPath() {
  return window.location.hash.split("#").join("");
}