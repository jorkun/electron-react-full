/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao kunkun
 * @Last Modified time: 2019-03-16 16:10:28
 */
import React, { Component } from "react";

import "braft-editor/dist/index.css";
import "braft-extensions/dist/table.css";
import "braft-extensions/dist/color-picker.css";
import "braft-extensions/dist/code-highlighter.css";
import "jrui/index.scss";

import BraftEditor, { EditorState } from "braft-editor";
import Table from "braft-extensions/dist/table";
import ColorPicker from "braft-extensions/dist/color-picker";
import CodeHighlighter from "braft-extensions/dist/code-highlighter";
import "prismjs/components/prism-java";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-json";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-css";
BraftEditor.use(Table({
    defaultColumns: 5, // 默认列数
    defaultRows: 3
}));
const options = {
    syntaxs: [
        {
            name: "JavaScript",
            syntax: "javascript"
        }, {
            name: "HTML",
            syntax: "html"
        }, {
            name: "CSS",
            syntax: "css"
        }, {
            name: "Java",
            syntax: "java"
        }, {
            name: "Scss",
            syntax: "scss"
        }, {
            name: "React",
            syntax: "jsx"
        }, {
            name: "Json",
            syntax: "json"
        }
    ]
}
BraftEditor.use(CodeHighlighter(options));

BraftEditor.use(ColorPicker({ theme: "light" }));
export default class JRRichEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialValue: null,
            editorState: EditorState.createFrom("")
        }
    }
    componentDidMount() {
        this.initValue();
    }
    // componentWillReceiveProps(nextProps) {
    //     if (this.state.initialValue != nextProps.value) {
    //         let editorState = BraftEditor.createEditorState(nextProps.value || "");
    //         this.setState({ editorState, initialValue: nextProps.value});
    //     }
    // }
    initValue() {
        let editorState = EditorState.createFrom(this.props.value || "");
        this.setState({ editorState });
    }
    handleChange = (editorState) => {
        this.setState({ editorState }, () => {
            this.props.onChange && this.props.onChange(editorState ? editorState.toHTML() : "")
        });

    }
    buildPreviewHtml() {

        return `
                <!Doctype html>
                <html>
                    <head>
                        <title>预览</title>
                        <style>
                            html,body{
                                height: 100%;
                                margin: 0;
                                padding: 0;
                                overflow: auto;
                                background-color: #f1f2f3;
                            }
                            .container {
                                box-sizing: border-box;
                                width: 1000px;
                                max-width: 100%;
                                min-height: 100%;
                                margin: 0 auto;
                                padding: 30px 20px;
                                overflow: hidden;
                                background-color: #fff;
                                border-right: solid 1px #eee;
                                border-left: solid 1px #eee;
                            }
                            .container table {
                                border-collapse: collapse;
                                width: 100%;
                            }
                            .container table td {
                                border: 1px solid #d1d1d1;
                                padding-left: 4px;
                            }
                            .container img,
                            .container audio,
                            .container video{
                                max-width: 100%;
                                height: auto;
                            }
                            .container p{
                                white-space: pre-wrap;
                                min-height: 1em;
                            }
                            .container pre{
                                padding: 15px;
                                background-color: #f1f1f1;
                                border-radius: 5px;
                            }
                            .container blockquote{
                                margin: 0;
                                padding: 15px;
                                background-color: #f1f1f1;
                                border-left: 3px solid #d1d1d1;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">${this.state.editorState.toHTML()}</div>
                    </body>
                </html>
        `
    }
    preview = () => {
        if (window.previewWindow) {
            window.previewWindow.close()
        }
        window.previewWindow = window.open()
        window.previewWindow.document.write(this.buildPreviewHtml())
        window.previewWindow.document.close()

    }
    render() {
        let { editorState } = this.state;
        const extendControls = [{
            key: "font-family"
        },
        {
            key: "custom-button",
            type: "button",
            text: "预览",
            onClick: this.preview
        }
        ]
        return (
            <BraftEditor
                // {...this.props}
                value={editorState}
                onChange={this.handleChange}
                extendControls={extendControls}
                media={{ allowPasteImage: true }}
                className="jupiter-richeditor"
                placeholder="请输入正文内容"
            />)
    }
}