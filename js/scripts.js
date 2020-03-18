// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        // videoId: 'M7lc1UVf-VE',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    // event.target.playVideo();
    // console.log(event.target);

    loadPlaylists();

}

function loadPlaylists() {
    // const pl = player.getPlaylist('PLkLimRXN6NKwQr-G7JJsXXZOxtRaKYbv9');
    // console.log(pl);


    const vid_cons = document.getElementsByClassName('playlist_videos');

    for (let i = 0; i < vid_cons.length; i++) {
        const vidcon = vid_cons[i];
        const playlistId = vidcon.dataset['playlist'];
        const loadFirstVideo = (i == 0);

        setTimeout(() => {
            getVideosFromPlaylist(playlistId, vidcon, loadFirstVideo);
        }, i * 650);


    }


}




function getVideosFromPlaylist(playlist, parent, loadFirstVideo) {


    const mykey = 'AIzaSyDmf42CLbRdOrMvAh1GlkfuYz9eeRkE2wo';

    const f = fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlist}&key=${mykey}`).then(response => {

        return response.json();

    }).then(data => {

        const items = data.items;

        let first_video_id = null;


        if (items) {
            items.forEach(item => {
                const videoId = item.snippet.resourceId.videoId;
                const title = item.snippet.title;

                if (first_video_id == null && loadFirstVideo) {
                    first_video_id = videoId;
                }


                var node = document.createElement("DIV");
                node.classList.add('small_video_container');

                var img = document.createElement("IMG");
                if (item.snippet.thumbnails.default) {
                    img.src = item.snippet.thumbnails.default.url;
                }


                node.appendChild(img);

                var h3 = document.createElement('H3');
                var h3text = document.createTextNode(title);
                h3.appendChild(h3text);
                node.appendChild(h3);


                node.addEventListener('click', function () {
                    // console.log('VIDEO PLAYING: ', videoId);
                    player.loadVideoById({
                        'videoId': videoId
                    });

                    scrollToPos(0);
                })


                parent.appendChild(node);



            });

            // load first video of first playlist automatically
            if (first_video_id) {

                player.loadVideoById({
                    'videoId': first_video_id
                });

            }
        }


    });


}

function scrollToPos(x) {
    document.body.scrollTop = x; // For Safari
    document.documentElement.scrollTop = x; // For Chrome, Firefox, IE and Opera
}



// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    // if (event.data == YT.PlayerState.PLAYING && !done) {
    //     setTimeout(stopVideo, 6000);
    //     done = true;
    // }
}
function stopVideo() {
    player.stopVideo();
}




// const playlists_container = document.getElementById('playlists_container');
const scroll_playlist_links = document.getElementsByClassName('scroll_playlist');
for (let i = 0; i < scroll_playlist_links.length; i++) {
    const scroll_playlist_link = scroll_playlist_links[i];
    scroll_playlist_link.addEventListener('click', function (e) {
        e.preventDefault();
        const link = document.querySelector(scroll_playlist_link.hash);
        // const x = link.offsetTop; // playlists_container.offsetTop + 
        // scrollToPos(x);

        link.scrollIntoView();
    })
}





const menubutton = document.getElementById('menu_button')
const aside = document.getElementById('aside')
menubutton.addEventListener('click', function () {
    const isVisible = aside.classList.contains('visible');
    if (isVisible) {
        aside.classList.remove('visible');
    } else {
        aside.classList.add('visible');
    }

});

document.onkeyup = function (event) {

    if (event.key === "Escape") {
        aside.classList.remove('visible');
    }
}


const comments_container = document.getElementById('comments_container')
const comment = document.getElementById('comment')
const author = document.getElementById('author')
const commentform = document.getElementById('commentform');
commentform.addEventListener('submit', function (e) {

    if (comment_info.author_id <= 0) {


        e.preventDefault();

        if (comment.value && comment.value != '') {
            let data = {
                content: comment.value,
                post: comment_info.id,

            }
            if (author) {
                data.author_name = author.value
            }


            const options = {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            }

            const f = fetch(comment_info.rest_url + `wp/v2/comments`, options).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                } else {
                    return response.json();
                }

            }).then(result => {


                var li = document.createElement("LI");
                li.classList.add('comment_container');

                var blockquote = document.createElement('BLOCKQUOTE');
                blockquote.innerHTML = result.content.rendered;
                li.appendChild(blockquote);

                var cite = document.createElement('CITE');
                var citetext = document.createTextNode(result.author_name);
                cite.appendChild(citetext);
                li.appendChild(cite);

                comments_container.prepend(li);

                comment.value = '';
                alert('Comment posted successfully!');



            }).catch(error => {
                alert('An error occured. Please try again');
                console.log('An error occured', error);
            })
        } // if have posted a comment
    } // if not logged in


});