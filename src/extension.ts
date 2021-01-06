// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as text from './text';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "Covert Reader" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let document = new text.Text(context);
	let getPreviousLine = vscode.commands.registerCommand('covert-reader.getPreviousLine', () => {
		vscode.window.setStatusBarMessage(document.getLine("previous"));
	});
	let getNextLine = vscode.commands.registerCommand('covert-reader.getNextLine', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.setStatusBarMessage(document.getLine("next"));
	});
	let jumpLine = vscode.commands.registerCommand('covert-reader.jumpLine', () => {
		vscode.window.setStatusBarMessage(document.getLine("jump"));
	});
	let hideLine = vscode.commands.registerCommand('covert-reader.hideLine', () => {
		vscode.window.setStatusBarMessage("");
	});

	context.subscriptions.push(getPreviousLine);
	context.subscriptions.push(getNextLine);
	context.subscriptions.push(jumpLine);
	context.subscriptions.push(hideLine);
}

// this method is called when your extension is deactivated
export function deactivate() {}
