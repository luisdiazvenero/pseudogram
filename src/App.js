import React, { Component } from 'react';
import firebase from 'firebase';
import FileUpload from './FileUpload';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      pictures: [],
      uploadValue: 0,
      imgSource: ''
    };

    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(user=> {
      this.setState({ user });
    });

    firebase.database().ref('pictures').on('child_added', snapshot => {
      this.setState({
        pictures: this.state.pictures.concat(snapshot.val())
      })
    })



  }

  handleAuth(){
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesion`))
      .catch(error => console.log(`Error: ${error.code}: ${error.message}`))
  }

  handleLogout(){
    firebase.auth().signOut()
    .then(result => console.log(`${result.user.email} ha salido`))
    .catch(error => console.log(`Error: ${error.code}: ${error.message}`))
  }

  handleUpload(event){
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`/fotogram/${file.name}`);
    const task = storageRef.put(file);

    // Listener que se ocupa del estado de la carga del fichero
    task.on('state_changed', snapshot => {
      // Calculamos el porcentaje de tamaño transferido y actualizamos
      // el estado del componente con el valor
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
      this.setState({
        uploadValue: percentage
      })

    }, error => {
      console.log(error.message)
    }, () => {
      task.snapshot.ref.getDownloadURL().then(downloadURL =>{
        const record = {
          photoURL: this.state.user.photoURL,
          displayName: this.state.user.displayName,
          imgSource: downloadURL
        }
        console.log(record);

        // creamos la referencia a la DB
        const dbRef = firebase.database().ref('pictures');

        // insertamos registro a la DB
        const newPicture = dbRef.push();
        newPicture.set(record);
      })

      });
  }

  renderLoginButton(){
    // Si el usuario esta logueado
    if(this.state.user){
      return (
        <div>
          <img width="100" src={this.state.user.photoURL} alt={this.state.user.displayName}/>
          <p>Hola {this.state.user.displayName}!</p>
          <button onClick={this.handleLogout}>Salir</button>
          <FileUpload onUpload={this.handleUpload}/>

          {
            this.state.pictures.map(picture => (
              <div>
                <img src={picture.imgSource} alt=""/>
                <br/>
                <img width="32" src={picture.photoURL} alt={picture.displayName}/>
                <br/>
                <span>{picture.displayName}</span>
              </div>
            ))
          }

        </div>
      );
    } else {
    // Si no lo esta
    return(<button onClick={this.handleAuth}>Login con Google</button>)

    }

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Pseudogram</h1>
        </header>
        <div className="App-intro"> {this.renderLoginButton()} </div>
      </div>
    );
  }
}

export default App;
