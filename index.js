const searchSong = () => {
	const searchText = document.getElementById('search_field').value;
	const url = ` https://api.lyrics.ovh/suggest/${searchText}`;
	// load data

	fetch(url)
		.then((res) => res.json())
		.then((data) => displaySongs(data.data))
		.catch((error = displayError('something went wrong..please try again!')));
};

const displaySongs = (songs) => {
	const songContainer = document.getElementById('song_container');

	songContainer.innerHTML = ' ';
	songs.forEach((song) => {
		const songDiv = document.createElement('div');
		songDiv.className = 'single-result row align-items-center my-3 p-3';
		songDiv.innerHTML = `  <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Album by <span>${song.artist.name}</span></p>
                        <audio controls>
                            <source src="${song.preview}" type="audio/mpeg">
                        </audio>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="getLyric('${song.artist
							.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>`;
		songContainer.appendChild(songDiv);
	});
};
const getLyric = (artist, title) => {
	const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;

	fetch(url)
		.then((res) => res.json())
		.then((data) => displayLyric(data.lyrics))
		.catch((error = displayError('something went wrong..please try again!')));
};

const displayLyric = (lyric) => {
	const lyricDiv = document.getElementById('song_lyric');
	lyricDiv.innerText = lyric;
};
const displayError = (error) => {
	const errorTag = document.getElementById('error_message');
	errorTag.innerText = error;
};
