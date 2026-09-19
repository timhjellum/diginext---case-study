

  (function(){
    var items = Array.prototype.slice.call(document.querySelectorAll('#galGrid .gal-item'));
    if (!items.length) return;
    var lightbox = document.getElementById('galLightbox');
    var imgEl = document.getElementById('galLightboxImg');
    var placeholderEl = document.getElementById('galLightboxPlaceholder');
    var titleEl = document.getElementById('galLightboxTitle');
    var descEl = document.getElementById('galLightboxDesc');
    var counterEl = document.getElementById('galLightboxCounter');
    var closeBtn = document.getElementById('galLightboxClose');
    var prevBtn = document.getElementById('galLightboxPrev');
    var nextBtn = document.getElementById('galLightboxNext');
    var current = 0;
    var lastFocused = null;

    function render(){
      var el = items[current];
      var title = el.querySelector('.gal-cap-title').textContent;
      var desc = el.querySelector('.gal-cap-desc').textContent;
      var srcImg = el.querySelector('img');
      if (srcImg) {
        imgEl.src = srcImg.currentSrc || srcImg.src;
        imgEl.alt = srcImg.alt || title;
        imgEl.style.display = 'block';
        placeholderEl.style.display = 'none';
      } else {
        imgEl.removeAttribute('src');
        imgEl.style.display = 'none';
        placeholderEl.style.display = 'flex';
      }
      titleEl.textContent = title;
      descEl.textContent = desc;
      counterEl.textContent = (current + 1) + ' / ' + items.length;
      prevBtn.disabled = current === 0;
      nextBtn.disabled = current === items.length - 1;
    }
    function open(index){
      current = index;
      lastFocused = document.activeElement;
      render();
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
      document.addEventListener('keydown', onKeydown);
    }
    function close(){
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeydown);
      if (lastFocused) lastFocused.focus();
    }
    function go(delta){
      var next = current + delta;
      if (next < 0 || next >= items.length) return;
      current = next;
      render();
    }
    function onKeydown(e){
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    }

    items.forEach(function(el, i){
      el.addEventListener('click', function(){ open(i); });
    });
    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', function(){ go(-1); });
    nextBtn.addEventListener('click', function(){ go(1); });
    lightbox.addEventListener('click', function(e){ if (e.target === lightbox) close(); });
  })();
