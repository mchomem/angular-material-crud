import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnakeBarService {

  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private snakeBarMessageBox: MatSnackBar) { }

  open(message: string): void {
    this.snakeBarMessageBox.open
      (
        message
        , 'Close'
        , {
          duration: 5000
          , horizontalPosition: this.horizontalPosition
          , verticalPosition: this.verticalPosition
        }
      );
  }
}
