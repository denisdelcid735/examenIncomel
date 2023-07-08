import { Injectable } from '@angular/core';

import{HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import{Observable} from 'rxjs';
import {Empleado} from '../Interfaces/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private endPoint:string = "https://localhost:7228/api/"
  private apiUrl:string = this.endPoint + "Empleados/";
  

  constructor(private http:HttpClient) { }

  getAllEmpleados():Observable<Empleado[]>{
    return this.http.get<Empleado[]>(`${this.apiUrl}get_all_empleados`);
  }

  getEmpleadosById(id:number):Observable<Empleado>{
    return this.http.get<Empleado>(`${this.apiUrl}get_empleadoById/${id}`);
  }

  createEmpleado(modelo:Empleado):Observable<Empleado>{
    return this.http.post<Empleado>(`${this.apiUrl}add_empleado`,modelo)
  }
  
  updateEmpleado(modelo:Empleado):Observable<Empleado>{
    return this.http.put<Empleado>(`${this.apiUrl}update_empleado`, modelo);
  }

  deleteEmpleado(id:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}delete_empleado/${id}`);
  }

}
