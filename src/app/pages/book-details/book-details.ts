import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Book } from '../../models/book';
import { BookService } from '../../services/book';

@Component({
  selector: 'book-details',
  imports: [DatePipe, RouterLink, MatCardModule, MatButton],
  templateUrl: './book-details.html',
  styleUrl: './book-details.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetails implements OnInit {
  private bookService = inject(BookService);
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  public book = signal<Book | null>(null);
  id: string | null = null;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.bookService
      .getBookById(this.id as string)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => this.book.set(res));
  }
}
