---
name: vin-ocr
description: >
  Extract a VIN from a photo or image URL using the CarsXE VIN OCR API. Use this when a user
  shares an image of a vehicle or VIN plate and wants to identify the VIN.
---

When the user provides an image and wants to extract a VIN from it:

1. Use the `carsxe_ocr` tool with the image URL provided.
2. Display the extracted VIN and confidence score.
3. Offer to immediately decode the VIN using the vehicle-specs skill.
4. If image quality is poor or the VIN cannot be extracted, suggest the user try a clearer photo with better lighting and angle.
5. If the API key is missing, tell the user to configure it by running `gemini extensions config carsxe`.
