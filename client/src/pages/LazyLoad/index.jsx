import React, { Component } from 'react';
import PhotoUploader from '../../components/PhotoUploader';

export default class Home extends Component {
    render() {
        return (
            <div>
               <h1>LazyLoad</h1>
               <PhotoUploader/>
            </div>
        )
    }
}
