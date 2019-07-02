import { Cliente } from './../model/cliente';
import { Camera, CameraOptions, CameraPopoverOptions  } from '@ionic-native/camera';
import { Perfil } from './../model/perfil';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  idUsuario : string;
  perfil : Perfil = new Perfil();
  picture : string;
  cameraOn : boolean = false;

  firestore = firebase.firestore();
  settings = {timestampsInSnapshots: true};

  constructor(public firebaseauth : AngularFireAuth,
              public router : Router,
              public fire : AngularFireAuth) {
    
    this.firebaseauth.authState.subscribe(obj=>{
      
      this.idUsuario = this.firebaseauth.auth.currentUser.uid;

      let ref = this.firestore.collection('perfil/').doc(this.idUsuario)
      ref.get().then(doc=> {
          this.perfil.setDados(doc.data());
          console.log(this.perfil);
      });

    });

    

  }

  edt(){
    this.router.navigate(['perfil-view']);
  }

  logoff(){
    this.fire.auth.signOut().then(()=>{
      this.router.navigate(['/home']);
    }).catch(()=>{
      this.router.navigate(['/list']);
    })
  }

  ngOnInit() {
  }


  options: CameraOptions = {
    quality: 100,
    destinationType: Camera.DestinationType.DATA_URL,
    encodingType: Camera.EncodingType.JPEG,
    mediaType: Camera.MediaType.PICTURE
  }

  getPhoto(){
  Camera.getPicture(this.options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    console.log(base64Image);
   }, (err) => {
    // Handle error
   });

  }
}
