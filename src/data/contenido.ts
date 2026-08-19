// Contenido institucional de FUNDACA.
// Fuente: https://fundaca.wordpress.com (extraído el 10 de agosto de 2026).
// Editar aquí cambia el sitio completo: ninguna página escribe texto institucional a mano.

export const fundacion = {
  siglas: "FUNDACA",
  nombre: "Fundación para el Desarrollo del Área de Conservación Arenal",
  fundacion: "6 de diciembre de 1994",
  anio: 1994,
  area: "Área de Conservación Arenal-Tempisque",
  siglaArea: "ACAT",
  definicion:
    "Somos una organización sin fines de lucro orientada a la gestión integral de recursos para el desarrollo socioambiental del Área de Conservación Arenal-Tempisque y su zona de influencia, con el fin último de mejorar la calidad de vida de la región con equidad social, sustentabilidad y autosuficiencia, en armonía con el medioambiente.",
  coordinacion:
    "Promovemos una coordinación interinstitucional estrecha y eficiente, utilizando herramientas de planificación y ordenamiento territorial para lograr nuestros objetivos.",
  mision:
    "Somos una organización regional orientada a la gestión de recursos para el desarrollo socioambiental, mediante herramientas de planificación territorial coordinadas con instituciones locales, para mejorar la calidad de vida con equidad y sostenibilidad.",
  vision:
    "Consolidarnos técnica y financieramente, siendo reconocidos por la sociedad civil por una labor eficiente y transparente en la conservación y el desarrollo sostenible de los recursos naturales, en coordinación con el Área de Conservación Arenal-Tempisque.",
  objetivo:
    "Promover todo tipo de actividades orientadas hacia el uso y manejo racional de los recursos naturales, con énfasis en el trabajo con las comunidades cercanas a las áreas silvestres protegidas que ejercen mayor presión sobre los ecosistemas.",
  antecedentes: [
    "FUNDACA se constituyó el 6 de diciembre de 1994 como una organización sin fines de lucro interesada en promover el desarrollo social y económico de las comunidades del Área de Conservación Arenal-Tempisque.",
    "Surge para dar continuidad a las iniciativas productivas que enfatizaban el uso y manejo racional de los recursos naturales —turismo responsable, agricultura orgánica, agroforestería, artesanía y pequeña industria— impulsadas previamente por proyectos de conservación y desarrollo en la región.",
    "Funcionamos como una opción organizativa permanente en la zona, dirigida a desarrollar capacidades locales y a coordinar entre actores públicos, privados, institucionales y comunales.",
  ],
} as const;

export const lineasTrabajo = [
  {
    titulo: "Extensión comunitaria",
    descripcion: "Incentivamos la participación ciudadana en las comunidades del área de conservación.",
  },
  {
    titulo: "Gestión de recursos",
    descripcion: "Captamos y administramos fondos de cooperación con enfoque de género.",
  },
  {
    titulo: "Planificación y protección",
    descripcion: "Protegemos los recursos naturales y culturales mediante ordenamiento territorial.",
  },
  {
    titulo: "Asistencia técnica",
    descripcion: "Acompañamos técnica y ambientalmente a organizaciones y productores locales.",
  },
  {
    titulo: "Educación ambiental",
    descripcion: "Llevamos talleres y sensibilización a escuelas y comunidades de la región.",
  },
  {
    titulo: "Turismo ecológico",
    descripcion: "Promovemos un turismo responsable que beneficie a las comunidades locales.",
  },
  {
    titulo: "Adquisición de tierras",
    descripcion: "Gestionamos terrenos destinados a la conservación de ecosistemas.",
  },
  {
    titulo: "Actividades socioculturales",
    descripcion: "Fomentamos expresiones culturales comunitarias sostenibles en el tiempo.",
  },
] as const;

