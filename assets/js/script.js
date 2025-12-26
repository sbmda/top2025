function populate() {
    const container = document.getElementById('maincontainer');

    container.innerHTML = "";

    d3.csv("assets/data/albums.csv").then(function(data) {

        data.forEach(function(d) {
            // console.log(d.album, d.artist);

            let card = document.createElement('div');
            card.classList.add('game-card');
            card.setAttribute('data-album', d.album);
            card.setAttribute('data-artist', d.artist);
            card.setAttribute('id', d.id);
            if (d.id == 1) {
                card.classList.add('has-crown');
            }
            let img = document.createElement('img');
            img.src = d.img;
            img.alt = d.album + ", " + d.artist;
            let title = document.createElement('h3');
            title.textContent = d.album;
            let artist = document.createElement('p');
            artist.textContent = d.artist;
            
            card.append(img, title, artist);

            let review = document.createElement('div');
            review.classList.add('dialog-container');
            review.setAttribute('data-albumid', d.id);
            let overlay = document.createElement('div');
            overlay.classList.add('dialog-overlay');
            let content = document.createElement('div');
            content.classList.add('dialog-box');
            let header = document.createElement('div');
            header.classList.add('dialog-header')
            let reviewTitle = document.createElement('h3');
            reviewTitle.classList.add('dialog-title');
            reviewTitle.textContent = d.album;
            header.appendChild(reviewTitle);
            let image = document.createElement('img');
            image.src = d.img;
            image.alt = d.album + ", " + d.artist;
            let reviewContent = document.createElement('div');
            reviewContent.classList.add('dialog-content');
            reviewContent.innerHTML = d.content;
            let action = document.createElement('div');
            action.classList.add('dialog-actions');
            let backbutton = document.createElement('button');
            backbutton.classList.add('dialog-button', 'confirm');
            backbutton.textContent = "go back"
            action.appendChild(backbutton);
            
            content.append(header, reviewContent, action);
            review.append(overlay, content);

            container.append(card, review);

        });

    });    
}

function popsongs() {

    const container = document.getElementById('songlist');

    container.innerHTML = "";

    let colorcounter = 0;

    d3.csv("assets/data/songs.csv").then(function(data) {

        data.forEach(function(d) {
            // console.log(d.album, d.artist);
            let card = document.createElement('div');
            card.classList.add('accordion', 'song-item');
            card.setAttribute('data-song', d.album);
            card.setAttribute('data-artist', d.artist);
            card.setAttribute('id', d.id);
            if (colorcounter % 2 === 1) {
                card.classList.add('odd');
            }
            let img = document.createElement('img');
            img.src = d.img;
            img.alt = d.album + ", " + d.artist;
            let title = document.createElement('span');
            title.classList.add('songtitle');
            title.textContent = d.album;
            let artist = document.createElement('span');
            artist.classList.add('songartist');
            artist.textContent = d.artist;
            let duration = document.createElement('span');
            duration.classList.add('duration');
            duration.textContent = d.duration;
            
            card.append(img, title, artist, duration);

            let review = document.createElement('div');
            review.classList.add('panel');
            review.setAttribute('data-albumid', d.id);
            let content = document.createElement('p');
            content.innerHTML = d.content;
            
            review.append(content);

            container.append(card, review);

            colorcounter++;

        });

        // console.log("datacomplete")
        accordion();
    });

    // container.style.display = "none";

};

function accordion() {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            // console.log("hi")
            this.classList.toggle("active");
            // console.log("hi again!!")
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            }
            // console.log("final hi!!")
        });
    }
}

//  On load et c'est partiiii

document.addEventListener('DOMContentLoaded', function() {

    // songs();
    populate(); 
    

    document.addEventListener('click', e => {
        if (e.target.classList.contains('game-card')) {
            // console.log('hi album');
            // console.log(e.target.id);
            const dialog = document.querySelector(`.dialog-container[data-albumid="${e.target.id}"]`);

            if (dialog) {
                dialog.style.display = 'flex';
                const closeBtn = dialog.querySelector('.confirm');
                if (closeBtn) {
                    closeBtn.addEventListener('click', () => {
                        dialog.style.display = 'none';
                    }, { once: true }); 
                }
            } else {
                console.warn('hellooo not working for this id: ', e.target.id);
            }
        }
    });

    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            // console.log("hi")
            this.classList.toggle("active");
            // console.log("hi again!!")
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            }
            // console.log("final hi!!")
        });
    }
    

    const toggle = document.getElementById("toggle");
    const albums = document.getElementById("maincontainer");
    const songs = document.getElementById("songscontainer");

    albums.style.display = "grid";
    songs.style.display = "none";

    toggle.addEventListener("change", () => {
        // console.log("hi we are in the toggle switch function")
        if (toggle.checked) {
            // show songs, hide albums
            albums.style.display = "none";
            songs.style.display = "grid";
            var acc = document.getElementsByClassName("accordion");
            var i;

            for (i = 0; i < acc.length; i++) {
                acc[i].addEventListener("click", function() {
                    // console.log("hi")
                    this.classList.toggle("active");
                    // console.log("hi again!!")
                    var panel = this.nextElementSibling;
                    if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                    } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                    }
                    // console.log("final hi!!")
                });
            }
            popsongs();
        } else {
            // show albums, hide songs
            songs.style.display = "none";
            albums.style.display = "grid";
        }
    });


});
