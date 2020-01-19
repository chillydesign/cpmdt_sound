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

    console.log(event.target);

    loadPlaylists();



}

function loadPlaylists() {
    // const pl = player.getPlaylist('PLkLimRXN6NKwQr-G7JJsXXZOxtRaKYbv9');
    // console.log(pl);


    const vid_cons = document.getElementsByClassName('playlist_videos');

    for (let i = 0; i < vid_cons.length; i++) {
        const vidcon = vid_cons[i];
        const playlistId = vidcon.dataset['playlist'];


        setTimeout(() => {
            getVideosFromPlaylist(playlistId, vidcon);
        }, i * 500);




    }


}




function getVideosFromPlaylist(playlist, parent) {


    const mykey = 'AIzaSyDWxcz2piVP_7PzLglaRVgUjolmzJj_iI8';

    const f = fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlist}&key=${mykey}`).then(response => {

        return response.json();

    }).then(data => {
        console.log(data);

        const items = data.items;


        items.forEach(item => {
            const videoId = item.snippet.resourceId.videoId;
            const title = item.snippet.title;


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
                console.log('VIDEO PLAYING: ', videoId);
                player.loadVideoById({
                    'videoId': videoId,
                    'startSeconds': 5,
                    'endSeconds': 60
                });

                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            })


            parent.appendChild(node);



        })
    });


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