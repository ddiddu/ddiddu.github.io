// const publications = [
//     {
//         title: "One vs. Many: Comprehending Accurate Information from Multiple Erroneous and Inconsistent AI Generations", 
//         authors: "Yoonjoo Lee, Kihoon Son, Tae Soo Kim, Jisu Kim, John Joon Young Chung, Eytan Adar, Juho Kim", 
//         conference: "FAccT 2024: ACM Conference on Fairness, Accountability, and Transparency. (Submission Under Review)"
//     },
//     // Add more publications as needed
// ];

// // Directly select the existing publications section by its ID
// const publicationSection = document.getElementById('publications');

// publications.forEach(pub => {
//     const pubDiv = document.createElement('div');

//     // Create a bold tag for the title and add it to the publication div
//     const titleBold = document.createElement('strong');
//     titleBold.textContent = pub.title;
//     pubDiv.appendChild(titleBold);

//     // Add a line break after the title
//     pubDiv.appendChild(document.createElement('br'));

//     // Add the authors and another line break
//     pubDiv.appendChild(document.createTextNode(pub.authors));
//     pubDiv.appendChild(document.createElement('br'));

//     // Add the conference information
//     pubDiv.appendChild(document.createTextNode(pub.conference));

//     // Append the publication div to the selected publications section
//     publicationSection.appendChild(pubDiv);
// });

// Assume we have a 'publications.json' file in the same directory as our HTML file.
fetch('publications.json')
    .then(response => response.json())
    .then(data => {
        const publicationSection = document.getElementById('publications');

        data.forEach(pub => {
            const pubDiv = document.createElement('div');
            pubDiv.className = 'publication';

            const titleBold = document.createElement('strong');
            titleBold.textContent = pub.title;
            pubDiv.appendChild(titleBold);

            pubDiv.appendChild(document.createElement('br'));

            pubDiv.appendChild(document.createTextNode(pub.authors));
            pubDiv.appendChild(document.createElement('br'));

            pubDiv.appendChild(document.createTextNode(pub.conference));

            publicationSection.appendChild(pubDiv);
        });
    })
    .catch(error => {
        console.error('Error fetching publications:', error);
    });
