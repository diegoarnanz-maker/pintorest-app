import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import { PictureServiceService } from '../../services/Picture/picture-service.service';

@Component({
  selector: 'app-create-picture-form',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatRadioModule],
  templateUrl: './create-picture-form.component.html',
  styleUrl: './create-picture-form.component.scss'
})
export class CreatePictureFormComponent {

  pictureItem: any = {
    title: '',
    description: '',
    isFree: '',
    image: ''
  };

  constructor(private pictureService: PictureServiceService) {}

  onsubmit() {
    console.log('submit', this.pictureItem);
    this.pictureService.createPicture(this.pictureItem).subscribe(
      {
        next: data => console.log('created picture', data),
        error: error => console.log('error ', error)
      }
    );
  }
}
