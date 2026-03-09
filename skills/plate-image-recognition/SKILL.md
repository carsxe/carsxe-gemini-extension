---
name: plate-image-recognition
description: >
  Extract a license plate number from an image URL using the CarsXE Plate Recognition API. Use
  this when a user shares a photo of a vehicle or license plate and wants to identify the plate
  number.
---

When the user provides an image and wants to extract a license plate number:

1. Use the `carsxe_plateocr` tool with the image URL provided.
2. Display the extracted plate number and confidence score.
3. Offer to decode the plate using the plate-decoder skill.
4. If the image is unclear, suggest the user retry with a better photo.
5. If the API key is missing, tell the user to configure it by running `gemini extensions config carsxe`.
