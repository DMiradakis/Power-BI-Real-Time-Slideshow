var connectivityMode;
var slideTime;
var refreshTime;
var elapsedTime = 0;
var execute = 1;
var chromeWorkspaceName;
var chromeReportName;


function GetReportMetaDataNames() {

    // Determine the report's workspace name.
    let workspaceName = $("button.workspaceName").attr("aria-label");

    // Determine the report name.
    let reportName = $("head > title").text();
    reportName = reportName.replace(' - Power BI', '');

    // Return the names.
    return { workspaceName: workspaceName, reportName: reportName }
}


function ImportRefresh() {

    // Retrieve the report and workspace names. Set the results to variables that will be used in the below IF - ELSE IF statements.
    let names = GetReportMetaDataNames();
    let reportName = names.reportName;

    // Invoke listener for added list item under Datasets on the quick access navigation pane.
    $("div.quickAccessPanePlaceHolder").mutationSummary("connect", QuickAccessPaneLoaded, [{ element: "li.item.ng-star-inserted" }]);

    // Expand the navigation pane for the current Workspace.
    $("button.expanderButton", "div.paneExpanderHeader").click();

    function QuickAccessPaneLoaded(mSummary) {

        // Disconnect listener.
        $("div.quickAccessPanePlaceHolder").mutationSummary("disconnect", QuickAccessPaneLoaded, [{ element: "li.item.ng-star-inserted" }]);

        if (mSummary[0]["added"]) {

            // Invoke listener for popup menu.
            $(document).mutationSummary("connect", DatasetEllipsisClicked, [{ element: "button.mat-menu-item" }]);

            // Search the DOM to find the dataset ellipsis button under the Datasets group on the Quick Access Navigation Pane.
            let $quickAccessExpansionPane = $("button.headerButton > span[title='Datasets']").parent().parent();
            let $datasetTextLabel = $quickAccessExpansionPane.find("div.textLabel[title='" + reportName + "']");
            let $datasetQuickAccessButton = $datasetTextLabel.parents("quick-access-button").last();

            // Find the ellipsis button.
            let $datasetEllipsisButton = $datasetQuickAccessButton.find("button.mat-menu-trigger.openMenu")

            // Click the ellipsis button to load the popup menu.
            $datasetEllipsisButton.click();

        }
    }

    function DatasetEllipsisClicked(mSummary) {

        // Disconnect listener.
        $(document).mutationSummary("disconnect", DatasetEllipsisClicked, [{ element: "button.mat-menu-item" }]);

        if (mSummary[0]["added"]) {

            // Navigate the DOM to find the buttons on the popup menu.
            let $matMenuButtons = $("div.mat-menu-content").find("button");

            // Find the dataset's Refresh Button.
            let $refreshButton = $matMenuButtons.find("span:contains('Refresh now')").parent();
            // Click the Refresh Button.
            $refreshButton.click();
        }
    }
}


function UpdateChromeVariables(reportName, workspaceName) {

    chromeReportName = reportName;
    chromeWorkspaceName = workspaceName;

    console.log(`Chrome Workspace Name: ${chromeWorkspaceName}.`);
    console.log(`Chrome Report Name: ${chromeReportName}.`);

    // Write the Workspace's name and Report's name to Chrome Storage.
    console.log("Saving Workspace Name and Report Name to Chrome.Storage.");
    chrome.storage.local.set(
        { workspaceName: chromeWorkspaceName, reportName: chromeReportName },
        function () {
            // Now determine the Connectivity Mode of the current Report.
            console.log("Initializing process to determine Connectivity Mode.");
            DetermineConnectivityMode(reportName);
        }
    );
}


