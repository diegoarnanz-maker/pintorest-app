import { Component } from '@angular/core';
import { PictureCardComponent } from "../picture-card/picture-card.component";
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CreatePictureFormComponent } from '../create-picture-form/create-picture-form.component';
import { AuthServiceService } from '../../services/Auth/auth-service.service';
import { PictureServiceService } from '../../services/Picture/picture-service.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [PictureCardComponent,
    PictureCardComponent,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  pictures = [];

  constructor(
    public dialog: MatDialog, 
    public authService: AuthServiceService,
    private pictureService: PictureServiceService
  ) { }

  handleopenCreatePictureForm() {
    this.dialog.open(CreatePictureFormComponent);
    console.log('open Create Picture Form');
  }
  
  ngOnInit() {
    this.authService.getUserProfile();
    this.pictureService.getPictures().subscribe()
    this.pictureService.pictureSubject.subscribe(
      (state)=>{
        console.log('state',state);
        this.pictures = state.pictures;
      }
    )
  }

}

