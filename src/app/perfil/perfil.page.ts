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

  firestore = firebase.firestore();
  settings = {timestampsInSnapshots: true};

  constructor(public firebaseauth : AngularFireAuth,
              public router : Router) {
    
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

  ngOnInit() {
  }

}
