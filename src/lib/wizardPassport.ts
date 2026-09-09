/** Normaliza sliders do wizard (kebab-case) para atributos do Identity Passport. */

const ETHNICITY_LABELS = ["fair", "light", "medium", "deep"] as const;
const HAIR_LABELS = ["short", "medium", "long", "very long"] as const;

function bandLabel<T extends readonly string[]>(
  score: number,
  labels: T
): T[number] {
  const clamped = Math.max(0, Math.min(100, score));
  const idx = Math.min(labels.length - 1, Math.floor(clamped / (100 / labels.length)));
  return labels[idx];
}

export type WizardSliderStep = {
  sliders: Array<{ id: string; defaultValue: number }>;
};

/** Preenche defaults de sliders não tocados antes de gravar o passport. */
export function collectWizardValues(
  sliderValues: Record<string, number>,
  steps: WizardSliderStep[]
): Record<string, number> {
  const values: Record<string, number> = {};
  for (const step of steps) {
    for (const slider of step.sliders) {
      values[slider.id] = sliderValues[slider.id] ?? slider.defaultValue;
    }
  }
  return values;
}

export function wizardValuesToPassportAttributes(
  values: Record<string, number>
): Record<string, unknown> {
  const age = Math.max(18, Math.round(values.age ?? 25));
  const ethnicityScore = values.ethnicity ?? 50;
  const skinTone = bandLabel(ethnicityScore, ETHNICITY_LABELS);
  const hairLength = values["hair-length"] ?? 60;
  const hair = bandLabel(hairLength, HAIR_LABELS);
  const hairVolume = values["hair-volume"] ?? 50;
  const volumeWord =
    hairVolume < 35 ? "fine" : hairVolume < 70 ? "medium volume" : "voluminous";

  return {
    apparent_age: age,
    age,
    ethnicity: skinTone,
    skin_tone: skinTone,
    hair: `${hair}, ${volumeWord}`,
    hair_style: hair,
    hair_length: hairLength,
    hair_volume: hairVolume,
    height_cm: values.height ?? 170,
    skin_smoothness: values["skin-smoothness"] ?? 80,
    makeup_intensity: values["makeup-intensity"] ?? 50,
    nail_length: values["nail-length"] ?? 40,
    nail_art: values["nail-art"] ?? 30,
    feet_care: values["feet-care"] ?? 70,
    jewelry_level: values["jewelry-level"] ?? 50,
    watch_luxury: values["watch-luxury"] ?? 60,
    tech_accessories: values["tech-accessories"] ?? 40,
    source: "creator_wizard_fase2",
    wizard_raw: values,
  };
}