function DetermineConnectivityMode(reportName) {

    // Invoke listener for added list item under Datasets on the quick access navigation pane.
    $("div.quickAccessPanePlaceHolder").mutationSummary("connect", QuickAccessPaneLoaded, [{ element: "li.item.ng-star-inserted" }]);

    // Find the main expansion button for the Quick Access Navigation Pane.
    let $paneExpanderButton = $("button.paneExpanderButton.expanderBtn");

    // Check the button to see if the pane is expanded.
    if ($paneExpanderButton.attr("aria-expanded") == "false") {
        console.log("Clicking the pane Expander Button to unhide the Quick Access Navigation Pane.");
        $paneExpanderButton.click(function () { console.log("Click finished"); });
    }

    // Find the expansion button for the workspace's contents on the Quick Access Navigation Pane.
    let $workspaceExpanderButton = $("div.paneExpanderHeader > button.expanderButton.switcher")

    // Check the button to see if the workspace contents are expanded.
    if ($workspaceExpanderButton.attr("aria-expanded") == "false") {
        console.log("Clicking the workspace Expander Button to unhide the workspace contents on the Quick Acess Navigation Pane.")
        $workspaceExpanderButton.click();
    }

    function QuickAccessPaneLoaded(mSummary) {

        // Disconnect listener.
        $("div.quickAccessPanePlaceHolder").mutationSummary("disconnect", QuickAccessPaneLoaded, [{ element: "li.item.ng-star-inserted" }]);

        console.log("Quick access navigation pane successfully expanded.");
        console.log("Navigating to Dataset Ellipsis button.");

        if (mSummary[0]["added"]) {

            // Invoke listener for popup menu.
            $(document).mutationSummary("connect", DatasetEllipsisClicked, [{ element: "button.mat-menu-item" }]);

            // Filter navigation pane's DOM to Dataset list.
            let $quickAccessExpansionPane = $("button.headerButton > span[title='Datasets']").parent().parent();
            let $datasetTextLabel = $quickAccessExpansionPane.find("div.textLabel[title='" + reportName + "']");
            let $datasetQuickAccessButton = $datasetTextLabel.parents("quick-access-button").last();

            // Find the ellipsis button.
            let $datasetEllipsisButton = $datasetQuickAccessButton.find("button.mat-menu-trigger.openMenu")

            if ($datasetEllipsisButton.length) {
                console.log("Dataset Ellipsis button found.");
                // Click the ellipsis button to load the popup menu.
                $datasetEllipsisButton.click();
            }
        }
    }

    function DatasetEllipsisClicked(mSummary) {

        // Disconnect listener.
        $(document).mutationSummary("disconnect", DatasetEllipsisClicked, [{ element: "button.mat-menu-item" }]);

        console.log("Dataset Ellipsis button clicked.");
        console.log("Navigating to Settings button.");

        if (mSummary[0]["added"]) {

            // Invoke listener to identify when a navigation has taken place.
            $(document).mutationSummary("connect", SearchUI, [{ element: "span.refreshSectionTitle" }]);

            // Find the dataset's Settings Button.
            var $settingsButton = $(document).find("span:contains('Settings')").parent();

            if ($settingsButton.length) {
                console.log("Settings button found.");
                // Click the Settings Button.
                $settingsButton.click();
            }
        }
    }

    function SearchUI(mSummary) {

        // Disconnect listener.
        $(document).mutationSummary("disconnect", SearchUI, [{ element: "span.refreshSectionTitle" }]);

        console.log("Settings button clicked.");
        console.log("Navigation to Dataset Settings page successful.");
        console.log("Searching UI to determine Connectivity Mode.");

        if (mSummary) {

            // Create variables and search DOM for determining Connectivity Mode.
            $importCheck = $("span.refreshSectionTitle:contains('Scheduled refresh')");
            $directQueryCheck = $("span.refreshSectionTitle:contains('Scheduled cache refresh')");

            // Check which variable returns a value.
            if ($importCheck.length) {
                console.log("Connectivity Mode Determined: Import. Navigating back to the report.");
                chrome.storage.local.set(
                    // Store Connectivity Mode in Chrome Storage.
                    { connectivityMode: "Import" },
                    function () {
                        // Invoke the Report's popup menu under the Reports Header to navigate back to the Power BI Report.
                        ReportEllipsisClick();
                    }
                );
            }
            else if ($directQueryCheck.length) {
                console.log("Connectivity Mode Determined: Direct Query. Navigating back to the report.");
                chrome.storage.local.set(
                    // Store Connectivity Mode in Chrome Storage.
                    { connectivityMode: "Direct Query" },
                    function () {
                        // Invoke the Report's popup menu under the Reports Header to navigate back to the Power BI Report.
                        ReportEllipsisClick();
                    }
                );
            }
        }
    }

    function ReportEllipsisClick() {

        // Invoke listener for popup menu buttons.
        $(document).mutationSummary("connect", ReportEllipsisClicked, [{ element: "button.mat-menu-item" }]);

        // Find the report name button on the Quick Access Navigation Pane. Due to a glitch, click the corresponding ellipsis button of that element.
        var $quickAccessExpansionPane = $("button.headerButton > span[title='Reports']").parent().parent();
        var $datasetTextLabel = $quickAccessExpansionPane.find("div.textLabel[title='" + reportName + "']");
        var $datasetQuickAccessButton = $datasetTextLabel.parents("quick-access-button").last();
        $datasetQuickAccessButton.find("button.mat-menu-trigger.openMenu").click();
    }

    function ReportEllipsisClicked(mSummary) {

        // Disconnect listener.
        $(document).mutationSummary("disconnect", ReportEllipsisClicked, [{ element: "button.mat-menu-item" }]);

        if (mSummary[0]["added"].length > 0) {

            // Invoke listener to identify when a navigation has taken place.
            $(document).mutationSummary("connect", ReloadReportPage, [{ element: "button.edit" }]);

            // Navigate the DOM to find the Open button on the popup menu.
            var $openButton = $("div.mat-menu-content").find("button.mat-menu-item:contains('Open')");

            // Click the Open Button to navigate back to the Power BI Report.
            $openButton.click();

        }
    }

    function ReloadReportPage(mSummary) {

        // Disconnect listener.
        $(document).mutationSummary("disconnect", ReloadReportPage, [{ element: "button.edit" }]);

        // Reload the Power BI Report page upon navigation.
        console.log("Reloading Report Page to initialize Slideshow.")
        location.reload();

    }
}

