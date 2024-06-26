function getVideoImage(video, secs, callback) {
    var me = this;
    video.onloadedmetadata = function() {
        if ('function' === typeof secs) {
            secs = secs(this.duration);
        }
        this.currentTime = Math.min(Math.max(0, (secs < 0 ? this.duration : 0) + secs), this.duration);
    };
    video.onseeked = function(e) {
        var canvas = document.createElement('canvas');
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        var img = new Image();
        img.src = canvas.toDataURL();
        callback.call(me, img, this.currentTime, e);
    };
    video.onerror = function(e) {
        callback.call(me, undefined, undefined, e);
    };
}

function showImageAt(secs) {
    var video = document.getElementById('video');
    var duration;
    getVideoImage(
        video,
        function(totalTime) {
            duration = totalTime;
            return secs;
        },
        function(img, secs, event) {
            if (event.type == 'seeked') {
                var li = document.createElement('li');
                li.innerHTML += '<b>Frame at second ' + secs + ':</b><br />';
                li.appendChild(img);
                document.getElementById('olFrames').appendChild(li);
                if (duration >= ++secs) {
                    showImageAt(secs);
                }
            }
        }
    );
}

// Call the function to start showing images from the video
showImageAt(0);
