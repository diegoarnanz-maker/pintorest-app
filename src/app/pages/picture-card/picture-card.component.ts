import {Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { UpdatePictureFormComponent } from '../update-picture-form/update-picture-form.component';
import { PictureServiceService } from '../../services/Picture/picture-service.service';

@Component({
  selector: 'app-picture-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatButtonModule, MatIconModule],
  templateUrl: './picture-card.component.html',
  styleUrl: './picture-card.component.scss'
})
export class PictureCardComponent {

  @Input() picture: any;
  @Input() toggle: any;

  constructor(public dialog: MatDialog, private pictureService: PictureServiceService) {}
  
  handleOpenEditPictureForm() {
    this.dialog.open(UpdatePictureFormComponent, {
      data: this.picture
    });
    console.log('Open edit picture form');
  }
  ngOnInit() {
    console.log("toggle", this.toggle);
  }

  handleDeletePicture() {
    this.pictureService.deletePicture(this.picture.id).subscribe();
  }

}
