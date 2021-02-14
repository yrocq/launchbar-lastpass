// LaunchBar Action Script

function run(argument) {
    if (argument == undefined) {
        result = []
        // Inform the user that there was no argument
        lastpassStatus = LaunchBar.execute('/bin/bash', 'lastpass.sh');

        if (lastpassStatus != "OK") {
            actions = [
                {
                    'title': "Login",
                    'action': 'logIn',
                    'actionRunsInBackground': true
                },
                {
                    'title': "Set Email from clipboard",
                    'action': 'setEmail',
                    'actionRunsInBackground': true
                }
            ]

            return actions
        }

        entries = LaunchBar.execute('/usr/local/bin/lpass', 'ls', '-l');
        entriesArray = entries.split("\n");
        
        entriesList = entriesArray.map(
            function (entry) {
                parts = entry
                    .substring(17) // remove date/timestamp
                    .match(/^(.*?)\[id: ([0-9]*)\] \[username: (.*)\]/);

                if (parts) {
                    title = parts[1].match(/([^/]+)?$/)[1]; // this regex removes any LastPass categories in the title string, you could also keep them with just: parts[1];
                    id = parts[2];
                    userName = parts[3];

                    return {
                        'title': `${title}(${userName || "?"})`,
                        'action': 'getInfo',
                        'actionArgument': id,
                        'actionReturnsItems': true
                    };
    
                }
                else {
                    return null
                }
            }
        )
        .filter(
            function (entry) {
                return entry != null
            }
        )

        entriesList.unshift(
            {
                'title': "Logout",
                'action': 'logOut',
                'actionRunsInBackground': true
            }
        )

        return entriesList;
    }
}

function getInfo(id) {
    information = LaunchBar.execute('/usr/local/bin/lpass', 'show', '--json', id);
    informationObject = JSON.parse(information)[0]

    result = [
    ]

    for (key in informationObject) {
        result.push (
            formatField(key, informationObject[key])
        )
    }
    
    return result
}

function logIn() {
    if (Action.preferences.email == undefined) {
        LaunchBar.displayNotification(
            {
                title: 'LastPass',
                string: 'You must set an email',
            }
        )
    }
    else {
        LaunchBar.executeAppleScript('tell application "Terminal" \n' +
        '    do script "/usr/local/bin/lpass login --trust ' + Action.preferences.email + '" \n' +
        '    activate \n' +
        'end tell');
        LaunchBar.hide()
    }
}

function logOut() {
    LaunchBar.execute('/bin/bash', 'logout.sh');
    LaunchBar.hide()
}

function setEmail() {
    Action.preferences.email = LaunchBar.getClipboardString()
    LaunchBar.displayNotification({
        title: 'LastPass',
        string: 'Email address has been set to ' + Action.preferences.email,
    })
    LaunchBar.hide()
}


function formatField(key, data) {
    url = '';
    switch (key) {
        case "url":
            url = data;
            break;
        case "last_modified_gmt":
        case "last_touch":
            data = LaunchBar.formatDate(new Date(parseInt(data) * 1000))
            break;
    }

    return {
        label: key,
        title: data,
        actionReturnsItems: true,
        url: url
    }
}
