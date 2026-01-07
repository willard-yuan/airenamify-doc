# Frequently Asked Questions

## General

### 1. What makes AiRenamify different from standard batch renamers?
Unlike traditional renamers that use rigid patterns (e.g., `IMG_001.jpg`), AiRenamify uses advanced Artificial Intelligence (Vision and LLMs) to "see" and "read" your files. It understands the content of an image or a document and generates a descriptive, human-readable name automatically (e.g., `sunset-over-paris-eiffel-tower.jpg`).

### 2. What file formats does AiRenamify support?
We support a wide range of formats:
- **Images:** JPG, PNG, WEBP, GIF, BMP, TIFF, HEIC, and HEIF.
- **Documents:** PDF, Markdown (.md), Plain Text (.txt).
- **Code & Data:** JSON, JS, TS, CSS, HTML, CSV.

### 3. Do I need technical skills to use this?
Not at all. AiRenamify is designed for simplicity. Just drag and drop your files, and the AI handles the rest. Advanced settings are available if you need them, but the default "Magic" mode works for everyone.

### 4. Which platforms are supported?
AiRenamify is optimized for **macOS** (Universal build for Intel & Apple Silicon) and **Windows** (x64).

---

## Privacy & Processing Modes


### 6. Is my data safe when using Cloud Mode?
Yes. We prioritize your privacy. Your files are transmitted securely via encrypted connections solely for the purpose of analysis. They are processed by the AI and immediately discarded. We do not store your personal files on our servers.

### 7. Does Local Mode cost any credits?
No. Local Mode is completely free to use as it utilizes your own hardware resources.

---

## Features & Customization

### 8. Can I customize how the files are named?
Absolutely. In the **Settings** menu, you can configure:
- **Case Style:** Kebab-case, Snake_case, CamelCase, PascalCase, or Title Case.
- **Language:** Have files renamed in English, Spanish, French, Chinese, etc.
- **Max Length:** Limit filenames to a specific character count.

### 9. Can I give the AI specific instructions?
Yes! You can add **Custom Instructions** in the settings. For example, you can tell the AI: *"Always include the primary color in the filename"* or *"Start every filename with 'Project-Alpha-'"*.

### 10. Does it support bulk renaming?
Yes. You can drag and drop hundreds of files at once. AiRenamify will process them in a queue to ensure stability and respect API rate limits.

### 11. Can I modify the suggested name before applying it?
Currently, AiRenamify applies the best AI suggestion automatically. However, you can review the new names in the list. If you are not satisfied, you can simply remove the file from the list or rename it again with different instructions.

### 12. How does the "Image Model" selection affect results?
Different models have different strengths:
- **Llava 13b:** Excellent balance of speed and description accuracy (Default).
- **GPT-4o:** State-of-the-art reasoning, best for complex scenes or reading text within images.
- **Llama 4 Scout:** Great for general object detection.

---

## Credits & Billing

### 13. How does the Credit system work?
Processing files in Cloud Mode consumes Credits to cover the cost of high-end GPU servers. Typically, 1 image or document analysis = 1 Credit.

### 14. Do you offer a free trial?
Yes! New users receive a welcome package of free credits to test the capabilities of our Cloud models.

---

## Troubleshooting


### 17. Why is the processing speed slower for some files?
High-resolution images or large PDF documents require more processing power. Additionally, models like GPT-4o provide deeper analysis but may take slightly longer than lighter models like GPT-5 Nano.

### 18. Why does the app say "Thinking..."?
This means the AI is currently analyzing the file content. This process typically takes 2-5 seconds per file depending on the complexity and your internet speed.

### 19. What if the AI misinterprets an image?
While rare, AI can hallucinate. You can try adding a **Custom Instruction** to guide it (e.g., *"Focus on the background text"*), or try a different model like GPT-4o for better accuracy.

### 20. Where can I report a bug or request a feature?
We love feedback! Please reach out to our support team or open an issue on our GitHub repository. We actively update AiRenamify based on user needs.
