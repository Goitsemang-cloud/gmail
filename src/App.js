import React, { useState, useRef } from 'react';
import Webcam from "react-webcam";
import emailjs from 'emailjs-com';

import './App.css';
import { Button } from '@mui/material';


const WebcamComponent = () => <Webcam />;

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user"
};

const App = () => {
  const [image, setImage] = useState('');
  const webcamRef = React.useRef(null);
  const [results, setResult] = useState(false);
  const [messsage, setMesssage] = useState('');

  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc)
    });

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('Gmail', 'template_9mld87n', form.current, 'user_LhWfC3yDF10CnjvavWE19', this)
      .then((result) => {
        setMesssage(result.text);
      }, (error) => {
        setMesssage(error.text);
      });
    e.target.reset();
    setResult(true)
  };

  return (
    <>
      <h3>Welcome to Gmail in React</h3>
      <div>
        {
          image == '' ? <Webcam
            audio={false}
            height={210}
            ref={webcamRef}
            name="attach"
            screenshotFormat="image/jpeg"
            width={210}
            videoConstraints={videoConstraints}
          /> :
            <img src={image}
            />
        }
      </div>
      <div className="ImageCam">

        {
          image != '' ?

            <Button variant="contained" color="secondary" size="small" onClick={(e) => {
              e.preventDefault();
              setImage('')
            }}
              className="webcam-btn">
              Retake Image</Button>
            :
            <Button variant="contained" color="secondary" size="small" onClick={(e) => {
              e.preventDefault();
              capture();
            }}
              className="webcam-btn">Capture</Button>

        }
      </div>

      <div>
        <form ref={form} enctype="multipart/form-data" method="post" onSubmit={sendEmail}>
          <label for="fname">Email Address</label>
          <input type="text" id="fname" name="to_name" placeholder="Email@Gmail.com" />

          <label for="lname">Subject</label>
          <input type="text" id="lname" name="from_name" placeholder="Subject..." />

          <label for="country">message</label>
          <textarea type="text" id="country" rows="5" cols="50" name="message" />

          {image ? (<p style={{ fontSize: '25px' }}>Attached : ✔</p>) : ""}
          {results == true ? (<p>{messsage}</p>) : ''}
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}

export default App;
