# Covert Reader for Visual Studio Code

[![Build Status](https://travis-ci.org/yihuajack/vscode-covert-reader.svg?branch=master)](https://travis-ci.org/shalldie/vscode-background)
[![Build Status](https://yihuajack.visualstudio.com/vscode-covert-reader/_apis/build/status/yihuajack.vscode-covert-reader?branchName=master)](https://yihuajack.visualstudio.com/vscode-covert-reader/_build/latest?definitionId=1&branchName=master)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=yihuajack/vscode-covert-reader)](https://dependabot.com)
[![Version](https://vsmarketplacebadge.apphb.com/version/yihuajack.vscode-covert-reader.svg)](https://marketplace.visualstudio.com/items?itemName=yihuajack.vscode-covert-reader)
[![Installs](https://vsmarketplacebadge.apphb.com/installs/yihuajack.vscode-covert-reader.svg)](https://marketplace.visualstudio.com/items?itemName=yihuajack.vscode-covert-reader)
[![Ratings](https://vsmarketplacebadge.apphb.com/rating/yihuajack.vscode-covert-reader.svg)](https://vsmarketplacebadge.apphb.com/rating/yihuajack.vscode-covert-reader.svg)

![covert-reader-logo](images/covert-reader-logo-flat.png)

## Features

- Support all the horizontal writing systems
- Support mixing multiple languages
- Smart word wrap (this can be quite complex for multilingual mixing)
- Support showing line numbers
- Support specified line number jumps (just by manually input line number in Current Line Number)
- Support processing line separators, form feeds, etc.
- Support identifying (informal) bullets and ellipsis dots
- Support double quotes matching
- Allow hiding the text line in the status bar

## Installation

Open VS Code and press <kbd>F1</kbd> or <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> to open command palette, select **Install Extension** and type `vscode-covert-reader`.

Or launch VS Code Quick Open (<kbd>Ctrl</kbd> + <kbd>P</kbd>), paste the following command, and press enter.

```bash
ext install vscode-covert-reader
```

Alternatively, in the Extensions pane, search for `Covert Reader` extension and install it there.

You can also install a VSIX package from our [Releases page](https://github.com/yihuajack/vscode-covert-reader/releases) by following the [Install from a VSIX](https://code.visualstudio.com/docs/editor/extension-gallery#_install-from-a-vsix) instructions.

## Extension Settings

This extension contributes the following settings:

* `covert-reader.currentLineNumber`: The current line number of the text file (starting from 1)"
* `covert-reader.filePath`: The absolute path to the text file
* `covert-reader.lineBreak`: The symbol used to replace line break (default: horizontal tab)
* `covert-reader.lineLength`: The maximum number of characters in one line (depends on language)

## Keybindings

This extension contributes the following keybindings:

* `covert-reader.getPreviousLine`: Alt+,  or Option+, (only takes effect when focusing on text in the editor)
* `covert-reader.getNextLine`: Alt+.  or Option+. (only takes effect when focusing on text in the editor)
* `covert-reader.jumpLine`: Alt+/  or Option+/
* `covert-reader.hideLine`: Alt+D or Option+D

## Known Issues

Not perfectly compatible with [vscode-background](https://github.com/shalldie/vscode-background). It may prompt you to restart VS Code.

## Change Log

See the [Change log](https://github.com/yihuajack/vscode-covert-reader/blob/master/CHANGELOG.md) for details about the changes in each version.

## Support

You can find the full list of issues on the [Issue Tracker](https://github.com/yihuajack/vscode-covert-reader/issues). If you encounter any problems with the extension and cannot find the solution yourself (such as "Parsing file error"), please open an issue in the dedicated GitHub page: [bug or feature suggestion](https://github.com/yihuajack/vscode-covert-reader/issues/new). Before opening an issue, please make sure that it is not a duplicate. 

When you do open an issue, remember to include the text file you read.

## License

This extension is licensed under the [MIT License](LICENSE).

## Contributing

To contribute simply clone the repository and then commit your changes. When you do a pull requests please clearly indicate what you changed in the pull comment.

Do not update the extension version or changelog, it will be done by the maintainers when a new version is released.

If you want to update the readme, you are free to fix typos, errors, add or improve descriptions, but if you have a style change in mind please use an issue (or specific pull request) so that it can be discussed.

## Credits

* [Thief-Book](https://marketplace.visualstudio.com/items?itemName=C-TEAM.thief-book) by [C-TEAM](https://marketplace.visualstudio.com/publishers/C-TEAM)
