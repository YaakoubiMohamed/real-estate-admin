import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AnnonceService } from '../../shared/services/annonce.service';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Annonce } from '../annonces-list/annonce.model';
import Swal from 'sweetalert2';
import villes from '../delegation.json';

@Component({
  selector: 'app-edit-annonce',
  templateUrl: './edit-annonce.component.html',
  styleUrls: ['./edit-annonce.component.scss']
})
export class EditAnnonceComponent implements OnInit {

  EditForm!: FormGroup; // bootstrap validation form
  date = new Date();
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  // Form submition
  formsubmit!: boolean;
  user: any;
  
  myFiles:string [] = [];
  private basePath = '/images';
  annonce!: Annonce;
  id: any;
  valid = false;
  public _countryList: { Gouvernorat: string; Delegations: string; Nbre: number; }[] = villes;
  delegations:string[] = [];

  constructor(public formBuilder: FormBuilder,private annoceservice: AnnonceService,
    private router: Router,private storage: AngularFireStorage,
    private actRoute: ActivatedRoute) { }
  

  async ngOnInit() {

    this.breadCrumbItems = [{ label: 'Annonce' }, { label: 'Modifier annonce', active: true }];
    this.user = JSON.parse(localStorage.getItem('userInfo') || '{}');
    this.actRoute.params.subscribe((params: Params) => this.id = params['id']);
    await this.getAnnonce(this.id);    
    this.getForm(); 
    this.formsubmit = false;
  }

  getForm(){    
    this.EditForm = this.formBuilder.group({
      titre: ['', [Validators.required]],
      prix: ['', [Validators.required]],
      surface: ['', [Validators.required]],
      nbr_piece: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      description: ['', [Validators.required]],
      type: ['', [Validators.required]],
      etage: ['', [Validators.required]],
      adresse: ['', Validators.required],
      ville: ['', Validators.required],
      delegation: ['', Validators.required],
      cpostal: ['', Validators.required],
      date: ['', Validators.required],
      available: ['', Validators.required],
      user: ['', Validators.required],
      photo: [''],
    });
    
  }

  getDelegation(ville:string){
    console.log(ville);
    this.delegations = [];
    let obj = this._countryList.find(data => data.Gouvernorat === ville);
//    console.log(obj);
    this.delegations = obj!.Delegations.split(',');
    console.log(this.delegations);
    
  }
  

  getAnnonce(id: string){
    this.annoceservice.getAnnonceByID(id).subscribe(data=>{
      this.annonce = data;
      console.log(data)
      this.date = this.annonce.date!.toDate();
      this.valid = true;
        
      this.EditForm.patchValue(this.annonce);
      this.EditForm.patchValue({
        ville: this.annonce.ville,
        delegation: this.annonce.delegation,
      });
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
      title: 'annonce modifier avec succés',
      showConfirmButton: false,
      timer: 5500
    });
  }

}
