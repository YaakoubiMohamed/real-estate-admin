import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AnnonceService } from '../../shared/services/annonce.service';
import { MustMatch } from './validation.mustmatch';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import Swal from 'sweetalert2';
import villes from '../delegation.json';

@Component({
  selector: 'app-add-annonce',
  templateUrl: './add-annonce.component.html',
  styleUrls: ['./add-annonce.component.scss']
})
export class AddAnnonceComponent implements OnInit {

  AnnonceForm!: FormGroup; // bootstrap validation form
  date = new Date();
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  // Form submition
  formsubmit!: boolean;
  user: any;
  
  myFiles:string [] = [];
  private basePath = '/images';
  //villes= ['Tunis','sfax','gabes'];
  public _countryList: { Gouvernorat: string; Delegations: string; Nbre: number; }[] = villes;
  delegations:string[] = [];


  constructor(public formBuilder: FormBuilder,private annoceservice: AnnonceService,
    private router: Router,private storage: AngularFireStorage) { }
  

  ngOnInit() {

    this.breadCrumbItems = [{ label: 'Annonce' }, { label: 'Ajouter annonce', active: true }];
    this.user = JSON.parse(localStorage.getItem('userInfo') || '{}');
   
    /**
     * Type validation form
     */
    this.AnnonceForm = this.formBuilder.group({
      titre: ['', [Validators.required]],
      prix: ['', [Validators.required]],
      surface: ['', [Validators.required]],
      nbr_piece: ['', [Validators.required]],
      description: ['', [Validators.required]],
      type: ['', [Validators.required]],
      etage: ['', [Validators.required]],
      adresse: ['', Validators.required],
      ville: ['', Validators.required],
      delegation: ['', Validators.required],
      cpostal: ['', Validators.required],
      date: [this.date],
      available: [true],
      user: [this.user],
      photo: [''],
    });

    this.formsubmit = false;
  }

  /**
   * Returns form
   */
  get form() {
    return this.AnnonceForm.controls;
  }

  getDelegation(ville:string){
    console.log(ville);
    this.delegations = [];
    let obj = this._countryList.find(data => data.Gouvernorat === ville);
//    console.log(obj);
    this.delegations = obj!.Delegations.split(',');
    console.log(this.delegations);
    
  }

 
  /**
   * Bootstrap tooltip form validation submit method
   */
  formSubmit() {
    this.formsubmit = true;
    
    // stop here if form is invalid
    if (this.AnnonceForm.invalid) {
      console.log(this.AnnonceForm.value);
      return;
  }
  else{
    console.log(this.AnnonceForm.value);
    this.AnnonceForm.controls['photo'].setValue(this.myFiles);
    this.annoceservice.addAnnonce(this.AnnonceForm.value);
    this.position();
    this.router.navigate(['annonces']);
  }
    
  }

  onFileChange(event:any) {
   
    for (var i = 0; i < event.target.files.length; i++) { 
        //this.myFiles.push(event.target.files[i]);
        this.upload(event.target.files[i]);
        console.log(event.target.files[i].name)
    }
    console.log(this.myFiles);
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
          console.log(downloadURL);
          this.myFiles.push(downloadURL);
        });
      })
    ).subscribe();
  }

  position() {
    Swal.fire({
      //position: 'top-end',
      icon: 'success',
      title: 'annonce ajouté avec succés',
      showConfirmButton: false,
      timer: 5500
    });
  }

}
