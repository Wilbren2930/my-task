import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
 
  currentUser:boolean;

  collection: AngularFirestoreCollection<any>;
  coll: Observable<any[]>;

  afss: AngularFirestore;
  id:string;
  
  constructor(afs: AngularFirestore,public afAuth: AngularFireAuth, private router: Router) { 
    this.afss = afs;
  }

  onLoginEmail(email:string, pass:string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, pass)
      .then(userData => resolve(this.id = userData.user.uid))
      .catch(err => reject(err))
    });
  }
  onRegister(email:string, pass:string){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then(userData => resolve(userData))
      .catch( err => reject(err))
    });
  }
  logoutUser(){
    return this.afAuth.auth.signOut();
  } 
  saveTask(taskDescription:string): void{
    this.collection = this.afss.collection<any>(this.id);
    const obj = 
      {
        task: taskDescription,
        fecha: Date.now.toString(),
      }
  
    this.collection.add(obj);
  }
  getAllTask(){
    this.collection = this.afss.collection<any>(this.id);
    this.coll = this.collection.valueChanges();
    return this.coll;
  }
}