export const programas = [
  {
    slug: "gestion-socio-ambiental",
    titulo: "Gestión socioambiental",
    resumen:
      "Reforestación, manejo del recurso hídrico, biodigestores, lumbricultura, gestión de residuos y educación ambiental en las comunidades del ACAT.",
    detalle:
      "Articulamos acciones de conservación en el Área de Conservación Arenal-Tempisque: producción de plántulas nativas en vivero para reforestación, instalación de biodigestores en fincas familiares, gestión de residuos sólidos en coordinación con municipalidades y organizaciones comunales, y talleres de educación ambiental en escuelas de la región. También trabajamos en la recuperación del recurso hídrico y en proyectos de lumbricultura como alternativa productiva sostenible para las comunidades locales.",
  },
  {
    slug: "desarrollo-cultural-comunitario",
    titulo: "Desarrollo cultural comunitario",
    resumen:
      "Dinamización sociocultural, talleres con personas adultas mayores, ferias comunitarias y rescate de expresiones culturales de la región.",
    detalle:
      "Apoyamos la dinamización sociocultural de las comunidades del cantón de Tilarán y la región del ACAT. Organizamos ferias comunales, talleres con personas adultas mayores, actividades de rescate de expresiones culturales locales y acompañamos a grupos artísticos en su desarrollo. Creemos que la identidad cultural y la cohesión comunitaria son parte indisociable de la sostenibilidad a largo plazo de cualquier territorio.",
  },
  {
    slug: "otros-proyectos",
    titulo: "Otros proyectos",
    resumen:
      "Iniciativas de cooperación interinstitucional que no encajan en las dos líneas anteriores pero comparten el objetivo de mejorar la calidad de vida.",
    detalle:
      "Participamos en iniciativas de cooperación interinstitucional que complementan nuestras dos líneas principales. Esto incluye convenios de investigación con universidades, proyectos de desarrollo empresarial con organizaciones de emprendimiento regional y espacios de planificación estratégica participativa, siempre con el objetivo de mejorar la calidad de vida de las comunidades del Área de Conservación Arenal-Tempisque.",
  },
] as const;

export const junta = [
  { cargo: "Presidente", nombre: "Germán Aguilar Vega", representa: "Ministerio de Ambiente y Energía" },
  { cargo: "Secretario", nombre: "José Alfredo Jiménez", representa: "Consejo Local del ACAT" },
  { cargo: "Tesorero", nombre: "Gustavo Rodríguez Agüero", representa: "Municipalidad de Tilarán" },
  { cargo: "Vocal I", nombre: "Karla Sánchez Campos", representa: "Instituto Costarricense de Electricidad" },
  { cargo: "Vocal II", nombre: "Flora Virginia Sirias Castro", representa: "Poder Ejecutivo" },
] as const;

export const voluntariado = {
  intro:
    "Recibimos personas voluntarias de Costa Rica y del mundo que quieran aportar su tiempo y conocimiento a la conservación del Área de Conservación Arenal-Tempisque.",
  ambitos: [
    {
      titulo: "Protección del medio ambiente",
      descripcion: "Mantenimiento, reparación y construcción de senderos, reforestación e instalación de biodigestores.",
    },
    {
      titulo: "Educación y sensibilización",
      descripcion: "Talleres medioambientales con niñas y niños en escuelas de la región.",
    },
    {
      titulo: "Dinamización sociocultural",
      descripcion: "Producción y acompañamiento de actividades de desarrollo cultural comunitario.",
    },
    {
      titulo: "Investigación científica o técnica",
      descripcion: "Apoyo a estudios y levantamientos técnicos sobre los ecosistemas del área de conservación.",
    },
  ],
  asignacion:
    "Las labores se distribuyen de manera individual o colectiva según los estudios, intereses y experiencia de cada persona voluntaria, así como por la duración de su estadía.",
} as const;

export const aliadosProyectos = [
  { nombre: "INDER", descripcion: "Instituto de Desarrollo Rural" },
  { nombre: "La Reserva Forest Foundation", descripcion: "Fundación para la conservación de bosques tropicales" },
  { nombre: "MAG", descripcion: "Ministerio de Agricultura y Ganadería" },
  { nombre: "CBLAT", descripcion: "Corredor Biológico Local Arenal-Tempisque" },
  { nombre: "SINAC", descripcion: "Sistema Nacional de Áreas de Conservación" },
  { nombre: "ACAT", descripcion: "Área de Conservación Arenal-Tempisque" },
  { nombre: "MINAE", descripcion: "Ministerio de Ambiente y Energía" },
  { nombre: "Quijotes y Molinos", descripcion: "Organización de desarrollo social y comunitario" },
  { nombre: "LCA", descripcion: "Liga de Conservación Arenal" },
  { nombre: "Reserva Santa Elena", descripcion: "Reserva biológica privada en Monteverde" },
  { nombre: "Pájaro Campana", descripcion: "Iniciativa de conservación ambiental de la región" },
  { nombre: "MEP", descripcion: "Ministerio de Educación Pública" },
  { nombre: "Ministerio de Salud", descripcion: "Ministerio de Salud de Costa Rica" },
] as const;

export const aliadosApoyo = [
  { nombre: "ProArtes", descripcion: "Programa Nacional de Educación Musical" },
  { nombre: "Ministerio de Cultura CR", descripcion: "Ministerio de Cultura y Juventud" },
  { nombre: "Acción Social UCR", descripcion: "Vicerrectoría de Acción Social, Universidad de Costa Rica" },
  { nombre: "GEV", descripcion: "Grupo de Energías Verdes" },
  { nombre: "GEF-PPD", descripcion: "Fondo para el Medio Ambiente Mundial — Pequeñas Donaciones" },
  { nombre: "CatuArte", descripcion: "Proyecto de dinamización cultural de Guanacaste" },
  { nombre: "Municipalidad de Tilarán", descripcion: "Gobierno local del cantón de Tilarán" },
  { nombre: "CEMEX", descripcion: "Empresa de materiales y construcción" },
  { nombre: "Plantas Eólicas", descripcion: "Parques de generación eólica del ACAT" },
  { nombre: "Oliva Films", descripcion: "Productora cinematográfica costarricense" },
  { nombre: "ICE", descripcion: "Instituto Costarricense de Electricidad" },
] as const;

