# Intro
This is some quick code I put together to get all your images and videos downloaded from Onlyfans. A few quick disclaimers:
1. I haven't done much testing for people using things other than chrome on a Windows PC. Try to create an issue on here if it doesn't work for you.
2. It may very well crash your browser - sorry!
3. If you have a lot of images and videos to download, the scraper will probably take a long time to finish.
4. This code does nothing except click through your browser and copy links to images.

# How to use it
1. Copy everything from [this page.](https://raw.githubusercontent.com/Mynamewasused/OFscraper/main/src/scraper.js)
2. Log into Onlyfans on Chrome.
3. Go to your vault.
4. Hit `F12` on your keyboard, or right click and select `Inspect`
5. There should be a window that opens on the right side of your screen - On the top of that window click the "Console" tab.
6. Paste what you copied and hit `Enter` on your keyboard.
7. The process should start scrolling through your vault and eventually going through all your content. It will probably take quite a while.
8. When it's done, it will download a file called "links.txt" which contains a list of links to all your content for you.

# What to do with the links
1. I recommend using [TabSave](https://chrome.google.com/webstore/detail/tab-save/lkngoeaeclaebmpkgapchgjdbaekacki?hl=en) - a chrome extension to mass download from links
    * Note: I have not dug into this extension very deeply, and do not know the author. Please use this with caution and at your own risk. This was just the easiest seemingly trustworthy source I found for mass downloading links.
2. After adding Tab Save to chrome, click on the extension (it should either appear next to your address bar in chrome, or under the menu that looks like a jigsaw puzzle icon).
3. Hit the pencil icon on the bottom left corner of the popup.
4. Paste the links from the links.txt file and hit the download button.
5. If you have a lot of content, I recommend splitting the links into chunks small enough from chrome and your internet to handle.

# Video walkthrough
https://user-images.githubusercontent.com/40132689/130573817-819ef916-2617-421c-9bc5-2a2c7607abd5.mp4
