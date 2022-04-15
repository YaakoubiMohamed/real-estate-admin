import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AnnonceService } from '../../shared/services/annonce.service';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Annonce } from '../annonces-list/annonce.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-annonce',
  templateUrl: './edit-annonce.component.html',
  styleUrls: ['./edit-annonce.component.scss']
})
export class EditAnnonceComponent implements OnInit {

  EditForm: FormGroup; // bootstrap validation form
  date = new Date();
  // bread crumb items
  breadCrumbItems: Array<{}>;

  // Form submition
  formsubmit: boolean;
  user: any;
  
  myFiles:string [] = [];
  private basePath = '/images';
  annonce: Annonce;
  id: any;
  valid = false;

  constructor(public formBuilder: FormBuilder,private annoceservice: AnnonceService,
    private router: Router,private storage: AngularFireStorage,
    private actRoute: ActivatedRoute) { }
  

  async ngOnInit() {

    this.breadCrumbItems = [{ label: 'Forms' }, { label: 'Form Validation', active: true }];
    this.user = JSON.parse(localStorage.getItem('userInfo'));
    this.actRoute.params.subscribe((params: Params) => this.id = params['id']);
    await this.getAnnonce(this.id);    
    
    this.formsubmit = false;
  }

  getForm(){    
    this.EditForm = this.formBuilder.group({
      titre: [this.annonce.titre, [Validators.required]],
      prix: [this.annonce.prix, [Validators.required]],
      surface: [this.annonce.surface, [Validators.required]],
      nbr_piece: [this.annonce.nbr_piece, [Validators.required, Validators.pattern('[0-9]+')]],
      description: [this.annonce.description, [Validators.required]],
      type: [this.annonce.type, [Validators.required]],
      etage: [this.annonce.etage, [Validators.required]],
      adresse: [this.annonce.adresse, Validators.required],
      date: [this.annonce.date, Validators.required],
      available: [this.annonce.available, Validators.required],
      user: [this.annonce.user, Validators.required],
      photo: [''],
    });
    
  }
  

  getAnnonce(id){
    this.annoceservice.getAnnonceByID(id).subscribe(data=>{
      this.annonce = data;
      console.log(data)
      this.date = this.annonce.date.toDate();
      this.valid = true;
      this.getForm();      
    })
  }

  /**
   * Returns form
   */
  get form() {
    return this.EditForm.controls;
  }

 
  /**
   * Bootstrap tooltip form validation submit method
   */
  formSubmit() {
    this.formsubmit = true;
    
    // stop here if form is invalid
    if (this.EditForm.invalid) {
      console.log(this.EditForm.value);
      return;
  }
  else{
    console.log(this.EditForm.value);
    this.EditForm.controls['photo'].setValue(this.myFiles);
    this.annoceservice.updateAnnonce(this.EditForm.value,this.id);
    this.position;
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


  upload(fileUpload) {
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
      title: 'annonce modifier avec succés',
      showConfirmButton: false,
      timer: 5500
    });
  }

}
