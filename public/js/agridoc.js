const HF_TOKEN =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;
const MODEL_ENDPOINT = "https://api-inference.huggingface.co/models/linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification";

let uploadedImage = null;

document.getElementById('imageInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        uploadedImage = file;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('previewImage').src = e.target.result;
            document.getElementById('uploadPrompt').classList.add('hidden');
            document.getElementById('imagePreview').classList.remove('hidden');
            document.getElementById('uploadBtn').textContent = 'Change Image';
            document.getElementById('analyzeBtn').disabled = false;
        };
        reader.readAsDataURL(file);
        
        // Clear previous results
        // document.getElementById('resultsContent').classList.add('hidden');
        // document.getElementById('resultsPlaceholder').classList.remove('hidden');
    }
});

async function analyzeImage() {
    if (!uploadedImage) return;

    const analyzeBtn = document.getElementById('analyzeBtn');
    analyzeBtn.textContent = 'Analyzing...';
    analyzeBtn.disabled = true;

    try {
        const response = await fetch(MODEL_ENDPOINT, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${HF_TOKEN}`,
                Accept: 'application/json',
            },
            body: uploadedImage,
        });

        const result = await response.json();
        if (result.error) throw new Error(result.error);

        const topResult = result[0];
        document.getElementById('diseaseName').textContent = topResult.label;
        document.getElementById('confidenceScore').textContent = (topResult.score * 100).toFixed(2) + '%';
        // document.getElementById('resultBox').style.display = 'block';
        // const dname = document.getElementById('diseaseName');
        // dname.innerHTML = '<h1>Hello</h1>';
        console.log(topResult.label);
    } catch (err) {
        alert('Error: ' + err.message);
    } finally {
        analyzeBtn.textContent = 'Analyze with AI';
        analyzeBtn.disabled = false;
    }
}



// let uploadedImage = null;

// // Image upload functionality


// function clearImage() {
//     uploadedImage = null;
//     document.getElementById('uploadPrompt').classList.remove('hidden');
//     document.getElementById('imagePreview').classList.add('hidden');
//     document.getElementById('uploadBtn').textContent = 'Upload Image';
//     document.getElementById('analyzeBtn').disabled = true;
//     document.getElementById('imageInput').value = '';
    
//     // Clear results
//     document.getElementById('resultsContent').classList.add('hidden');
//     document.getElementById('resultsPlaceholder').classList.remove('hidden');
// }