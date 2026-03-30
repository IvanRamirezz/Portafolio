const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-item");

const observer = new IntersectionObserver(

  entries => {

    entries.forEach(entry => {

      if(entry.isIntersecting){

        const id = entry.target.id;

        navItems.forEach(link => {

          link.classList.remove("active");

          if(link.getAttribute("data-section") === id){

            link.classList.add("active");

          }

        });

      }

    });

  },

  {
    threshold:0.6
  }

);

sections.forEach(section => {

  observer.observe(section);

});