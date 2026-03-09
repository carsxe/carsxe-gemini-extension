[![Gemini CLI Extension](https://img.shields.io/badge/Gemini_CLI-Extension-4285F4?logo=google&logoColor=white)](https://geminicli.com)

# CarsXE Extension for Gemini CLI

Access the full suite of [CarsXE](https://api.carsxe.com) vehicle data APIs directly from Gemini CLI. Decode VINs, look up license plates, get market values, vehicle history, recalls, lien and theft records, OBD codes, and more.

## Features

| Command | Description |
|---------|-------------|
| `/carsxe:auth <API_KEY>` | Validate and set your CarsXE API key |
| `/carsxe:specs <VIN>` | Decode a VIN with full vehicle specifications |
| `/carsxe:plate <PLATE> <COUNTRY> [STATE]` | Look up a vehicle by license plate |
| `/carsxe:value <VIN>` | Get current market value |
| `/carsxe:history <VIN>` | Full vehicle history report |
| `/carsxe:images <MAKE> <MODEL> [YEAR]` | Retrieve vehicle photos |
| `/carsxe:recalls <VIN>` | Check for open safety recalls |
| `/carsxe:intvin <VIN>` | Decode an international (non-US) VIN |
| `/carsxe:ocr <IMAGE_URL>` | Extract a VIN from a photo (OCR) |
| `/carsxe:lien <VIN>` | Check for liens and theft records |
| `/carsxe:plateocr <IMAGE_URL>` | Extract a plate number from a photo |
| `/carsxe:ymm <YEAR> <MAKE> <MODEL> [TRIM]` | Look up by Year/Make/Model |
| `/carsxe:obd <CODE>` | Decode an OBD-II trouble code |

All commands also have corresponding **skills** that Gemini auto-invokes when it detects relevant context in your conversation.

## Installation

Install the extension from the GitHub repository:

```bash
gemini extensions install carsxe/carsxe-gemini-extension
```

## Setup

1. Sign up at [api.carsxe.com](https://api.carsxe.com) and get your API key from the developer dashboard.
2. Configure the extension with your API key:

```bash
gemini extensions config carsxe
```

This stores your API key securely in the system keychain.

## Usage Examples

### Decode a VIN

```
/carsxe:specs WBAFR7C57CC811956
```

### Look up a license plate

```
/carsxe:plate 7XER187 US CA
```

### Get market value

```
/carsxe:value WBAFR7C57CC811956
```

### Vehicle history report

```
/carsxe:history WBAFR7C57CC811956
```

### Vehicle images

```
/carsxe:images BMW X5 2019
```

### Check recalls

```
/carsxe:recalls WBAFR7C57CC811956
```

### International VIN

```
/carsxe:intvin WF0MXXGBWM8R43240
```

### VIN OCR from image

```
/carsxe:ocr https://example.com/vin-photo.jpg
```

### Lien and theft check

```
/carsxe:lien WBAFR7C57CC811956
```

### Plate recognition from image

```
/carsxe:plateocr https://example.com/plate-photo.jpg
```

### Year/Make/Model lookup

```
/carsxe:ymm 2020 Toyota Camry LE
```

### OBD code decode

```
/carsxe:obd P0300
```

## Skills (Auto-invoked)

Gemini will automatically use the CarsXE tools when it detects relevant queries. For example:

- *"What can you tell me about VIN WBAFR7C57CC811956?"* — triggers the `vehicle-specs` skill
- *"Does this car have any recalls? VIN: WBAFR7C57CC811956"* — triggers the `vehicle-recalls` skill
- *"My check engine light is on with code P0300"* — triggers the `obd-decoder` skill
- *"How much is a 2012 BMW X5 worth? VIN WBAFR7C57CC811956"* — triggers the `market-value` skill

## API Documentation

Full API documentation is available at [api.carsxe.com/docs](https://api.carsxe.com/docs).

## License

MIT
