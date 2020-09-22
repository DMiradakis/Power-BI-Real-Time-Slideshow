chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { hostEquals: 'app.powerbi.com', pathContains: 'ReportSection' },
                }) ],
            actions: [ new chrome.declarativeContent.ShowPageAction() ]
        }]);
    });
});

chrome.runtime.onMessage.addListener(
    function(request) {
        if (request.execute === "start" || request.execute === "stop") {

            chrome.tabs.executeScript(null,
                {
                    code: "location.reload()"
                }
            );
        }
    }
)