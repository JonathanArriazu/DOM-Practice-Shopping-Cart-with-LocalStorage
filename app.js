const carrito = document.querySelector("#carrito");
const listaCursos = document.querySelector("#lista-cursos");
const contenedorCarrito = document.querySelector("#lista-carrito");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];

// Listeners
cargarListeners();

function cargarListeners() {
  carrito.addEventListener("click", eliminarCurso);
  listaCursos.addEventListener("click", agregarCurso);
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
}

function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const curso = e.target.parentElement.parentElement; // --> Para seleccionar al elemento padre del Btn (colocamos dos para ir hacia la div "card" que abarque a la imagen del curso)
    leerDatosCurso(curso);
  }
}

function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };
  //articulosCarrito.push(infoCurso);
  if (articulosCarrito.some((curso) => curso.id === infoCurso.id)) {
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });
    articulosCarrito = [...cursos];
  } else {
    articulosCarrito = [...articulosCarrito, infoCurso];
  }
  //To do: aumentar la cantidad cuando hagan click en el mismo producto
  carritoHTML();
}

function eliminarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId); //--> Siempre que quiera remover algo con algun boton, aplico el metodo "".filter"
    carritoHTML();
  }
  if (e.target.classList.contains("disminuir")) {
    const cursoId = e.target.getAttribute("data-id");
    let cursos = articulosCarrito.map((curso) => {
      if (curso.id === cursoId) {
        curso.cantidad--;
        return curso;
      } else {
        return curso;
      }
    });
    articulosCarrito = cursos.filter((curso) => curso.cantidad > 0);
    carritoHTML();
  }
}

function carritoHTML() {
  vaciarCarrito();
  articulosCarrito.forEach((curso) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>
      <img src="${curso.imagen}" width="100" />
    </td>
    <td>
      ${curso.titulo}
    </td>
    <td>
      ${curso.precio}
    </td>
    <td>
      ${curso.cantidad}
      <a href="#" class="disminuir" data-id="${curso.id}"> ↓ </a>
    </td>
    <td>
      <a href="#" class="borrar-curso" data-id="${curso.id}">X</>
    </td>
    `;
    contenedorCarrito.append(row);
  });
}

function vaciarCarrito() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
