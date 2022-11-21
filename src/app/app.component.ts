import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SnakeBarService } from './services/snake-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-material-crud';

  public displayedColumns: string[] = ['name', 'category', 'date', 'freshness', 'price', 'comment', 'actions'];
  public dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(public dialog: MatDialog
    , private api: ApiService
    , private snakeBar: SnakeBarService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  openDialog(): void {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(value => {
      if (value === 'save') {
        this.getAllProducts();
      }
    });
  }

  getAllProducts(): void {
    this.api.getProduct()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          this.snakeBar.open('Unable to get data from server.')
        }
      });
  }

  edit(row: any): void {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(value => {
      if (value === 'update') {
        this.getAllProducts();
      }
    });
  }

  delete(id: number): void {
    this.api.deleteProduct(id).subscribe({
      next: (res) => {
        this.snakeBar.open('Product deleted successfully.')
      },
      error: (err) => {
        this.snakeBar.open('Error while deleting the product.')
      }
    })

    this.getAllProducts();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
