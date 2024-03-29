# Reddit URL Changer Chrome Extension

This is a simple Chrome extension that allows users to change the URL of Reddit pages to their preferred URL. The extension offers four options: R1 Old Reddit ("old.reddit.com"), R2 Normal Reddit ("new.reddit.com"), R3 Reddit Redesign ("sh.reddit.com"), or a custom URL.

## Installation

1. Download the code from this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click "Load unpacked" and select the folder containing the extension files.
5. The extension should now be installed and active.

## Usage

After installing the extension, you can access it by clicking on the Reddit URL Changer icon in the Chrome toolbar. This will open the extension popup, which contains a dropdown menu for selecting your preferred Reddit URL.

To change the URL of a Reddit page, simply navigate to the page and open the extension popup. Select your preferred URL from the dropdown menu and click the "Save and Apply" button. The extension will automatically update the URL of the current page to your selected URL.

If you want to use a custom URL, enter it in the "Enter a custom Reddit domain" input field and click the "Add" button. The custom URL will be added to the dropdown menu for future use.

# Please Note
For this code to function properly as soon as you land on reddit.com you must initalize the chrome extension 


## Contributing

If you want to contribute to this extension, feel free to open a pull request or submit an issue. Please make sure to follow the code style and conventions used in this repository.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## About / Credits

This extension was created by Abdullah Khan.

I created this because I saw reddit changing and doingng a R3 rdesign and everyone elses chrome extensions sucks. There were bugs, errors, and the UI was terrible and it annoyed me so i made my own

I have used AI to ensure readibility and coherence in my code so other developers know what I am doing

## Why Choose Us

1. Cleaner UI, simpler and better!
2. Dyanamic Duo (Dark and Light-Mode)
3. Custom Url additon and saved so you can use it!
4. Transparency of everything (we dont collect ANYTHING!!)
5. Transparency in code, anyone can contribute, or view the code. We arent hiding anything (increased trust!)
6. Always having support, developer will try his best to add a lot of ideas.
7. Accessible to everyone by using latest HTML, and CSS accessibility options with well processed javascript 
9. Back button on other chrome extensions dont work due to the domain diffculty, our extension remember your last 10 urls LOCALLY and when you click back button puts them there so you dont have to feel frustrated using the new domain (seemless integration)
10. Save a default url in the options page so that automatically when you go on reddit.com you can go on to the current page 
11. Extensive R & D to ensure 100% consistency

## Code Overview

### `manifest.json`

The `manifest.json` file contains metadata about the extension, including its name, version, permissions, and background scripts.

### `background.js`

The `background.js` file contains the code for listening to changes to the `#reddit-url` select element and updating the saved URL in the `chrome.storage.sync` API. It also listens for messages from the content script and performs URL redirections when requested.

### `options.html`

The `options.html` file contains the HTML code for the extension popup. It includes a dropdown menu for selecting the preferred Reddit URL, an input field for entering custom URLs, and a "Save and Apply" button for updating the URL of the current page.

### `options.js`

The `options.js` file contains the JavaScript code for handling events in the extension popup. It includes functions for URL validation, error handling, theme toggling, and custom URL handling.

### `styles.css`

The `styles.css` file contains the CSS styles for the extension popup. It includes styles for the dropdown menu, input fields, buttons, and error messages.

### `terms.html`

The `terms.html` file contains the HTML code for the terms and conditions page. It includes information about the extension's permitted uses, warranties and disclaimers, limitation of liability, indemnification, modifications, termination, governing law, and contact information.

### `icon.png`

The icon is based off the 3 new icon changes to Reddit

1. We had the original Old Reddit icon
2. We had the "normal" Reddit icon
3. The Rdesigned snoo


<img src="icon.png" alt="Chrome Extension Icon" width="150" height="200">
