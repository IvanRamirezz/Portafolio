document.addEventListener("DOMContentLoaded", () => {

  const sections = document.querySelectorAll<HTMLElement>("section[id]");

  const navLinks = document.querySelectorAll<HTMLAnchorElement>(".nav-item");

  const setActive = (id: string) => {

    navLinks.forEach(link => {

      link.classList.remove("active");

      if(link.dataset.section === id){

        link.classList.add("active");

      }

    });

  };

  const observer = new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if(entry.isIntersecting){

          setActive(entry.target.id);

        }

      });

    },

    {
      rootMargin: "-40% 0px -40% 0px"
    }

  );

  sections.forEach(section => observer.observe(section));

});