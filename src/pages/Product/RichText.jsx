import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";



class RichText extends Component {

    constructor(props){
        super(props)
        const htmlnode = this.props.detail
        if(htmlnode){
            const contentBlock = draftToHtml(htmlnode)
            if(contentBlock){
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
                const editorState = EditorState.createWithContent(contentState)
                this.setState({
                    editorState
                })
            }
        }else{
            this.state = {
                editorState: EditorState.createEmpty()
            }
        }
    }
    static propTypes = {
        detail: PropTypes.string
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        })
    }
    getDetail = () => {
        
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }
    render() {
        const {editorState} = this.state
        return (
            <Editor
            editorState={editorState}
            editorStyle={{border: '1px solid #eee',minHeight: '200px'}}
            onEditorStateChange={this.onEditorStateChange}
            >

            </Editor>
        );
    }
}

export default RichText;