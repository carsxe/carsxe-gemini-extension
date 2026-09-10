---
name: recalls-batch
description: >
  Submit and retrieve bulk safety-recall checks for many VINs using the CarsXE Recalls Batch API.
  Use this when the user wants to check recalls for a fleet, inventory list, CSV of VINs, or more
  than a handful of vehicles at once.
---

When the user wants bulk recall checks (many VINs, a fleet, a CSV, or a spreadsheet):

1. **Submit** — use `carsxe_recalls_batch_submit` with at least one of `vins`, `csv`, or `csvUrl` (max 10,000 unique VINs). Optional `webhookUrl`. Return `batchId` and current `status`.
2. **Status** — use `carsxe_recalls_batch_status` until `completed`, `partial`, or `failed` (every 30–60 seconds; full processing often takes 30–60 minutes unless all VINs are cached).
3. **Results** (JSON) once complete — use `carsxe_recalls_batch_results`.
4. **Download** (CSV) if the user wants a file — use `carsxe_recalls_batch_download`.
5. For a single VIN use `carsxe_recalls`. For year/make/model with no VIN use `carsxe_recalls_ymm`.
6. If the API key is missing, tell the user to configure it by running `gemini extensions config carsxe`.
