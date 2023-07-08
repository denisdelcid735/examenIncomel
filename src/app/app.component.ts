import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

import { Empleado, EmpleadoResponse } from './Interfaces/empleado';
import { EmpleadoService } from './Services/empleado.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogoAddEditComponent } from './Dialogs/dialogo-add-edit/dialogo-add-edit.component';
import { DialogoDeleteComponent } from './Dialogs/dialogo-delete/dialogo-delete.component';


import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  
    


}
