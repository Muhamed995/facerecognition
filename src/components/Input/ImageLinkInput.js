import React from 'react';
import './ImageLinkInput.css'
const ImageLinkInput =(props)=>{
return(
<div>
  <p className='f3'>
    This magic brain will detect your face. Git it now!
  </p>

  <div className='center'>
    <div className=' form center pa4 br3 shadow-5'>
    <input placeholder='Enter Url' type='tex' className='f4 pa2 w-70 center' onChange={props.onInputChange}/>
    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={props.onButtonSubmit}>Detect</button>
  </div>
</div>
</div>
)

}
export default ImageLinkInput;