export const cifras = [
  { valor: String(fundacion.anio), etiqueta: "Año de constitución" },
  { valor: String(aliadosProyectos.length + aliadosApoyo.length), etiqueta: "Organizaciones aliadas" },
  { valor: "3.645 kg", etiqueta: "Residuos recuperados en 2024" },
];

export const noticias = [
  {
    slug: "congreso-regional-empresarial-2024",
    fecha: "2024-09-23",
    fechaTexto: "23 de setiembre de 2024",
    titulo: "Primer Congreso Regional Empresarial Tilarán 2024",
    resumen:
      "FUNDACA participa en espacios de transferencia de conocimientos donde se adquieren estrategias y herramientas en temáticas actuales, junto a la UNED, la Municipalidad de Tilarán y organizaciones de emprendimiento de la región.",
    etiqueta: "Participación",
  },
  {
    slug: "residuos-recuperados-carretera",
    fecha: "2024-09-23",
    fechaTexto: "23 de setiembre de 2024",
    titulo: "145 kilos de residuos recuperados en carretera",
    resumen:
      "Con estudiantes de la UNED de Cañas y Tilarán se recuperaron 145 kilos de material entre el Restaurante Chaparral y la entrada a Parcelas de Quebrada Azul. Además se sembraron 20 árboles nativos producidos en el vivero de la UNED Cañas.",
    etiqueta: "Campaña",
  },
  {
    slug: "taller-faroles-material-reciclado",
    fecha: "2024-09-05",
    fechaTexto: "5 de setiembre de 2024",
    titulo: "Taller de faroles con material reciclado",
    resumen:
      "Aprovechando la proximidad de las fiestas patrias, se impartió un taller de elaboración de faroles con material reciclado a un grupo de personas adultas mayores de Tierras Morenas, Tilarán.",
    etiqueta: "Educación",
  },
  {
    slug: "feria-ambiental-escuela-el-roble",
    fecha: "2024-09-03",
    fechaTexto: "3 de setiembre de 2024",
    titulo: "Feria Ambiental en la Escuela El Roble",
    resumen:
      "Charlas ambientales, juegos, entrega de material educativo, siembra de árboles y recolección de reciclaje, sensibilizando a los estudiantes sobre la importancia de proteger los recursos naturales.",
    etiqueta: "Educación",
  },
  {
    slug: "dia-mundial-medio-ambiente-2024",
    fecha: "2024-06-05",
    fechaTexto: "5 de junio de 2024",
    titulo: "Día Mundial del Medio Ambiente",
    resumen:
      "«Nuestra Tierra. Nuestro futuro.» Somos la Generación Restauración: nuestra tarea es hacer crecer los bosques, revitalizar las fuentes de agua y restaurar los suelos.",
    etiqueta: "Campaña",
  },
  {
    slug: "sesion-trabajo-scotiabank",
    fecha: "2024-06-05",
    fechaTexto: "5 de junio de 2024",
    titulo: "Sesión de trabajo con Scotiabank",
    resumen:
      "La Junta Administrativa, la Dirección Ejecutiva y el área contable-financiera se reúnen con representantes de Scotiabank, quienes presentan el comportamiento del Fideicomiso Costa Rica-Canadá, que contiene fondos para la gestión de FUNDACA y del ACAT.",
    etiqueta: "Institucional",
  },
  {
    slug: "residuos-no-tradicionales-recolectados",
    fecha: "2024-06-05",
    fechaTexto: "5 de junio de 2024",
    titulo: "3.500 kilos de residuos no tradicionales recolectados",
    resumen:
      "Junto a la Municipalidad de Tilarán, el Ministerio de Salud, el ICE, CIDECAT, la UNED y el Proyecto Eólico Tila Wind se logró recuperar aproximadamente 3.500 kilogramos de residuos sólidos en la comunidad de Los Ángeles.",
    etiqueta: "Campaña",
  },
  {
    slug: "tercer-taller-plan-estrategico",
    fecha: "2024-05-27",
    fechaTexto: "27 de mayo de 2024",
    titulo: "Tercer taller del plan estratégico",
    resumen:
      "Se presentaron y analizaron los resultados de las líneas estratégicas para los siguientes cinco años, con participación de la Junta Administrativa, funcionarios, docentes y estudiantes de la Universidad Nacional.",
    etiqueta: "Institucional",
  },
  {
    slug: "dia-agricultor-calderon-mayorga",
    fecha: "2024-05-27",
    fechaTexto: "27 de mayo de 2024",
    titulo: "Día del Agricultor en la Escuela José María Calderón Mayorga",
    resumen:
      "Reconocimiento a agricultores y agricultoras del cantón de Tilarán, incentivando a los estudiantes a producir y consumir lo que da nuestra tierra y a valorar su arduo trabajo.",
    etiqueta: "Comunidad",
  },
  {
    slug: "dia-agricultor-escuela-el-carmen",
    fecha: "2024-05-27",
    fechaTexto: "27 de mayo de 2024",
    titulo: "Día del Agricultor en la Escuela El Carmen",
    resumen:
      "Reconocimiento a doña Marita Fallas, agricultora del cantón de Tilarán, fortaleciendo los procesos de educación ambiental junto a la UNED Tilarán.",
    etiqueta: "Comunidad",
  },
] as const;

