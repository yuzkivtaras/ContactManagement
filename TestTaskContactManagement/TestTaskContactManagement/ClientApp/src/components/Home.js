import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            uploadResult: null,
            isLoading: false
        };
    }

    handleFileInputChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    };

    handleFileUpload = async () => {
        const { selectedFile } = this.state;

        if (!selectedFile) {
            alert('No file selected.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        this.setState({ isLoading: true });

        try {
            const response = await fetch('/uploadcontact/upload', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const result = await response.text();
                this.setState({ uploadResult: result });
            } else {
                throw new Error('Failed to upload CSV file.');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while uploading the file.');
        } finally {
            this.setState({ isLoading: false });
        }
    };

    render() {
        const { uploadResult, isLoading } = this.state;

        return (
            <div>
                <h1>Upload Contact</h1>
                <div>
                    <input type="file" accept=".csv" onChange={this.handleFileInputChange} />
                    <button onClick={this.handleFileUpload} disabled={isLoading}>Upload</button>
                </div>
                {isLoading && <p>Loading...</p>}
                {uploadResult && <p>{uploadResult}</p>}
            </div>
        );
    }
}

