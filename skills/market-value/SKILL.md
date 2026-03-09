---
name: market-value
description: >
  Get the current market value of a vehicle from its VIN using the CarsXE API. Use this when a
  user asks how much a car is worth, wants to know its value, or is thinking about buying/selling
  a vehicle.
---

When the user asks about a vehicle's value and provides a VIN:

1. Use the `carsxe_value` tool with the VIN provided.
2. Present the results including:
   - Current estimated market value
   - Value range (low / average / high) if available
   - Historical value trend if available
3. Provide helpful context — such as whether the value is strong for the vehicle's age or mileage, if that information is available.
4. If the API key is missing, tell the user to configure it by running `gemini extensions config carsxe`.