function CheckSlideTime() {
    chrome.storage.local.get({ slide_time: 25 }, result => {
        if (slideTime != result.slide_time) {
            slideTime = result.slide_time;
            console.log(`Slide time changed to ${slideTime} seconds.`);
        }
    });
}

function CheckRefreshTime() {
    chrome.storage.local.get({ refresh_time: 180 }, result => {
        if (refreshTime != result.refresh_time) {
            refreshTime = result.refresh_time;
            console.log(`Refresh time changed to ${refreshTime} seconds.`);
        }
    });
}


window.onload = function () {

    // Retrieve values from chrome.storage and update global variables. Include default values for the chrome.storage pairs.
    chrome.storage.local.get(
        { execute_trigger: 0, slide_time: 25, refresh_time: 180, workspaceName: "unknown", reportName: "unknown", connectivityMode: "undetermined" },
        function (items) {

            // Retrieve the report and workspace names. Set the results to variables that will be used in the below IF - ELSE IF statements.
            let names = GetReportMetaDataNames();
            let reportName = names.reportName;
            let workspaceName = names.workspaceName;

            // Write Chrome variables to global variables.
            console.log("Retrieving variables from Chrome.Storage.");
            slideTime = items.slide_time;
            refreshTime = items.refresh_time;
            chromeWorkspaceName = items.workspaceName;
            chromeReportName = items.reportName;
            connectivityMode = items.connectivityMode;
            execute = items.execute_trigger;

            // Check if this is a new Report W.R.T. the extension and Chrome variables.
            if (execute === 1 && (connectivityMode === "undetermined" || chromeReportName != reportName || chromeWorkspaceName != workspaceName)) {

                chrome.storage.local.set(
                    { workspaceName: "unknown", reportName: "unknown", connectivityMode: "undetermined" },
                    function () {
                        console.log("Determining Workspace and Report Name.");
                        UpdateChromeVariables(reportName, workspaceName);
                    }
                )
            }
            // If not, initialize the Slideshow.
            else if (execute === 1 && chromeWorkspaceName === workspaceName && chromeReportName === reportName && (connectivityMode === "Import" || connectivityMode === "Direct Query")) {
                console.log(`Workspace Name: ${chromeWorkspaceName}.`);
                console.log(`Report Name: ${chromeReportName}.`);
                console.log(`Connectivity Mode: ${ connectivityMode }.`);
                console.log("Initializing Slideshow.");
                firstFullScreen();
            }
        }
    );

}

