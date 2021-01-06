# Covert Reader for Visual Studio Code

[![Build Status](https://travis-ci.org/yihuajack/vscode-covert-reader.svg?branch=master)](https://travis-ci.org/shalldie/vscode-background)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=yihuajack/vscode-covert-reader)](https://dependabot.com)
[![Build Status](https://yihuajack.visualstudio.com/vscode-covert-reader/_apis/build/status/yihuajack.vscode-covert-reader?branchName=master)](https://yihuajack.visualstudio.com/vscode-covert-reader/_build/latest?definitionId=1&branchName=master)

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

## Extension Settings

This extension contributes the following settings:

* `covert-reader.currentLineNumber`: The current line number of the text file (starting from 1)"

* `covert-reader.filePath`: The absolute path to the text file

* `covert-reader.lineBreak`: The symbol used to replace line break (default: horizontal tab)

* `covert-reader.lineLength`: The maximum number of characters in one line (depends on language)

This extension contributes the following key-bindings:

- `covert-reader.getPreviousLine`: Alt+,  or Option+, (only takes effect when focusing on text in the editor)
- `covert-reader.getNextLine`: Alt+.  or Option+. (only takes effect when focusing on text in the editor)
- `covert-reader.jumpLine`: Alt+/  or Option+/
- `covert-reader.hideLine`: Alt+D or Option+D

## Known Issues

Not perfectly compatible with [vscode-background](https://github.com/shalldie/vscode-background). It may prompt you to restart VS Code.

## Release Notes

### 0.0.1

Add basic features.
