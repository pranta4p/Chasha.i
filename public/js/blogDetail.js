function renderBlogs(BlogsToRender) {
    const grid = document.getElementById('bodyCard');

    grid.style.display = 'grid';

    grid.innerHTML = `
        <div class="card">
            <img src="${blog.image}" alt="Card Image" class="card-img">
            <h1 class="card-title">${blog.title}</h1>
            <p class="card-desc">
                ${blog.description}
            </p>
        </div>
    `

    // grid.innerHTML = [
    //     '<h1>Hello</h1>'
    // ].join('');
}
// console.log(blog);
// console.log(blogs.title)

renderBlogs(blog);