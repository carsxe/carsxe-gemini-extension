---
name: ownership
description: >
  Look up registered vehicle owners and residents using the CarsXE Ownership API (Enterprise).
  Use this when the user asks who owns a VIN, who lives at an address, contact details for a
  named person, or people in a ZIP. Do not use for lien/theft checks.
---

When the user asks who owns a vehicle, who lives at an address, contact details for a person, or people in a ZIP (Enterprise only):

1. Choose one lookup. Do **not** call a phone ownership endpoint.
   - VIN → `carsxe_ownership_vin`
   - Person → `carsxe_ownership_person` (firstName, lastName, street address only, zip)
   - Address → `carsxe_ownership_address`
   - ZIP → `carsxe_ownership_zip` (optional gender, minAge, maxAge, income, page, limit)
2. `include` is optional: comma-separated `demographics,emails,phones,vehicle_history`. Omit it to get everything.
3. Street `address` is street only — no city or state. ZIP is 5-digit US (person/address may be ZIP+4; zip lookup is exactly 5 digits).
4. Present matches clearly (name, address, contact, demographics, linked vehicles). HTTP 404 / `no_data` means no match and is not billed.
5. Billing is per returned record. Warn before a ZIP search with a high `limit` (default 15, max 100).
6. If the key lacks entitlement, say this API is Enterprise-only. If the API key is missing, tell the user to configure it by running `gemini extensions config carsxe`.
