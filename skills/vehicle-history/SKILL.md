---
name: vehicle-history
description: >
  Retrieve a vehicle history report from a VIN using the CarsXE API. Use this when a user wants
  to know a car's history — past owners, accidents, title status, odometer readings, or whether
  it's been in a crash.
---

When the user asks about a vehicle's history and provides a VIN:

1. Use the `carsxe_history` tool with the VIN provided.
2. Summarize the key findings:
   - Number of previous owners
   - Accident/damage records
   - Title status (clean, salvage, rebuilt, flood)
   - Odometer history
   - Theft records
3. Clearly highlight any red flags such as salvage title, accidents, or odometer rollback.
4. If the API key is missing, tell the user to configure it by running `gemini extensions config carsxe`.
