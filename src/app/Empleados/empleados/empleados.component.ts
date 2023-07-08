import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { Empleado } from 'src/app/Interfaces/empleado';
import { EmpleadoService } from 'src/app/Services/empleado.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogoAddEditComponent } from 'src/app/Dialogs/dialogo-add-edit/dialogo-add-edit.component';
import { DialogoDeleteComponent } from 'src/app/Dialogs/dialogo-delete/dialogo-delete.component';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements AfterViewInit, OnInit {
  
  displayedColumns: string[] = [
    'creado', 
    'registrado por', 
    'dpi', 
    'nombre', 
    'hijos', 
    'salario base', 
    'bono decreto', 
    'igss', 
    'irtra', 
    'bono paternidad', 
    'salario total', 
    'salario liquido',
    'acciones'];
  dataSource = new MatTableDataSource<Empleado>();

  constructor(
   private _empleadoServicio: EmpleadoService,
   public dialog: MatDialog,
   private snack_bar: MatSnackBar,
   private router: Router
  ){

  }

   
  ngOnInit(): void {
    this.getEmpleadosList();
  }
  
@ViewChild(MatPaginator)paginator!:MatPaginator;

ngAfterViewInit(){
  this.dataSource.paginator = this.paginator;
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

getEmpleadosList(){
  this._empleadoServicio.getAllEmpleados().subscribe(
    (dataResponse: any) => {
      console.log(dataResponse);
      this.dataSource.data = dataResponse.empleadosDetail;
    },
    (error) => {
      console.error(error);   }
  );
}

openDialog() {
  this.dialog.open(DialogoAddEditComponent, {
    disableClose: true,
    width: "350px"
  }).afterClosed().subscribe(resultado =>{
    if(resultado === "creado") {
      this.getEmpleadosList();
    }
  });
}

openDialogEdit(modelo: Empleado) {
  this.dialog.open(DialogoAddEditComponent, {
    disableClose: true,
    width: "350px",
    data: modelo
  }).afterClosed().subscribe(resultado =>{
    if(resultado === "editado") {
      this.getEmpleadosList();
    }
  });
}



openSnackBar(msg: string, accion: string) {
  this.snack_bar.open(msg, accion,{
    horizontalPosition:"end",
    verticalPosition: "top",
    duration: 3000
  });
}

openDialogDelete(modelo: Empleado) {
    this.dialog.open(DialogoDeleteComponent, {
      disableClose: true,
      data: modelo
    }).afterClosed().subscribe(resultado =>{
      if(resultado === "eliminar") {
        this._empleadoServicio.deleteEmpleado(modelo.id).subscribe({
          next:(data) =>{
            this.openSnackBar("Empleado eliminado correctamente", "Listo");
            this.getEmpleadosList();
          }
        })
      }
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['']);
  }

}
