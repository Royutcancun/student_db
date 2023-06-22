
class Alumno {
    constructor(nombre, apellidos, edad) {
      this.nombre = nombre;
      this.apellidos = apellidos;
      this.edad = edad;
      this.materias = [];
      this.calificaciones = [];
    }
  }
  
  let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];

  function guardarAlumnos() {
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
  }
  
  
  function altaAlumno() {
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const edad = parseInt(document.getElementById('edad').value);
  
    const alumno = new Alumno(nombre, apellidos, edad);
    alumnos.push(alumno);
  
    guardarAlumnos();
    document.getElementById('nombre').value = '';
    document.getElementById('apellidos').value = '';
    document.getElementById('edad').value = '';
  
    mostrarMensaje('Alumno agregado correctamente.');
  }
  

  function mostrarMensaje(mensaje) {
    const resultado = document.getElementById('resultado');
    resultado.textContent = mensaje;
  }
  
  
  function mostrarGrupos() {
    let grupos = {};
  
    for (let i = 0; i < alumnos.length; i++) {
      const alumno = alumnos[i];
  
      if (!grupos[alumno.materias]) {
        grupos[alumno.materias] = [];
      }
  
      grupos[alumno.materias].push(alumno);
    }
  
    mostrarMensaje(JSON.stringify(grupos));
  }
  
  
function buscarPorNombre() {
    const nombreBuscado = prompt('Ingrese el nombre del alumno a buscar:');
    const resultados = [];
  
    for (let i = 0; i < alumnos.length; i++) {
      const alumno = alumnos[i];
  
      if (alumno.nombre.toLowerCase() === nombreBuscado.toLowerCase()) {
        resultados.push(alumno);
      }
    }
  
    mostrarResultadoBusqueda(resultados);
  }
  
  
  function mostrarResultadoBusqueda(resultados) {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
  
    if (resultados.length === 0) {
      resultado.textContent = 'No se encontraron resultados.';
    } else {
      const listaAlumnos = document.createElement('ul');
  
      for (let i = 0; i < resultados.length; i++) {
        const alumno = resultados[i];
        const item = document.createElement('li');
        item.textContent = `${alumno.nombre} ${alumno.apellidos} - Edad: ${alumno.edad}`;
        listaAlumnos.appendChild(item);
      }
  
      resultado.appendChild(listaAlumnos);
    }
  }


  

function buscarPorApellido(){
    const apellidoBuscado = prompt('Ingrese el apellido del alumno a buscar:');
    const resultados = [];

    for(let i=0; i<alumnos.length; i++){
        const alumno = alumnos[i];

        if(alumno.apellidos.toLowerCase() === apellidoBuscado.toLowerCase()){
            resultados.push(alumno);
        }
    }
    mostrarResultadoBusqueda(resultados)
}


function ordenarAscendente() {
    const alumnosOrdenados = alumnos.slice().sort((a, b) => {
      const promedioA = obtenerPromedioAlumno(a);
      const promedioB = obtenerPromedioAlumno(b);
  
      return promedioA - promedioB;
    });
  
    mostrarResultadoOrdenamiento(alumnosOrdenados, 'Orden ascendente por calificación');
  }
  
  
  function obtenerPromedioAlumno(alumno) {
    if (alumno.calificaciones.length === 0) {
      return 0;
    }
  
    const sumaCalificaciones = alumno.calificaciones.reduce((a, b) => a + b);
    return sumaCalificaciones / alumno.calificaciones.length;
  }
  

  
  function mostrarResultadoOrdenamiento(resultados, titulo) {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
  
    const tituloElement = document.createElement('h3');
    tituloElement.textContent = titulo;
    resultado.appendChild(tituloElement);
  
    if (resultados.length === 0) {
      resultado.textContent = 'No hay resultados para mostrar.';
    } else {
      const listaAlumnos = document.createElement('ul');
  
      for (let i = 0; i < resultados.length; i++) {
        const alumno = resultados[i];
        const item = document.createElement('li');
        item.textContent = `${alumno.nombre} ${alumno.apellidos} - Promedio: ${obtenerPromedioAlumno(alumno)}`;
        listaAlumnos.appendChild(item);
      }
  
      resultado.appendChild(listaAlumnos);
    }
  }



function ordenarDescendente() {
    const alumnosOrdenados = alumnos.slice().sort((a, b) => {
      const promedioA = obtenerPromedioAlumno(a);
      const promedioB = obtenerPromedioAlumno(b);
  
      return promedioB - promedioA;
    });
  
    mostrarResultadoOrdenamiento(alumnosOrdenados, 'Orden descendente por calificación');
  }

