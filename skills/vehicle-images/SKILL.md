---
name: vehicle-images
description: >
  Retrieve images of a vehicle by make, model, and year using the CarsXE API. Use this when a
  user wants to see what a vehicle looks like or asks for photos of a specific car.
---

When the user asks to see images of a vehicle:

1. Use the `carsxe_images` tool with the make, model, and year provided.
2. Display the returned image URLs, rendering them inline if the environment supports it.
3. Label images by type/angle if available.
4. If not all parameters are provided, ask the user for the missing info before calling the API.
5. If the API key is missing, tell the user to configure it by running `gemini extensions config carsxe`.
