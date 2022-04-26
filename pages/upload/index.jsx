import React from "react";
import DraftEditor from "components/DraftEditor";
import useDragDrop from "hooks/useDragDrop";
import toast from "react-hot-toast";

export default function Upload() {
  return (
    <div className="u-container">
      <div className="u-wrapper">
        <div className="u-inner">
          <div className="u-title">
            Upload video
            <div className="u-subtitle">
              This video will be published to username
            </div>
          </div>

          <div className="u-content">
            {/* <UploadPreview />
        <UploadProgress /> */}

            <UploadSelectFile />

            <UploadForm />
          </div>
        </div>
      </div>
    </div>
  );
}

function UploadPreview() {
  return "preview";
}

function UploadProgress() {
  return "progress";
}

function UploadSelectFile() {
  const { dropRef, inputref, selectFile, onSelectFile } = useDragDrop(getVideoDuration);

  function getVideoDuration(file) {
    const reader = new FileReader()

    reader.onloadend = () => {
      const media = new Audio(reader.result)

      media.onloadedmetadata = () => {
        const duration = Math.round(media.duration)

        if(duration > 180) {
          toast("Video is over the 3min limit", {
            style: {
              fontFamily: "proxima",
              borderRadius: 10,
              background: "#333",
              color: "#fff"
            }
          })
        }
        else {
          console.log("hadled");
        }
      }
    }

    reader.readAsDataURL(file)
  }

  return (
    <div onClick={selectFile} ref={dropRef} className="u-select-file-container">
      <div className="u-select-file-wrapper">
        <img
          src="/assets/cloud-icon.svg"
          alt=""
          className="u-select-file-icon"
        />
        <div className="u-select-file-title">Select video to upload</div>
        <div className="u-select-file-subtitle">Or drag and drop a file</div>
        <br />
        <div className="u-select-file-spacer"></div>
        <div className="u-select-file-specs">
          <li className="u-select-file-type">MP4 or WebM</li>
          <li className="u-select-file-dimensions">
            720x1280 resolution or higher
          </li>
          <li>Up to 180 seconds</li>
        </div>
      </div>

      <input
        ref={inputref}
        onChange={onSelectFile}
        type="file"
        name=""
        id="file-input"
        accept="video/mp4, video/webm"
        className="u-select-file-input"
      />
    </div>
  );
}

function UploadForm() {
  return (
    <div className="u-form-container">
      <div className="u-form-wrapper">
        <div className="u-form-inner">
          <div className="u-form-header">
            <span className="u-form-title">Caption</span>
            <span className="u-form-length-container">
              <span className="u-form-length">0 / 150</span>
            </span>
          </div>

          <div className="u-form-input">
            <DraftEditor />
          </div>
        </div>
      </div>

      <div className="u-form-action">
        <button className="u-form-discard">Discard</button>
        <button className="u-form-submit">Post</button>
      </div>
    </div>
  );
}
