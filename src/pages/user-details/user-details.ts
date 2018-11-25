import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the UserDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {
  user: object;
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider) {
    this.user = navParams.get('data');
    this.getUserDetails(this.user);
  }
  getUserDetails(a) {
    this.restProvider.getUsers()
    .then(data => {
      console.log('user_sent', a);
      console.log('DATAA!', data);
      for(let index in data){
        if(a.id == data[index].id){
          console.log('encontrado!');
          var userN = document.getElementById("userName");
          userN.innerHTML = data[index].nombre + ' ' +data[index].apellido;
          var userRut = document.getElementById("userRut");
          userRut.innerHTML = data[index].rut;//validar si rut es valido o no
          var fechaNac = document.getElementById("userFechanac");
          fechaNac.innerHTML = data[index].fechaNacimiento; //validar si fecha de nacimiento es válida
          var userPhone = document.getElementById("userPhone");
          userPhone.innerHTML = data[index].telefono;
          var userAddress = document.getElementById("userAddress");
          userAddress.innerHTML = data[index].direccion.calle +' #'+ data[index].direccion.numero;
          var userCity = document.getElementById("userCity");
          var comunaName = '';
          if(typeof data[index].direccion.comuna != 'object'){
            console.log('TIENE COMUNA', data[index].direccion.comuna);
            userCity.innerHTML = 'Comuna: '+data[index].direccion.comuna;
          }
          else{
            userCity.innerHTML = 'Comuna: '+data[index].direccion.comuna.nombre;
          }  
        }
      }
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDetailsPage');
  }

}
