export const snackLines = [
  {
    id: 'a4e9fb0f-2c91-4f4a-a9c4-5480d125af11',
    lotCode: 'PS-280-A24',
    lineName: 'Puppy Start v2.8',
    shortName: 'Puppy Start',
    process: 'Soft-Bake',
    processLabel: 'Soft-Bake',
    madeAt: '2026-05-02',
    expiresAt: '2026-08-02',
    conservation: {
      title: 'Crocancia suave protegida',
      instructions: [
        'Cerrar el empaque después de cada uso.',
        'Guardar en un lugar fresco, seco y sin sol directo.',
        'Consumir dentro de 21 días después de abrir.'
      ]
    },
    contains: ['huevo', 'gluten'],
    unit: 'galletas',
    gramsPerUnit: 8,
    benefit: {
      label: 'Crecimiento',
      score: 84,
      detail: 'Energía limpia y textura amable para cachorros en etapa de exploración.'
    },
    ingredients: [
      {
        name: 'Orito',
        origin: 'Pequeños productores de Santo Domingo, Ecuador',
        why: 'Aporta dulzor natural, potasio y energía de liberación amable para evitar snacks cargados de azúcar refinada.'
      },
      {
        name: 'Zapallo',
        origin: 'Huertos locales de Ambato, Ecuador',
        why: 'Entrega fibra soluble y beta-carotenos que apoyan digestión, saciedad y desarrollo saludable.'
      },
      {
        name: 'Harina de avena',
        origin: 'Molinos artesanales de la Sierra ecuatoriana',
        why: 'Da estructura a la galleta y aporta carbohidratos complejos para una ración más estable.'
      },
      {
        name: 'Huevo',
        origin: 'Granjas familiares de Tungurahua, Ecuador',
        why: 'Usamos huevo por su proteína de alta biodisponibilidad, útil para músculos y crecimiento.'
      },
      {
        name: 'Maicena',
        origin: 'Proveedores agroindustriales verificados de Ecuador',
        why: 'Mejora la textura Soft-Bake sin volver pesada la mordida.'
      },
      {
        name: 'Aceite de girasol',
        origin: 'Cultivos seleccionados de la Costa ecuatoriana',
        why: 'Aporta ácidos grasos que ayudan a mantener piel y pelaje con brillo natural.'
      }
    ]
  },
  {
    id: 'bf132c3a-b3e7-44fd-80cb-1a8a57483a21',
    lotCode: 'FK-100-G07',
    lineName: 'Fresh Kiss v1.0',
    shortName: 'Fresh Kiss',
    process: 'Cold-Set/Gomita',
    processLabel: 'Cold-Set',
    madeAt: '2026-05-10',
    expiresAt: '2026-06-24',
    conservation: {
      title: 'Frescura refrigerada',
      instructions: [
        'Mantener refrigerado tras abrir.',
        'Usar manos limpias o cuchara seca al servir.',
        'Consumir dentro de 10 días después de abrir.'
      ]
    },
    contains: [],
    unit: 'gomitas',
    gramsPerUnit: 5,
    benefit: {
      label: 'Aliento Fresco',
      score: 91,
      detail: 'Botánicos aromáticos para una boca más fresca sin perfumes artificiales.'
    },
    ingredients: [
      {
        name: 'Perejil',
        origin: 'Productores locales de Ambato, Ecuador',
        why: 'Ayuda a neutralizar olores desde el sistema digestivo y aporta clorofila natural.'
      },
      {
        name: 'Menta',
        origin: 'Huertos aromáticos de Patate, Ecuador',
        why: 'Usamos menta para una sensación fresca y una aceptación aromática amable.'
      },
      {
        name: 'Aceite de coco',
        origin: 'Cooperativas de Manabí, Ecuador',
        why: 'Aporta una base lipídica suave y ayuda a redondear el sabor de la gomita.'
      },
      {
        name: 'Gelatina sin sabor',
        origin: 'Proveedor certificado de grado alimentario',
        why: 'Da estructura Cold-Set sin horneado, preservando mejor los botánicos sensibles.'
      },
      {
        name: 'Agua purificada',
        origin: 'Filtración interna NatuPet',
        why: 'Permite una textura limpia y consistente, sin minerales que alteren el sabor.'
      }
    ]
  },
  {
    id: 'c93fa275-909a-4f55-8301-b8e4d62b2059',
    lotCode: 'PC-CP-042',
    lineName: 'Patas de Pollo - Colágeno Puro',
    shortName: 'Colágeno Puro',
    process: 'Deshidratación lenta',
    processLabel: 'Slow-Dry',
    madeAt: '2026-04-22',
    expiresAt: '2026-10-22',
    conservation: {
      title: 'Seco, limpio y aireado',
      instructions: [
        'Conservar en envase hermético.',
        'Evitar humedad y cambios bruscos de temperatura.',
        'Supervisar siempre durante la masticación.'
      ]
    },
    contains: ['pollo'],
    unit: 'piezas',
    gramsPerUnit: 18,
    benefit: {
      label: 'Colágeno Articular',
      score: 88,
      detail: 'Masticación funcional con colágeno natural para articulaciones activas.'
    },
    ingredients: [
      {
        name: '100% Pata de pollo deshidratada',
        origin: 'Granjas avícolas auditadas de la Sierra ecuatoriana',
        why: 'Ingrediente único, sin rellenos. Aporta colágeno, textura de masticación y soporte articular natural.'
      }
    ]
  }
];

export const sensitiveAlternative = {
  lineName: 'Sensitive Monoproteic',
  reason: 'Alternativa sugerida sin pollo, formulada para mascotas con historial de alergias.'
};

export const getSnackById = (id) => snackLines.find((snack) => snack.id === id) || snackLines[0];
