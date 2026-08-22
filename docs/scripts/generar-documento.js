const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  TableOfContents, PageBreak, Table, TableRow, TableCell, WidthType,
  BorderStyle, ShadingType, ImageRun, LevelFormat, PageNumber, Footer,
} = require("docx");

// El script vive en docs/scripts, por lo que la raíz del proyecto está dos niveles arriba.
const RAIZ = path.resolve(__dirname, "..", "..");
const CAPTURAS = path.join(RAIZ, "docs", "capturas");
const SALIDA = path.join(RAIZ, "docs", "Proyecto-Rediseno-Web-FUNDACA.docx");

const ANCHO_PAGINA = 12240 - 2880;
let figura = 0;

function p(texto, opciones = {}) {
  return new Paragraph({
    alignment: opciones.alineacion || AlignmentType.JUSTIFIED,
    spacing: { after: opciones.after ?? 160, line: 276 },
    children: [new TextRun({ text: texto, size: opciones.size || 24, bold: opciones.bold, italics: opciones.italics, color: opciones.color })],
  });
}

function h(texto, nivel) {
  return new Paragraph({ text: texto, heading: nivel, spacing: { before: 280, after: 160 } });
}

function vinieta(texto) {
  return new Paragraph({
    numbering: { reference: "vinietas", level: 0 },
    spacing: { after: 80, line: 276 },
    children: [new TextRun({ text: texto, size: 24 })],
  });
}

function celda(texto, opciones = {}) {
  return new TableCell({
    width: { size: opciones.ancho, type: WidthType.DXA },
    shading: opciones.encabezado ? { type: ShadingType.CLEAR, fill: "1F3864", color: "auto" } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({
      alignment: opciones.alineacion || AlignmentType.LEFT,
      children: [new TextRun({ text: texto, size: 22, bold: opciones.encabezado, color: opciones.encabezado ? "FFFFFF" : undefined })],
    })],
  });
}

function tabla(encabezados, filas, anchos) {
  return new Table({
    columnWidths: anchos,
    width: { size: anchos.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    rows: [
      new TableRow({
        tableHeader: true,
        children: encabezados.map((t, i) => celda(t, { ancho: anchos[i], encabezado: true })),
      }),
      ...filas.map((fila) => new TableRow({
        children: fila.map((t, i) => celda(t, { ancho: anchos[i] })),
      })),
    ],
  });
}

// Inserta la captura si existe; si no, deja un marcador visible con la ruta esperada.
function captura(rutaRelativa, descripcion) {
  figura += 1;
  const ruta = path.join(CAPTURAS, rutaRelativa);
  const pie = new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 240 },
    children: [new TextRun({ text: `Figura ${figura}. ${descripcion}`, size: 20, italics: true })],
  });

  if (fs.existsSync(ruta)) {
    const extension = path.extname(ruta).slice(1).toLowerCase();
    const imagen = new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 160, after: 80 },
      children: [new ImageRun({
        data: fs.readFileSync(ruta),
        type: extension === "jpg" ? "jpg" : extension,
        transformation: { width: 520, height: 320 },
      })],
    });
    return [imagen, pie];
  }

  const marcador = new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 160, after: 80 },
    border: {
      top: { style: BorderStyle.DASHED, size: 6, color: "9AA0A6" },
      bottom: { style: BorderStyle.DASHED, size: 6, color: "9AA0A6" },
      left: { style: BorderStyle.DASHED, size: 6, color: "9AA0A6" },
      right: { style: BorderStyle.DASHED, size: 6, color: "9AA0A6" },
    },
    children: [new TextRun({ text: `[ Espacio para la captura: docs\\capturas\\${rutaRelativa} ]`, size: 20, italics: true, color: "9AA0A6" })],
  });
  return [marcador, pie];
}

