import { NumberSymbol } from "@angular/common";

export interface EmpleadoResponse {
    statusCode: number;
    empleadosDetail: Empleado[];
  }

export interface Empleado {
    id: number,
    created_By: String,
    registered_by: String,
    dpi: number,
    nombre: string,
    cantidad_hijos: number,
    salario_base: number,
    bono_decreto: number,
    igss: any,
    irtra: any,
    bono_paternidad: any,
    salario_total: any,
    salario_liquido: any
}
