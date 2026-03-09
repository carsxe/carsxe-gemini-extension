---
name: plate-decoder
description: >
  Look up vehicle information from a license plate number using the CarsXE API. Use this when a
  user mentions a license plate and wants to know what vehicle it belongs to.
---

When the user wants to look up a vehicle from a license plate:

1. Extract the plate number, country code, and state/province from the user's message.
2. If any required info (plate, country) is missing, ask the user to provide it.
3. Use the `carsxe_plate` tool with the plate, country, and state parameters.
4. Present the results: Make, Model, Year, VIN, and registration info.
5. If the API key is missing, tell the user to configure it by running `gemini extensions config carsxe`.
