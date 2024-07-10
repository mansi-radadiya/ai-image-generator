import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import img1 from '../Assets/default_image.jpg';

function ImageGenerator() {

  const [imageUrl, setImageUrl] = useState("/");
  let inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const imageGenerator = async () => {
    if (inputRef?.current?.value === "") {
      return 0;
    }

    setLoading(true);

    // const response = await fetch("https://api.openai.com/v1/images/generations",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization:
    //         "Bearer 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",
    //       "User-Agent": "Chrome",
    //     },
    //     body: JSON.stringify({
    //       "model": "dall-e-2",
    //       "prompt": `${inputRef?.current?.value}`,
    //       "n": 1,
    //       "size": "1024x1024",
    //     }),
    //   }
    // );

    // let data = await response.json();

    // if (!data) {
    //   // Handle API response error (display error message)
    //   console.error("Error fetching image data");
    //   return;
    // }

    // console.log(data);

    const resp = await fetch('https://api.deepai.org/api/text2img', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'api-key': '08b329c6-e057-442d-b54d-7849b736dd4c'
      },
      body: JSON.stringify({
          text: "Anime Girl in a Imaginary world",
      })
  });
  
  const data = await resp.json();
  console.log(data);

    let data_array = data.data;
    setImageUrl(data_array[0]?.url);
    setLoading(false);
  }


  return (
    <div className='container'>
      <div className='header'>AI Image <span>Generator</span></div>
      <div className='header-1'>Paint a picture with your words of something you'd love to experience.</div>
      <div className="imageLoading">
        <div className="image">
          <img src={imageUrl === "/" ? img1 : imageUrl} alt="img" />
        </div>
        <div className="loading">
          <div className={loading ? "loadingBarFull" : "loadingBar"}></div>
          <div className={loading ? "loadingText" : "displayNone"}>Loading...</div>
        </div>
      </div>
      <div className='searchBox'>
        <input type="text" ref={inputRef} className='searchInput' placeholder='Describe What You Want To See' />
        <button className="generateButton" onClick={imageGenerator}>Generate</button>
      </div>
    </div>
  )
}

export default ImageGenerator;
