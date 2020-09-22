// Load and save default values for the slide time and refresh time upon the Power BI page loading.
document.addEventListener('DOMContentLoaded', restore_options);

function save_slide_time_options() {

    var slide_time = document.getElementById('slide_time').value;

    chrome.storage.local.set(
        { slide_time: slide_time }
    );

}

function save_refresh_time_options() {

    var refresh_time = document.getElementById('refresh_time').value;

    chrome.storage.local.set(
        { refresh_time: refresh_time }
    );

}

function stop_execution() {
    chrome.storage.local.set(
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
    chrome.storage.local.set(
        { execute_trigger: 1 },
        function () {
            chrome.runtime.sendMessage({ execute: "start" });
            setTimeout(function () {
                window.close();
            }, 500);
        }
    )
}

// Restores default values for the slide time and refresh time.
function restore_options() {
    chrome.storage.local.get({
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