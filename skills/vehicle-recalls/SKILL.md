---
name: vehicle-recalls
description: >
  Check for open safety recalls on a vehicle using the CarsXE API. Use this when a user asks
  whether a car has any recalls, safety issues, or wants to know if their vehicle needs a recall
  repair.
---

When the user asks about vehicle recalls and provides a VIN:

1. Use the `carsxe_recalls` tool with the VIN provided.
2. Present recall details including:
   - Total number of open recalls
   - For each recall: campaign number, component, defect description, remedy status
3. If no recalls are found, clearly confirm the vehicle has no open recalls.
4. Emphasize any safety-critical recalls.
5. If the API key is missing, tell the user to configure it by running `gemini extensions config carsxe`.
