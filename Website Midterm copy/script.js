const menuToggle = document.querySelector('.toggle');
      const showcase = document.querySelector('.showcase');

      menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        showcase.classList.toggle('active');
      })

let video = document. getElementById("bgVideo");
// let video = document.querySelector('video');
    
    window.addEventListener('scroll', () => {
        let value = 1 + window.scrollY/ -600;
        video.style.opacity = value;

    })