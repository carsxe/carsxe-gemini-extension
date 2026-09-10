import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "carsxe",
  version: "1.2.0",
});

const API_BASE = "https://api.carsxe.com";
const SOURCE = "gemini_extension";

function getApiKey() {
  const key = process.env.CARSXE_API_KEY;
  if (!key) {
    throw new Error(
      "CARSXE_API_KEY is not set. Run `gemini extensions config carsxe` to configure your API key.",
    );
  }
  return key;
}

async function apiGet(path, params = {}) {
  const key = getApiKey();
  const url = new URL(path, API_BASE);
  url.searchParams.set("key", key);
  url.searchParams.set("source", SOURCE);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") {
      url.searchParams.set(k, String(v));
    }
  }
  const res = await fetch(url.toString());
  const data = await res.json();
  return data;
}

async function apiPost(path, body, params = {}) {
  const key = getApiKey();
  const url = new URL(path, API_BASE);
  url.searchParams.set("key", key);
  url.searchParams.set("source", SOURCE);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") {
      url.searchParams.set(k, String(v));
    }
  }
  const res = await fetch(url.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
}

async function apiGetText(path, params = {}) {
  const key = getApiKey();
  const url = new URL(path, API_BASE);
  url.searchParams.set("key", key);
  url.searchParams.set("source", SOURCE);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") {
      url.searchParams.set(k, String(v));
    }
  }
  const res = await fetch(url.toString());
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return await res.json();
  }
  return await res.text();
}

function textResult(data) {
  return {
    content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
  };
}

function errorResult(err) {
  return {
    content: [{ type: "text", text: `Error: ${err.message}` }],
    isError: true,
  };
}

// --- Tool: Auth / Validate API Key ---
server.registerTool(
  "carsxe_auth",
  {
    title: "CarsXE Auth",
    description:
      "Validate a CarsXE API key. Use this to check if an API key is valid before making other requests.",
    inputSchema: {
      key: z.string().describe("The CarsXE API key to validate"),
    },
  },
  async ({ key }) => {
    try {
      const url = new URL("/v1/auth/validate", API_BASE);
      url.searchParams.set("key", key);
      url.searchParams.set("source", SOURCE);
      const res = await fetch(url.toString());
      const data = await res.json();
      return textResult(data);
    } catch (err) {
      return errorResult(err);
    }
  },
);

// --- Tool: Vehicle Specs (VIN Decoder) ---
server.registerTool(
  "carsxe_specs",
  {
    title: "CarsXE Vehicle Specs",
    description:
      "Decode a VIN and retrieve full vehicle specifications including make, model, year, engine, trim, transmission, drivetrain, fuel info, body style, dimensions, and equipment.",
    inputSchema: {
      vin: z
        .string()
        .length(17)
        .describe("The 17-character Vehicle Identification Number"),
      deepdata: z
        .string()
        .optional()
        .describe('Set to "true" for extended data'),
      disableIntVINDecoding: z
        .string()
        .optional()
        .describe('Set to "true" to disable international VIN fallback'),
    },
  },
  async ({ vin, deepdata, disableIntVINDecoding }) => {
    try {
      const data = await apiGet("/specs", {
        vin,
        deepdata,
        disableIntVINDecoding,
      });
      return textResult(data);
    } catch (err) {
      return errorResult(err);
    }
  },
);

// --- Tool: License Plate Decoder ---
server.registerTool(
  "carsxe_plate",
  {
    title: "CarsXE Plate Decoder",
    description:
      "Look up vehicle information from a license plate number. Returns make, model, year, VIN, and registration details.",
    inputSchema: {
      plate: z.string().describe("The license plate number (e.g., 7XER187)"),
      country: z
        .string()
        .length(2)
        .describe("ISO 3166-1 alpha-2 country code (e.g., US, GB, DE)"),
      state: z
        .string()
        .optional()
        .describe(
          "2-letter US state code for improved accuracy (e.g., CA, TX)",
        ),
      district: z.string().optional().describe("Region within the country"),
    },
  },
  async ({ plate, country, state, district }) => {
    try {
      const data = await apiGet("/v2/platedecoder", {
        plate,
        country,
        state,
        district,
      });
      return textResult(data);
    } catch (err) {
      return errorResult(err);
    }
  },
);

