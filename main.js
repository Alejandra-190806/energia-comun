// CONFIGURACIÓN: pega aquí la URL de tu servicio de formularios (p. ej. Formspree). Si queda vacía, el formulario NO envía nada.
const FORM_ENDPOINT = "";
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

const burger = $(".burger"), menu = $("#menu");
burger.onclick = () => { const o = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", o); };
$$("#menu a").forEach(a => a.onclick = () => { menu.classList.remove("open"); burger.setAttribute("aria-expanded", false); });

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
  $$(".sec h2, .card, .line, .panel").forEach(el => { el.classList.add("rv"); io.observe(el); });
}

$$(".more").forEach(b => b.onclick = () => { const x = b.nextElementSibling, o = x.hidden; x.hidden = !o; b.setAttribute("aria-expanded", o); b.textContent = o ? "Mostrar menos" : "Conocer más"; });

const tabs = $$("[role=tab]");
function sel(i, f) { tabs.forEach((t, j) => { t.setAttribute("aria-selected", i === j); t.tabIndex = i === j ? 0 : -1; $("#p" + j).hidden = i !== j; }); if (f) tabs[i].focus(); }
tabs.forEach((t, i) => {
  t.onclick = () => sel(i);
  t.onkeydown = e => { if (e.key === "ArrowRight") sel((i + 1) % 4, 1); if (e.key === "ArrowLeft") sel((i + 3) % 4, 1); };
});

$("#calc").onsubmit = e => {
  e.preventDefault();
  const w = parseFloat($("#w").value), h = parseFloat($("#h").value), d = parseFloat($("#d").value), t = parseFloat($("#t").value), o = $("#calcout");
  if (isNaN(w) || isNaN(h) || isNaN(d) || w < 0 || h < 0 || h > 24 || d < 0 || d > 31) { o.textContent = "Revisa los datos: usa números, horas entre 0 y 24 y días entre 0 y 31."; return; }
  const k = w / 1000 * h * d;
  o.textContent = `Consumo estimado: ${k.toLocaleString("es-CO", { maximumFractionDigits: 2 })} kWh al mes` + (t > 0 ? `, unos $${Math.round(k * t).toLocaleString("es-CO")} COP según tu tarifa.` : ".");
};

const Q = [
  ["¿Cuál de estas fuentes es renovable?", ["El carbón", "El viento", "El gas natural"], 1, "El viento se repone de forma natural."],
  ["¿Qué unidad usa tu factura para medir la energía consumida?", ["Vatio (W)", "Voltio (V)", "Kilovatio-hora (kWh)"], 2, "Un kWh es la energía de 1.000 vatios durante una hora."],
  ["Un bombillo de 100 W encendido 10 horas consume…", ["1 kWh", "10 kWh", "0,1 kWh"], 0, "100 W ÷ 1000 × 10 h = 1 kWh."],
  ["¿Qué ayuda a ahorrar electricidad en casa?", ["Dejar cargadores conectados", "Usar bombillos LED", "Abrir la nevera seguido"], 1, "Los LED dan la misma luz con mucha menos energía."]
];
let qi = 0, pts = 0;
function showQ() {
  const b = $("#qbox");
  if (qi >= Q.length) { b.innerHTML = `<p class="ok">Obtuviste ${pts} de ${Q.length}.</p><button class="btn grn" id="rs">Intentar de nuevo</button>`; $("#rs").onclick = () => { qi = 0; pts = 0; showQ(); }; return; }
  const [q, o, c, ex] = Q[qi];
  b.innerHTML = `<p><b>Pregunta ${qi + 1} de ${Q.length}.</b> ${q}</p>` + o.map((x, i) => `<button class="opt" data-i="${i}">${x}</button>`).join("") + `<p id="fb" role="status" aria-live="polite"></p>`;
  $$(".opt", b).forEach(btn => btn.onclick = () => {
    const i = +btn.dataset.i; if (i === c) pts++;
    $$(".opt", b).forEach(x => { x.disabled = true; if (+x.dataset.i === c) x.classList.add("good"); });
    if (i !== c) btn.classList.add("bad");
    $("#fb").innerHTML = `${i === c ? "¡Correcto!" : "No exactamente."} ${ex} <button class="btn grn" id="nx">Continuar</button>`;
    $("#nx").onclick = () => { qi++; showQ(); };
  });
}
showQ();

$$("[data-tema]").forEach(a => a.addEventListener("click", () => { const m = $("#m"); if (!m.value) m.value = a.dataset.tema + ". "; }));
$$("[data-edit]").forEach(a => a.onclick = e => e.preventDefault());

$("#cf").onsubmit = async e => {
  e.preventDefault();
  const n = $("#n").value.trim(), c = $("#e").value.trim(), m = $("#m").value.trim(), er = $("#cerr");
  er.className = "err";
  if (!n || !m) { er.textContent = "Completa tu nombre y tu mensaje."; return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c)) { er.textContent = "Escribe un correo válido, por ejemplo nombre@correo.com."; return; }
  if (!FORM_ENDPOINT) { er.textContent = "Este formulario aún no está conectado a un servicio de recepción, así que no se envió nada. Escríbenos por correo."; return; }
  try {
    const r = await fetch(FORM_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ nombre: n, correo: c, mensaje: m }) });
    if (!r.ok) throw 0;
    er.className = "ok"; er.textContent = "Mensaje enviado. Gracias por escribirnos."; e.target.reset();
  } catch { er.textContent = "No pudimos enviar el mensaje. Inténtalo de nuevo o escríbenos por correo."; }
};

$("#pv").onclick = e => { e.preventDefault(); const p = $("#privacidad"); p.hidden = !p.hidden; };
