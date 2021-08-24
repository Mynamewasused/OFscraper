var linkarray = [];
var lastSources = [];
var currentItem = 0;
var addedItem = false;
var onItem = 0;
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
    var selects = [];
    var sources = [];
    //build select statement
    const selectorStatmentStart = '#content > div.pswp.pswp--open.m-undefined.pswp--notouch.pswp--css_animation.pswp--svg.pswp--visible.pswp--animated-in.pswp > div.pswp__scroll-wrap > div.pswp__container > div:nth-child(';
    const selectorStatementEnd = ') > div';
    //3 images shown at a time technically
    for(var i = 1; i < 4; i++){
        try{
            //first image is index 2, weird mod statement here to try this in the right order (dumb workaround)
            var d = document.querySelector(selectorStatmentStart + (i % 3 + 1) + selectorStatementEnd)
            //look for images
            if(d.querySelector('img') != null) {
                selects[i - 1] = d.querySelector('img') 
                sources.push('\n' + selects[i - 1].src)
            //or videos
            } else if(d.querySelector('source') != null) {
                selects[i - 1] = d.querySelector('source') 
                sources.push('\n' + selects[i - 1].src)
            }
        } catch {
            console.log('error')
        }
        
    }
    //at least one image found
    if(sources.length > 0) {
        for(var s of sources){
            if(!linkarray.includes(s)) {
                linkarray.push(s);
                currentItem++;
            }            
        }
        //being past index 6 on our list and seeing a repeat image indicates we're about to loop
        if(currentItem > 6 && sources.includes(linkarray[0])) {
            //start counting to end recursion
            onItem++;
            console.log('looped!')
            if(onItem == 3){
                //we've reached the beginning again (or probably past it), download text file with links
                download(linkarray, "links.txt", {type:'text/plain',endings:'native'})
            } else {           
                //images have changed, go ahead and click next again
                if(sources != lastSources){
                    document.querySelector('#content > div.pswp.pswp--open.m-undefined.pswp--notouch.pswp--css_animation.pswp--svg.pswp--visible.pswp--animated-in.pswp > div.pswp__scroll-wrap > div.pswp__ui > button.pswp__button.pswp__button--arrow--right').click();
                    setTimeout(saveimage, 50) 
                } else {
                    //images didn't change, click slower? not clicking for now, need to test slow load speeds
                    console.log('SAME!')
                    setTimeout(saveimage, 500) 
                }
            }
        } else {
            //images have changed, go ahead and click next again
            if(sources != lastSources){
                document.querySelector('#content > div.pswp.pswp--open.m-undefined.pswp--notouch.pswp--css_animation.pswp--svg.pswp--visible.pswp--animated-in.pswp > div.pswp__scroll-wrap > div.pswp__ui > button.pswp__button.pswp__button--arrow--right').click();
                setTimeout(saveimage, 50) 
            } else {
                //images didn't change, click slower? not clicking for now, need to test slow load speeds
                console.log('SAME!')
                setTimeout(saveimage, 500) 
            }
    
        }

        
    } else {
        //failed to lada all images, move to next
        document.querySelector('#content > div.pswp.pswp--open.m-undefined.pswp--notouch.pswp--css_animation.pswp--svg.pswp--visible.pswp--animated-in.pswp > div.pswp__scroll-wrap > div.pswp__ui > button.pswp__button.pswp__button--arrow--right').click();
        currentItem++;
        console.log('On item: ' + currentItem)
        setTimeout(saveimage, 50)
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
//attach listener for resize on wrapper
new ResizeObserver(resizeDetected).observe(document.querySelector('.main-wrapper'))  
//begin scrolling
window.scrollTo(0,document.body.scrollHeight);

