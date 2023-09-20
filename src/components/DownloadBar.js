// client/src/components/DownloadBar.js

import React from 'react';

function DownloadBar() {
  return (
    <div className="download-bar">
      <p>Download BSNL app for</p>
      <div className="download-links">
        <a href="https://play.google.com/store/apps/details?id=in.bsnl.portal.bsnlportal">
          <span className="material-icons">android</span>
          <span className="linkText">Android</span>
        </a>
        <a href="https://itunes.apple.com/us/app/my-bsnl/id790617957?ls=1&mt=8">
          <span className="material-icons">apple</span>
          <span className="linkText">Apple</span>
        </a>
        <a href="http://www.windowsphone.com/en-in/store/app/bsnl/376af016-0035-4864-af00-d2cf1edb845e">
          <span className="material-icons">windows</span>
         <span className="linkText">Windows</span> 
        </a>
      
      </div>
    </div>
  );
}

export default DownloadBar;
