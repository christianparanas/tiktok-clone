import { storage } from "lib/firebase";
import { useState } from "react";
import shortid from "shortid";

export default function useFirebaseUpload(user) {
  const [file, setFile] = useState(null);
  const [uploadTask, setUploadTask] = useState(null);
  const [isUploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoURL, setVideoURL] = useState("");

  function handleUpload(file) {
    const uploadId = shortid();

    setFile(file);
    setUploading(true);

    const uploadTask = storage.ref(`uploads/${user.uid}/${uploadId}`).put(file);
    setUploadTask(uploadTask);

    uploadTask.on(
      "state_change",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading video ", error);
        setUploading(false)
      },
      () => {
        storage
          .ref(`uploads/${user.uid}/${uploadId}`)
          .getDownloadURL()
          .then((url) => {
            setVideoURL(url);
            setUploading(false)
          });
      }
    );
  }

  async function cancelUpload() {
    if(uploadTask) {
      setUploading(false)
      await uploadTask.cancel()
    }
  }

  return { handleUpload, cancelUpload, file, videoURL, isUploading, uploadProgress };
}
