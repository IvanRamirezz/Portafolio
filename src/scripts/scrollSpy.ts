document.addEventListener("DOMContentLoaded", () => {

  const sections = document.querySelectorAll<HTMLElement>("section[id]");

  const navItems = document.querySelectorAll<HTMLAnchorElement>(".nav-item");

  const setActive = (id:string) => {

    navItems.forEach(link => {

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
      rootMargin:"-45% 0px -45% 0px"
    }

  );

  sections.forEach(section => observer.observe(section));

});