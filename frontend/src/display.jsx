import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Display() {
  const [generateFlag, setGenerateFlag] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  function handleClick() {
    setGenerateFlag(true);
  }

  function handleChange(e) {
    setPrompt(e.target.value);
  }

  useEffect(() => {
    if (generateFlag) {
      axios.post('http://localhost:5000/generate', { imageUrl: prompt })
        .then(res => {
          console.log(res.data);
          // Add base64 prefix to display image
          setImageUrl(`data:image/png;base64,${res.data.image}`);
          setGenerateFlag(false); // reset flag
        })
        .catch(err => {
          console.log(err);
          setGenerateFlag(false);
        });
    }
  }, [generateFlag, prompt]);

  return (
    <div>
      <input
        type="text"
        value={prompt}
        onChange={handleChange}
        placeholder="Enter prompt"
      />
      <button onClick={handleClick}>Generate</button>

      <div>
        {imageUrl && <img src={imageUrl} alt="Generated" />}
      </div>
    </div>
  );
}
