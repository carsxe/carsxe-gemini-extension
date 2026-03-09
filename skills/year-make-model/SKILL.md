---
name: year-make-model
description: >
  Look up vehicle data by Year, Make, and Model using the CarsXE YMM API. Use this when a user
  doesn't have a VIN but knows the year, make, and model of a vehicle and wants specs, trims, or
  features.
---

When the user asks about a vehicle by year, make, and model (without a VIN):

1. Use the `carsxe_ymm` tool with the year, make, model, and optional trim provided.
2. Present the results: available trims, engine options, features, and specs.
3. If the user did not specify a trim, list all available trims for that year/make/model.
4. Only include the trim parameter if the user specified one.
5. If the API key is missing, tell the user to configure it by running `gemini extensions config carsxe`.