export const biblioteca = {
  intro:
    "Documentos e información sobre medioambiente, sostenibilidad, reciclaje, educación ambiental, legislación ambiental, permacultura y decrecimiento.",
  grupos: [
    {
      titulo: "Libros y revistas",
      recursos: [
        { nombre: "Evolución de la Educación Ambiental en Costa Rica", nota: "Edgar Solano Muñoz · Revista de Ciencias Sociales, UCR" },
        { nombre: "The Ecologist", nota: "Revista internacional de medioambiente" },
        { nombre: "Ecosistemas", nota: "Revista científica de ecología" },
      ],
    },
    {
      titulo: "Sitios de interés",
      recursos: [
        { nombre: "EFE Verde", nota: "Agencia de noticias ambientales" },
        { nombre: "La Bioguía", nota: "Divulgación sobre vida sostenible" },
        { nombre: "Revista Ambienta", nota: "Publicación de medioambiente" },
        { nombre: "Rainforest Alliance", nota: "Comercio justo y conservación" },
        { nombre: "Sostenibilidad.com", nota: "Portal de sostenibilidad" },
        { nombre: "Voluntariado en vacaciones", nota: "Directorio de programas de voluntariado" },
      ],
    },
    {
      titulo: "Leyes, reglamentos y normativas",
      recursos: [
        { nombre: "Ley de Fundaciones de Costa Rica n.º 5338", nota: "Marco jurídico de las fundaciones" },
        { nombre: "Ley Forestal 7575, reglamento del artículo 18", nota: "Aprovechamiento forestal" },
        { nombre: "Incentivo y financiamiento forestal, artículo 47", nota: "Instrumentos de fomento" },
        { nombre: "Ley 9036 de Desarrollo Rural Territorial", nota: "INDER" },
        { nombre: "Manual de procedimiento de servicios ambientales", nota: "Pago por servicios ambientales" },
        { nombre: "Ley de Trabajo de Costa Rica", nota: "Normativa laboral aplicable" },
        { nombre: "Fondo de capitalización laboral", nota: "Normativa laboral aplicable" },
      ],
    },
  ],
} as const;

export const contacto = {
  direccion: "Av. 6, Edificio contiguo al MINAE",
  ciudad: "Tilarán, Guanacaste, Costa Rica",
  apartado: "Oficina de Correos 5710 · Código postal 50801",
  horario: "Lunes a viernes, de 8:00 a 12:00 y de 13:00 a 16:00",
  telefonos: ["+506 2695 6550", "+506 2695 6390", "+506 6434 4428"],
  sinpe: "+506 8506 4670",
  titular: "FUNDACA — Fundación para el Desarrollo del Área de Conservación Arenal",
  cuentaBancaria: "Pendiente de agregar",
  banco: "Pendiente de agregar",
  correos: ["fundaca.tilaran@gmail.com", "fundaca1995@gmail.com"],
  facebook: "https://www.facebook.com/fundacacr",
  instagram: "https://www.instagram.com/fundacacr1/",
  // Registrar los formularios en https://formspree.io y reemplazar estos IDs.
  formspree: {
    contacto: "REEMPLAZAR_CON_ID_DE_FORMSPREE",
    voluntariado: "REEMPLAZAR_CON_ID_DE_FORMSPREE",
  },
} as const;

export const navegacion = [
  { href: "/fundacion", texto: "La fundación" },
  { href: "/programas", texto: "Programas" },
  { href: "/actividades", texto: "Actividades" },
  { href: "/voluntariado", texto: "Voluntariado" },
  { href: "/noticias", texto: "Noticias" },
  { href: "/biblioteca", texto: "Biblioteca" },
  { href: "/aliados", texto: "Aliados" },
  { href: "/contacto", texto: "Contacto" },
] as const;
