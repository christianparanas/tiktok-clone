import React from "react";
import DraftEditor from "components/DraftEditor";
import useDragDrop from "hooks/useDragDrop";
import toast from "react-hot-toast";
import useAuthUser from "context/userContext";
import useFirebaseUpload from "hooks/useFirebaseUpload";

import UploadCircleIcon from "components/icons/UploadCircleIcon";
import useDiscardModal from "context/DiscardModalContext";
import DiscardModal from "components/DiscardModal";
import { useState } from "react";
import EditorState from "draft-js/lib/EditorState";

export default function Upload() {
  const [userData] = useAuthUser();
  const {
    handleUpload,
    cancelUpload,
    file,
    videoURL,
    isUploading,
    uploadProgress,
    discardUpload,
  } = useFirebaseUpload(userData);

  return (
    <div className="u-container">
      <div className="u-wrapper">
        <div className="u-inner">
          <div className="u-title">
            Upload video
            <div className="u-subtitle">
              This video will be published to {userData?.username}
            </div>
          </div>

          <div className="u-content">
            {videoURL && <UploadPreview file={file} videoURL={videoURL} />}
            {isUploading && (
              <UploadProgress
                cancelUpload={cancelUpload}
                file={file}
                uploadProgress={uploadProgress}
              />
            )}

            <UploadSelectFile
              isUploading={isUploading}
              videoURL={videoURL}
              handleUpload={handleUpload}
            />
            <UploadForm discardUpload={discardUpload} />
          </div>
        </div>
      </div>
    </div>
  );
}

function UploadPreview({ file, videoURL }) {
  const { isDiscardOpen, openDiscardModal, closeDiscardModal } =
    useDiscardModal();

  return (
    <div className="u-preview-container">
      <div className="u-preview-wrapper">
        <button onClick={openDiscardModal} className="u-preview-delete-button">
          <img
            src="/assets/delete.svg"
            alt=""
            className="u-preview-delete-icon"
          />
        </button>
        <video
          src={videoURL}
          autoPlay
          loop
          muted
          className="u-preview-video"
        ></video>
      </div>
    </div>
  );
}

function UploadProgress({ file, uploadProgress, cancelUpload }) {
  return (
    <div className="u-progress-container">
      <div className="u-progress-circle-container">
        <div className="u-progress-circle">
          <UploadCircleIcon progress={uploadProgress} />
          <img
            onClick={cancelUpload}
            src="/assets/close.svg"
            alt=""
            className="u-progress-close-icon"
            style={{ marginTop: -27 }}
          />
          <div className="u-progress-percentage">{uploadProgress}%</div>
          <div className="u-progress-file-name-container">
            <span className="u-progress-file">{file.name}</span>
          </div>
        </div>

        <div className="u-progress-file-size">
          {Math.round(file.size / 1000000)} MB
        </div>
      </div>
    </div>
  );
}

function UploadSelectFile({ handleUpload, isUploading, videoURL }) {
  const { dropRef, inputref, selectFile, onSelectFile } =
    useDragDrop(getVideoDuration);

  function getVideoDuration(file) {
    const reader = new FileReader();

    reader.onloadend = () => {
      const media = new Audio(reader.result);

      media.onloadedmetadata = () => {
        const duration = Math.round(media.duration);

        if (duration > 180) {
          toast("Video is over the 3min limit", {
            style: {
              fontFamily: "proxima",
              borderRadius: 10,
              background: "#333",
              color: "#fff",
            },
          });
        } else {
          handleUpload(file);
        }
      };
    };

    reader.readAsDataURL(file);
  }

  return (
    <div
      onClick={selectFile}
      ref={dropRef}
      className={`u-select-file-container ${
        isUploading || videoURL ? "empty" : ""
      }`}
    >
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

function UploadForm({ discardUpload }) {
  const { closeDiscardModal } = useDiscardModal();
  const [caption, setCaption] = useState({ raw: null, characterLength: 0 });
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const discardPost = () => {
    closeDiscardModal();
    discardUpload();
  };

  return (
    <>
      <DiscardModal onConfirm={discardPost} />
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
              <DraftEditor
                editorState={editorState}
                setEditorState={setEditorState}
                onInputChange={setCaption}
                maxLength={150}
              />
            </div>
          </div>
        </div>

        <div className="u-form-action">
          <button className="u-form-discard">Discard</button>
          <button className="u-form-submit">Post</button>
        </div>
      </div>
    </>
  );
}