// --- Tool: Market Value ---
server.registerTool(
  "carsxe_value",
  {
    title: "CarsXE Market Value",
    description:
      "Get the current market value of a vehicle from its VIN. Returns estimated value, low/average/high range, and historical trends.",
    inputSchema: {
      vin: z
        .string()
        .length(17)
        .describe("The 17-character Vehicle Identification Number"),
      state: z
        .string()
        .optional()
        .describe("US state code for regional pricing adjustments (e.g., CA, TX)"),
      mileage: z
        .number()
        .optional()
        .describe("Current mileage of the vehicle used to adjust the market value"),
      condition: z
        .enum(["excellent", "clean", "average", "rough"])
        .optional()
        .describe("Overall condition of the vehicle"),
    },
  },
  async ({ vin, state, mileage, condition }) => {
    try {
      const data = await apiGet("/v2/marketvalue", {
        vin,
        state,
        mileage: mileage !== undefined ? String(mileage) : undefined,
        condition,
      });
      return textResult(data);
    } catch (err) {
      return errorResult(err);
    }
  },
);

// --- Tool: Vehicle History ---
server.registerTool(
  "carsxe_history",
  {
    title: "CarsXE Vehicle History",
    description:
      "Retrieve a full vehicle history report from a VIN. Includes past owners, accident/damage records, title status, odometer readings, service history, and theft records.",
    inputSchema: {
      vin: z
        .string()
        .length(17)
        .describe("The 17-character Vehicle Identification Number"),
    },
  },
  async ({ vin }) => {
    try {
      const data = await apiGet("/history", { vin });
      return textResult(data);
    } catch (err) {
      return errorResult(err);
    }
  },
);

// --- Tool: Vehicle Images ---
server.registerTool(
  "carsxe_images",
  {
    title: "CarsXE Vehicle Images",
    description:
      "Retrieve images of a vehicle by make, model, and optionally year. Returns image URLs that can be displayed inline.",
    inputSchema: {
      make: z.string().describe("Vehicle make (e.g., BMW, Toyota)"),
      model: z.string().describe("Vehicle model (e.g., X5, Camry)"),
      year: z.string().optional().describe("Model year (e.g., 2019)"),
      trim: z.string().optional().describe("Vehicle trim level"),
      color: z.string().optional().describe("Vehicle color"),
      transparent: z
        .string()
        .optional()
        .describe('Set to "true" for transparent background'),
      angle: z
        .string()
        .optional()
        .describe("Image angle (e.g., front, rear, side)"),
      photoType: z.string().optional().describe("Photo type filter"),
      size: z.string().optional().describe("Image size"),
      license: z.string().optional().describe("License filter"),
    },
  },
  async ({
    make,
    model,
    year,
    trim,
    color,
    transparent,
    angle,
    photoType,
    size,
    license,
  }) => {
    try {
      const data = await apiGet("/images", {
        make,
        model,
        year,
        trim,
        color,
        transparent,
        angle,
        photoType,
        size,
        license,
      });
      return textResult(data);
    } catch (err) {
      return errorResult(err);
    }
  },
);

// --- Tool: Vehicle Recalls ---
server.registerTool(
  "carsxe_recalls",
  {
    title: "CarsXE Vehicle Recalls",
    description:
      "Check for open safety recalls on a vehicle by VIN. Returns recall campaign numbers, affected components, defect descriptions, and remedy status.",
    inputSchema: {
      vin: z
        .string()
        .length(17)
        .describe("The 17-character Vehicle Identification Number"),
    },
  },
  async ({ vin }) => {
    try {
      const data = await apiGet("/v1/recalls", { vin });
      return textResult(data);
    } catch (err) {
      return errorResult(err);
    }
  },
);

// --- Tool: International VIN Decoder ---
server.registerTool(
  "carsxe_intvin",
  {
    title: "CarsXE International VIN Decoder",
    description:
      "Decode an international (non-US) VIN. Optimized for European, Asian, and other non-US vehicles. Returns country of manufacture, make, model, year, engine, transmission, and body style.",
    inputSchema: {
      vin: z
        .string()
        .describe("The international Vehicle Identification Number"),
    },
  },
  async ({ vin }) => {
    try {
      const data = await apiGet("/v1/international-vin-decoder", { vin });
      return textResult(data);
    } catch (err) {
      return errorResult(err);
    }
  },
);

// --- Tool: VIN OCR ---
server.registerTool(
  "carsxe_ocr",
  {
    title: "CarsXE VIN OCR",
    description:
      "Extract a VIN from a photo or image URL using optical character recognition. Provide a publicly accessible image URL containing a VIN.",
    inputSchema: {
      imageUrl: z
        .string()
        .url()
        .describe("Publicly accessible URL of an image containing a VIN"),
    },
  },
  async ({ imageUrl }) => {
    try {
      const data = await apiPost("/v1/vinocr", { image: imageUrl });
      return textResult(data);
    } catch (err) {
      return errorResult(err);
    }
  },
);

