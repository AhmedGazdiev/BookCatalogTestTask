import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Book } from '../../models/book';
import { CutTextPipe } from '../../pipes/cut-text-pipe';

@Component({
  selector: 'book-card',
  imports: [MatCardModule, MatButton, RouterLink, CutTextPipe],
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCard {
  public readonly book = input.required<Book>();
}
