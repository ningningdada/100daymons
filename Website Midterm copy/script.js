const app = {
  initialize: () => {
    app.unlockPosition();
    app.client = contentful.createClient({
      // This is the space ID. A space is like a project folder in Contentful terms
      space: "w87f3kszgvam",
      // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
      accessToken: "i-Ujj7hQYGiPsKumaa_Cl9fb0aQcvGgKfYAYfqWje78"
    });
  },

  unlockPosition: () => {
    const appearOptions = {
      threshold: 1,
    };

    const unlockOnScroll = new IntersectionObserver(function(
      entries,
      appearOnScroll
    ) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        } else {
          console.log(entry)
          if (entry.boundingClientRect.y > 0) {
            document.querySelector('.showcase video').style.position = 'absolute';

          } else {
            document.querySelector('.showcase video').style.position = 'fixed';

          }
         // appearOnScroll.unobserve(entry.target);
        }
      });
    },
    appearOptions);
    const observedElement = document.querySelector('.social');
    unlockOnScroll.observe(observedElement);
  },

  // fetch a particular project
  // getEntry: entry => {
  //   // a known issue with the contentful library is that embedded images are ignored in rich text
  //   // this is the current workaround: https://github.com/contentful/rich-text/issues/61
  //   const options = {
  //     renderNode: {
  //         'embedded-asset-block': ({ data: { target: { fields }}}) => {
  //           debugger;
  //           return `<img src="${fields.file.url}" height="${fields.file.details.image.height}" width="${fields.file.details.image.width}" alt="${fields.description}"/>`;
  //         }
  //     }
  //   };
  //   app.client.getEntry(entry).then(project => {
  //     // debugger;
  //     const projectData = {
  //       title: project.fields.title,
  //       imageUrl: `http:${project.fields.thumbnail.fields.file.url}`,
  //       imageTitle: project.fields.thumbnail.fields.title,
  //       description: documentToHtmlString(project.fields.description, options) // passing in the options obj i created above for the bug
  //     };
  //     // load the template for this item from a local file
  //     fetch('projectPage.mustache')
  //       .then(response => response.text())
  //       .then(template => {
  //         // render the template with the data
  //         const rendered = Mustache.render(template, projectData);
  //         // add the element to the container
  //         $('.container').append(rendered);
  //       }
  //     );
  //   });
  // },

  getAllEntries: async () => {
    // first make sure we have our template loaded
    // i can use the word await along with async to pause the program until this function is finished
    const template = await app.loadTemplateForProjectOnHome();
    // fetch all entries
    app.client.getEntries().then(response => {
      // go through each one
      response.items.forEach(project => {
        // pull out the data you're interested in
        //debugger;
        const projectData = {
          order: project.fields.flexOrder,
          title: project.fields.title,
          imageUrl: `http:${project.fields.thumbnail.fields.file.url}`,
          imageTitle: project.fields.thumbnail.fields.title,
          slug: `${project.fields.slug}.html`
        };
        const rendered = Mustache.render(template, projectData);
        // add the element to the container
        $('.content').append(rendered);
        // app.addIntersectionListener(rendered)
      });
    }).then(() => {
      app.addIntersectionListener();
    });
  },

  addIntersectionListener: () => {
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
      threshold: 0,
      rootMargin: "0px 0px 100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(
      entries,
      appearOnScroll
    ) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add("appear");
          appearOnScroll.unobserve(entry.target);
        }
      });
    },
    appearOptions);
    
    faders.forEach(fader => {
      appearOnScroll.observe(fader);
    })
  },

  // getEntriesByTag: async tag => {
  //   // first make sure we have our template loaded
  //   // i can use the word await along with async to pause the program until this function is finished
  //   const template = await app.loadTemplateForProjectOnHome();
  //   // fetch all entries
  //   app.client.getEntries({'metadata.tags.sys.id[in]': tag}).then(response => {
  //     // go through each one
  //     response.items.forEach(project => {
  //       // pull out the data you're interested in
  //       const projectData = {
  //         title: project.fields.title,
  //         imageUrl: `http:${project.fields.image.fields.file.url}`,
  //         imageTitle: project.fields.image.fields.title,
  //         slug: `${project.fields.slug}.html`
  //       };
  //       const rendered = Mustache.render(template, projectData);
  //       // add the element to the container
  //       $('.container').append(rendered);
  //     });
  //   });
  // },

  loadTemplateForProjectOnHome: () => fetch('projectOnHome.mustache').then(response => response.text()).then(template => template)

};



const menuToggle = document.querySelector('.toggle');
      const showcase = document.querySelector('.showcase');

      menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        showcase.classList.toggle('active');
      })

// const menuToggleProject = document.querySelector('.toggle1');
//       const showcase1 = document.querySelector('.showcase1');

//       menuToggleProject.addEventListener('click', () => {
//         menuToggleProject.classList.toggle1('active');
//         showcase1.classList.toggle1('active');
//       })

// let video = document. getElementById("bgVideo");
// // let video = document.querySelector('video');
    
//     window.addEventListener('scroll', () => {
//         let value = 1 + window.scrollY/ -600;
//         video.style.opacity = value;
//     })

    // $(window).on("load",function() {
    //   $(window).scroll(function() {
    //     var windowBottom = $(this).scrollTop() + $(this).innerHeight();
    //     $(".fade").each(function() {
    //       /* Check the location of each desired element */
    //       var objectBottom = $(this).offset().top + $(this).outerHeight();
          
    //       /* If the element is completely within bounds of the window, fade it in */
    //       if (objectBottom < windowBottom) { //object comes into view (scrolling down)
    //         if ($(this).css("opacity")==0) {$(this).fadeTo(500,1);}
    //       } else { //object goes out of view (scrolling up)
    //         if ($(this).css("opacity")==1) {$(this).fadeTo(500,0);}
    //       }
    //     });
    //   }).scroll(); //invoke scroll-handler on page-load
    // });




