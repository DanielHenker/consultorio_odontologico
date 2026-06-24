// Función para filtrar servicios por categoría
function filtrar(categoria) {
  // Selecciona todas las tarjetas
  const tarjetas = document.querySelectorAll('.tarjeta-servicio');

  // Recorre cada tarjeta y decide si mostrarla u ocultarla
  tarjetas.forEach(tarjeta => {
    if (categoria === 'todos' || tarjeta.dataset.categoria === categoria) {
      tarjeta.style.display = 'block';
    } else {
      tarjeta.style.display = 'none';
    }
  });

  // Actualiza los botones: el activo se ve sólido, los demás con borde
  const botones = document.querySelectorAll('#filtros button');
  botones.forEach(boton => {
    boton.classList.remove('btn-primary');
    boton.classList.add('btn-outline-primary');
  });

  // Marca el botón clickeado como activo
  event.target.classList.remove('btn-outline-primary');
  event.target.classList.add('btn-primary');
}

// 
// DATOS DE LOS SERVICIOS
// 
const servicios = {
  limpieza: {
    nombre: 'Limpieza dental',
    categoria: 'Preventivo',
    duracion: '45 minutos',
    icono: 'fa-solid fa-tooth',
    descripcion: 'La limpieza dental profesional elimina la placa bacteriana y el sarro acumulado que el cepillado diario no puede remover. Es el tratamiento preventivo más importante para mantener una boca sana.',
    dirigido: 'Pacientes de todas las edades. Se recomienda realizarla cada 6 meses como parte de una rutina de salud oral.',
    beneficios: ['Previene caries y enfermedades de las encías', 'Elimina manchas superficiales', 'Mejora el aliento', 'Detecta problemas a tiempo']
  },
  blanqueamiento: {
    nombre: 'Blanqueamiento dental',
    categoria: 'Estético',
    duracion: '60 minutos',
    icono: 'fa-solid fa-star',
    descripcion: 'Procedimiento estético que aclara el tono natural de los dientes mediante agentes blanqueadores activados con tecnología LED. Resultados visibles desde la primera sesión.',
    dirigido: 'Adultos con dientes manchados por café, té, tabaco o envejecimiento natural. No apto para menores de 18 años.',
    beneficios: ['Resultados inmediatos', 'Procedimiento seguro y controlado', 'Hasta 8 tonos más blanco', 'Sin daño al esmalte']
  },
  rehabilitacion: {
    nombre: 'Rehabilitación oral',
    categoria: 'Rehabilitación',
    duracion: 'Varias sesiones',
    icono: 'fa-solid fa-wrench',
    descripcion: 'Tratamiento integral que restaura la función masticatoria, fonética y estética mediante prótesis fijas, removibles o coronas. Devuelve la calidad de vida al paciente.',
    dirigido: 'Pacientes con pérdida dental parcial o total, desgaste severo del esmalte o necesidad de reconstrucción completa de la boca.',
    beneficios: ['Restaura la función masticatoria completa', 'Mejora la fonética y el habla', 'Resultados estéticos naturales', 'Tratamiento personalizado']
  },
  ortodoncia: {
    nombre: 'Ortodoncia',
    categoria: 'Correctivo',
    duracion: '12 a 24 meses',
    icono: 'fa-solid fa-smile',
    descripcion: 'Corrección de la posición dental y la mordida mediante brackets metálicos, cerámicos o alineadores transparentes. Mejora tanto la función como la estética.',
    dirigido: 'Niños desde los 7 años, adolescentes y adultos con maloclusión, apiñamiento dental o problemas de mordida.',
    beneficios: ['Corrige la posición dental', 'Mejora la mordida', 'Facilita la higiene oral', 'Opción de alineadores invisibles']
  },
  implantes: {
    nombre: 'Implantes dentales',
    categoria: 'Rehabilitación',
    duracion: '3 a 6 meses',
    icono: 'fa-solid fa-screwdriver',
    descripcion: 'Reemplazo permanente de dientes perdidos mediante tornillos de titanio que se integran al hueso. Es la solución más duradera y natural para la pérdida dental.',
    dirigido: 'Adultos con pérdida de uno o varios dientes y hueso maxilar en buen estado. Requiere evaluación previa.',
    beneficios: ['Duración de por vida con buen cuidado', 'Se siente y funciona como un diente natural', 'No daña dientes adyacentes', 'Previene la pérdida ósea']
  },
  carillas: {
    nombre: 'Carillas dentales',
    categoria: 'Estético',
    duracion: '2 sesiones',
    icono: 'fa-solid fa-gem',
    descripcion: 'Láminas ultrafinas de porcelana o resina que se adhieren a la superficie de los dientes para mejorar su forma, color y tamaño. Transformación estética con mínimo desgaste dental.',
    dirigido: 'Pacientes adultos que deseen mejorar la apariencia de dientes con manchas, fracturas, desgaste o forma irregular.',
    beneficios: ['Resultado estético inmediato', 'Alta resistencia y durabilidad', 'Color personalizado', 'Mínimo desgaste del diente natural']
  }
};


