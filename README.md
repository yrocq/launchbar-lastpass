# LastPass action for LaunchBar

This action is a proof of concept for accessing [LastPass](https://www.lastpass.com) passwords from [LaunchBar](https://www.obdev.at/products/launchbar/index.html) Mac OS X application. It is a little complicated to set up. I may improve it if other people than me find it useful :smiley:. Don't hesitate to contact me to give me feedback or if you want to contribute.

## Tools needed

- The [LaunchBar](https://www.obdev.at/products/launchbar/index.html) application
- A [LastPass](https://www.lastpass.com) account
- [Brew](https://brew.sh/) package manager

## Install
### Action
- Download and decompress the last version
- Double-click the LastPass Entries.lbaction file
- A dialog will pop up to ask you if you want to install the action
- Click "Install"

### LastPass CLI
- Open a terminal
- Execute the following command
    ```bash
    brew install lastpass-cli
    ```

## Set up

- Copy your LastPass login (email) in the clipboard
- Type your shortcut to invoke LaunchBar (usually: cmd-space)
- Select the "LastPass Entries" action
- Select the "Set Email from clipboard" action
- You should see a notification telling you that the email has been set

## Login

You must have set up you email using the above procedure

- Select the "LastPass Entries" action
- Select "Login"
- Follow the instructions in the Terminal window that pop up. You will have to enter your password and a code for two factors authentication if you have set one.

2FA code will be asked only the first time you log in. The session will be active one hour. After this delay, you'll have to log in again.


## Usage

You must have been logged in using the above procedure.

- Select the "LastPass Entries" action
- You should see a list of all your LastPass Entries
- You can see the content of an entry by selecting it
- Each entry field can be pasted in the frontmost application using the usual (cmd-shift-C shortcut)

## Possible improvements

- Simplify the set up process
- Use a nice dialog instead of a terminal window
- Increase session duration
- Use Mac OS X keychain to store LastPass password
- Improve my english :sweat_smile: