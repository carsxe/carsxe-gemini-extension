---
name: year-make-model
description: >
  Look up vehicle data by Year, Make, and Model using the CarsXE YMM API. Use this when a user
  doesn't have a VIN but knows the year, make, and model of a vehicle and wants specs, trims, or
  features.
---

When the user asks about a vehicle by year, make, and model (without a VIN):

1. If they want available years, makes, models, trims, or variants (dropdowns / "what years was X sold"), use `carsxe_ymm_options` instead of full specs.
2. Otherwise use the `carsxe_ymm` tool with the year, make, model, and optional trim provided.
3. Present the results: available trims, engine options, features, and specs.
4. If the user did not specify a trim, list all available trims for that year/make/model.
5. Only include the trim parameter if the user specified one.
6. If the API key is missing, tell the user to configure it by running `gemini extensions config carsxe`.
