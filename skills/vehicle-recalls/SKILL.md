---
name: vehicle-recalls
description: >
  Check for open safety recalls on a vehicle using the CarsXE API. Use this when a user asks
  whether a car has any recalls, safety issues, or wants to know if their vehicle needs a recall
  repair.
---

When the user asks about vehicle recalls:

- If they provide a VIN, use the `carsxe_recalls` tool.
- If they have year/make/model but no VIN, use `carsxe_recalls_ymm` instead.
- If they have many VINs (fleet, inventory, CSV), use the recalls batch tools (`carsxe_recalls_batch_submit` / `status` / `results` / `download`).

1. Present recall details:
   - Total number of open recalls
   - For each recall: campaign number, component, defect description, remedy status
2. If no recalls are found, clearly confirm the vehicle has no open recalls.
3. Emphasize any safety-critical recalls.
4. If the API key is missing, tell the user to configure it by running `gemini extensions config carsxe`.
