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
        // Fetch the refs.bib file
        const response = await fetch('https://jisulog.kim/refs.bib'); // Adjust the path if necessary
        const bibContent = await response.text(); // Read the file as plain text

        // Parse the .bib content (using a library or manual parsing)
        const entries = parseBibtex(bibContent);

        // Filter entries based on the section (e.g., 'publications' or 'projects')
        const content = entries.filter((entry) => {
            // Example: Filter by a specific field or condition
            return section === 'publications'; // Adjust filtering logic as needed
        });

        const contentList = document.getElementById(`${section}-list`);
        if (!contentList) {
            console.error(`Element with ID ${section}-list not found.`);
            return;
        }
        contentList.innerHTML = ''; // Clear existing content

        content.forEach((item) => {
            const updatedDescription = item.note
                ? item.note.replace(
                      /Jisu Kim/g,
                      '<span style="text-decoration: underline;">Jisu Kim</span>'
                  )
                : '';

            const buttons = item.doi
                ? `
                  <button
                    class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[var(--primary-blue)] text-white text-sm font-medium leading-normal w-fit hover:bg-white hover:text-[var(--primary-blue)] hover:outline hover:outline-[var(--primary-blue)] transition-all duration-200"
                    onclick="window.location.href='https://doi.org/${item.doi}'"
                  >
                    <span class="truncate">DOI</span>
                  </button>
                `
                : '';

            const contentItem = `
                <div class="flex flex-col md:flex-row justify-between gap-4 rounded-xl mb-6">
                    <div class="flex flex-col gap-4 flex-[2_2_0px] order-2 md:order-1">
                        <div class="flex flex-col gap-1 max-w-[95%]">
                            <p class="text-[#121417] text-base font-bold leading-tight">${item.title}</p>
                            <p class="text-[#677583] text-sm font-normal leading-normal">${updatedDescription}</p>
                            <p class="text-[#677583] text-sm font-normal leading-normal">${item.booktitle || ''}</p>
                        </div>
                        <div class="flex gap-2">
                            ${buttons}
                        </div>
                    </div>
                </div>
            `;

            contentList.innerHTML += contentItem;
        });
    } catch (error) {
        console.error(`Error fetching ${section}:`, error);
    }
}

// Helper function to parse .bib content
function parseBibtex(bibContent) {
    const bibtexParse = require('bibtex-parse-js'); // Use a library for parsing
    return bibtexParse.toJSON(bibContent);
}

// Call the function to fetch and render news
fetchNews();
// Call the function to fetch and render the contact section
fetchContacts();

// Call the function for both sections
fetchContent('publications');
fetchContent('projects');