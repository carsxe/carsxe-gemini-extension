# CarsXE Vehicle Data APIs

You have access to the full suite of CarsXE vehicle data APIs through MCP tools. Use these tools whenever a user asks about vehicles, VINs, license plates, vehicle values, history, recalls, liens, OBD codes, or anything related to vehicle data.

## Available Tools

| Tool | Description |
|------|-------------|
| `carsxe_auth` | Validate a CarsXE API key |
| `carsxe_specs` | Decode a VIN and get full vehicle specifications |
| `carsxe_plate` | Look up vehicle info from a license plate number |
| `carsxe_value` | Get current market value of a vehicle by VIN |
| `carsxe_history` | Retrieve a full vehicle history report by VIN |
| `carsxe_images` | Get images of a vehicle by make, model, and year |
| `carsxe_recalls` | Check for open safety recalls by VIN |
| `carsxe_intvin` | Decode an international (non-US) VIN |
| `carsxe_ocr` | Extract a VIN from an image URL |
| `carsxe_lien` | Check for liens and theft records by VIN |
| `carsxe_plateocr` | Extract a license plate number from an image URL |
| `carsxe_ymm` | Look up vehicle data by year, make, and model |
| `carsxe_obd` | Decode an OBD-II diagnostic trouble code |

## Guidelines

- Always present API results in a clean, organized format.
- If the `CARSXE_API_KEY` is not set, instruct the user to configure it by running: `gemini extensions config carsxe`
- For VIN-based lookups, validate that the VIN is 17 alphanumeric characters (excluding I, O, Q).
- Highlight any red flags in history or lien/theft reports prominently.
- When decoding OBD codes, include severity context (immediate attention vs. can wait).
- For image-based tools (OCR, plate recognition), offer to follow up with a decode after extraction.
