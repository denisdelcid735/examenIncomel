import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';

import { MAT_DATE_FORMATS } from '@angular/material/core';

import * as moment from 'moment';

import { Empleado } from 'src/app/Interfaces/empleado';
import { EmpleadoService } from 'src/app/Services/empleado.service';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
}

@Component({
  selector: 'app-dialogo-add-edit',
  templateUrl: './dialogo-add-edit.component.html',
  styleUrls: ['./dialogo-add-edit.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ]
})
export class DialogoAddEditComponent implements OnInit {
formEmpleado: FormGroup;
tituloAccion: string = 'Nuevo';
botonAccion: string = 'Guardar';



constructor(
  private dialogoReferencia: MatDialogRef<DialogoAddEditComponent>,
  private fb: FormBuilder,
  private _snackBar: MatSnackBar,
  private _empleadoServicio: EmpleadoService,
  @Inject (MAT_DIALOG_DATA) public dataEmpleado: Empleado
) {

  this.formEmpleado = this.fb.group({
    dpi: ['', Validators.required],
    nombre: ['', Validators.required],
    cantidadHijos: ['', Validators.required],
    salarioBase: ['', Validators.required],
    bonoDecreto: ['250', Validators.required],
    igss: ['', Validators.required],
    irtra: ['', Validators.required],
    bonoPaternidad: ['', Validators.required],
    salarioTotal: ['', Validators.required],
    salarioLiquido:['', Validators.required]
  })
}




  ngOnInit(): void {  
  this.disableInputs();  
  this.calculate();
  this.getDataToEdit();
  }

  getDataToEdit(){
    if(this.dataEmpleado){
      this.formEmpleado.patchValue({
        id: this.dataEmpleado.id,
        dpi: this.dataEmpleado.dpi,
        nombre: this.dataEmpleado.nombre,
        cantidadHijos: this.dataEmpleado.cantidad_hijos,
        salarioBase: this.dataEmpleado.salario_base,
        bonoDecreto: this.dataEmpleado.bono_decreto,
        igss: this.dataEmpleado.igss,
        irtra: this.dataEmpleado.irtra,
        bonoPaternidad: this.dataEmpleado.bono_paternidad,
        salarioTotal: this.dataEmpleado.salario_total,
        salarioLiquido: this.dataEmpleado.salario_liquido
      })
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }
  }


  openSnackBar(msg: string, accion: string) {
    this._snackBar.open(msg, accion,{
      horizontalPosition:"end",
      verticalPosition: "top",
      duration: 3000
    });
  }

  calculate() {
    const salarioBaseControl = this.formEmpleado.get('salarioBase');
  const igssControl = this.formEmpleado.get('igss');
  const irtraControl = this.formEmpleado.get('irtra');
  const bonoPaternidadControl = this.formEmpleado.get('bonoPaternidad');
  const cantidadHijosControl = this.formEmpleado.get('cantidadHijos');
  const salarioTotalControl = this.formEmpleado.get('salarioTotal');
  const bonoDecretoControl = this.formEmpleado.get('bonoDecreto');
  const salarioLiquidoControl = this.formEmpleado.get('salarioLiquido');

  if (salarioBaseControl && igssControl) {
    salarioBaseControl.valueChanges.subscribe((value) => {
      const igssValue = value * 0.0483; 
      igssControl.patchValue(igssValue);
    });
  }
  if (salarioBaseControl && irtraControl) {
    salarioBaseControl.valueChanges.subscribe((value) => {
      const irtraValue = value * 0.01; 
      irtraControl.patchValue(irtraValue);
    });
  }
  if (cantidadHijosControl && bonoPaternidadControl) {
    cantidadHijosControl.valueChanges.subscribe((value) => {
      const bonoPaternidadValue = value * 130; 
      bonoPaternidadControl.patchValue(bonoPaternidadValue);
    });
  }
  if (bonoPaternidadControl && salarioBaseControl && bonoDecretoControl && salarioTotalControl) {
    salarioBaseControl.valueChanges.subscribe((value) => {
      const salarioTotalValue = +value + +bonoPaternidadControl.value + +bonoDecretoControl.value; 
      salarioTotalControl.patchValue(salarioTotalValue);
    });
  }
  if (salarioTotalControl && salarioLiquidoControl && irtraControl && igssControl) {
    salarioTotalControl.valueChanges.subscribe((value) => {
      const salarioLiquidoValue = +value - +irtraControl.value - +igssControl.value 
      salarioLiquidoControl.patchValue(salarioLiquidoValue);
    });
  }

  }

  disableInputs(){
    const bonoDecretoControl = this.formEmpleado.get('bonoDecreto');
  if (bonoDecretoControl) {
    bonoDecretoControl.disable();
  }
  const igssControl = this.formEmpleado.get('igss');
  if (igssControl) {
    igssControl.disable();
  }
  const irtraControl = this.formEmpleado.get('irtra');
  if (irtraControl) {
    irtraControl.disable();
  }
  const bonoPaternidadControlControl = this.formEmpleado.get('bonoPaternidad');
  if (bonoPaternidadControlControl) {
    bonoPaternidadControlControl.disable();
  }
  const salarioTotalControlControl = this.formEmpleado.get('salarioTotal');
  if (salarioTotalControlControl) {
    salarioTotalControlControl.disable();
  }
  const salarioLiquidoControlControl = this.formEmpleado.get('salarioLiquido');
  if (salarioLiquidoControlControl) {
    salarioLiquidoControlControl.disable();
  }



  }

  async addEditEmpleado(){
    const salarioBase = this.formEmpleado.value.salarioBase;
    const cantidadHijos = this.formEmpleado.value.cantidadHijos;
    const bonoDecreto = 250
    const igss = salarioBase * 0.0483;
    const irtra = salarioBase * 0.01;
    const bonoPaternidad = cantidadHijos * 130;
    const salarioTotal = +salarioBase + +bonoDecreto + +bonoPaternidad;
    const salarioLiquido = +salarioTotal - +igss - +irtra;
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0!
    const yyyy = today.getFullYear();
    const fechaActual = `${dd}/${mm}/${yyyy}`;


    const modelo : Empleado = {
    id: 0,
    created_By: fechaActual,
    registered_by: 'ddelcid735@gmail.com',
    dpi: this.formEmpleado.value.dpi,
    nombre: this.formEmpleado.value.nombre,
    cantidad_hijos: this.formEmpleado.value.cantidadHijos,
    salario_base: this.formEmpleado.value.salarioBase,
    bono_decreto: bonoDecreto,
    igss: igss,
    irtra: irtra,
    bono_paternidad: bonoPaternidad,
    salario_total: salarioTotal,
    salario_liquido: salarioLiquido
    }

    if(this.dataEmpleado==null){
      this._empleadoServicio.createEmpleado(modelo).subscribe({
        next:(data)=>{
          this.openSnackBar("Empleado creado", "Listo");
          this.dialogoReferencia.close("creado");
        }, error:(e)=> {
          this.openSnackBar("No se pudo crear", "Error");
        }
      }) 
    } else {
      const modeloUpdate : Empleado = {
        id: this.dataEmpleado.id,
        created_By: fechaActual,
        registered_by: 'ddelcid735@gmail.com',
        dpi: this.formEmpleado.value.dpi,
        nombre: this.formEmpleado.value.nombre,
        cantidad_hijos: this.formEmpleado.value.cantidadHijos,
        salario_base: this.formEmpleado.value.salarioBase,
        bono_decreto: bonoDecreto,
        igss: igss,
        irtra: irtra,
        bono_paternidad: bonoPaternidad,
        salario_total: salarioTotal,
        salario_liquido: salarioLiquido
      }
      this._empleadoServicio.updateEmpleado(modeloUpdate).subscribe({
        next:(data)=>{
          this.openSnackBar("Empleado actualizado", "Listo");
          this.dialogoReferencia.close("editado");
        }, error:(e)=> {
          this.openSnackBar("No se pudo actualizar", "Error");
        }
      }) 
    }
  }
}
