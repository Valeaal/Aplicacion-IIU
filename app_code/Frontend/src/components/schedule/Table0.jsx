import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

/*
<table class="table table-bordered">

                <thead style={{textAlign:'center'}}>
                    <tr>
                        <th scope="col"><i>FRANJAS HORARIAS</i></th>
                        <th scope="col"><i>RUTINAS</i></th>
                    </tr>
                </thead>

                <tbody>
                    <tr class="table-warning">
                        <th scope="row" style={{width:'25%'}}>9:00-9:30</th>
                        <td>Entrada</td>
                    </tr>

                    <tr class="table-info">
                        <th scope="row">9:30-10:15</th>
                        <td>Aseo / Relajacion</td>
                    </tr>

                    <tr class="table-warning">
                        <th scope="row">10:15-11:00</th>
                        <td>Actividades educativas</td>
                    </tr>

                    <tr class="table-info">
                        <th scope="row">11:00-12:00</th>
                        <td>Patio de juego / Aseo</td>
                    </tr>

                    <tr class="table-warning">
                        <th scope="row">12:30-13:00</th>
                        <td>Almuerzo</td>
                    </tr>

                    <tr class="table-info">
                        <th scope="row">13:00-15:00</th>
                        <td>Aseo / Descanso / Aseo</td>
                    </tr>

                    <tr class="table-warning">
                        <th scope="row">15:00-16:30</th>
                        <td>Juegos sonoros / Aseo / Salida</td>
                    </tr>

                </tbody>
            </table>
            */
function Table0(){
    return(
        <table class="table table-bordered">

          <thead style={{textAlign:'center'}}>
              <tr>
                  <th scope="col"><i>FRANJAS HORARIAS</i></th>
                  <th scope="col"><i>RUTINAS</i></th>
              </tr>
          </thead>

          <tbody>
              <tr class="table-warning">
                  <th scope="row" style={{width:'25%'}}>9:00-9:30</th>
                  <td>Entrada</td>
              </tr>

              <tr class="table-info">
                  <th scope="row">9:30-10:15</th>
                  <td>Aseo / Relajacion</td>
              </tr>

              <tr class="table-warning">
                  <th scope="row">10:15-11:00</th>
                  <td>Actividades educativas</td>
              </tr>

              <tr class="table-info">
                  <th scope="row">11:00-12:00</th>
                  <td>Patio de juego / Aseo</td>
              </tr>

              <tr class="table-warning">
                  <th scope="row">12:30-13:00</th>
                  <td>Almuerzo</td>
              </tr>

              <tr class="table-info">
                  <th scope="row">13:00-15:00</th>
                  <td>Aseo / Descanso / Aseo</td>
              </tr>

              <tr class="table-warning">
                  <th scope="row">15:00-16:30</th>
                  <td>Juegos sonoros / Aseo / Salida</td>
              </tr>

          </tbody>
        </table>
    );
}

export default Table0;