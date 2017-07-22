import React, { PropTypes } from 'react';
import axios from 'axios';

const BASE_PATH = 'http://localhost:3004/';
let folder_open = require('../assets/folder-open.png');
let folder_closed = require('../assets/folder-close.png');
let file_icon = require('../assets/file-icon.png');



export default class Folder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            directory: [],
            opened: false
        };

        this.toggleOpen  = this.toggleOpen.bind(this);
        this.loadFolderData  = this.loadFolderData.bind(this);
    }

    toggleOpen(){
        if(!this.state.opened){
            this.loadFolderData();   
        }
    	var state = Object.assign({},this.state,{
    		opened: !this.state.opened
    	})
    	this.setState(state);
    }

    loadFolderData(){
        var self = this;
        axios.get(BASE_PATH+ this.props.path).then(function(resp) {
            self.setState({
                directory: resp.data
            })
        })
    }


    render() {
    
        return ( 
            <div className='folder-wrap'>
            {
                this.state.opened ? 
                <img src={folder_open} alt='open folder' className='folder-icon'/> : 
                <img className='folder-icon' src={folder_closed} alt='closed folder'/>
            }

            <p onClick={this.toggleOpen} className='folder-name'>
                 {this.props.name}
            </p>
            {
                this.state.opened &&
                     <ul className='open-folder'> 
                         {this.state.directory.map(post =>
                            post.Key.endsWith('/')  ? 
                            <li key={post.Key}>
                                <Folder path={post.Key} name={post.Owner.DisplayName}/> 
                            </li> :
                             <li key={post.Key}>
                                <img className='file-icon' src={file_icon} alt='closed folder'/>
                                <a href="/path-to-file" target="_blank">{post.Owner.DisplayName}</a>
                            </li>
                        )}
                    </ul> 
            }     
            </div>
          )
      }
}
Folder.propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
}