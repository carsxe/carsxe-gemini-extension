[![Gemini CLI Extension](https://img.shields.io/badge/Gemini_CLI-Extension-4285F4?logo=google&logoColor=white)](https://geminicli.com/extensions/?name=carsxecarsxe-gemini-extension)

# CarsXE Extension for Gemini CLI

Access the full suite of [CarsXE](https://carsxe.com) vehicle data APIs directly from Gemini CLI. Decode VINs, look up license plates, get market values, vehicle history, recalls (VIN, YMM, or batch), YMM options, ownership, lien and theft records, OBD codes, and more.

## Features

| Command                                    | Description                                   |
| ------------------------------------------ | --------------------------------------------- |
| `/carsxe:auth <API_KEY>`                   | Validate and set your CarsXE API key          |
| `/carsxe:specs <VIN>`                      | Decode a VIN with full vehicle specifications ([Vehicle Specifications](https://carsxe.com/vehicle-specifications)) |
| `/carsxe:plate <PLATE> <COUNTRY> [STATE]`  | Look up a vehicle by license plate ([Vehicle Plate Decoder](https://carsxe.com/vehicle-plate-decoder)) |
| `/carsxe:value <VIN> [STATE] [MILEAGE] [CONDITION]` | Get current market value ([Vehicle Market Value](https://carsxe.com/vehicle-market-value)) |
| `/carsxe:history <VIN>`                    | Full vehicle history report ([Vehicle History](https://carsxe.com/vehicle-history)) |
| `/carsxe:images <MAKE> <MODEL> [YEAR]`     | Retrieve vehicle photos ([Vehicle Images](https://carsxe.com/vehicle-images)) |
| `/carsxe:recalls <VIN>`                    | Check for open safety recalls ([Vehicle Recalls](https://carsxe.com/vehicle-recalls)) |
| `/carsxe:recalls-ymm <YEAR> <MAKE> <MODEL>` | Check recalls by year/make/model (no VIN) ([Vehicle Recalls](https://carsxe.com/vehicle-recalls)) |
| `/carsxe:recalls-batch <ACTION> ...`       | Bulk recalls: submit / status / results / download ([Vehicle Recalls](https://carsxe.com/vehicle-recalls)) |
| `/carsxe:intvin <VIN>`                     | Decode an international (non-US) VIN ([International VIN Decoder](https://carsxe.com/international-vin-decoder)) |
| `/carsxe:ocr <IMAGE_URL>`                  | Extract a VIN from a photo (OCR)              |
| `/carsxe:lien <VIN>`                       | Check for liens and theft records             |
| `/carsxe:plateocr <IMAGE_URL>`             | Extract a plate number from a photo ([Vehicle Plate Decoder](https://carsxe.com/vehicle-plate-decoder)) |
| `/carsxe:ymm <YEAR> <MAKE> <MODEL> [TRIM]` | Look up by Year/Make/Model                    |
| `/carsxe:ymm-options [YEAR] [MAKE] [MODEL]` | List year/make/model/trim/variant options |
| `/carsxe:ownership <TYPE> ...`             | Owner & resident lookup (Enterprise)      |
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

### Check recalls by year/make/model (no VIN)

```
/carsxe:recalls-ymm 2023 Toyota Camry
```

### Bulk recall check

```
/carsxe:recalls-batch submit 1HGBH41JXMN109186 5YJSA1E26HF000001
/carsxe:recalls-batch status brb_mnablbn7_wvbaqv
/carsxe:recalls-batch results brb_mnablbn7_wvbaqv
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

### List available years, makes, models, or variants

```
/carsxe:ymm-options
/carsxe:ymm-options 2023 Toyota
/carsxe:ymm-options dimension=variants year=2025 make=Lexus
```

### Look up registered owners (Enterprise)

```
/carsxe:ownership vin 1FT8X3BT0BEA61538
/carsxe:ownership person John Sample "123 Example St" 90210
/carsxe:ownership address "123 Example St" 90210
/carsxe:ownership zip 90210 gender=F min_age=45
```

### OBD code decode

```
/carsxe:obd P0300
```

## Skills (Auto-invoked)

Gemini will automatically use the CarsXE tools when it detects relevant queries. For example:

- _"What can you tell me about VIN WBAFR7C57CC811956?"_ — triggers the `vehicle-specs` skill
- _"Does this car have any recalls? VIN: WBAFR7C57CC811956"_ — triggers the `vehicle-recalls` skill
- _"Any recalls on a 2023 Toyota Camry?"_ — triggers the `recalls-ymm` skill
- _"Check recalls for this list of VINs"_ — triggers the `recalls-batch` skill
- _"What Toyota models were sold in 2023?"_ — triggers the `ymm-options` skill
- _"Who is the registered owner of this VIN?"_ — triggers the `ownership` skill
- _"My check engine light is on with code P0300"_ — triggers the `obd-decoder` skill
- _"How much is a 2012 BMW X5 worth? VIN WBAFR7C57CC811956"_ — triggers the `market-value` skill

## API Documentation

Full API documentation is available at [docs.carsxe.com](https://docs.carsxe.com).

### Products

- [Vehicle History](https://carsxe.com/vehicle-history)
- [Vehicle Plate Decoder](https://carsxe.com/vehicle-plate-decoder)
- [Vehicle Specifications](https://carsxe.com/vehicle-specifications)
- [International VIN Decoder](https://carsxe.com/international-vin-decoder)
- [Vehicle Images](https://carsxe.com/vehicle-images)
- [Vehicle Recalls](https://carsxe.com/vehicle-recalls)
- [Vehicle Market Value](https://carsxe.com/vehicle-market-value)

## License

MIT