function firstFullScreen() {

    // It is necessary to separate the first Full Screen click from the other recursive clicks.
    $(document).find("button.enterFullScreenBtn").click();

    // Invoke listener for popup dialogue box about incomplete refresh.
    $(document).mutationSummary("connect", PopupForceClose, [{ element: "span.message" }]);

    if (connectivityMode === "Import") {
        ImportSlideShowLoop();
    }
    else if (connectivityMode === "Direct Query") {
        DirectQuerySlideShowLoop();
    }

}

function ImportSlideShowLoop() {

    // The setInterval function creates an infinite loop which is desired.
    setTimeout(
        function () {
            
            $(document).find("button.fullScreenNext").click()
            $(document).find("button.exitFullScreenBtn").click()

            // This conditional statement prevents the data source(s) from being overloaded by constant querying. Ensure that the refresh time is a positive number (enabled).
            if (refreshTime > 0 && elapsedTime > refreshTime) {
                console.log("Refreshing dataset.");
                ImportRefresh();

                // Reset the elapsed time if the Refresh Button is clicked.
                elapsedTime = 0;
            }

            // The refresh button on the top banner must be clicked upon EVERY cycle for Import reports because all it does is refresh the Report's visuals.
            // This is necessary because when Import Reports refresh, their associated visuals do not necessarily refresh with them in a timely manner.
            // Overloading the data source(s) is not a concern here because this refresh button does not make a request back to the data source(s).
            $(document).find("button.refresh").click();
            $(document).find("button.enterFullScreenBtn").click();

            // Accumulate the elapsed time from the previous refresh.
            elapsedTime += parseInt(slideTime, 10);

            // Check chrome storage for a user change in the slide time.
            CheckSlideTime();

            // Check chrome storage for a user change in the refresh time.
            CheckRefreshTime();

            ImportSlideShowLoop();

        },

        slideTime * 1000
    )

}

function DirectQuerySlideShowLoop() {

    // The setInterval function creates an infinite loop which is desired.
    setTimeout(
        function () {

            $(document).find("button.fullScreenNext").click()
            $(document).find("button.exitFullScreenBtn").click()

            // This conditional statement prevents the data source(s) from being overloaded by constant querying. Ensure that the refresh time is a positive number (enabled).
            if (refreshTime > 0 && elapsedTime > refreshTime) {
                console.log("Refreshing dataset.");
                // Unlike for Import Reports, the refresh button on the top banner BOTH makes a request to the data source(s) AND updates associated visuals.
                $(document).find("button.refresh").click(function () {
                    console.log("Refresh button clicked.");
                });
                

                // Reset the elapsed time if the Refresh Button is clicked.
                elapsedTime = 0;
            }

            $(document).find("button.enterFullScreenBtn").click();

            // Accumulate the elapsed time from the previous refresh.
            elapsedTime += parseInt(slideTime, 10);

            // Check chrome storage for a user change in the slide time.
            CheckSlideTime();

            // Check chrome storage for a user change in the refresh time.
            CheckRefreshTime();

            DirectQuerySlideShowLoop();
            
        },

        slideTime * 1000
    )

}

function PopupForceClose(mSummary) {

    if (mSummary[0]["added"].length) {
        // Log the dialogue box's existence.
        console.log("Error: New refresh is trying to initialize before current refresh is finished executing. Force closing Power BI's popup dialogue box.");
        // Locate the dialogue box.
        let $errorDialogBox = $(document).find("error-dialog");
        // Force close the dialogue box.
        $errorDialogBox.find("button.pbi-glyph-close[title='Close'][type='button']").click();
    }

}

window.onunload = function () {
    // Disconnect listener.
    $(document).mutationSummary("disconnect", PopupForceClose, [{ element: "span.message" }]);
}