import { sensitiveAlternative } from '../data/mockData.js';

const allergyMap = {
  pollo: ['pollo', 'huevo'],
  res: ['res'],
  gluten: ['gluten']
};

export function hasAllergyConflict(snack, allergies) {
  const selected = allergies.filter((allergy) => allergy !== 'ninguna');
  return selected.some((allergy) => {
    const blockedIngredients = allergyMap[allergy] || [allergy];
    return blockedIngredients.some((blocked) => snack.contains.includes(blocked));
  });
}

export function calculateDailyDose(profile, snack) {
  const weight = Number(profile.weight) || 1;
  const activityFactor = { bajo: 0.82, normal: 1, alto: 1.18 }[profile.activity] || 1;
  const ageFactor = { cachorro: 0.95, adulto: 1, senior: 0.85 }[profile.age] || 1;
  const baseSnackGrams = Math.max(6, Math.min(42, weight * 2.4 * activityFactor * ageFactor));
  const units = Math.max(1, Math.floor(baseSnackGrams / snack.gramsPerUnit));

  return {
    grams: Math.round(units * snack.gramsPerUnit),
    units,
    unitLabel: snack.unit
  };
}

export function buildRecommendation(profile, snack) {
  // Filtro de seguridad: revisa alergias seleccionadas contra alérgenos reales de la línea.
  // Para "pollo", también bloqueamos "huevo" por tratarse de una proteína aviar frecuente.
  const blocked = hasAllergyConflict(snack, profile.allergies);

  if (blocked) {
    return {
      status: 'blocked',
      title: 'Línea No Recomendada por Alergia',
      message: `${snack.lineName} contiene ingredientes incompatibles con las restricciones seleccionadas.`,
      alternative: sensitiveAlternative
    };
  }

  // Algoritmo de ración: estima gramos diarios por peso, ajusta por actividad y etapa de vida,
  // limita el resultado a una ventana conservadora y lo convierte a unidades reales del snack.
  const dose = calculateDailyDose(profile, snack);

  return {
    status: 'approved',
    title: 'Ración Fit Aprobada',
    message: `Ración máxima: ${dose.units} ${dose.unitLabel} al día para mantener su balance fit.`,
    dose
  };
}
