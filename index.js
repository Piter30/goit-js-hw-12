import{i,S as f}from"./assets/vendor-CR5ngMdS.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function l(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(e){if(e.ep)return;e.ep=!0;const s=l(e);fetch(e.href,s)}})();const d=document.getElementById("search-form"),c=document.getElementById("gallery"),a=document.getElementById("loader"),m="45874849-b987a1554bc8f853b4bc2ad05";d.addEventListener("submit",o=>{o.preventDefault();const t=document.getElementById("search-query").value.trim();t?u(t):i.error({title:"Error",message:"Please enter a search term!"})});function u(o){a.style.display="block",c.innerHTML="",fetch(`https://pixabay.com/api/?key=${m}&q=${encodeURIComponent(o)}&image_type=photo&orientation=horizontal&safesearch=true`).then(t=>t.json()).then(t=>{a.style.display="none",t.hits.length>0?p(t.hits):i.error({title:"No Results",message:"Sorry, no images found. Please try again!"})}).catch(t=>{a.style.display="none",i.error({title:"Error",message:"Something went wrong. Please try again!"})})}function p(o){const t=o.map(r=>`
        <a href="${r.largeImageURL}" class="gallery-item">
            <img src="${r.webformatURL}" alt="${r.tags}" />
            <div class="image-info">
              <span><i class="fas fa-heart"></i> ${r.likes}</span>
              <span><i class="fas fa-eye"></i> ${r.views}</span>
              <span><i class="fas fa-comments"></i> ${r.comments}</span>
              <span><i class="fas fa-download"></i> ${r.downloads}</span>
            </div>
        </a>
    `).join("");c.innerHTML=t,new f(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}
//# sourceMappingURL=index.js.map
