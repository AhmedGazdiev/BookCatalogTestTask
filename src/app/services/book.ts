import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Book } from '../models/book';
import { API_URL } from './url';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly url = inject(API_URL);
  private readonly http = inject(HttpClient);
  private booksSubject$ = new BehaviorSubject<Book[]>([]);
  public readonly books$ = this.booksSubject$.asObservable();

  public addBook(payload: Partial<Book>): Observable<Book> {
    return this.http
      .post<Book>(`${this.url}/books`, {
        title: payload.title,
        author: payload.author,
        description: payload.description,
        publishedDate: new Date().toISOString(),
        genre: payload.genre,
        pages: payload.pages,
        language: payload.language,
      })
      .pipe(
        tap((res) => {
          this.booksSubject$.next([...this.booksSubject$.value, res]);
          console.log('successful added book!');
        }),
        catchError((error) => {
          console.error("couldn't add book:", error);
          return throwError(() => new Error('Не удалось добавить кнугу'));
        })
      );
  }

  public getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.url}/books`).pipe(
      tap((res) => {
        this.booksSubject$.next([...res]);
      }),
      catchError((error) => {
        console.error("couldn't get books:", error);
        return throwError(() => new Error('Не удалось получить книги'));
      })
    );
  }

  public getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.url}/books/${id}`).pipe(
      catchError((error) => {
        console.error("couldn't get books:", error);
        return throwError(() => new Error('Не удалось получить книгу по id'));
      })
    );
  }
}
