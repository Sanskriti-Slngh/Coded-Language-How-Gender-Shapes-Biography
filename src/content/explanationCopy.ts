export const EXPLANATION_PANEL = {
  eyebrow: "Point explanation",
  title: "Embedding neighborhood summary",
  disclaimer:
    "This view describes distributional patterns in a large corpus of public biographies—not a judgment of individual bias or author intent.",
  disclaimerWomanLean:
    "This biography appears closer to woman-associated neighborhoods in the embedding space. The local neighborhood contains biographies more frequently labeled as women, suggesting shared framing patterns common in those texts.",
  disclaimerManLean:
    "This biography appears closer to man-associated neighborhoods in the embedding space. The local neighborhood contains biographies more frequently labeled as men, suggesting shared framing patterns common in those texts.",
  disclaimerMixed:
    "This biography sits near the middle of the learned writing-pattern space relative to woman- and man-labeled neighborhoods in this corpus.",
  frameColumnWoman:
    "Frames more common in woman-labeled biographies in this corpus (statistical co-occurrence, not a value judgment).",
  frameColumnMan:
    "Frames more common in man-labeled biographies in this corpus (statistical co-occurrence, not a value judgment).",
  phraseHelp:
    "These phrases co-occur more often with woman-labeled or man-labeled biographies in the training corpus. They are not inherently positive or negative.",
  nearbyBarNote:
    "The bar shows woman-label share among nearby biographies in embedding space; the large number highlights which label is more frequent locally.",
  similarProfilesLead:
    "Click a nearby profile to open that biography and compare framing patterns.",
} as const;

export function neighborhoodDisclaimer(
  lean: "woman" | "man" | "mixed",
): string {
  if (lean === "woman") return EXPLANATION_PANEL.disclaimerWomanLean;
  if (lean === "man") return EXPLANATION_PANEL.disclaimerManLean;
  return EXPLANATION_PANEL.disclaimerMixed;
}
