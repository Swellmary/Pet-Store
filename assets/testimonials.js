
document.addEventListener('DOMContentLoaded', function() {
var section = document.getElementById('testimonials-{{ section.id }}');
if (!section) return;

var grid = document.getElementById('testimonials-grid-{{ section.id }}');
var prevBtn = section.querySelector('.slider-prev');
var nextBtn = section.querySelector('.slider-next');
var card = grid.querySelector('.testimonial-card');
var scrollAmount = card ? card.offsetWidth + 20 : 320;

if (prevBtn) {
    prevBtn.addEventListener('click', function() {
    grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', function() {
    grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
}

// Hide/show arrows based on scroll position and content
function updateArrows() {
    var maxScroll = grid.scrollWidth - grid.clientWidth;
    
    // If content doesn't overflow, hide both arrows
    if (maxScroll <= 0) {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    } else {
    // Show/hide based on scroll position
    prevBtn.style.display = grid.scrollLeft <= 0 ? 'none' : 'flex';
    nextBtn.style.display = grid.scrollLeft >= maxScroll - 5 ? 'none' : 'flex';
    }
}

// Run on load
updateArrows();

// Run on scroll
grid.addEventListener('scroll', updateArrows);

// Run on window resize
window.addEventListener('resize', updateArrows);

// Check which quotes are truncated and show "See More" only for those
var quotes = section.querySelectorAll('.testimonial-quote');
var seeMoreBtns = section.querySelectorAll('.see-more-btn');

quotes.forEach(function(quote, index) {
    // Check if text is overflowing (truncated)
    if (quote.scrollHeight > quote.clientHeight) {
    seeMoreBtns[index].classList.add('visible');
    }
});

// Modal functionality
var modal = document.getElementById('modal-{{ section.id }}');
var modalQuote = modal.querySelector('.modal-quote');
var modalAuthor = modal.querySelector('.modal-author');
var modalClose = modal.querySelector('.modal-close');

seeMoreBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
    var quote = this.getAttribute('data-quote');
    var author = this.getAttribute('data-author');
    modalQuote.textContent = '"' + quote + '"';
    modalAuthor.textContent = '- ' + author;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    });
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', function(e) {
    if (e.target === modal) {
    closeModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
    }
});
});