const portada = [
  new Paragraph({ spacing: { after: 600 }, children: [] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [new TextRun({ text: "Universidad Técnica Nacional", bold: true, size: 32 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [new TextRun({ text: "Sede Guanacaste · Campus Corobicí", size: 26 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, children: [new TextRun({ text: "Ingeniería en Tecnologías de la Información", size: 26 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: "Rediseño e implementación del sitio web institucional de FUNDACA, con panel administrativo y despliegue en la nube", bold: true, size: 36 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 700 }, children: [new TextRun({ text: "Fundación para el Desarrollo del Área de Conservación Arenal-Tempisque", size: 24, italics: true })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [new TextRun({ text: "Curso: ITI-522 Computación en la Nube", size: 24 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 500 }, children: [new TextRun({ text: "Profesora: Ingrid Chavarría Montero", size: 24 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [new TextRun({ text: "Estudiantes:", bold: true, size: 24 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 }, children: [new TextRun({ text: "Luis Daniel Álvarez Vargas", size: 24 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 }, children: [new TextRun({ text: "Sebastián Villegas Barquero", size: 24 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, children: [new TextRun({ text: "Isaac López González", size: 24 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "2026", size: 24 })] }),
  new Paragraph({ children: [new PageBreak()] }),
];

const indice = [
  h("Índice", HeadingLevel.HEADING_1),
  new TableOfContents("Índice", { hyperlink: true, headingStyleRange: "1-2" }),
  new Paragraph({ children: [new PageBreak()] }),
];

const introduccion = [
  h("1. Introducción", HeadingLevel.HEADING_1),
  p("La Fundación para el Desarrollo del Área de Conservación Arenal-Tempisque (FUNDACA) es una organización sin fines de lucro costarricense orientada a la gestión integral de recursos para el desarrollo socioambiental del Área de Conservación Arenal-Tempisque y su zona de influencia. Su labor se desarrolla en coordinación con el Ministerio de Ambiente y Energía (MINAE) y el Sistema Nacional de Áreas de Conservación (SINAC), y abarca proyectos de reforestación, manejo del recurso hídrico, educación ambiental, biodigestores y lumbricultura en diez cantones de las provincias de Guanacaste, Alajuela y Puntarenas."),
  p("Para una organización de este tipo, el sitio web no es un elemento decorativo: es el punto de contacto con donantes, voluntarios, entes financiadores y comunidades. Es el lugar donde una persona interesada en colaborar decide si la fundación es confiable, y donde un ente cooperante verifica la seriedad institucional antes de asignar fondos. Es, además, la herramienta que el propio personal de la fundación necesita para mantener visible su trabajo día a día, sin depender permanentemente de terceros para publicar una noticia o documentar una gira de campo."),
  p("Actualmente FUNDACA mantiene su presencia digital en un sitio construido sobre la plataforma gratuita WordPress.com, alojado bajo el subdominio fundaca.wordpress.com. Ese sitio presenta limitaciones importantes de diseño, estructura, identidad visual y funcionalidad, que se detallan en el diagnóstico de este documento."),
  p("El presente proyecto, desarrollado en el marco del curso ITI-522 Computación en la Nube, consiste en el rediseño completo del sitio web institucional de FUNDACA, su despliegue en una plataforma de computación en la nube y la incorporación de un panel administrativo privado que permite al personal de la fundación gestionar el contenido público del sitio y su propia documentación interna, sin necesidad de conocimientos de programación ni intervención continua del equipo de desarrollo."),
  new Paragraph({ children: [new PageBreak()] }),
];

const justificacion = [
  h("2. Justificación", HeadingLevel.HEADING_1),
  p("La revisión del sitio actual evidenció que la presencia digital de FUNDACA no está a la altura del trabajo que la organización realiza en campo. Esta brecha tiene consecuencias concretas y verificables:"),
  vinieta("Limita la captación de donaciones, porque el visitante no encuentra un mecanismo claro y funcional para aportar."),
  vinieta("Debilita el programa de voluntariado, ya que los formularios de inscripción no operan correctamente."),
  vinieta("Afecta la credibilidad institucional frente a entes financiadores como SINAC, ACRXS y los cooperantes del Segundo Canje de Deuda por Naturaleza, que valoran la transparencia y la profesionalidad de la información publicada."),
  vinieta("Reduce la visibilidad de los proyectos ejecutados, que constituyen la principal evidencia del impacto de la fundación."),
  vinieta("Genera dependencia de una plataforma gratuita de terceros, sin dominio propio ni control sobre el diseño ni sobre los datos."),
  vinieta("No ofrece ningún mecanismo para que el propio personal de la fundación actualice el contenido, organice evidencia fotográfica de sus campañas o archive documentación institucional de forma centralizada."),
  p("Migrar el sitio a una arquitectura moderna desplegada en la nube, complementada con un panel administrativo propio, permite corregir estas deficiencias sin costo de licenciamiento para la fundación, aprovechando los niveles gratuitos permanentes que ofrecen las plataformas de hospedaje y de base de datos actuales."),
  new Paragraph({ children: [new PageBreak()] }),
];

const objetivos = [
  h("3. Objetivos", HeadingLevel.HEADING_1),
  h("3.1 Objetivo general", HeadingLevel.HEADING_2),
  p("Rediseñar e implementar el sitio web institucional de la Fundación para el Desarrollo del Área de Conservación Arenal-Tempisque, desplegándolo en una plataforma de computación en la nube e incorporando un panel administrativo, con el fin de fortalecer su presencia digital, mejorar la comunicación con donantes y voluntarios, y dotar a la fundación de autonomía para gestionar su propio contenido y documentación."),
  h("3.2 Objetivos específicos", HeadingLevel.HEADING_2),
  vinieta("Diagnosticar el estado actual del sitio web de FUNDACA, identificando sus deficiencias de diseño, estructura, contenido y funcionalidad."),
  vinieta("Diseñar una nueva identidad visual y una arquitectura de información coherente con la naturaleza socioambiental de la organización."),
  vinieta("Desarrollar el sitio web con tecnologías web modernas, aplicando diseño responsivo para su correcta visualización en computadoras, tabletas y teléfonos móviles."),
  vinieta("Implementar formularios funcionales de contacto y de inscripción al programa de voluntariado."),
  vinieta("Diseñar e implementar un panel administrativo con autenticación propia, que permita al personal de la fundación publicar contenido y gestionar documentación interna sin conocimientos técnicos."),
  vinieta("Definir una arquitectura de datos que separe con claridad el contenido de acceso público del contenido de acceso restringido al personal autorizado."),
  vinieta("Desplegar el sitio en una plataforma de computación en la nube con integración continua desde un repositorio de control de versiones."),
  vinieta("Garantizar la entrega segura del sitio mediante certificado de seguridad de capa de transporte y distribución por red de entrega de contenido."),
  vinieta("Documentar el proceso completo, comparando el estado anterior y el resultado obtenido."),
  new Paragraph({ children: [new PageBreak()] }),
];

const alcance = [
  h("4. Alcance y limitaciones", HeadingLevel.HEADING_1),
  h("4.1 Alcance", HeadingLevel.HEADING_2),
  p("El proyecto comprende las siguientes entregas:"),
  vinieta("Diagnóstico documentado del sitio web actual."),
  vinieta("Rediseño de la identidad visual y de la arquitectura de información."),
  vinieta("Desarrollo del sitio web completo con las secciones institucionales de la fundación."),
  vinieta("Formularios operativos de contacto y de voluntariado."),
  vinieta("Panel administrativo privado, con autenticación por correo y contraseña, para que el personal de la fundación publique noticias, actividades y fotografías, y administre documentación interna."),
  vinieta("Arquitectura de base de datos con separación entre contenido público y contenido privado, mediante seguridad a nivel de fila."),
  vinieta("Publicación del código fuente en un repositorio de control de versiones."),
  vinieta("Despliegue en producción sobre una plataforma de computación en la nube, con dirección accesible públicamente."),
  vinieta("Documentación técnica del proceso y comparación de resultados."),
  h("4.2 Limitaciones", HeadingLevel.HEADING_2),
  p("Se delimitan explícitamente los siguientes elementos como fuera del alcance de esta entrega:"),
  vinieta("No se implementa una pasarela de pago en línea, ya que requiere contratación bancaria y personería jurídica de la fundación. Se documentan medios alternativos de donación (SINPE Móvil y transferencia bancaria)."),
  vinieta("No se adquiere un dominio propio, por lo que el sitio se publica bajo el subdominio gratuito que proporciona la plataforma de hospedaje."),
  vinieta("El panel administrativo se entrega con las cuentas del personal creadas manualmente por el equipo administrador; no existe un flujo de autoregistro público, por decisión de diseño orientada a la seguridad."),
  vinieta("La carga y actualización posterior del contenido queda a cargo del personal de FUNDACA a través del panel administrativo, previa capacitación."),
  new Paragraph({ children: [new PageBreak()] }),
];

const diagnostico = [
  h("5. Diagnóstico del sitio web actual", HeadingLevel.HEADING_1),
  p("Se realizó una revisión del sitio publicado en la dirección fundaca.wordpress.com, evaluando su estructura, contenido, diseño, funcionalidad y aspectos técnicos. Los hallazgos se resumen en la siguiente tabla."),
  new Paragraph({ spacing: { after: 160 }, children: [] }),
  tabla(
    ["Aspecto evaluado", "Hallazgo", "Impacto"],
    [
      ["Identidad visual", "Plantilla genérica de WordPress.com sin adaptación institucional", "La fundación no se distingue visualmente ni proyecta identidad propia"],
      ["Página de inicio", "Un único párrafo de texto, sin imágenes destacadas ni llamados a la acción", "El visitante no comprende rápidamente qué hace la organización"],
      ["Contenido", "Tres bloques de la portada aparecen vacíos, marcados solo con guiones", "Transmite abandono y descuido institucional"],
      ["Estructura", "Seis secciones sin jerarquía visual ni menú destacado", "Navegación confusa y poco intuitiva"],
      ["Diseño responsivo", "Adaptación limitada a dispositivos móviles", "Se pierde a los visitantes que llegan desde el teléfono"],
      ["Voluntariado", "El mecanismo de inscripción no opera correctamente", "Se pierden voluntarios potenciales"],
      ["Donaciones", "El enlace de apoyo no conduce a un mecanismo funcional", "Se pierden aportes económicos"],
      ["Gestión de contenido", "Sin mecanismo alguno para que el personal actualice información o archive documentos", "El sitio se vuelve obsoleto rápidamente y no hay memoria institucional digital"],
      ["Dominio", "Subdominio gratuito de WordPress.com", "Menor credibilidad ante entes financiadores"],
      ["Datos de contacto", "Información dispersa únicamente en el pie de página", "Dificulta el contacto directo con la fundación"],
    ],
    [2200, 3900, 3260]
  ),
  new Paragraph({ spacing: { after: 240 }, children: [] }),
  h("5.1 Evidencia del estado anterior", HeadingLevel.HEADING_2),
  ...captura("antes\\01-inicio.png", "Página de inicio del sitio anterior."),
  ...captura("antes\\02-que-es-fundaca.png", "Sección Qué es FUNDACA del sitio anterior."),
  ...captura("antes\\03-programas.png", "Sección Programas del sitio anterior."),
  ...captura("antes\\05-voluntariado.png", "Sección Voluntariado del sitio anterior."),
  ...captura("antes\\08-movil-inicio.png", "Visualización del sitio anterior en dispositivo móvil."),
  new Paragraph({ children: [new PageBreak()] }),
];

const metodologia = [
  h("6. Metodología", HeadingLevel.HEADING_1),
  p("El desarrollo del proyecto siguió un proceso de nueve etapas secuenciales, que abarcan desde la revisión del sitio existente hasta la publicación del sitio rediseñado y su panel administrativo en producción."),
  ...captura("proceso\\01-diagrama-flujo.png", "Diagrama de flujo del proceso de rediseño y despliegue."),
  tabla(
    ["Etapa", "Descripción"],
    [
      ["1. Sitio actual", "Revisión del sitio publicado en WordPress.com y recuperación del contenido institucional existente"],
      ["2. Análisis y diagnóstico", "Inventario de secciones y registro documentado de las deficiencias encontradas"],
      ["3. Diseño de la propuesta", "Definición de la identidad visual, la paleta de colores y la nueva arquitectura de información"],
      ["4. Desarrollo del sitio público", "Construcción de las páginas institucionales con tecnologías web modernas y diseño responsivo"],
      ["5. Evaluación de herramientas de gestión de contenido", "Comparación de alternativas para el panel administrativo y selección de la arquitectura de datos"],
      ["6. Desarrollo del panel administrativo", "Autenticación, políticas de seguridad de datos y pantallas de gestión de contenido"],
      ["7. Repositorio en GitHub", "Publicación del código fuente bajo control de versiones"],
      ["8. Despliegue en Vercel", "Conexión del repositorio con la plataforma de nube y publicación automática"],
      ["9. Sitio publicado", "Verificación del sitio y del panel en producción, y documentación de resultados"],
    ],
    [2600, 6760]
  ),
  new Paragraph({ children: [new PageBreak()] }),
];

const propuesta = [
  h("7. Propuesta de rediseño", HeadingLevel.HEADING_1),
  h("7.1 Arquitectura de información", HeadingLevel.HEADING_2),
  p("Se conservan las secciones institucionales existentes, reorganizadas con una jerarquía clara y complementadas con elementos de conversión que el sitio anterior no tenía."),
  h("7.2 Tecnologías utilizadas", HeadingLevel.HEADING_2),
  tabla(
    ["Componente", "Tecnología", "Justificación"],
    [
      ["Interfaz", "React con Next.js", "Genera páginas de carga rápida y favorece el posicionamiento en buscadores"],
      ["Estilos", "CSS moderno con diseño responsivo", "Permite una identidad visual propia y adaptación a cualquier dispositivo"],
      ["Base de datos y backend", "Supabase (PostgreSQL, autenticación y almacenamiento de archivos)", "Nivel gratuito permanente sin tarjeta de crédito, con seguridad a nivel de fila para separar contenido público del privado"],
      ["Control de versiones", "Git y GitHub", "Historial de cambios y trabajo colaborativo entre los integrantes del equipo"],
      ["Hospedaje en la nube", "Vercel", "Nivel gratuito permanente, despliegue automático y red de distribución global"],
      ["Seguridad", "Certificado TLS automático", "Cifra la comunicación entre el visitante y el sitio sin costo ni configuración manual"],
    ],
    [2200, 3400, 3760]
  ),
  h("7.3 Identidad visual", HeadingLevel.HEADING_2),
  p("El sitio anterior no poseía una identidad visual propia: utilizaba una plantilla genérica de WordPress sin relación con la naturaleza del trabajo de la fundación. La propuesta construye una identidad derivada del logotipo institucional, cuyos colores —verde de montaña, cian de agua y dorado del sol— se tradujeron en la paleta completa del sitio."),
  tabla(
    ["Elemento", "Origen", "Función en el diseño"],
    [
      ["Verde bosque", "Montañas del logotipo", "Color principal, textos destacados y fondos de secciones"],
      ["Cian de agua", "Río y laguna del logotipo", "Color de acento, enlaces y elementos interactivos"],
      ["Dorado y ámbar", "Sol en espiral del logotipo", "Llamados a la acción y numeración de secciones"],
      ["Crema de papel", "Contraste neutro", "Fondo general, evita el blanco puro que cansa la vista"],
    ],
    [2200, 3000, 4160]
  ),
  p("La tipografía combina una serif de carácter para los títulos con una sans serif de alta legibilidad para el texto corrido, sustituyendo la fuente por defecto de la plantilla anterior."),
  h("7.4 Fotografía e ilustración propia", HeadingLevel.HEADING_2),
  p("La portada del sitio utiliza fotografías reales del territorio que atiende FUNDACA —el volcán y el lago Arenal, y las cataratas del río Celeste—, incluyendo una fotografía propia aportada por el equipo. Las especies representativas del Área de Conservación Arenal-Tempisque se presentan mediante ilustraciones vectoriales propias, cada una acompañada de su nombre científico y de una fotografía de referencia:"),
  tabla(
    ["Especie", "Nombre científico", "Vínculo con la labor de FUNDACA"],
    [
      ["Tucán pico iris", "Ramphastos sulfuratus", "Dispersa las semillas que regeneran el bosque tras cada siembra"],
      ["Rana calzonuda", "Agalychnis callidryas", "Su piel depende de aguas limpias: indica el estado de los ríos"],
      ["Bocaracá", "Bothriechis schlegelii", "Solo habita bosques maduros y sanos"],
      ["Danta", "Tapirus bairdii", "Jardinera del bosque y especie en peligro"],
      ["Pizote", "Nasua narica", "Convive con las comunidades y protagoniza campañas de educación ambiental"],
      ["Mariposa morfo azul", "Morpho helenor", "Poliniza el sotobosque húmedo de la cordillera"],
      ["Perezoso de dos dedos", "Choloepus hoffmanni", "Requiere bosque continuo, justifica los corredores biológicos"],
      ["Colibrí", "Trochilidae", "Poliniza cientos de plantas nativas del área"],
    ],
    [2200, 2600, 4560]
  ),
  p("La portada presenta además tres fotografías del territorio que se alternan automáticamente cada siete segundos, más las fotografías que el propio personal de la fundación puede publicar desde el panel administrativo para mantener la portada actualizada con evidencia reciente de campo."),
  h("7.5 Movimiento y accesibilidad", HeadingLevel.HEADING_2),
  p("Cada animal posee una animación acorde a su comportamiento real: la mariposa aletea, el perezoso se balancea, el colibrí vibra y el tucán se ladea. El contenido de cada sección aparece de forma escalonada al entrar en pantalla. Todas las animaciones utilizan exclusivamente las propiedades de transformación y opacidad, que el navegador procesa en la tarjeta gráfica sin recalcular la disposición de la página."),
  p("La totalidad del movimiento se desactiva automáticamente cuando el sistema operativo de la persona visitante indica preferencia por movimiento reducido, condición que atiende a quienes experimentan mareo o malestar ante interfaces animadas. El sitio incorpora además un enlace de salto al contenido para navegación por teclado y textos alternativos en todos los elementos gráficos."),
  new Paragraph({ children: [new PageBreak()] }),
  h("7.6 Justificación de la plataforma de nube", HeadingLevel.HEADING_2),
  p("Se seleccionó Vercel como plataforma de despliegue tras evaluar alternativas de infraestructura como servicio y de plataforma como servicio. Los criterios determinantes fueron el costo permanente de cero colones para la fundación, la ausencia de necesidad de administrar servidores, el despliegue automático ante cada cambio en el repositorio, la entrega mediante red de distribución de contenido con nodos distribuidos globalmente y la emisión automática del certificado de seguridad."),
  new Paragraph({ children: [new PageBreak()] }),
];

const panelAdministrativo = [
  h("8. Panel administrativo y gestión de contenido", HeadingLevel.HEADING_1),
  p("Como parte de los objetivos específicos del proyecto, se requería que el personal de FUNDACA —sin conocimientos técnicos de programación— pudiera actualizar el contenido del sitio y gestionar sus propios documentos y evidencia fotográfica, sin depender del equipo de desarrollo para cada cambio."),
  h("8.1 Evaluación de herramientas de gestión de contenido", HeadingLevel.HEADING_2),
  p("Se evaluaron dos alternativas para resolver este requerimiento: un sistema de gestión de contenido especializado y una plataforma de backend como servicio. El primero destaca por su editor de contenido estructurado, pero en su plan gratuito no permite restringir el acceso de lectura a los datos: cualquier persona que conociera el identificador del proyecto podía consultar la información directamente a través de su interfaz de programación de aplicaciones, sin necesidad de iniciar sesión. Esta limitación resultaba incompatible con el requisito de que los documentos internos de la fundación —actas, convenios, evidencia de campañas— permanecieran accesibles únicamente para el personal autorizado."),
  p("Se optó entonces por Supabase, que ofrece autenticación de usuarios, base de datos relacional PostgreSQL y almacenamiento de archivos bajo un mismo servicio, con seguridad a nivel de fila (Row Level Security) que permite definir, tabla por tabla, qué información es de lectura pública y cuál requiere una sesión autenticada. Esta decisión permitió construir tanto el contenido público del sitio como la zona privada del personal sobre una misma base de datos, sin depender de una herramienta externa de gestión de contenido ni de un costo de licenciamiento."),
  h("8.2 Arquitectura de acceso y seguridad", HeadingLevel.HEADING_2),
  p("El panel administrativo vive en una ruta reservada del sitio, sin enlace visible en el menú principal de navegación, y queda protegido en dos capas: un middleware de servidor verifica en cada solicitud que exista una sesión válida antes de permitir el acceso, y las políticas de seguridad a nivel de fila de la base de datos garantizan que, incluso si alguien intentara consultar la información directamente, las tablas privadas devuelvan resultados vacíos sin una sesión autenticada. El ingreso de funcionarios se realiza con correo y contraseña; no existe registro público de cuentas nuevas, por lo que cada persona autorizada debe ser agregada manualmente por el equipo administrador."),
  p("Los archivos que suben los funcionarios se almacenan en dos espacios separados: uno público, para las fotografías que se muestran en el sitio (noticias, actividades, carrusel de portada y fotografías de programas), y uno privado, exclusivo para documentos internos, cuyas rutas de descarga se generan mediante enlaces temporales firmados que solo un usuario autenticado puede solicitar."),
  h("8.3 Funcionalidades del panel", HeadingLevel.HEADING_2),
  p("El panel cuenta con cinco secciones, cada una con una lista de los registros existentes y un formulario para crear o editar contenido nuevo:"),
  tabla(
    ["Sección", "Contenido que administra", "Visibilidad"],
    [
      ["Noticias", "Título, categoría, resumen, cuerpo del artículo e imagen principal", "Pública — se refleja en la página de noticias y en el inicio"],
      ["Actividades", "Giras, charlas y campañas con fecha, lugar, descripción e imagen", "Pública — página dedicada de actividades"],
      ["Carrusel de portada", "Fotografías que rotan en el encabezado del inicio", "Pública"],
      ["Fotos de programas", "Imágenes de campo de las líneas de trabajo de la fundación", "Pública"],
      ["Documentos internos", "Actas, convenios, informes y evidencia de campañas, con archivos adjuntos", "Privada — solo personal autorizado"],
    ],
    [2400, 4600, 2360]
  ),
  new Paragraph({ spacing: { after: 240 }, children: [] }),
  h("8.4 Evidencia del panel administrativo", HeadingLevel.HEADING_2),
  ...captura("panel\\01-login.png", "Pantalla de acceso para funcionarios."),
  ...captura("panel\\02-panel-principal.png", "Panel principal con las cinco secciones administrables."),
  ...captura("panel\\03-documentos-internos.png", "Sección de documentos internos, visible solo para personal autorizado."),
  ...captura("panel\\04-noticias.png", "Sección de noticias del panel, con su reflejo en el sitio público."),
  new Paragraph({ children: [new PageBreak()] }),
];

const desarrollo = [
  h("9. Desarrollo e implementación", HeadingLevel.HEADING_1),
  p("Esta sección documenta el proceso de construcción del sitio, desde la estructura del proyecto hasta la implementación de cada sección y del panel administrativo."),
  p("El proyecto se organizó bajo un principio central: el contenido institucional fijo —misión, historia, líneas de trabajo, datos de contacto— reside en un único archivo de datos, separado de las páginas que lo presentan, mientras que el contenido dinámico —noticias, actividades, fotografías y documentos— se gestiona directamente desde el panel administrativo y se almacena en la base de datos. De este modo, el personal de FUNDACA puede actualizar la información que cambia con frecuencia sin necesidad de conocer el código de las páginas ni riesgo de romper el diseño."),
  tabla(
    ["Carpeta", "Contenido"],
    [
      ["src/app", "Una carpeta por cada página del sitio público y por cada pantalla del panel administrativo"],
      ["src/app/admin", "Pantallas del panel: acceso, noticias, actividades, carrusel, fotos de programas y documentos internos"],
      ["src/components", "Piezas reutilizables: encabezado, pie de página, fauna, escenas y formularios"],
      ["src/data", "Archivo único con el contenido institucional fijo"],
      ["src/lib", "Consultas a la base de datos y configuración de los clientes de Supabase"],
      ["supabase", "Definición de tablas, políticas de seguridad y espacios de almacenamiento"],
      ["public/marca", "Logotipo de la fundación"],
      ["docs", "Documentación del proyecto y evidencia fotográfica"],
    ],
    [3200, 6160]
  ),
  p("Se implementaron ocho páginas públicas —inicio, la fundación, programas, actividades, voluntariado, noticias, biblioteca, aliados, contacto y donaciones— y seis pantallas del panel administrativo. Los formularios de voluntariado y de contacto componen el mensaje con los datos ingresados y lo dirigen al correo institucional de la fundación, mecanismo que funciona sin necesidad de contratar un servicio de correo ni exponer credenciales en el código."),
  ...captura("proceso\\02-estructura-proyecto.png", "Estructura de carpetas del proyecto."),
  ...captura("proceso\\03-desarrollo-local.png", "Sitio ejecutándose en el entorno de desarrollo local."),
  ...captura("proceso\\04-repositorio-github.png", "Repositorio del proyecto publicado en GitHub."),
  new Paragraph({ children: [new PageBreak()] }),
];

const despliegue = [
  h("10. Despliegue en la nube", HeadingLevel.HEADING_1),
  p("El despliegue se realizó conectando el repositorio de GitHub con la plataforma Vercel, la cual detecta automáticamente el tipo de proyecto, ejecuta la compilación y publica el resultado en su red de distribución de contenido. Cada cambio subido a la rama principal del repositorio dispara una nueva compilación y, si esta se completa sin errores, una nueva publicación automática en producción."),
  p("Las credenciales de conexión a la base de datos se configuraron como variables de entorno del proyecto en la plataforma de despliegue, replicando las mismas usadas en el entorno de desarrollo local, de forma que el código fuente nunca expone credenciales dentro del repositorio. El sitio quedó publicado bajo el subdominio gratuito fundaca.vercel.app, provisto sin costo por la plataforma de despliegue."),
  ...captura("proceso\\05-vercel-importar.png", "Importación del repositorio en Vercel."),
  ...captura("proceso\\06-vercel-compilacion.png", "Registro de la compilación y despliegue."),
  ...captura("proceso\\07-vercel-produccion.png", "Sitio publicado en producción con certificado de seguridad activo."),
  new Paragraph({ children: [new PageBreak()] }),
];

const resultados = [
  h("11. Resultados", HeadingLevel.HEADING_1),
  h("11.1 Comparación entre el estado anterior y el resultado", HeadingLevel.HEADING_2),
  tabla(
    ["Aspecto", "Antes", "Después"],
    [
      ["Identidad visual", "Plantilla genérica sin personalización", "Identidad propia acorde a la misión ambiental"],
      ["Página de inicio", "Un párrafo de texto sin elementos visuales", "Portada con propuesta de valor y llamados a la acción"],
      ["Bloques vacíos", "Tres secciones rotas en la portada", "Contenido completo en todas las secciones"],
      ["Diseño responsivo", "Adaptación limitada", "Adaptación completa a móvil, tableta y escritorio"],
      ["Voluntariado", "Mecanismo no funcional", "Formulario operativo"],
      ["Contacto", "Datos solo en el pie de página", "Sección dedicada y formulario de contacto"],
      ["Gestión de contenido", "Dependía por completo del equipo de desarrollo", "Panel propio para que el personal actualice noticias, actividades y fotografías"],
      ["Documentación interna", "Sin mecanismo digital centralizado", "Repositorio privado de documentos con control de acceso"],
      ["Hospedaje", "WordPress.com gratuito", "Plataforma de nube con red de distribución global"],
      ["Seguridad", "Sin control sobre la configuración", "Certificado TLS automático, autenticación y datos privados protegidos"],
      ["Actualización", "Manual dentro de WordPress.com", "Despliegue automático desde el repositorio y panel administrativo propio"],
    ],
    [2400, 3400, 3560]
  ),
  new Paragraph({ spacing: { after: 240 }, children: [] }),
  h("11.2 Evidencia del resultado", HeadingLevel.HEADING_2),
  ...captura("despues\\01-inicio.png", "Página de inicio del sitio rediseñado."),
  ...captura("despues\\02-que-es-fundaca.png", "Sección Qué es FUNDACA rediseñada."),
  ...captura("despues\\03-programas.png", "Sección Programas rediseñada."),
  ...captura("despues\\05-voluntariado.png", "Formulario de voluntariado funcional."),
  ...captura("despues\\08-movil-inicio.png", "Visualización del sitio rediseñado en dispositivo móvil."),
  new Paragraph({ children: [new PageBreak()] }),
];

const conclusiones = [
  h("12. Conclusiones", HeadingLevel.HEADING_1),
  p("El proyecto cumplió con el objetivo general de rediseñar y desplegar el sitio institucional de FUNDACA sobre una plataforma de computación en la nube, incorporando además una capacidad que fortalece la sostenibilidad de la solución en el tiempo: un panel administrativo que permite al personal de la fundación gestionar su propio contenido sin intervención técnica externa."),
  p("Respecto a los objetivos específicos, se diagnosticó el sitio anterior y se documentaron sus deficiencias; se diseñó una identidad visual propia derivada del logotipo institucional; se desarrolló el sitio con tecnologías web modernas y diseño responsivo; se implementaron formularios funcionales de contacto y voluntariado; se diseñó y desplegó un panel administrativo con autenticación propia; se definió una arquitectura de datos con separación explícita entre contenido público y privado; se desplegó el sitio con integración continua desde el repositorio; se garantizó la entrega segura mediante certificado de seguridad automático; y se documentó el proceso completo, incluyendo la comparación entre el estado anterior y el resultado obtenido."),
  p("La incorporación del panel administrativo respondió a una necesidad identificada durante el desarrollo: la fundación no solo requería un sitio más atractivo, sino una forma sostenible de mantenerlo actualizado sin depender permanentemente del equipo que lo construyó. Resolver esa necesidad exigió evaluar más de una herramienta de gestión de contenido y elegir la que garantizara privacidad real para la información sensible del personal, lo que se tradujo en una arquitectura de datos con seguridad a nivel de fila y separación explícita entre lo público y lo privado."),
  p("El resultado es un sitio web institucional funcional, seguro y sostenible en el tiempo, hospedado sin costo permanente para la fundación, que fortalece su presencia digital y le da autonomía real para mantenerla actualizada."),
  h("13. Recomendaciones", HeadingLevel.HEADING_1),
  vinieta("Adquirir un dominio propio para reforzar la credibilidad institucional ante entes financiadores."),
  vinieta("Registrar en el panel administrativo las cuentas de todo el personal que vaya a gestionar contenido, asignando una contraseña individual a cada persona."),
  vinieta("Capacitar al personal de FUNDACA en el uso del panel administrativo para la actualización periódica del contenido."),
  vinieta("Incorporar una pasarela de pago en línea una vez completados los trámites bancarios de la fundación."),
  vinieta("Mantener actualizada la sección de noticias y actividades desde el panel administrativo, ya que constituye la principal evidencia del impacto de la organización."),
  vinieta("Realizar respaldos periódicos de los documentos internos cargados en la plataforma."),
  h("14. Referencias", HeadingLevel.HEADING_1),
  p("FUNDACA. Sitio web institucional. Recuperado de https://fundaca.wordpress.com", { alineacion: AlignmentType.LEFT }),
  p("Vercel Inc. Documentación de la plataforma. Recuperado de https://vercel.com/docs", { alineacion: AlignmentType.LEFT }),
  p("Next.js. Documentación oficial. Recuperado de https://nextjs.org/docs", { alineacion: AlignmentType.LEFT }),
  p("Supabase Inc. Documentación de la plataforma. Recuperado de https://supabase.com/docs", { alineacion: AlignmentType.LEFT }),
];

const doc = new Document({
  creator: "Equipo FUNDACA · Universidad Técnica Nacional",
  title: "Rediseño e implementación del sitio web institucional de FUNDACA",
  description: "Proyecto del curso ITI-522 Computación en la Nube",
  numbering: {
    config: [{
      reference: "vinietas",
      levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }],
    }],
  },
  styles: {
    default: { document: { run: { font: "Calibri", size: 24 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, color: "1F3864", font: "Calibri" },
        paragraph: { spacing: { before: 320, after: 180 } } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 27, bold: true, color: "2F6FA3", font: "Calibri" },
        paragraph: { spacing: { before: 260, after: 140 } } },
    ],
  },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ children: [PageNumber.CURRENT], size: 20 })],
        })],
      }),
    },
    children: [
      ...portada, ...indice, ...introduccion, ...justificacion, ...objetivos,
      ...alcance, ...diagnostico, ...metodologia, ...propuesta, ...panelAdministrativo,
      ...desarrollo, ...despliegue, ...resultados, ...conclusiones,
    ],
  }],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.mkdirSync(path.dirname(SALIDA), { recursive: true });
  fs.writeFileSync(SALIDA, buffer);
  console.log("Documento generado: " + SALIDA);
  console.log("Figuras: " + figura);
});
