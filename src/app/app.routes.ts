import { Routes } from '@angular/router';
import { BookDetails } from './pages/book-details/book-details';
import { BookList } from './pages/book-list/book-list';

export const routes: Routes = [
  { path: 'books', component: BookList },
  { path: 'books/:id', component: BookDetails },
  { path: '', redirectTo: 'books', pathMatch: 'full' },
];
