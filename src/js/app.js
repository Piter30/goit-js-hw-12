import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';

const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');
const loadMoreContainer = document.querySelector('.load-more-container');
const loadMoreBtn = document.getElementById('load-more');

loadMoreBtn.textContent = 'Load more';
loadMoreBtn.style.display = 'none';
loadMoreContainer.appendChild(loadMoreBtn);

const API_KEY = '45874849-b987a1554bc8f853b4bc2ad05';
let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', async e => {
  e.preventDefault();
  currentQuery = document.getElementById('search-query').value.trim();
  if (currentQuery) {
    currentPage = 1;
    gallery.innerHTML = '';
    loadMoreBtn.style.display = 'none';
    await searchImages(currentQuery, currentPage);
  } else {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term!',
    });
  }
});

async function searchImages(query, page) {
  loader.style.display = 'block';

  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: page,
        per_page: 40,
      },
    });

    loader.style.display = 'none';

    if (response.data.hits.length > 0) {
      displayImages(response.data.hits);
      loadMoreBtn.style.display = 'block';
    } else {
      iziToast.error({
        title: 'No Results',
        message: 'Sorry, no images found. Please try again!',
      });
    }
  } catch (error) {
    loader.style.display = 'none';
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again!',
    });
  }
}

function displayImages(images) {
  const galleryItems = images
    .map(
      image => `
        <a href="${image.largeImageURL}" class="gallery-item">
            <img src="${image.webformatURL}" alt="${image.tags}" />
            <div class="image-info">
              <span><i class="fas fa-heart"></i> ${image.likes}</span>
              <span><i class="fas fa-eye"></i> ${image.views}</span>
              <span><i class="fas fa-comments"></i> ${image.comments}</span>
              <span><i class="fas fa-download"></i> ${image.downloads}</span>
            </div>
        </a>
    `
    )
    .join('');
  gallery.innerHTML += galleryItems;

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();
}

loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  await searchImages(currentQuery, currentPage);
});
