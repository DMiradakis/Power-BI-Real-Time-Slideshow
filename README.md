<img src="https://i.ibb.co/vx5CZrd/icon48.png"></img>
<img src="https://i.ibb.co/2Pfgx16/Play-Pause-Button.png"></img>
# Power BI Real-Time Slideshow

<a href="https://github.com/DMiradakis"><img src="https://img.shields.io/badge/released%20by-DMiradakis-yellow"></a>
<img src="https://img.shields.io/github/release-date-pre/DMiradakis/Power-BI-Real-Time-Slideshow?color=brightgreen">
<img src="https://img.shields.io/github/v/release/DMiradakis/Power-BI-Real-Time-Slideshow?color=blue&include_prereleases">
<img src="https://img.shields.io/github/issues-raw/DMiradakis/Power-BI-Real-Time-Slideshow?color=orange">
<img src="https://img.shields.io/badge/readme%20last%20updated-2020--02--18-blue">

## About The Extension
This is an open source Google Chrome extension for displaying Power BI Reports in a Slideshow fashion utilizing dynamic data from the data source(s).

A problem that Power BI users face is displaying Direct Query reports that are **not** updating the visuals on the report tabs: the data will update *in the background*, **but the associated visuals will not update**. Additionally, Power BI users need the visuals to *update programatically*, **without the need of user interaction or input**.

I am aware that Power BI *Dashboards* will automatically update visuals, but they only do so every 15 minutes *at a minimum*, and that doesn't help you at all if you are trying to do the same thing with Power BI *Reports*.

With this extension, **your visuals will now update WITH your data** in near Real-Time (according to what refresh time and slide time you choose), and you will not be constrained to the Power BI Service's minumum visual refresh parameters or by specifically needing to use a Dashboard.

**BUT WAIT!** There's more...

As of its latest release, **Import Mode Power BI Reports are *also* now supported**! The extension is smart enough to determine when a Report is an Import Mode or Direct Query Report and respectively refresh it according to each method. As you may or may not know, different refresh buttons in the Power BI Service's User Interface refresh different kinds of Reports. This extension knows how to access and use both refresh buttons.

Do you want to jump from a Direct Query Report to an Import Mode Report? No problem! The extension will know what to do!

This version features a fully functional <u>popup menu</u>. Many Power BI users on the Power BI community have also requested that a **Play/Pause button** be added to the extension to start and stop the extension on demand. That functionality has now been successfully implemented.

Additionally, users also have the ability to choose their own refresh time and slide time from respective drop down boxes. This is to prevent you and your slideshow users from overloading your Report's data sources every time you change to a different slide (tell your servers I said you are welcome).

Many thanks to user @PicolotoLF. This extension is a complete overhaul of his original extension.

## Installing The Extension
1. Click the ellipsis (3-dot icon) in Google Chrome, hover your cursor over "More Tools", and click "Extensions".
2. Toggle "Developer mode" to the on position if it is not already.
3. Download this repository on your machine. *Ensure that you are downloading from the **Master Branch** of the repository.*
4. Click "Load Unpacked" in Google Chrome, and navigate to the folder on your machine containing this repository.

## Operating the Extension
Upon loading the extension to Google Chrome, you will now see a small yellow Power BI icon in the Chrome toolbar. This extension has been restricted to only operate on URLs linked to Power BI Reports, so the popup will be disabled on all other web pages to prohibit unwanted operation.

<img src="img/Documentation - Icon.png"></img>

Navigate to a Power BI Report URL, and then click the extension's icon in the toolbar. You should see a popup menu appear with several elements:
* Refresh Time drop down menu and corresponding save button
* Slide Time drop down menu and corresponding save button
* Play and Stop buttons

<img src="img/Documentation - Popup.png"></img>

The popup will be initialized with default values for the Refresh Time and Slide Time, but if you would like to change those values, simply utilize the drop down menus and click the save buttons, respectively.

Once you are satisfied with the Refresh Time and Slide Time values, click the large, green Play button to initialize the extension. To stop or pause the extension, click the large, red Stop button.

> Make sure to stop the extension *before* you navigate to a different Power BI Report.
