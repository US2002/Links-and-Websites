const artistInput = document.querySelector('.input-artist');
const songInput = document.querySelector('.input-song');
const button = document.querySelector('.find-btn');
const songDescription = document.querySelector('.song-desc');
const lyricField = document.querySelector('.lyric-text');
const errorBox = document.querySelector('.error-box');

button.addEventListener('click', getLyrics);

function getLyrics() {
    const artistValue = artistInput.value;
    const songValue = songInput.value;

    if (artistValue.trim() == '' || songValue.trim() == '') {
        errorBox.style.display = 'block';
        setTimeout(() => {
            errorBox.style.display = 'none';
        }, 2500);

        return;
    }

    errorBox.style.display = 'none';
    const apiUrl = `https://api.lyrics.ovh/v1/${artistValue}/${songValue}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(lyricData => {
            const artistName = formatName(artistValue);
            const songName = formatName(songValue);
            const formattedLyrics = formatLyrics(lyricData.lyrics);

            songDescription.textContent = `${artistName} - ${songName}`;
            lyricField.innerHTML = formattedLyrics;
            artistInput.value = '';
            songInput.value = '';
        })
}

function formatLyrics(lyrics) {
    return lyrics.split('\n').join('<br />')
}

function formatName(name) {
    return name[0].toUpperCase() + name.slice(1);
}

