// Load and save default values for the Slide Time and Refresh Time upon the Power BI page loading.
document.addEventListener('DOMContentLoaded', restore_options);

function save_slide_time_options() {

    var slide_time = document.getElementById('slide_time').value;

    chrome.storage.sync.set(
        { slide_time: slide_time }
    );

    // Reload the Power BI page upon updating the Slide Time. This is necessary in case the loop has already started
    // because it would need to be reloaded with the updated Slide Time value.
    chrome.tabs.executeScript(null,
        {
            code: "location.reload()"
        }
    );
}

function save_refresh_time_options() {

    var refresh_time = document.getElementById('refresh_time').value;

    chrome.storage.sync.set(
        { refresh_time: refresh_time }
    );

    // Reload the Power BI page upon updating the Refresh Time. This is necessary in case the loop has already started
    // because it would need to be reloaded with the updated Refresh Time value.
    chrome.tabs.executeScript(null,
        {
            code: "location.reload()"
        }
    );
}

function stop_execution() {
    chrome.storage.sync.set(
        { execute_trigger: 0 },
        function () {
            chrome.runtime.sendMessage({ execute: "stop" });
            setTimeout(function () {
                window.close();
            }, 500);
        }
    )
}

function start_execution() {
    chrome.storage.sync.set(
        { execute_trigger: 1 },
        function () {
            chrome.runtime.sendMessage({ execute: "start" });
            setTimeout(function () {
                window.close();
            }, 500);
        }
    )
}

// Restores default values for the Slide Time and Refresh Time.
function restore_options() {
    chrome.storage.sync.get({
        slide_time: 25, refresh_time: 180
    }, function (items) {
        document.getElementById('slide_time').value = items.slide_time;
        document.getElementById('refresh_time').value = items.refresh_time;
    });
}

// Assign the above functions to their respective button clicks.
document.getElementById('slide_time_save').addEventListener('click', save_slide_time_options);
document.getElementById('refresh_time_save').addEventListener('click', save_refresh_time_options);
document.getElementById('play').addEventListener('click', start_execution);
document.getElementById('stop').addEventListener('click', stop_execution);