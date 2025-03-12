function renderCardContent(media) {
    if (media.type === 'youtube') {
        const videoId = media.url.split('v=')[1].split('&')[0]; // Extraire l'ID de la vidéo
        return (
            <div>
                <div className="youtube-video" data-video-id={videoId}></div>
                <script>
                    {`
                        var tag = document.createElement('script');
                        tag.src = "https://www.youtube.com/iframe_api";
                        var firstScriptTag = document.getElementsByTagName('script')[0];
                        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                        var player;
                        function onYouTubeIframeAPIReady() {
                            player = new YT.Player('youtube-video', {
                                height: '390',
                                width: '640',
                                videoId: '${videoId}',
                            });
                        }
                    `}
                </script>
            </div>
        );
    }
    // ... code existant pour d'autres types de médias ...
} 