import { Component, Inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import { PictureServiceService } from '../../services/Picture/picture-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-picture-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatRadioModule],
  templateUrl: './update-picture-form.component.html',
  styleUrl: './update-picture-form.component.scss'
})
export class UpdatePictureFormComponent {

  pictureItem: any = {
    title: '',
    description: '',
    isFree: '',
    image: ''
  };

  constructor(@Inject(MAT_DIALOG_DATA) public picture: any, private pictureService: PictureServiceService) { }
  
  ngOnInit() {
    this.pictureItem = this.picture;
    if (!this.pictureItem.id) {
      console.error('ID is not defined');
    } else{
      console.log('ID is defined');
    }
  }

  onsubmit() {
    if (this.pictureItem && this.pictureItem.id) {
      this.pictureService.updatePicture(this.pictureItem).subscribe(
        response => {
          console.log('Update successful', response);
        },
        error => {
          console.error('Error updating picture', error);
        }
      );
      console.log('values', this.pictureItem);
    } else {
      console.error('Picture item is not valid or ID is missing');
    }
  }
  
  
}
