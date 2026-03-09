---
name: obd-decoder
description: >
  Decode an OBD-II diagnostic trouble code (DTC) using the CarsXE API. Use this when a user
  mentions a check engine light code, DTC, or OBD code like P0300, C1234, B0001, or U0100.
---

When the user mentions an OBD-II code or check engine light code:

1. Use the `carsxe_obd` tool with the code provided.
2. Present the decoded fault info clearly: code, description, system affected, possible causes, and suggested fixes.
3. Provide context on severity — whether the issue requires immediate attention or can wait.
4. If the API key is missing, tell the user to configure it by running `gemini extensions config carsxe`.
