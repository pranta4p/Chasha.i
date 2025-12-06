// const blogs = [
//     {
//         id: 1,
//         title: "My Journey with Organic Tomato Farming",
//         summary : "How I increased my tomato yield by 40% using only organic methods",
//         author_name : "John Doe",
//         date : "May 15, 2024",
//         attribute1 : "Organic",
//         attribute2 : "Tomatoes",
//         attribute3 : "Success Story",
//         description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//         image: "https://images.unsplash.com/photo-1592921870583-aeafb0639ffe?q=80&w=1000&auto=format&fit=crop"
//     },
//     {
//         id: 2,
//         title: "Water Conservation Techniques That Saved My Farm",
//         summary : "During the drought, these methods helped us reduce water usage by 30%",
//         author_name : "Sarah Johnson",
//         date : "April 22, 2024",
//         attribute1 : "Water Conservation",
//         attribute2 : "Drought",
//         attribute3 : "Sustainability",
//         description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//         image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1000&auto=format&fit=crop"
//     },
// ];
// name need to be blogs with a 's' meaning not blog

function renderBlogs(BlogsToRender) {
    const grid = document.getElementById('blogGrid');
    const noResults = document.getElementById('noResults');

    console.log(BlogsToRender.length)
    if (BlogsToRender.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    grid.style.display = 'grid';
    noResults.style.display = 'none';

    grid.innerHTML = BlogsToRender.map(blog => `
        <div class="blog-card">
            <div class="blog-image">
                <img src="${blog.image}" alt="Organic Tomato Farming" />
            </div>
            <div class="blog-content">
                <h3 class="blog-title">${blog.title}</h3>
                <p class="blog-summary">${blog.summary}</p>
                <div class="blog-meta">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    <span>${blog.author_name}</span>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <span>${blog.date}</span>
                </div>
                <div class="blog-tags">
                    <span class="tag">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                        </svg>
                        ${blog.attribute1}
                    </span>
                    <span class="tag">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                        </svg>
                        ${blog.attribute2}
                    </span>
                    <span class="tag">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                        </svg>
                        ${blog.attribute3}
                    </span>
                </div>
                <p class="blog-excerpt">
                    ${blog.description}
                </p>
                <a href="/blogDetail/${blog._id}" class="blog-button">Read Full Story</a>
            </div>
        </div>
    `).join('');

    // grid.innerHTML = [
    //     '<h1>Hello</h1>'
    // ].join('');
}

function filterBlogs() {
    const searchTerm = document.getElementById('search').value.toLowerCase();

    const filtered = blogs.filter(blog => {
        const titleMatch = blog.title.toLowerCase().includes(searchTerm);
        const descriptionMatch = blog.description.toLowerCase().includes(searchTerm);
        const authorMatch = blog.author_name.toLowerCase().includes(searchTerm);
        const tagMatch = (
            blog.attribute1.toLowerCase().includes(searchTerm) ||
            blog.attribute2.toLowerCase().includes(searchTerm) ||
            blog.attribute3.toLowerCase().includes(searchTerm)
        );

        return titleMatch || descriptionMatch || authorMatch || tagMatch;
    });

    renderBlogs(filtered);
}

function clearFilters() {
    document.getElementById('search').value = '';
    renderBlogs(blogs);
}

// Event listeners
document.getElementById('search').addEventListener('input', filterBlogs);

console.log("HHH")
// Initial render
renderBlogs(blogs);