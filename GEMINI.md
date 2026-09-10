# CarsXE Vehicle Data APIs

You have access to the full suite of CarsXE vehicle data APIs through MCP tools. Use these tools whenever a user asks about vehicles, VINs, license plates, vehicle values, history, recalls (VIN, year/make/model, or batch), YMM options, ownership, liens, OBD codes, or anything related to vehicle data.

## Available Tools

| Tool              | Description                                      |
| ----------------- | ------------------------------------------------ |
| `carsxe_auth`     | Validate a CarsXE API key                        |
| `carsxe_specs`    | Decode a VIN and get full vehicle specifications |
| `carsxe_plate`    | Look up vehicle info from a license plate number |
| `carsxe_value`    | Get current market value of a vehicle by VIN     |
| `carsxe_history`  | Retrieve a full vehicle history report by VIN    |
| `carsxe_images`   | Get images of a vehicle by make, model, and year |
| `carsxe_recalls`  | Check for open safety recalls by VIN             |
| `carsxe_recalls_ymm` | Check safety recalls by year, make, and model (no VIN) |
| `carsxe_recalls_batch_submit` | Submit a bulk VIN recall check (up to 10,000 VINs) |
| `carsxe_recalls_batch_status` | Poll status of a submitted recalls batch |
| `carsxe_recalls_batch_results` | Fetch completed bulk recall results as JSON |
| `carsxe_recalls_batch_download` | Download completed bulk recall results as CSV |
| `carsxe_intvin`   | Decode an international (non-US) VIN             |
| `carsxe_ocr`      | Extract a VIN from an image URL                  |
| `carsxe_lien`     | Check for liens and theft records by VIN         |
| `carsxe_plateocr` | Extract a license plate number from an image URL |
| `carsxe_ymm`      | Look up vehicle data by year, make, and model    |
| `carsxe_ymm_options` | List cascading year/make/model/trim/variant options |
| `carsxe_ownership_vin` | Enterprise: registered owner(s) by VIN |
| `carsxe_ownership_person` | Enterprise: person lookup by name + address + ZIP |
| `carsxe_ownership_address` | Enterprise: residents at a street address + ZIP |
| `carsxe_ownership_zip` | Enterprise: people in a ZIP with optional filters |
| `carsxe_obd`      | Decode an OBD-II diagnostic trouble code         |

## Guidelines

- Always present API results in a clean, organized format.
- If the `CARSXE_API_KEY` is not set, instruct the user to configure it by running: `gemini extensions config carsxe`
- For VIN-based lookups, validate that the VIN is 17 alphanumeric characters (excluding I, O, Q).
- For recalls: use `carsxe_recalls` for one VIN, `carsxe_recalls_ymm` for year/make/model with no VIN, and the `carsxe_recalls_batch_*` tools for fleets or CSV lists.
- Ownership tools are Enterprise-only. Do not call a phone ownership endpoint. Street address must not include city or state. A 404 / `no_data` response means no match and is not billed.
- Highlight any red flags in history or lien/theft reports prominently.
- When decoding OBD codes, include severity context (immediate attention vs. can wait).
- For image-based tools (OCR, plate recognition), offer to follow up with a decode after extraction.
