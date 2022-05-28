import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PublicationService } from '../../shared/services/publication.service';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import Swal from 'sweetalert2';
import { Publication } from '../../shared/classes/publication';

@Component({
  selector: 'app-edit-publication',
  templateUrl: './edit-publication.component.html',
  styleUrls: ['./edit-publication.component.scss']
})
export class EditPublicationComponent implements OnInit {

  PublicationForm!: FormGroup; // bootstrap validation form
  date = new Date();
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  // Form submition
  formsubmit!: boolean;
  user: any;
  
  myFiles:string [] = [];
  private basePath = '/images';
  id: any;
  valid!: boolean;
  publication!: Publication;
  photo: string[] | undefined;
  newphoto: boolean = false;

  constructor(private actRoute: ActivatedRoute, public formBuilder: FormBuilder,private publicationservice: PublicationService,
    private router: Router,private storage: AngularFireStorage) { }
  

  async ngOnInit() {

    this.breadCrumbItems = [{ label: 'Publication' }, { label: 'Modifier Publication', active: true }];
    this.user = JSON.parse(localStorage.getItem('userInfo') || '{}');
    this.actRoute.params.subscribe((params: Params) => this.id = params['id']);
    await this.getAnnonce(this.id);  
    /**
     * Type validation form
     */
    this.PublicationForm = this.formBuilder.group({
      titre: ['', [Validators.required]],
      texte: ['', [Validators.required]],
      date: ['', Validators.required],
      user: ['', Validators.required],
      photo: [''],
    });

    this.formsubmit = false;
  }

  getForm(){    
    this.PublicationForm = this.formBuilder.group({
      titre: [this.publication.titre, [Validators.required]],
      texte: [this.publication.texte, [Validators.required]],
      date: [this.publication.date, [Validators.required]],
      user: [this.publication.user, Validators.required],
      photo: [''],
    });
    
  }
  

  getAnnonce(id: string){
    this.publicationservice.getPublicationByID(id).subscribe(data=>{
      this.publication = data;
      console.log(data)
      this.date = this.publication.date!.toDate();
      this.photo = this.publication.photo;
      this.valid = true;
      this.getForm();      
    })
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
      if(this.newphoto){
      this.PublicationForm.controls['photo'].setValue(this.myFiles);
      }
      else{
        this.PublicationForm.controls['photo'].setValue(this.photo);
      }
      this.publicationservice.updatePublication(this.PublicationForm.value,this.id);
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
          this.newphoto = true;
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
