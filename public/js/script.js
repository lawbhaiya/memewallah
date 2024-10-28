document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/memes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(memeFiles => {
            const memeGrid = document.getElementById('memeGrid');
            memeFiles.forEach(file => {
                const memeDiv = document.createElement('div');
                memeDiv.className = 'meme';
                memeDiv.innerHTML = `
                    <img src="/memes/${file}" alt="${file}">
                    <a href="/memes/${file}" download class="download">Download</a>
                `;
                memeGrid.appendChild(memeDiv);
            });
        })
        .catch(error => console.error('Error fetching memes:', error));
});