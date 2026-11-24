// Preload only interactive gallery assets, without blocking the page or decoding every image.
(() => {
 const urls=[...document.querySelectorAll('[data-shot]')].map(button=>button.dataset.shot==='settings-editor'?'assets/editors/editor-choices.gif?v=34':`assets/heeler-screenshots/${button.dataset.shot}.png`);
 const images=[];window.heelerPreloadedImages=images;
 urls.forEach(url=>{const image=new Image();image.decoding='async';image.src=url;images.push(image);});
})();
