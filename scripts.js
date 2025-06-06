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
      contentList.innerHTML = ''; // Clear existing content

      content.forEach((item) => {
        // Replace "Jisu Kim" with an underlined version (if applicable)
        const updatedDescription = item.description
          ? item.description.replace(
              /Jisu Kim/g,
              '<span style="text-decoration: underline;">Jisu Kim</span>'
            )
          : '';

        // Generate buttons for each link (if links exist)
        const buttons = item.links
          ? item.links
              .map(
                (link) => `
                  <button
                    class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[var(--primary-blue)] text-white text-sm font-medium leading-normal w-fit hover:bg-white hover:text-[var(--primary-blue)] hover:outline hover:outline-[var(--primary-blue)] transition-all duration-200"
                    onclick="window.location.href='${link.url}'"
                  >
                    <span class="truncate">${link.label}</span>
                  </button>
                `
              )
              .join('')
          : '';

        // Conditionally render the image container
        const imageContainer = item.image
          ? `<div class="w-full md:min-w-[300px] md:w-[300px] aspect-video bg-center bg-no-repeat bg-cover rounded-xl order-1 md:order-2"
                style="background-image: url('${item.image}');">
              </div>`
          : '';

        const contentItem = `
          <div class="flex flex-col md:flex-row justify-between gap-4 rounded-xl mb-6">

            <!-- Left (Text and Buttons on desktop) -->
            <div class="flex flex-col gap-4 flex-[2_2_0px] order-2 md:order-1">
              <div class="flex flex-col gap-1 max-w-[95%]">
                <p class="text-[#121417] text-base font-bold leading-tight">${item.title}</p>
                <p class="text-[#677583] text-sm font-normal leading-normal">${updatedDescription}</p>
                <p class="text-[#677583] text-sm font-normal leading-normal">${item.conference || ''}</p>
              </div>
              <div class="flex gap-2">
                ${buttons}
              </div>
            </div>

            <!-- Right (Image on desktop) -->
            ${imageContainer}
          </div>
        `;

        contentList.innerHTML += contentItem;
      });
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