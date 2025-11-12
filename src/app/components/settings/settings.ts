import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormField, MatInput, MatInputModule } from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { signal } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatChipInputEvent,MatChipEditedEvent } from '@angular/material/chips';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
export interface Fruit{
  name:string;
}
@Component({
  selector: 'app-settings',
  imports: [MatCard,MatInputModule,MatFormFieldModule,MatChipsModule,
        MatButtonModule,
    MatFormFieldModule,
    MatChipsModule,
    ReactiveFormsModule
    ,MatIconModule,MatIcon],
   changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  readonly reactiveKeywords = signal(['groceries', 'transport', 'food', 'other']);
  readonly formControl = new FormControl(['angular']);
  announcer = inject(LiveAnnouncer);
  removeReactiveKeyword(keyword: string) {
  this.reactiveKeywords.update(keywords => {
    const index = keywords.indexOf(keyword);
      if (index < 0) {
        return keywords;
      }
      keywords.splice(index, 1);
      this.announcer.announce(`removed ${keyword} from reactive form`);
      return [...keywords];
    });
  }
   addReactiveKeyword(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.reactiveKeywords.update(keywords => [...keywords, value]);
      this.announcer.announce(`added ${value} to reactive form`);
    }
    event.chipInput!.clear();
}
}