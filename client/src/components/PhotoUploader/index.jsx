import React, { Component } from "react";
import axios from "axios";
import "./photoUploader.css";

export default class PhotoUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // This file starts at null because no files are selected at default
      selectedFile: null,
      upload: false,
      fileName: "",
      lable: "CHOOSE A FILE"
    };
    this.uploadFileHandler = this.uploadFileHandler.bind(this);
    this.submitPhotoForUpload = this.submitPhotoForUpload.bind(this);
    this.fileNameHandler = this.fileNameHandler.bind(this);
  }

  fileNameHandler(event) {
    this.setState({
      fileName: event.target.value,
    });
  }

  uploadFileHandler(event) {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
      editMenu: "",
      lable: event.target.files[0].name,
    });
  }

  submitPhotoForUpload(event) {
    if (
      this.state.selectedFile === null ||
      this.state.selectedFile === undefined
    ) {
      // do nothing. There is no file selected yet.
      // console.log(this.state.backgroundImageName);
      return alert("Please select a file.");
    } else {
      // there is a file stored in state. Lets try and upload it.
      // use the name of the current background.
      let thisFilesName = this.state.fileName;
      const data = new FormData();
      data.append(thisFilesName, this.state.selectedFile);
      // This call is sending the name of the file before it sends the file
      if (thisFilesName != null) {
        // console.log(this.state.selectedFile);
        // console.log("file is moving")

        axios.get(`/jimp/${this.state.fileName}`).then((res) => {
          console.table(res.data);
          axios.post("/jimp", data, {}).then((res) => {
            console.log("uploaded.");
          });
        });
      } else {
        /* file name error */
      }
    }
  }

  render() {
    return (
      <div className="photo_uploader_root component">
        <div className="top_field">
          {/* <label htmlFor="input_file_name">Name:</label> */}
          <input
            id="input_file_name"
            type="text"
            name="input_file_name"
            className="file_name"
            placeholder="Output File Name"
            onChange={this.fileNameHandler}
          />
        </div>

        <div className="bottom_field">
          <input
            id="input_file"
            type="file"
            name="input_file_name"
            onChange={this.uploadFileHandler}
            className="upload_button"
          />

          <label htmlFor="input_file">
            {this.state.lable}
          </label>
        </div>

        <div
          className="btn"
          onClick={this.submitPhotoForUpload}
        >
          Upload
        </div>
      </div>
    );
  }
}
