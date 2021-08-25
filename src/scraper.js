var linkarray = [];
var lastSources = [];
var currentItem = 0;
var complete = false;
var onItem = 0;
//attach listener for resize on wrapper
new ResizeObserver(resizeDetected).observe(document.querySelector('.main-wrapper'))  

function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}
function openFirstImage(){
    //open first image
    document.querySelector('#content > div.g-sides-gaps > div.b-feed-content > div > div:nth-child(1) > img').click()
    //start saving after a short delay
    setTimeout(saveimage, 1000)
}

function saveimage(){
    var sources = [];
    //build select statement
    const selectorStatment = '[role=dialog]';
    //3 images shown at a time technically
    var content = document.querySelector(selectorStatment).querySelectorAll('img', 'source')
    var sources = [];
    for(var c of content){
        sources.push('\n' + c.src)
        if(!linkarray.includes('\n' + c.src)) {
            linkarray.push('\n' + c.src);
            currentItem++;
        }          
    }

    if(currentItem > 6 && sources.includes(linkarray[0])) {
        //start counting to end recursion
        onItem++;
        console.log('looped!')
        if(onItem == 3){
            //we've reached the beginning again (or probably past it), download text file with links
            download(linkarray, "links.txt", {type:'text/plain',endings:'native'})
            complete = true;
        } else {           
            document.querySelector(selectorStatment).querySelector('.pswp__button--arrow--right').click();
            if(!complete) {
               setTimeout(saveimage, 50) 
            }
        }
    } else {
        document.querySelector(selectorStatment).querySelector('.pswp__button--arrow--right').click();
        if(!complete) {
           setTimeout(saveimage, 50) 
        }
    }
}
function resizeDetected() {
    //keepo trying to scroll
    window.scrollTo(0,document.body.scrollHeight);
    if(document.querySelector('#content > div.g-sides-gaps > div.infinite-loading-container') == null) {
        //scrolling is finished, open first image
        openFirstImage()
    }
}

//begin scrolling
window.scrollTo(0,document.body.scrollHeight);
