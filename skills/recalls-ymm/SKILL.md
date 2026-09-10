---
name: recalls-ymm
description: >
  Check safety recalls by year, make, and model (no VIN) using the CarsXE Recalls by YMM API.
  Use this when the user asks about recalls for a model line, or has year/make/model but no VIN.
---

When the user asks about recalls or safety issues for a year/make/model and does **not** have a VIN:

1. Use the `carsxe_recalls_ymm` tool with year, make, and model.
2. Present recall details:
   - Total `recall_count` and `has_recalls`
   - For each recall: NHTSA campaign number, component, summary, consequence, remedy, report date
   - Highlight `park_it`, `park_outside`, or over-the-air remedy flags
3. If no recalls exist, clearly confirm the model line has no safety recalls.
4. Emphasize this is a model-line result, not a specific vehicle. If they later provide a VIN, use `carsxe_recalls` instead. For many VINs, use the recalls batch tools.
5. If the API key is missing, tell the user to configure it by running `gemini extensions config carsxe`.
