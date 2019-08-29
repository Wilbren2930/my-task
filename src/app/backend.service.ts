import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TaskInterface } from './models/task';
import { take, map, tap } from 'rxjs/operators';
import { formatDate, getLocaleDateTimeFormat } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
 
  currentUser:boolean;

  taskDoc: AngularFirestoreDocument<string>;
  collection: AngularFirestoreCollection<TaskInterface>;
  coll: Observable<TaskInterface[]>;
  afss: AngularFirestore;
  id:string;

  constructor(afs: AngularFirestore, public afAuth: AngularFireAuth, private router: Router) { 
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
    this.collection = this.afss.collection<TaskInterface>(this.id);
    const mydate = new Date().toTimeString();
    const obj: TaskInterface =
      {
        taskDescription: taskDescription,
        fecha: mydate,
        userUid: this.id,
      }
  
    this.collection.add(obj);
  }

  getAllTask(){
    this.id = this.afAuth.auth.currentUser.uid.toString();
    this.collection = this.afss.collection<TaskInterface>(this.id, ref => ref.orderBy('fecha'));
    return this.coll = this.collection.snapshotChanges()
    .pipe(map( changes => {
      return changes.map( action =>{
          const data = action.payload.doc.data() as TaskInterface;
          data.id = action.payload.doc.id;
          return data;
      });
    }));
  }

  deleteOneTask(id:string): void{
    this.taskDoc = this.afss.doc(`${this.id}/${id}`);
    this.taskDoc.delete();
  }
}