// --- Tool: Lien & Theft Check ---
server.registerTool(
  "carsxe_lien",
  {
    title: "CarsXE Lien & Theft Check",
    description:
      "Check for active liens and theft records on a vehicle by VIN. Returns lien status, lien holder details, theft record status, and related dates.",
    inputSchema: {
      vin: z
        .string()
        .length(17)
        .describe("The 17-character Vehicle Identification Number"),
    },
  },
  async ({ vin }) => {
    try {
      const data = await apiGet("/v1/lien-theft", { vin });
      return textResult(data);
    } catch (err) {
      return errorResult(err);
    }
  },
);

// --- Tool: Plate Image Recognition ---
server.registerTool(
  "carsxe_plateocr",
  {
    title: "CarsXE Plate Image Recognition",
    description:
      "Extract a license plate number from a photo or image URL using image recognition. Provide a publicly accessible image URL containing a license plate.",
    inputSchema: {
      imageUrl: z
        .string()
        .url()
        .describe(
          "Publicly accessible URL of an image containing a license plate",
        ),
    },
  },
  async ({ imageUrl }) => {
    try {
      const data = await apiPost("/platerecognition", { image: imageUrl });
      return textResult(data);
    } catch (err) {
      return errorResult(err);
    }
  },
);

// --- Tool: Year / Make / Model Lookup ---
server.registerTool(
  "carsxe_ymm",
  {
    title: "CarsXE Year/Make/Model Lookup",
    description:
      "Look up vehicle data by year, make, and model. Returns available trims, engine options, transmission, drivetrain, fuel economy, body style, dimensions, and features.",
    inputSchema: {
      year: z.string().length(4).describe("4-digit model year (e.g., 2020)"),
      make: z.string().describe("Vehicle make (e.g., Toyota)"),
      model: z.string().describe("Vehicle model (e.g., Camry)"),
      trim: z
        .string()
        .optional()
        .describe("Specific trim level (e.g., LE, XLE)"),
    },
  },
  async ({ year, make, model, trim }) => {
    try {
      const data = await apiGet("/v1/ymm", { year, make, model, trim });
      return textResult(data);
    } catch (err) {
      return errorResult(err);
    }
  },
);

// --- Tool: Recalls by Year / Make / Model ---
server.registerTool(
  "carsxe_recalls_ymm",
  {
    title: "CarsXE Recalls by Year/Make/Model",
    description:
      "Get safety recall information by year, make, and model. No VIN required — this is a model-line search, not a specific vehicle.",
    inputSchema: {
      year: z
        .string()
        .describe("4-digit model year (e.g., 2019). Must be 1900 or later."),
      make: z.string().describe("Vehicle make (e.g., Toyota)"),
      model: z.string().describe("Vehicle model (e.g., Camry)"),
    },
  },
  async ({ year, make, model }) => {
    try {
      const data = await apiGet("/v1/recalls-ymm", { year, make, model });
      return textResult(data);
    } catch (err) {
      return errorResult(err);
    }
  },
);

const recallsBatchVinsSchema = z
  .union([
    z.array(z.string()),
    z.string().transform((value) =>
      value
        .split(/[\s,]+/)
        .map((vin) => vin.trim())
        .filter(Boolean),
    ),
  ])
  .optional()
  .describe(
    "17-character VINs as an array or comma-separated string. Combine with csv/csvUrl up to 10,000 unique VINs.",
  );

// --- Tool: Recalls Batch Submit ---
server.registerTool(
  "carsxe_recalls_batch_submit",
  {
    title: "CarsXE Submit Recalls Batch",
    description:
      "Submit an async bulk recall check for up to 10,000 VINs (JSON list, inline CSV, and/or CSV URL).",
    inputSchema: {
      vins: recallsBatchVinsSchema,
      csv: z
        .string()
        .optional()
        .describe("Inline CSV of VINs (one per line or a vin column)"),
      csvUrl: z
        .string()
        .url()
        .optional()
        .describe(
          "HTTPS URL to a CSV of VINs (Google Sheets, S3, Dropbox, etc.)",
        ),
      webhookUrl: z
        .string()
        .url()
        .optional()
        .describe("HTTPS webhook URL called when the batch finishes"),
    },
  },
  async ({ vins, csv, csvUrl, webhookUrl }) => {
    try {
      if (!vins?.length && !csv && !csvUrl) {
        return errorResult(
          new Error("Provide at least one of vins, csv, or csvUrl."),
        );
      }
      const body = {};
      if (vins?.length) body.vins = vins;
      if (csv) body.csv = csv;
      if (csvUrl) body.csvUrl = csvUrl;
      if (webhookUrl) body.webhookUrl = webhookUrl;
      const data = await apiPost("/v1/recalls-batch/submit", body);
      return textResult(data);
    } catch (err) {
      return errorResult(err);
    }
  },
);

