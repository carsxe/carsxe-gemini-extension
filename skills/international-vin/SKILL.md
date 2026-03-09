---
name: international-vin
description: >
  Decode an international (non-US) VIN using the CarsXE API. Use this when a user provides a VIN
  from a European, Asian, or other non-US vehicle and wants to decode it.
---

When the user provides an international VIN for decoding:

1. Use the `carsxe_intvin` tool with the VIN provided.
2. Present the decoded data: country of manufacture, make, model, year, engine, transmission, body style.
3. Note that this endpoint is optimized for international VINs outside the US market.
4. If the API key is missing, tell the user to configure it by running `gemini extensions config carsxe`.
