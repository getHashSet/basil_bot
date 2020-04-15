import React, { Component } from 'react';
import PhotoUploader from '../../components/PhotoUploader';
import './lazyLoad.css';

export default class LazyLoad extends Component {
    render() {
        return (
            <div id="LazyLoad_root">
               <h1>Lazy<span>Load</span> </h1>
               <PhotoUploader/>
            </div>
        )
    }
}
