# Energía Común: sitio web

Sitio estático (HTML, CSS y JavaScript) sin compilación ni backend. Se publica gratis en GitHub Pages.

## Estructura
- `index.html`: todas las secciones
- `css/styles.css`: estilos y paleta (variables en `:root`)
- `js/main.js`: menú, pestañas, calculadora, cuestionario y formulario
- `assets/img/`: pon aquí tus fotografías

## Antes de publicar
1. **Fotografías**: los recuadros verdes con `role="img"` son marcadores. Reemplázalos por `<img src="assets/img/tu-foto.jpg" alt="descripción" loading="lazy">` o ponlas como `background-image`. Usa fotos propias o con licencia libre, y comprímelas (WebP, menos de 300 KB).
2. **Cifras**: reemplaza los recuadros punteados "[Dato por verificar]" con datos de fuentes oficiales (UPME, DANE, MinEnergía) y cita la fuente.
3. **Correo y redes**: edita la sección Contacto en `index.html`.
4. **Formulario**: crea un formulario gratuito en [Formspree](https://formspree.io) y pega su URL en `FORM_ENDPOINT` (`js/main.js`). Mientras esté vacío, el sitio avisa que no envía nada.
5. **Aviso de privacidad**: el texto es de ejemplo; ajústalo con asesoría (Ley 1581 de 2012).

## Probar en tu computador
Abre `index.html` en el navegador, o ejecuta `python3 -m http.server` y entra a `http://localhost:8000`.

## Publicar en GitHub Pages
1. Crea una cuenta en github.com y pulsa **New repository**. Nómbralo `energia-comun`, déjalo **Public** y no marques "Add a README".
2. Sube los archivos:
   - Con la web: **uploading an existing file**, arrastra el contenido de esta carpeta (no la carpeta) y pulsa **Commit changes**.
   - O con Git:
     ```bash
     git init
     git add .
     git commit -m "Primera versión del sitio"
     git branch -M main
     git remote add origin https://github.com/TU_USUARIO/energia-comun.git
     git push -u origin main
     ```
3. En el repositorio entra a **Settings > Pages**. En **Build and deployment**, elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`, y pulsa **Save**.
4. Espera 1 o 2 minutos. Tu sitio quedará en `https://TU_USUARIO.github.io/energia-comun/`.
5. Para actualizar, cambia los archivos y haz commit: el sitio se republica solo.

Todas las rutas son relativas, así que funcionan en la subcarpeta `/energia-comun/`.
