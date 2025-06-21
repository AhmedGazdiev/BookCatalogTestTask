import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'book-form',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  templateUrl: './book-form.html',
  styleUrl: './book-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookForm {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<BookForm>);
  genres: string[] = [
    'Фантастика',
    'Детектив',
    'Роман',
    'Научная литература',
    'Биография',
    'Поэзия',
  ];
  languages: string[] = [
    'Русский',
    'Английский',
    'Французский',
    'Немецкий',
    'Испанский',
  ];

  public bookForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    author: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', [Validators.maxLength(500)]],
    genre: ['', Validators.required],
    pages: [
      '',
      [Validators.required, Validators.min(1), Validators.max(10000)],
    ],
    language: ['', Validators.required],
  });

  onSubmit() {
    if (this.bookForm.valid) {
      this.dialogRef.close(this.bookForm.value);
    }
  }
}
