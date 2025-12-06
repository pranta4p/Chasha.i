// const tutorials = [
//     {
//         id: 1,
//         title: "Modern Irrigation Techniques",
//         description : "Learn about drip irrigation, sprinkler systems, and water conservation methods for optimal crop yield.",
//         author_name : "Dr. Sarah Johnson",
//         duration : "45 min",
//         attribute1 : "Irrigation",
//         attribute2 : "Water Management",
//         attribute3 : "Beginner",
//         image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1000&auto=format&fit=crop"
//     },
//     {
//         id: 2,
//         title: "Organic Tomato Farming",
//         description : "Master the art of growing healthy, pesticide-free tomatoes using organic farming methods.",
//         author_name : "Michael Chen",
//         duration : "32 min",
//         attribute1 : "Organic",
//         attribute2 : "Tomatoes",
//         attribute3 : "Intermediate",
//         image: "https://images.unsplash.com/photo-1592921870583-aeafb0639ffe?q=80&w=1000&auto=format&fit=crop"
//     },
//     {
//         id: 1,
//         title: "Modern Irrigation Techniques",
//         description : "Learn about drip irrigation, sprinkler systems, and water conservation methods for optimal crop yield.",
//         author_name : "Dr. Sarah Johnson",
//         duration : "45 min",
//         attribute1 : "Irrigation",
//         attribute2 : "Water Management",
//         attribute3 : "Beginner",
//         image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1000&auto=format&fit=crop"
//     },
    
// ];
// name need to be tutorials with a 's' meaning not tutorial

function renderTutorials(TutorialsToRender) {
    const grid = document.getElementById('tutorialGrid');
    const noResults = document.getElementById('noResults');

    // console.log(TutorialsToRender.length)
    if (TutorialsToRender.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    grid.style.display = 'grid';
    noResults.style.display = 'none';

    grid.innerHTML = TutorialsToRender.map(tutorial => `
        <div class="tutorial-card">
            <div class="tutorial-image">
                <img src="${tutorial.image}" alt="Irrigation Systems" />
            </div>
            <div class="tutorial-content">
                <h3 class="tutorial-title">${tutorial.title}</h3>
                <p class="tutorial-description">
                    ${tutorial.description}
                </p>
                <div class="tutorial-meta">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    <span>${tutorial.author_name}</span>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>${tutorial.duration}</span>
                </div>
                <div class="tutorial-tags">
                    <span class="tag">${tutorial.attribute1}</span>
                    <span class="tag">${tutorial.attribute2}</span>
                    <span class="tag">${tutorial.attribute3}</span>
                </div>
                <a href="${tutorial.videoLink}" class="tutorial-button">Watch Tutorial</a>
            </div>
        </div>
    `).join('');

    // grid.innerHTML = [
    //     '<h1>Hello</h1>'
    // ].join('');
}

function filterTutorials() {
    const searchTerm = document.getElementById('search').value.toLowerCase();

    const filtered = tutorials.filter(tutorial => {
        const titleMatch = tutorial.title.toLowerCase().includes(searchTerm);
        const descriptionMatch = tutorial.description.toLowerCase().includes(searchTerm);
        const authorMatch = tutorial.author_name.toLowerCase().includes(searchTerm);
        const tagMatch = (
            tutorial.attribute1.toLowerCase().includes(searchTerm) ||
            tutorial.attribute2.toLowerCase().includes(searchTerm) ||
            tutorial.attribute3.toLowerCase().includes(searchTerm)
        );

        return titleMatch || descriptionMatch || authorMatch || tagMatch;
    });

    renderTutorials(filtered);
}

function clearFilters() {
    document.getElementById('search').value = '';
    renderTutorials(tutorials);
}

// Event listeners
document.getElementById('search').addEventListener('input', filterTutorials);

console.log("HHH")
// Initial render
renderTutorials(tutorials);