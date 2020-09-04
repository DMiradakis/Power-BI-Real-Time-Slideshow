<img src="https://i.ibb.co/vx5CZrd/icon48.png"></img>
<img src="https://i.ibb.co/2Pfgx16/Play-Pause-Button.png"></img>
# Power BI Real-Time Slideshow

<a href="https://github.com/DMiradakis"><img src="https://img.shields.io/badge/released%20by-DMiradakis-yellow"></a>
<img src="https://img.shields.io/github/release-date-pre/DMiradakis/Power-BI-Real-Time-Slideshow?color=brightgreen">
<img src="https://img.shields.io/github/v/release/DMiradakis/Power-BI-Real-Time-Slideshow?color=blue&include_prereleases">
<img src="https://img.shields.io/github/issues-raw/DMiradakis/Power-BI-Real-Time-Slideshow?color=orange">
<img src="https://img.shields.io/badge/readme%20last%20updated-2020--09--04-blue">

## TL;DR :tada:
This is an open source Google Chrome extension for displaying a Power BI **report** as a refreshing slideshow in the **Power BI Service** (old user-inteface mode only).

## The Problems :x:

### Direct Query :angry:
A problem that Power BI users face is displaying Direct Query reports that are **not** updating the visuals on the report tabs: the data will update *in the background*, **but the associated visuals will not update**. Additionally, Power BI users need the visuals to *update programatically*, **without the need of user interaction or input**.

### Import Mode :angry:
Many Power BI users only have Power BI Pro, not Power BI premium. As such, they are limited to only 8 dataset refreshes/day. Sometimes, advanced datasource queries *have* to be done in Import Mode, which automatically induces the refresh limit. This makes it entirely impossible to display these kind of queries as any sort of consistently up-to-date slideshow.

### Tab Rotation :facepalm:
On top of all of that, there is no built in feature to force the Power BI Service to automatically cycle through a Power BI Report's tabs.

## The Solution :heavy_check_mark:
> :speaker: Power BI Real-Time Slideshow Has Entered The Chat.

With this extension, you can now transform any Power BI Report that is published to the Power BI Service as a refreshing, auto-rotating slideshow.

### Compatible with both storage modes :question:
Yes! :facepunch:

**Direct Query AND Import Mode** Power BI Reports are included in this functionality! The extension is smart enough to determine when a report is an Import Mode or Direct Query report and respectively refresh it according to each method. 

As you may or may not know, different refresh buttons in the Power BI Service's user interface are required for each type of storage mode. This extension knows where to go to refresh either kind of storage type report.

And no, that wasn't easy to implement in case you were wondering.

### What if I change to a different report :question:
Do you want to jump from a Direct Query report to an Import Mode report? No problem! The extension will know what to do!

Additionally, if you have the same report loaded into multiple Power BI workspaces, it will be able to detect when you have changed from one workspace to another.

### What about those Play/Stop buttons everyone in the helpdesk ticket kept asking about :question:
The extension ships with a fully-functioning popup menu.

- [x] Play button
- [x] Stop button
- [x] Refresh time dropdown (tell your datasources I said they are welcome)
- [x] Slide time dropdown

## Installing The Extension :cd:
1. Click the ellipsis (3-dot icon) in Google Chrome, hover your cursor over "More Tools", and click "Extensions".
2. Toggle "Developer mode" to the on position if it is not already.
3. Download this repository on your machine. *Ensure that you are downloading from the **Master Branch** of the repository.*
4. Click "Load Unpacked" in Google Chrome, and navigate to the folder on your machine containing this repository.

## Operating the Extension :computer:
Upon loading the extension to Google Chrome, you will now see a small yellow Power BI icon in the Chrome toolbar. This extension has been restricted to only operate on URLs linked to Power BI Reports, so the popup will be disabled on all other web pages to prohibit unwanted operation.

<img src="img/Documentation - Icon.png"></img>

Navigate to a Power BI Report URL, and then click the extension's icon in the toolbar. The popup menu should then appear.

<img src="img/Documentation - Popup.png"></img>

The popup will be initialized with default values for the refresh time and slide time, but if you would like to change those values, simply utilize the drop down menus and **click the save buttons**, respectively.

## Please Remember :pray:
- When you change either the refresh time or slide time, you must click the respective save button for each one.
- Make sure to stop the extension before you navigate to a different Power BI report.
- This only works for Power BI reports (Power BI dashboards have their own refresh abilities already built into the Power BI Service).
- This only works in the old user-interface mode of the Power BI Service.
- Any questions, comments, or concerns? [Open up an issue](https://github.com/DMiradakis/Power-BI-Real-Time-Slideshow/issues).

## Construction Tools :hammer:
- HTML
- CSS
- Javascript
- [Chrome API](https://developer.chrome.com/extensions/api_index)
- [Primer.css](https://github.com/primer/css)
- [JQuery](https://jquery.com/)
- [Mutation Summary](https://github.com/rafaelw/mutation-summary)
- [JQuery Mutation Summary](https://github.com/joelpurra/jquery-mutation-summary)