// --- Tool: Recalls Batch Status ---
server.registerTool(
  "carsxe_recalls_batch_status",
  {
    title: "CarsXE Recalls Batch Status",
    description: "Check the status of a previously submitted recalls batch.",
    inputSchema: {
      batchId: z
        .string()
        .describe("Batch ID returned by carsxe_recalls_batch_submit"),
    },
  },
  async ({ batchId }) => {
    try {
      const data = await apiGet("/v1/recalls-batch/status", { batchId });
      return textResult(data);
    } catch (err) {
      return errorResult(err);
    }
  },
);

// --- Tool: Recalls Batch Results ---
server.registerTool(
  "carsxe_recalls_batch_results",
  {
    title: "CarsXE Recalls Batch Results",
    description:
      "Fetch completed bulk recall results as JSON (use after status is completed or partial).",
    inputSchema: {
      batchId: z
        .string()
        .describe("Batch ID returned by carsxe_recalls_batch_submit"),
    },
  },
  async ({ batchId }) => {
    try {
      const data = await apiGet("/v1/recalls-batch/results", { batchId });
      return textResult(data);
    } catch (err) {
      return errorResult(err);
    }
  },
);

// --- Tool: Recalls Batch Download ---
server.registerTool(
  "carsxe_recalls_batch_download",
  {
    title: "CarsXE Download Recalls Batch CSV",
    description:
      "Download completed bulk recall results as CSV (use after status is completed or partial).",
    inputSchema: {
      batchId: z
        .string()
        .describe("Batch ID returned by carsxe_recalls_batch_submit"),
    },
  },
  async ({ batchId }) => {
    try {
      const data = await apiGetText("/v1/recalls-batch/download", { batchId });
      if (typeof data === "string") {
        return { content: [{ type: "text", text: data }] };
      }
      return textResult(data);
    } catch (err) {
      return errorResult(err);
    }
  },
);

// --- Tool: Year / Make / Model Options ---
server.registerTool(
  "carsxe_ymm_options",
  {
    title: "CarsXE Year/Make/Model Options",
    description:
      "List cascading year, make, model, trim, or variant options for dropdowns. Omit filters to list years; add year for makes, make for models, then model for variants.",
    inputSchema: {
      dimension: z
        .enum(["years", "makes", "models", "trims", "variants"])
        .optional()
        .describe(
          "Force one list: years, makes, models, trims, or variants. When omitted, the layer is inferred from the filters.",
        ),
      year: z.string().optional().describe("Filter by model year"),
      make: z
        .string()
        .optional()
        .describe("Filter by make (required for models)"),
      model: z
        .string()
        .optional()
        .describe("Filter by model (required for trims; used for variants)"),
      trim: z
        .string()
        .optional()
        .describe("Substring filter on trim or variant names"),
    },
  },
  async ({ dimension, year, make, model, trim }) => {
    try {
      const data = await apiGet("/v1/ymm-options", {
        dimension,
        year,
        make,
        model,
        trim,
      });
      return textResult(data);
    } catch (err) {
      return errorResult(err);
    }
  },
);

const OWNERSHIP_INCLUDE_HELP =
  "Comma-separated subset of demographics,emails,phones,vehicle_history. Omit to return everything.";

// --- Tool: Ownership by VIN (Enterprise) ---
server.registerTool(
  "carsxe_ownership_vin",
  {
    title: "CarsXE Ownership by VIN",
    description:
      "Enterprise: look up registered owner(s) for a VIN, including contact info and vehicle history.",
    inputSchema: {
      vin: z
        .string()
        .length(17)
        .describe("The 17-character Vehicle Identification Number"),
      include: z.string().optional().describe(OWNERSHIP_INCLUDE_HELP),
    },
  },
  async ({ vin, include }) => {
    try {
      const data = await apiGet("/v1/ownership/vin", { vin, include });
      return textResult(data);
    } catch (err) {
      return errorResult(err);
    }
  },
);

