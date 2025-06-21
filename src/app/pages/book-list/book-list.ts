import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { BehaviorSubject, combineLatest, map, Observable, of } from 'rxjs';
import { BookCard } from '../../components/book-card/book-card';
import { BookForm } from '../../components/book-form/book-form';
import { Book } from '../../models/book';
import { BookService } from '../../services/book';

@Component({
  selector: 'book-list',
  imports: [AsyncPipe, BookCard, MatButton, MatFormField, MatLabel, MatInput],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookList implements OnInit {
  searchQuery$ = new BehaviorSubject('');
  public bookService = inject(BookService);
  dialog = inject(MatDialog);
  destroyRef = inject(DestroyRef);
  filteredBooks$: Observable<Book[]> = of([]);

  ngOnInit(): void {
    this.bookService.getBooks().subscribe();

    this.filteredBooks$ = combineLatest([
      this.bookService.books$,
      this.searchQuery$,
    ]).pipe(
      map(([books, query]) => {
        const filtered = books.filter((book) => {
          const matchTitle = book.title
            .toLowerCase()
            .includes(query.toLowerCase());
          const matchAuthor = book.author
            .toLowerCase()
            .includes(query.toLowerCase());
          const matchGenre = book.genre
            .toLowerCase()
            .includes(query.toLowerCase());

          return matchTitle || matchAuthor || matchGenre;
        });

        return filtered;
      })
    );
  }

  onSearch(query: any) {
    this.searchQuery$.next(query);
  }

  openDialog() {
    const dialogRef = this.dialog.open(BookForm);

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => this.bookService.addBook(res).subscribe());
  }
}