// FUNCIÓN: MOSTRAR DETALLE DEL SERVICIO
function mostrarDetalle() {
  // Lee el parámetro "servicio" de la URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get('servicio');
  const contenedor = document.getElementById('detalle-contenido');

  // Si no existe el contenedor, no estamos en detalle.html
  if (!contenedor) return;

  // Si el servicio no existe en nuestros datos
  if (!id || !servicios[id]) {
    contenedor.innerHTML = `
      <div class="alert alert-warning text-center">
        <i class="fa-solid fa-triangle-exclamation me-2"></i>
        Servicio no encontrado. <a href="servicios.html">Ver todos los servicios</a>
      </div>`;
    return;
  }

  const s = servicios[id];

  // Construye la lista de beneficios
  const listaBeneficios = s.beneficios
    .map(b => `<li class="mb-2"><i class="fa-solid fa-check text-success me-2"></i>${b}</li>`)
    .join('');

  // Inyecta el HTML en el DOM
  contenedor.innerHTML = `
    <div class="row g-4">
      <div class="col-12">
        <div class="card border-0 shadow-sm p-4">
          <div class="d-flex align-items-center gap-3 mb-4">
            <div class="icono-detalle bg-primary text-white rounded-circle d-flex align-items-center justify-content-center">
              <i class="${s.icono} fa-lg"></i>
            </div>
            <div>
              <span class="badge bg-primary mb-1">${s.categoria}</span>
              <h1 class="h3 mb-0">${s.nombre}</h1>
            </div>
          </div>

          <div class="row g-4">
            <div class="col-md-8">
              <h2 class="h5 text-primary">Descripción</h2>
              <p>${s.descripcion}</p>

              <h2 class="h5 text-primary mt-4">¿A quién va dirigido?</h2>
              <p>${s.dirigido}</p>

              <h2 class="h5 text-primary mt-4">Beneficios</h2>
              <ul class="list-unstyled">${listaBeneficios}</ul>
            </div>

            <div class="col-md-4">
              <div class="card bg-light border-0 p-3">
                <h2 class="h6 text-muted text-uppercase mb-3">Información del tratamiento</h2>
                <p class="mb-2">
                  <i class="fa-solid fa-clock text-primary me-2"></i>
                  <strong>Duración:</strong> ${s.duracion}
                </p>
                <p class="mb-2">
                  <i class="fa-solid fa-tag text-primary me-2"></i>
                  <strong>Categoría:</strong> ${s.categoria}
                </p>
                <hr>
                <a href="nosotros.html#contacto" class="btn btn-primary w-100">
                  <i class="fa-solid fa-calendar-check me-2"></i>Agendar cita
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

// Ejecuta mostrarDetalle cuando la página cargue
mostrarDetalle();


// FUNCIÓN: VALIDAR FORMULARIO DE CONTACTO

function validarFormulario() {
  // Limpia errores anteriores
  document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
  document.querySelectorAll('.form-control, .form-select').forEach(el => el.classList.remove('is-invalid'));

  // Lee los valores del formulario
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const servicio = document.getElementById('servicio-interes').value;
  const mensaje = document.getElementById('mensaje').value.trim();

  let hayErrores = false;

  // Valida nombre: no puede estar vacío y debe tener al menos 3 caracteres
  if (nombre.length < 3) {
    document.getElementById('error-nombre').textContent = 'Por favor ingresa tu nombre completo.';
    document.getElementById('nombre').classList.add('is-invalid');
    hayErrores = true;
  }

  // Valida email: usa una expresión regular para verificar el formato
  const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formatoEmail.test(email)) {
    document.getElementById('error-email').textContent = 'Ingresa un correo electrónico válido.';
    document.getElementById('email').classList.add('is-invalid');
    hayErrores = true;
  }

  // Valida teléfono: solo números, mínimo 7 dígitos
  const formatoTelefono = /^[0-9]{7,10}$/;
  if (!formatoTelefono.test(telefono.replace(/\s/g, ''))) {
    document.getElementById('error-telefono').textContent = 'Ingresa un número de teléfono válido (7 a 10 dígitos).';
    document.getElementById('telefono').classList.add('is-invalid');
    hayErrores = true;
  }

  // Valida que haya seleccionado un servicio
  if (!servicio) {
    document.getElementById('error-servicio').textContent = 'Por favor selecciona un servicio de interés.';
    document.getElementById('servicio-interes').classList.add('is-invalid');
    hayErrores = true;
  }

  // Valida mensaje: mínimo 10 caracteres
  if (mensaje.length < 10) {
    document.getElementById('error-mensaje').textContent = 'El mensaje debe tener al menos 10 caracteres.';
    document.getElementById('mensaje').classList.add('is-invalid');
    hayErrores = true;
  }

  // Si no hay errores, muestra el mensaje de éxito
  if (!hayErrores) {
    document.getElementById('formulario-contacto').classList.add('d-none');
    document.getElementById('mensaje-exito').classList.remove('d-none');
  }
}