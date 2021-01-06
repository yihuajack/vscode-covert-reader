import * as vscode from 'vscode';
import * as fs from 'fs';
// import * as path from 'path';

export class Text {
    private lineNumber: number;
    private lineLength: number;
    private lineCount: number;
    private filePath: string;
    private context: vscode.ExtensionContext;

    public constructor(context: vscode.ExtensionContext) {
        this.lineNumber = 0;
        this.lineLength = 60;
        this.lineCount = 0;
        this.filePath = "";
        this.context = context;
    }

    private readText(): string[] {
        /* let writingSystem: string = vscode.workspace.getConfiguration().get<string>('covert-reader.writingSystem', "");
        if (writingSystem === "Logographic or Syllabic") {
            this.lineLength = vscode.workspace.getConfiguration().get<number>('covert-reader.lineLength', NaN) * 2;
        }
        else if (writingSystem === "Alphabetic") {
            this.lineLength = vscode.workspace.getConfiguration().get<number>('covert-reader.lineLength', NaN);
        } */
        try {
            this.filePath = vscode.workspace.getConfiguration().get<string>('covert-reader.filePath', "");
            if (this.filePath === "") {
                throw new Error("The path of the text file is empty.");
            }
            let contents = fs.readFileSync(this.filePath, 'utf-8');  // synchronously read files
            /* if (typeof contents !== "string") {
                throw new Error("The specified file is not a text file.");
            } */  // readFileSync is different from readFile
            let lineBreak: string = vscode.workspace.getConfiguration().get<string>('covert-reader.lineBreak', "\t");
            contents = contents.replace(/\r/g, "").replace(/\n(\n)*( )*(\n)*\n/g, "\n").replace(/　/g, " ").replace(/\.\.\./,"\u2026");  // We do not capture messy formats like "x .x" or "x( x"
            let lines: Array<string> = new Array<string>();
            if (/\ufffd/.test(contents) === true) {
                lines.push("Warning: probably reading a binary file!");
            }
            let paragraphs: string[] = contents.split("\n");
            let line: string = "";
            for (let paragraph of paragraphs) {  // The Great Death Loop
                if (paragraph === '') {
                    continue;
                }
                function isNull(match: string[] | null): match is null {
                    return typeof match === null;
                }
                let words: string[] | null = paragraph.match(/.*?(\s|-|\u2010\u2013\u2014)|.+$/g);  // ‐–—
                // ~`'’'· is not separated
                if (isNull(words)) {
                    continue;
                }
                for (let word of words) {
                    if ((line + word).length > this.lineLength) {
                        if (word.match(/\p{UIdeo}/u)) {  // If word is CJK character (unified ideograph, excluding punctuations, see http://unicode.org/reports/tr44/)
                            // (see https://stackoverflow.com/questions/21109011/javascript-unicode-string-chinese-character-but-no-punctuation)
                            // Separately considering these cases excluding some cases like pure English may reduce unnecessary performance loss
                            let i: number;
                            let sentences: string[] | null = word.match(/.*?([\u3002\uff0c\uff1f\uff01\uff1b\u2028]|\u2026\u2026|\u2026)\s|.+$/g);  // 。，？！；\u2028……
                            // The messy formats like "....", "… …", or "。。。。" can be automatically handled
                            if (isNull(sentences)) {
                                continue;
                            }
                            sentences[0] = line + sentences[0];
                            line = "";
                            let quoteStack: number = 0;
                            for (i = 0; i < sentences.length; i++) {
                                let start: number = 0;
                                let doubleQuotes: string[] | null = sentences[i].match(/"/g);
                                if (doubleQuotes) {
                                    quoteStack += doubleQuotes.length;
                                }
                                /* let singleQuotes: string[] | null = sentences[i].match(/"/g);
                                if (singleQuotes) {
                                    quoteStack[1] += singleQuotes.length;
                                } */  // Considering sometimes single quotes "'" are confused with ＇´`, we do not distinguish them
                                if (sentences[i].length > this.lineLength) {
                                    while (sentences[i].length - start > this.lineLength) {  // not to be confused with greater-than and less-than
                                        let leftPunctuation: RegExp = new RegExp(/[“‘《＜〝（【﹝〔〈［「｛〖『\(\[\{]/g);
                                        let rightPunctuation: RegExp = new RegExp(/[”’》＞〞）】﹞〕〉］」｝〗』\)\]\}\u2028,\.~\!@#\$%^&\*\+\=\|\\:;\?\/_`<>，。？！：；×÷、؟،]/g);
                                        // let punctuation: RegExp = new RegExp(leftPunctuation.source + "|" + rightPunctuation.source + "[,\.~\!@#\$%^&\*\+\=\|\\:;\?\/_`<>]");
                                        if (lines.length > contents.length) {
                                            throw new Error("Parsing file error");
                                        }
                                        else if (sentences[i].charCodeAt(start + this.lineLength - 1) === 8230 && sentences[i].charCodeAt(start + this.lineLength) === 8230 || sentences[i].charCodeAt(start + this.lineLength - 1) === 8212 && sentences[i].charCodeAt(start + this.lineLength) === 8212) {  // ……——
                                            lines.push(sentences[i].slice(start, start + this.lineLength - 2));
                                            start += this.lineLength - 2;
                                        }
                                        // else if (sentences[i].charCodeAt(start + this.lineLength - 1) === (8220 || 8216 || 12298 || 65308 || 12317 || 65288 || 12304 || 65117 || 12308 || 12296 || 65539 || 12300 || 65371 || 12310 || 12302 || 40 || 91 || 123) || sentences[i].charCodeAt(start + this.lineLength) === (8221 || 8217 || 12299 || 65310 || 12318 || 65289 || 12305 || 65118 || 12309 || 12297 || 65341 || 12301 || 65373 || 12311 || 12303 || 41 || 93 || 125 || 8232) && sentences[i].charAt(start + this.lineLength - 1).match(/\p{UIdeo}/u)) {  // “‘《＜〝（【﹝〔〈［「｛〖『([{ or ”’》＞〞）】﹞〕〉］」｝〗』)]} or line separator
                                        else if (sentences[i].charAt(start + this.lineLength - 1).match(leftPunctuation) || sentences[i].charAt(start + this.lineLength).match(rightPunctuation) && sentences[i].charAt(start + this.lineLength - 1).match(/\p{UIdeo}/u) || sentences[i].charAt(start + this.lineLength - 1) === '"' && quoteStack % 2 === 1) {
                                            lines.push(sentences[i].slice(start, start + this.lineLength - 1));
                                            start += this.lineLength - 1;
                                        }
                                        else if (!sentences[i].charAt(start + this.lineLength - 1).match(/\p{UIdeo}|\s/u) && !sentences[i].charAt(start + this.lineLength - 1).match(rightPunctuation) && sentences[i].charAt(start + this.lineLength - 1) !== lineBreak) {  // to prevent from breaking lines in the middle of non-CJK words
                                            let match: any = sentences[i].substring(start, start + this.lineLength).match(/\p{UIdeo}/gu);
                                            let end: number = start + ((match) ? sentences[i].substring(start, start + this.lineLength).lastIndexOf(match.slice(-1)) + 1 : this.lineLength);  // end might be -1
                                            // To deal with a whole line of pure non-CJK
                                            // match.slice(-1) can also be replaced by match[match.length-1]
                                            /* match = sentences[i].substring(start + this.lineLength, start + 2 * this.lineLength).match(/\p{UIdeo}/u);
                                            if (!match) {  // It means the latter part of the word is in the next line
                                                lines.push(sentences[i].slice(start + this.lineLength, start + 2 * this.lineLength));
                                                start += this.lineLength;
                                                continue;
                                            }
                                            else {
                                                end = sentences[i].indexOf(match[0]) + 1;
                                            } */
                                            if (sentences[i].charAt(end).match(rightPunctuation) || sentences[i].charAt(end) === '"' && quoteStack % 2 === 0) {
                                                ++end;
                                            }
                                            lines.push(sentences[i].slice(start, end));
                                            start = end;
                                        }
                                        else {
                                            lines.push(sentences[i].slice(start, start + this.lineLength));
                                            start += this.lineLength;
                                        }
                                    }
                                    sentences[i] = sentences[i].slice(start);
                                }
                                if (sentences[i].length <= this.lineLength / 2 && i !== sentences.length - 1 && sentences[i].charCodeAt(0) !== (8232 || 8226 || 9679)) {  // Always break at line separator, •, or ●
                                    sentences[i + 1] = sentences[i] + sentences[i + 1];
                                }
                                else if (i !== sentences.length - 1) {
                                    lines.push(sentences[i]);
                                }
                            }
                            line += sentences[i - 1];  // Since word will be reset in next iteration, there is no need to reset it manually
                        }
                        else  {
                            lines.push(line);
                            let j: number;
                            for (j = 0; j < Math.floor(word.length / this.lineLength); j++) {  // A very long single word
                                lines.push(word.slice(j * this.lineLength, (j + 1) * this.lineLength));
                            }
                            line = word.slice(j * this.lineLength);
                        }
                    }
                    else {
                        line += word;
                    }
                }
                if (lineBreak.match(/[^\f\u2028\u2022\u25cf\v\r\n]/g)) {  // Forcing a newline if ended by form feeds, line separators, bullets, or vertical tabs, \r has been replaced before
                    line += lineBreak;
                }
                else if (line !== '') {
                    lines.push(line);
                }
            }
            lines.push(line);
            this.lineCount = lines.length;
            return lines;
        }
        catch (error) {
            if (typeof error === "string") {
                throw error;
            }
            else if (error.code === 'ENOENT') {
                throw new Error("File not found!");
            }
            else {
                throw new Error((error.message.length <= this.lineLength) ? error.message : error.message.substring(0, this.lineLength - 2) + "\u2026");
            }
            // vscode.window.showWarningMessage(error);
        }
    }

    private getLineNumber(target: string): void {
        let currentLineNumber: number = vscode.workspace.getConfiguration().get<number>('covert-reader.currentLineNumber', 0);
        if (target === "previous") {
            this.lineNumber = (currentLineNumber <= 1) ? 1 : currentLineNumber - 1;
        }
        else if (target === "next") {
            this.lineNumber = (currentLineNumber >= this.lineCount) ? this.lineCount : currentLineNumber + 1;
        }
        else if (target === "jump") {
            this.lineNumber = currentLineNumber;
        }
    }

    private updateLineNumber(): void {
        vscode.workspace.getConfiguration().update('covert-reader.currentLineNumber', this.lineNumber, true);
    }

    public getLine(target: string): string {
        this.lineLength = vscode.workspace.getConfiguration().get<number>('covert-reader.lineLength', 60);
        try {
            let lines: string[] = this.readText();
            // if (lines.length === 0) {
            //     throw new Error("File is blank!");
            // }
            this.getLineNumber(target);
            this.updateLineNumber();
            return lines[this.lineNumber - 1] + "(" + this.lineNumber.toString() + "/" + this.lineCount.toString() + ")";
        }
        catch (error) {
            return error.message;
        }
    }
}
