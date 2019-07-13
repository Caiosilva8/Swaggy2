import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-finalizar-compra',
  templateUrl: './finalizar-compra.page.html',
  styleUrls: ['./finalizar-compra.page.scss'],
})
export class FinalizarCompraPage implements OnInit {

  idUsuario : string;
  //finalizar : FinalizarCompraPage = new FinalizarCompraPage();
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };
  formGroup : FormGroup;

  constructor(public formBuilder : FormBuilder,
              public toastController : ToastController,
              public router : Router,
              public loadingController : LoadingController,
              public firebaseauth : AngularFireAuth) {

                this.firebaseauth.authState.subscribe(obj=>{
                  this.idUsuario = this.firebaseauth.auth.currentUser.uid;

                  let ref = this.firestore.collection('finalizar/').doc(this.idUsuario)
                  ref.get().then(doc=>{
                    this
                  })
                })
    this.formulario();
   }

  ngOnInit() {
  }

  formulario(){
    this.formGroup = this.formBuilder.group({
      cep : [],
      cpf : [],
      identidade : [],
      celular : [],
      bairro : [],
      endereco : [],
      numero : [],
      complemento : [],
      pontoR : []
    })
  }

  atualizar(){
    let ref = this.firestore.collection('finalizar')
    ref.doc(this.idUsuario).set(this.formGroup.value)
    .then(()=>{
      this.toast('Atualizado com sucesso');
      //this.router.navigate(['']);
      this.loadingController.dismiss();
    }).catch(()=>{
      this.toast('Erro ao Atualizar')
    })
  }

  async toast(msg : string) {
    const toast = await this.toastController.create({
      message: 'Cadastrado com sucesso!',
      duration: 2000
    });
    toast.present();
  }

  async loading() {
    const loading = await this.loadingController.create({
      message: 'Carregando',
      duration: 2000
    });
    await loading.present();
  }
}
