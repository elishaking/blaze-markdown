import React, { Component } from 'react';
import { Remarkable } from 'remarkable';
import axios from 'axios';
import './App.scss';

class App extends Component {
  state = {
    markdownHTML: ""
  }

  markdownText = "";

  /**
   * @param {React.ChangeEvent<HTMLTextAreaElement>} e
   */
  onChange = (e) => {
    this.markdownText = e.target.value;

    const md = new Remarkable({
      linkify: true,
      breaks: true,
      html: true
    });
    this.setState({
      markdownHTML: md.render(this.markdownText)
    });
  };

  downloadPDF = () => {
    axios.post('http://192.168.43.45:8000/pdf', {
      md: this.markdownText
    });
  };

  render() {
    const { markdownHTML } = this.state;
    return (
      <div className="app container">
        <div className="content">
          <div className="left">
            <textarea
              name="markdownText"
              id=""
              placeholder="Type some markdown"
              onChange={this.onChange}>

            </textarea>
          </div>

          <div className="right">
            <div className="preview-container">
              <div
                className="preview"
                dangerouslySetInnerHTML={{ __html: markdownHTML }}></div>

              <div className="download">
                <button className="pdf" onClick={this.downloadPDF}>
                  PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
