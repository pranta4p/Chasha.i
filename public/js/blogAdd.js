document.getElementById('submitBtn').addEventListener("click", (event) => {
    // event.preventDefault(); // Stops the form from submitting

    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const summary = document.getElementById('summary').value;
    const attribute1 = document.getElementById('attribute1').value;
    const attribute2 = document.getElementById('attribute2').value;
    const attribute3 = document.getElementById('attribute3').value;

    alert("value has been taken");
});
