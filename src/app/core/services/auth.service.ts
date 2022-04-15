import { User } from './../../pages/shared/classes/user';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import * as auth from 'firebase/auth';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {
  

    userData: any; // Save logged in user data
     //errorCode:FirebaseAuthException;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    private firestore: Firestore,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }


  // Sign in with email/password
  login(email,password) {
      console.log(email,password);
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(async (result) => {
          console.log('user',result.user);
        await this.SetUserData(result.user).subscribe(res => {
          localStorage.setItem('userInfo',JSON.stringify(res));
          console.log(res);
          this.router.navigate(['']);
        });
      })
      
      .catch((error) => {
        console.log(error.message);
      });
      
  }





  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
  // Reset Forggot password
  resetPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }


  changePassword(token, newPassword) {
    return this.afAuth.confirmPasswordReset(token, newPassword);
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['dashboard']);
      }
    });
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  
  
  
  SetUserData(user: any) {
    const userRef = doc(this.firestore, `users/${user.uid}`);
    console.log(userRef);
    return docData(userRef, { idField: 'id' }) as Observable<User>;
  }



  // Sign out
  logout() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/account/login']);
    });
  }
}

