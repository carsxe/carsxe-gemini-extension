---
name: lien-theft
description: >
  Check for active liens and theft records on a vehicle by VIN using the CarsXE API. Use this
  when a user asks whether a car has a lien, is stolen, or wants to verify ownership is clean
  before buying.
---

When the user asks about liens, theft records, or ownership verification for a vehicle:

1. Use the `carsxe_lien` tool with the VIN provided.
2. Present the lien status and theft records clearly.
3. Highlight any active liens or theft flags prominently — these are critical red flags for buyers.
4. If the API key is missing, tell the user to configure it by running `gemini extensions config carsxe`.
