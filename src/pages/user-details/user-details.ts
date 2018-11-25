import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { fn } from '@angular/compiler/src/output/output_ast';

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
      //validarfecha
      function validarFormatoFecha(campo) {
        var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
        if ((campo.match(RegExPattern)) && (campo!='')) {
              return true;
        } else {
              return false;
        }
      }
      //validar rut chileno
      var Fn = {
        validaRut: function(rutCompleto){
          if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)){
            return false;
          }
          var tmp = rutCompleto.split('-');
          var digv	= tmp[1]; 
          var rut = tmp[0];
          if ( digv == 'K' ) digv = 'k' ;
          return (Fn.dv(rut) == digv );   
        },

        dv: function(T){
          var M=0,S=1;
          for(;T;T=Math.floor(T/10)){
            S=(S+T%10*(9-M++%6))%11;
          }
          return S?S-1:'k';
        }
      }
      for(let index in data){
        if(a.id == data[index].id){
          console.log('encontrado!');
          var userN = document.getElementById("userName");
          userN.innerHTML = data[index].nombre + ' ' +data[index].apellido;
          var userRut = document.getElementById("userRut");
          var userRutStatus = document.getElementById("rutStatus");
          //Validar Rut 
          userRutStatus.innerHTML = Fn.validaRut(data[index].rut) ? 'Rut Válido' : 'Rut Inválido';
          userRutStatus.style.color = "red";
          userRut.innerHTML = data[index].rut;
          //Validar Fecha Nacimiento
          var fechaNac = document.getElementById("userFechanac");
          fechaNac.innerHTML = data[index].fechaNacimiento; //validar si fecha de nacimiento es válida
          var statusFechaNac = document.getElementById("statusFechaNac");
          statusFechaNac.innerHTML = validarFormatoFecha(data[index].fechaNacimiento) ? 'Formato fecha Válido' : 'Formato fecha Inválido';
          statusFechaNac.style.color = "red";

          var userPhone = document.getElementById("userPhone");
          userPhone.innerHTML = data[index].telefono;
          var userAddress = document.getElementById("userAddress");
          userAddress.innerHTML = data[index].direccion.calle +' #'+ data[index].direccion.numero;
          var userCity = document.getElementById("userCity");
          var comunaName = '';
          if(typeof data[index].direccion.comuna != 'object'){
            console.log('TIENE COMUNA', data[index].direccion.comuna);
            userCity.innerHTML = 'Comuna: '+(data[index].direccion.comuna ? data[index].direccion.comuna : 'Sin Información' );
          }
          else{
            userCity.innerHTML = 'Comuna: '+(data[index].direccion.comuna.nombre ? data[index].direccion.comuna.nombre : 'Sin Información');
          }  
        }
      }
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserDetailsPage');
  }

}
