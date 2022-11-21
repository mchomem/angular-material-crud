import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { SnakeBarService } from '../services/snake-bar.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  public freshnessList: string[] = ["Brand New", "Second Hand", "Refurbished"];
  public productForm !: FormGroup;
  public actionButtonLabel: string = "Save";

  constructor(private formBuilder: FormBuilder
    , private api: ApiService
    , @Inject(MAT_DIALOG_DATA) public editData: any
    , private snackBar: SnakeBarService
    , private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.initForm();

    if (this.editData) {

      this.actionButtonLabel = "Update";

      this.productForm.controls['name'].setValue(this.editData.name);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
    }
  }

  initForm(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required]
    });
  }

  //  https://www.youtube.com/watch?v=jGbP620NahE&t=3121s

  addProduct(): void {
    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value)
          .subscribe({
            next: (res) => {
              this.snackBar.open('Product added succefully');
              this.productForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              this.snackBar.open('Error while product adding');
            }
          });
      }

    } else {
      this.updateProduct();
    }
  }

  updateProduct(): void {
    this.api.updateProduct(this.editData.id, this.productForm.value)
      .subscribe({
        next: (res) => {
          this.snackBar.open('Product updated succefully');
          this.productForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          this.snackBar.open('Error while product updating');
        }
      });
  }
}
