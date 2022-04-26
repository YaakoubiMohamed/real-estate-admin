import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { revenueBarChart, statData } from './data';
import { finalize } from 'rxjs/operators';

import { ChartType } from './profile.model';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

/**
 * Contacts-profile component
 */
export class ProfileComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  registerForm!: FormGroup;
  submitted = false;
  img!: string;

  revenueBarChart!: ChartType;
  statData!: { icon: string; title: string; value: string; }[];
  user: any;
  uploaded: boolean = false;
  constructor(private fb: FormBuilder,private storage: AngularFireStorage, private userservice: UserService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Profile', active: true }];
    this.user = JSON.parse(localStorage.getItem('userInfo') || '{}');
    console.log(this.user);

    // fetches the data
    this._fetchData();
    this.registerForm = this.fb.group({
      nom: [this.user.nom, [Validators.required]],
      prenom: [this.user.prenom, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      telephone: [this.user.telephone, [Validators.required]],
      adresse: [this.user.adresse, [Validators.required]],
      grade: [this.user.grade],
      photo: [''],
    });
  }

  /**
   * Fetches the data
   */
  private _fetchData() {
    this.revenueBarChart = revenueBarChart;
    this.statData = statData;
  }

  register() {
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      console.log('formulaire invalide');
      return;
    }
    else {
      console.log('formulaire valide');
      if(this.uploaded){
      this.registerForm.controls['photo'].setValue(this.img);
      }
      else{
        this.registerForm.controls['photo'].setValue(this.user.photo);
      }
      let user ={};
       user = this.registerForm.value;
       console.log(user);
      this.userservice.updateUser(user,this.user.id).then(data => {
        console.log(data);
      });
    }
  }

  get f() { return this.registerForm.controls; }

  onFileChange(event:any) {
   
        //this.myFiles.push(event.target.files[i]);
        this.upload(event.target.files[0]);
  }


  upload(fileUpload: { name: string; }) {
    const path = `/images/${fileUpload.name}`;
    console.log(path);
    const storageReference = this.storage.ref('/images/' + fileUpload.name);
    console.log(storageReference);
    const uploadTask = this.storage.upload(path,(fileUpload));
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageReference.getDownloadURL().subscribe(downloadURL => {
         
          //this.publicationForm.controls.photo.setValue(downloadURL);
          //fileUpload.name = fileUpload.file.name;
          this.img = downloadURL;
          console.log(downloadURL);
          this.uploaded = true;
        });
      })
    ).subscribe();
  }
}
