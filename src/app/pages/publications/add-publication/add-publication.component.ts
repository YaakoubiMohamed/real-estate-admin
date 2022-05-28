import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PublicationService } from '../../shared/services/publication.service';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrls: ['./add-publication.component.scss']
})
export class AddPublicationComponent implements OnInit {

  PublicationForm!: FormGroup; // bootstrap validation form
  date = new Date();
  // bread crumb items
  breadCrumbItems!: Array<{}>;


  // Form submition
  formsubmit!: boolean;
  user: any;
  
  myFiles:string [] = [];
  private basePath = '/images';

  constructor(public formBuilder: FormBuilder,private annoceservice: PublicationService,
    private router: Router,private storage: AngularFireStorage) { }
  

  ngOnInit() {

    this.breadCrumbItems = [{ label: 'Publication' }, { label: 'Ajouter publication', active: true }];
    this.user = JSON.parse(localStorage.getItem('userInfo') || '{}');
   
    /**
     * Type validation form
     */
    this.PublicationForm = this.formBuilder.group({
      titre: ['', [Validators.required]],
      texte: ['', [Validators.required]],
      date: [this.date, Validators.required],
      user: [this.user, Validators.required],
      photo: [''],
    });

    this.formsubmit = false;
  }

  /**
   * Returns form
   */
  get form() {
    return this.PublicationForm.controls;
  }

 
  /**
   * Bootstrap tooltip form validation submit method
   */
  formSubmit() {
    this.formsubmit = true;
    
    // stop here if form is invalid
    if (this.PublicationForm.invalid) {
      console.log(this.PublicationForm.value);
      return;
  }
  else{
    console.log(this.PublicationForm.value);
    this.PublicationForm.controls['photo'].setValue(this.myFiles);
    this.annoceservice.addPublication(this.PublicationForm.value);
    this.position();
    this.router.navigate(['publications']);
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
      title: 'publication ajouté avec succés',
      showConfirmButton: false,
      timer: 5500
    });
  }

}
