const uploadForm = document.getElementById('uploadForm');
const resumeFile = document.getElementById('resumeFile');
const uploadMessage = document.getElementById('uploadMessage');

const matchBtn = document.getElementById('matchBtn');
const jobIdInput = document.getElementById('jobId');
const resultsDiv = document.getElementById('results');

// Upload Resume
uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const file = resumeFile.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
        const res = await fetch('http://localhost:8080/resume/upload', {
            method: 'POST',
            body: formData
        });

        if (res.ok) {
            uploadMessage.textContent = 'Resume uploaded successfully!';
            uploadMessage.style.color = 'green';
        } else {
            uploadMessage.textContent = 'Upload failed!';
            uploadMessage.style.color = 'red';
        }
    } catch (err) {
        uploadMessage.textContent = 'Error uploading resume';
        uploadMessage.style.color = 'red';
        console.error(err);
    }
});

// Get Matching Results
matchBtn.addEventListener('click', async () => {
    const jobId = jobIdInput.value.trim();
    if (!jobId) return;

    resultsDiv.innerHTML = '<p>Loading...</p>';

    try {
        const res = await fetch(`http://localhost:8080/resume/match?jobId=${jobId}`);
        const data = await res.json();

        if (!data || data.length === 0) {
            resultsDiv.innerHTML = '<p>No matches found.</p>';
            return;
        }

        resultsDiv.innerHTML = '';
        data.forEach(match => {
            const card = document.createElement('div');
            card.classList.add('match-card');
            card.innerHTML = `
                <h3>${match.name}</h3>
                <p><strong>Score:</strong> ${match.score}</p>
                <p><strong>Email:</strong> ${match.email}</p>
            `;
            resultsDiv.appendChild(card);
        });
    } catch (err) {
        resultsDiv.innerHTML = '<p>Error fetching matches.</p>';
        console.error(err);
    }
});
