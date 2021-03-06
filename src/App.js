import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkInput from './components/Input/ImageLinkInput';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Clarifai from 'clarifai';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css';


const app = new Clarifai.App({
 apiKey: 'b8d79f8736064e30b90d632460bd8d47'
});


const particleOptions={
  particles: {
    number:{
      value:80,
      density:{
        enable:true,
        value_area:400
      }
    }

  },

}
const initialState={
  input: '',
  imageURL:'',
  box:[],
  route:'signin',
  isSignedIn:false,
  user:{
    id:'',
    name:'',
    email:'',
    entries:0,
    join:''
  }
}

class App extends Component {

  state=initialState;

  loadUser=(data)=>{
    this.setState({user:{
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      join:data.join
    }})
  }


onInputChange=(e)=>{
this.setState({input:e.target.value});

}
calculateFaceLocation=(data)=>{
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;

   const image = document.getElementById('inputimage');
   const width = Number(image.width);
   const height = Number(image.height);

   return {
   leftCol: clarifaiFace.left_col * width,
   topRow: clarifaiFace.top_row * height,
   rightCol: width - (clarifaiFace.right_col * width),
   bottomRow: height - (clarifaiFace.bottom_row * height)
   }

   }



displayBox=(box)=>{

  this.setState({box})
  console.log(box);
}

onButtonSubmit=()=>{
  this.setState({imageURL:this.state.input})
  app.models
  .predict(
    Clarifai.FACE_DETECT_MODEL,
     this.state.input)
    .then(response =>{
      if(response){
        fetch('http://localhost:3001/image', {
          method:'put',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            id:this.state.user.id
        })
      })
      .then(response=>response.json())
      .then(count=>{
        this.setState(Object.assign(this.state.user, {entries:count}))
      })
      }
      this.displayBox(this.calculateFaceLocation(response))
        })
    .catch(err=>console.log(err));


}


onRouteChange=(route)=>{
  if(route==='signout'){
    this.setState({initialState})
  }else if(route==='home'){
    this.setState({isSignedIn:true})
  }
  this.setState({route:route})
}


  render() {

    return (
      <div className="App">

        <Particles className='Particles'
              params={particleOptions}/>
        <Navigation onRouteChange={this.onRouteChange}
          isSignedIn={this.state.isSignedIn}/>
      {this.state.route ==='home'
         ? <div><Logo/>
        <h1 className="f1">Prepoznaj Lice</h1>

          <Rank
          name={this.state.user.name}
          entries={this.state.user.entries}

        />

        <ImageLinkInput
           onInputChange={this.onInputChange}
           onButtonSubmit={this.onButtonSubmit}
         />

    <FaceRecognition
    imageURL={this.state.imageURL}
    box={this.state.box}/>

</div>
   :  (
    this.state.route==='signin' ?
    <SignIn
      loadUser={this.loadUser}
      onRouteChange={this.onRouteChange}/>
    :<Register
      loadUser={this.loadUser}
      onRouteChange={this.onRouteChange} />
   )

    }
      </div>
    );
  }
}

export default App;
