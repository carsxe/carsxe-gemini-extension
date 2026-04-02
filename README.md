[![Gemini CLI Extension](https://img.shields.io/badge/Gemini_CLI-Extension-4285F4?logo=google&logoColor=white)](https://geminicli.com/extensions/?name=carsxecarsxe-gemini-extension)

# CarsXE Extension for Gemini CLI

Access the full suite of [CarsXE](https://api.carsxe.com) vehicle data APIs directly from Gemini CLI. Decode VINs, look up license plates, get market values, vehicle history, recalls, lien and theft records, OBD codes, and more.

## Features

| Command                                    | Description                                   |
| ------------------------------------------ | --------------------------------------------- |
| `/carsxe:auth <API_KEY>`                   | Validate and set your CarsXE API key          |
| `/carsxe:specs <VIN>`                      | Decode a VIN with full vehicle specifications |
| `/carsxe:plate <PLATE> <COUNTRY> [STATE]`  | Look up a vehicle by license plate            |
| `/carsxe:value <VIN> [STATE] [MILEAGE] [CONDITION]` | Get current market value          |
| `/carsxe:history <VIN>`                    | Full vehicle history report                   |
| `/carsxe:images <MAKE> <MODEL> [YEAR]`     | Retrieve vehicle photos                       |
| `/carsxe:recalls <VIN>`                    | Check for open safety recalls                 |
| `/carsxe:intvin <VIN>`                     | Decode an international (non-US) VIN          |
| `/carsxe:ocr <IMAGE_URL>`                  | Extract a VIN from a photo (OCR)              |
| `/carsxe:lien <VIN>`                       | Check for liens and theft records             |
| `/carsxe:plateocr <IMAGE_URL>`             | Extract a plate number from a photo           |
| `/carsxe:ymm <YEAR> <MAKE> <MODEL> [TRIM]` | Look up by Year/Make/Model                    |
| `/carsxe:obd <CODE>`                       | Decode an OBD-II trouble code                 |

All commands also have corresponding **skills** that Gemini auto-invokes when it detects relevant context in your conversation.

## Prerequisites

Before installing the extension, make sure you have the [Gemini CLI](https://github.com/google-gemini/gemini-cli) installed and your `GEMINI_API_KEY` environment variable set.

You can get a Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey).

**macOS / Linux — add to your shell profile for persistence:**

```bash
echo 'export GEMINI_API_KEY=your_gemini_api_key_here' >> ~/.bashrc
source ~/.bashrc
```

> If you use Zsh (default on macOS), replace `~/.bashrc` with `~/.zshrc`.

**Windows — PowerShell (current session):**

```powershell
$env:GEMINI_API_KEY="your_gemini_api_key_here"
```

**Windows — PowerShell (persist across sessions):**

```powershell
[System.Environment]::SetEnvironmentVariable("GEMINI_API_KEY","your_gemini_api_key_here","User")
```

**Windows — Command Prompt:**

```cmd
setx GEMINI_API_KEY "your_gemini_api_key_here"
```

> After `setx`, restart your terminal for the variable to take effect.

## Installation

Install the extension from the GitHub repository:

```bash
gemini extensions install https://github.com/carsxe/carsxe-gemini-extension.git
```

During installation, Gemini CLI prompts you for your CarsXE API key. If you do not have a key yet, sign up and get one from the [CarsXE developer dashboard](https://api.carsxe.com/dashboard/developer).

If you skipped that prompt, or you want to change your API key after installing, run:

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
/carsxe:value WBAFR7C57CC811956 CA 45000 clean
```

Optional params: state (e.g. `CA`), mileage, condition (`excellent` | `clean` | `average` | `rough`)

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

- _"What can you tell me about VIN WBAFR7C57CC811956?"_ — triggers the `vehicle-specs` skill
- _"Does this car have any recalls? VIN: WBAFR7C57CC811956"_ — triggers the `vehicle-recalls` skill
- _"My check engine light is on with code P0300"_ — triggers the `obd-decoder` skill
- _"How much is a 2012 BMW X5 worth? VIN WBAFR7C57CC811956"_ — triggers the `market-value` skill

## API Documentation

Full API documentation is available at [api.carsxe.com/docs](https://api.carsxe.com/docs).

## License

MIT