// --- Tool: Ownership by Person (Enterprise) ---
server.registerTool(
  "carsxe_ownership_person",
  {
    title: "CarsXE Ownership by Person",
    description:
      "Enterprise: look up contact details and linked vehicles for a name + street address + ZIP.",
    inputSchema: {
      firstName: z
        .string()
        .max(50)
        .describe("First name (max 50 characters)"),
      lastName: z.string().max(50).describe("Last name (max 50 characters)"),
      address: z
        .string()
        .max(100)
        .describe("Street address only, no city/state (max 100 characters)"),
      zip: z.string().describe("5-digit US ZIP, optionally ZIP+4"),
      include: z.string().optional().describe(OWNERSHIP_INCLUDE_HELP),
    },
  },
  async ({ firstName, lastName, address, zip, include }) => {
    try {
      const data = await apiGet("/v1/ownership/person", {
        first_name: firstName,
        last_name: lastName,
        address,
        zip,
        include,
      });
      return textResult(data);
    } catch (err) {
      return errorResult(err);
    }
  },
);

// --- Tool: Ownership by Address (Enterprise) ---
server.registerTool(
  "carsxe_ownership_address",
  {
    title: "CarsXE Ownership by Address",
    description:
      "Enterprise: look up residents at a street address + ZIP, with contact info and vehicle history.",
    inputSchema: {
      address: z
        .string()
        .max(100)
        .describe("Street address only, no city/state (max 100 characters)"),
      zip: z.string().describe("5-digit US ZIP, optionally ZIP+4"),
      include: z.string().optional().describe(OWNERSHIP_INCLUDE_HELP),
      variant: z
        .string()
        .optional()
        .describe(
          "Legacy alias (vehicle_history or compliance). Prefer include.",
        ),
    },
  },
  async ({ address, zip, include, variant }) => {
    try {
      const data = await apiGet("/v1/ownership/address", {
        address,
        zip,
        include,
        variant,
      });
      return textResult(data);
    } catch (err) {
      return errorResult(err);
    }
  },
);

// --- Tool: Ownership by ZIP (Enterprise) ---
server.registerTool(
  "carsxe_ownership_zip",
  {
    title: "CarsXE Ownership by ZIP",
    description:
      "Enterprise: search people in a 5-digit ZIP with optional gender, age, and income filters. Billed per record returned (default page size 15, max 100).",
    inputSchema: {
      zip: z.string().describe("Exactly 5-digit US ZIP"),
      gender: z.string().optional().describe("M or F"),
      minAge: z
        .number()
        .int()
        .optional()
        .describe("Minimum age (whole number)"),
      maxAge: z
        .number()
        .int()
        .optional()
        .describe("Maximum age (whole number)"),
      income: z
        .string()
        .optional()
        .describe("Income code or label (e.g. F, K, $50,000–$59,999)"),
      page: z.number().int().min(1).optional().describe("Page number (default 1)"),
      limit: z
        .number()
        .int()
        .min(1)
        .max(100)
        .optional()
        .describe("Page size (default 15, max 100)"),
      include: z.string().optional().describe(OWNERSHIP_INCLUDE_HELP),
      variant: z
        .string()
        .optional()
        .describe("Legacy alias (vehicle_history). Prefer include."),
    },
  },
  async ({
    zip,
    gender,
    minAge,
    maxAge,
    income,
    page,
    limit,
    include,
    variant,
  }) => {
    try {
      const data = await apiGet("/v1/ownership/zip", {
        zip,
        gender,
        min_age: minAge,
        max_age: maxAge,
        income,
        page,
        limit,
        include,
        variant,
      });
      return textResult(data);
    } catch (err) {
      return errorResult(err);
    }
  },
);

// --- Tool: OBD Code Decoder ---
server.registerTool(
  "carsxe_obd",
  {
    title: "CarsXE OBD Code Decoder",
    description:
      "Decode an OBD-II diagnostic trouble code (DTC). Returns fault description, affected system, possible causes, and suggested fixes. Supports codes like P0300, C1234, B0001, U0100.",
    inputSchema: {
      code: z
        .string()
        .describe(
          "The OBD-II diagnostic trouble code (e.g., P0300, C1234, B0001, U0100)",
        ),
    },
  },
  async ({ code }) => {
    try {
      const data = await apiGet("/obdcodesdecoder", { code });
      return textResult(data);
    } catch (err) {
      return errorResult(err);
    }
  },
);

// --- Start the server ---
const transport = new StdioServerTransport();
await server.connect(transport);
