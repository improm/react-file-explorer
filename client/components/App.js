import React, {PropTypes} from 'react';
import Folder from './Folder';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Folder path='root' name='Root'/>
      </div>);
  }
}
