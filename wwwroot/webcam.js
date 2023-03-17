function startVideo(src) {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
            let video = document.getElementById(src);
            if ("srcObject" in video) {
                video.srcObject = stream;
            } else {
                video.src = window.URL.createObjectURL(stream);
            }
            video.onloadedmetadata = function (e) {
                video.play();
            };
            //mirror image
            video.style.webkitTransform = "scaleX(-1)";
            video.style.transform = "scaleX(-1)";
        });
    }
}

function getFrame(src, dest, dotNetHelper) {
    let video = document.getElementById(src);
    let canvas = document.getElementById(dest);
    canvas.getContext('2d').drawImage(video, 0, 0, 360, 240);

    let dataUrl = canvas.toDataURL("image/jpeg");
    dotNetHelper.invokeMethodAsync('ProcessImage', dataUrl);
}

function stopVideo(src) {
    let video = document.getElementById(src);
    if (video && "srcObject" in video) {
        const stream = video.srcObject;
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
        }
        video.srcObject = null;
    }
}

async function takeScreenshot(id) {
    var toHideContent = document.getElementsByClassName("not-printable");
    if (toHideContent.length > 0) {
        for (var i = 0; i < toHideContent.length; i++) {
            toHideContent[i].style.visibility = "hidden";
        }
    }
    var img = "";
    var element = document.querySelector("#" + id);
    element.getElementsByClassName("not-printable");
    await html2canvas(document.querySelector("#" + id)).then(canvas => img = canvas.toDataURL("image/png"));
    if (toHideContent.length > 0) {
        for (var i = 0; i < toHideContent.length; i++) {
            toHideContent[i].style.visibility = "unset";
        }
    }
    var d = document.createElement("a");
    d.href = img;
    d.download = "workshopfest-doit.png";
    d.click();
}