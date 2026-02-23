// Fetch the JSON file and render news
async function fetchNews() {
    try {
        const response = await fetch('https://jisulog.kim/json/news.json'); 
        const news = await response.json();

        const newsList = document.getElementById('news-list');
        newsList.innerHTML = ''; // Clear existing content

        news.forEach((item) => {
        const newsItem = `
            <li class="flex gap-4 items-start">
            <span class="inline-flex text-[#677583] text-sm font-medium min-w-[70px] justify-between">
                <span>${item.date.split(' ')[0]}</span><span>${item.date.split(' ')[1]}</span>
            </span>
            <span class="text-[#121417] text-sm font-normal flex-1">
                ${item.description}
            </span>
            </li>
        `;
        newsList.innerHTML += newsItem;
        });
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

// Fetch the JSON file and render the contact section
async function fetchContacts() {
  try {
      const response = await fetch('https://jisulog.kim/json/contacts.json'); // Adjust the URL if necessary
      const contacts = await response.json();

      const contactSection = document.getElementById('contact-section');
      contactSection.innerHTML = ''; // Clear existing content

      contacts.forEach((contact) => {
          const anchor = document.createElement('a');
          anchor.href = contact.url;
          anchor.target = '_blank';
          anchor.className = 'mx-2 hover:text-[var(--primary-blue)]';

          const icon = document.createElement('i');
          icon.className = contact.iconClass;
          icon.style.fontSize = '16px';

          anchor.appendChild(icon);
          contactSection.appendChild(anchor);
      });
  } catch (error) {
      console.error('Error fetching contacts:', error);
  }
}

async function fetchContent(section) {
    try {
      const response = await fetch(`https://jisulog.kim/json/${section}.json`); // Dynamically fetch JSON based on section
      const content = await response.json();

      const contentList = document.getElementById(`${section}-list`);
      contentList.innerHTML = '';

      if (section === 'publications') {
        // Extract year from conference/title/description, group by year
        const pubsByYear = {};
        content.forEach(item => {
          let year = '';
          // Try conference, title, description for year
          const yearMatch = (item.conference && item.conference.match(/(20\d{2})/))
            || (item.title && item.title.match(/(20\d{2})/))
            || (item.description && item.description.match(/(20\d{2})/));
          if (yearMatch) year = yearMatch[1];
          if (!year) year = 'Other';
          if (!pubsByYear[year]) pubsByYear[year] = [];
          pubsByYear[year].push(item);
        });

        // Sort years descending, 'Other' always last
        const sortedYears = Object.keys(pubsByYear).sort((a, b) => {
          if (a === 'Other') return 1;
          if (b === 'Other') return -1;
          return b.localeCompare(a);
        });

        sortedYears.forEach((year, i) => {
          // Year subtitle: 회색(#677583), 구분선X, 첫 연도 위 여백 줄임
          const yearClass = i === 0
            ? 'text-xl font-bold text-[#677583] mt-1 mb-4'
            : 'text-xl font-bold text-[#677583] mt-8 mb-4';
          contentList.innerHTML += `<h3 class=\"${yearClass}\">${year}</h3>`;
          pubsByYear[year].forEach((item, idx) => {
            const updatedDescription = item.description
              ? item.description.replace(
                  /Jisu Kim/g,
                  '<span style="text-decoration: underline;">Jisu Kim</span>'
                )
              : '';
            const buttons = item.links
              ? item.links
                  .map((link, linkIdx, arr) => {
                    if (link.label === 'All Publications') {
                      const noTitleAndOnlyButton = (!item.title && arr.length === 1);
                      return `
                        <a href="${link.url}" class="flex min-w-[auto] max-w-[auto] cursor-pointer items-center justify-center overflow-hidden h-auto px-2 border border-[var(--primary-blue)] bg-[var(--primary-blue)] text-white text-xs font-normal leading-normal w-fit transition-all duration-200 hover:bg-white hover:text-[var(--primary-blue)]${noTitleAndOnlyButton ? ' mt-0' : ' mt-2'}" style="min-width:unset; max-width:220px;">
                          <span class="truncate">${link.label}</span>
                        </a>
                      `;
                    } else {
                      return `
                        <a href="${link.url}" class="flex min-w-[auto] max-w-[auto] cursor-pointer items-center justify-center overflow-hidden h-auto px-2 border border-[#121417] text-[#121417] text-xs font-normal leading-normal w-fit transition-all duration-200 bg-white hover:bg-[var(--primary-blue)] hover:text-white mt-2" style="min-width:unset; max-width:220px;">
                          <span class="truncate">${link.label}</span>
                        </a>
                      `;
                    }
                  })
                  .join('')
              : '';
            const imageContainer = item.image
              ? `<div class="w-full md:min-w-[300px] md:w-[300px] aspect-video bg-center bg-no-repeat bg-cover order-1 md:order-2"
                    style="background-image: url('${item.image}');">
                  </div>`
              : '';
            const titleHtml = item.title ? `<p class="text-[#121417] text-base font-bold leading-tight">${item.title}</p>` : '';
            const contentItem = `
              <div class="flex flex-col md:flex-row justify-between gap-4 rounded-xl mb-6">
                <div class="flex flex-col flex-[2_2_0px] order-2 md:order-1">
                  <div class="flex flex-col gap-1 max-w-[95%]">
                    ${titleHtml}
                    <p class="text-[#677583] text-sm font-normal leading-normal">${updatedDescription}</p>
                    <p class="text-[#677583] text-sm font-normal leading-normal"><em>${item.conference || ''}</em></p>
                  </div>
                  <div class="flex gap-2">
                    ${buttons}
                  </div>
                </div>
                ${imageContainer}
              </div>
            `;
            contentList.innerHTML += contentItem;
          });
        });
      } else {
        // ...existing code...
        content.forEach((item, idx) => {
          const updatedDescription = item.description
            ? item.description.replace(
                /Jisu Kim/g,
                '<span style="text-decoration: underline;">Jisu Kim</span>'
              )
            : '';
          const buttons = item.links
            ? item.links
                .map((link, linkIdx, arr) => {
                  if (link.label === 'All Publications') {
                    const noTitleAndOnlyButton = (!item.title && arr.length === 1);
                    return `
                      <a href="${link.url}" class="flex min-w-[auto] max-w-[auto] cursor-pointer items-center justify-center overflow-hidden h-auto px-2 border border-[var(--primary-blue)] bg-[var(--primary-blue)] text-white text-xs font-normal leading-normal w-fit transition-all duration-200 hover:bg-white hover:text-[var(--primary-blue)]${noTitleAndOnlyButton ? ' mt-0' : ' mt-2'}" style="min-width:unset; max-width:220px;">
                        <span class="truncate">${link.label}</span>
                      </a>
                    `;
                  } else {
                    return `
                      <a href="${link.url}" class="flex min-w-[auto] max-w-[auto] cursor-pointer items-center justify-center overflow-hidden h-auto px-2 border border-[#121417] text-[#121417] text-xs font-normal leading-normal w-fit transition-all duration-200 bg-white hover:bg-[var(--primary-blue)] hover:text-white mt-2" style="min-width:unset; max-width:220px;">
                        <span class="truncate">${link.label}</span>
                      </a>
                    `;
                  }
                })
                .join('')
            : '';
          const imageContainer = item.image
            ? `<div class="w-full md:min-w-[300px] md:w-[300px] aspect-video bg-center bg-no-repeat bg-cover order-1 md:order-2"
                  style="background-image: url('${item.image}');">
                </div>`
            : '';
          const titleHtml = item.title ? `<p class="text-[#121417] text-base font-bold leading-tight">${item.title}</p>` : '';
          const contentItem = `
            <div class="flex flex-col md:flex-row justify-between gap-4 rounded-xl mb-6">
              <div class="flex flex-col flex-[2_2_0px] order-2 md:order-1">
                <div class="flex flex-col gap-1 max-w-[95%]">
                  ${titleHtml}
                  <p class="text-[#677583] text-sm font-normal leading-normal">${updatedDescription}</p>
                  <p class="text-[#677583] text-sm font-normal leading-normal"><em>${item.conference || ''}</em></p>
                </div>
                <div class="flex gap-2">
                  ${buttons}
                </div>
              </div>
              ${imageContainer}
            </div>
          `;
          contentList.innerHTML += contentItem;
        });
      }
    } catch (error) {
      console.error(`Error fetching ${section}:`, error);
    }
}


// Call the function to fetch and render news
fetchNews();
// Call the function to fetch and render the contact section
fetchContacts();

// Call the function for both sections
fetchContent('publications');
fetchContent('projects');
fetchContent('talks');
fetchContent('recent');

document.addEventListener("DOMContentLoaded", () => {
  const publicationsList = document.getElementById("publications-list");
  // const projectsList = document.getElementById("projects-list");
  const talkList = document.getElementById("talks-list");
  const recentList = document.getElementById("recent-list");
  const showPublications = document.getElementById("show-publications");
  // const showProjects = document.getElementById("show-projects");
  const showTalks = document.getElementById("show-talks");
  const showRecent = document.getElementById("show-recent");

  // Show Publications and hide Projects
  showPublications.addEventListener("click", (e) => {
      e.preventDefault();
      publicationsList.classList.remove("hidden");
      // projectsList.classList.add("hidden");
      talkList.classList.add("hidden");
      recentList.classList.add("hidden");
  });

  // Show Projects and hide Publications
  // showProjects.addEventListener("click", (e) => {
  //     e.preventDefault();
  //     projectsList.classList.remove("hidden");
  //     publicationsList.classList.add("hidden");
  // });

  // Show Talks and hide Publications and Projects
  showTalks.addEventListener("click", (e) => {
      e.preventDefault();
      talkList.classList.remove("hidden");
      publicationsList.classList.add("hidden");
      // projectsList.classList.add("hidden");
      recentList.classList.add("hidden");
  });

  // Show Recent and hide Publications and Projects
  showRecent.addEventListener("click", (e) => {
      e.preventDefault();
      recentList.classList.remove("hidden");
      publicationsList.classList.add("hidden");
      // projectsList.classList.add("hidden");
      talkList.classList.add("hidden");
  });
});