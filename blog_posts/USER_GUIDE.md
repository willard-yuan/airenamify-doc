---
title: "Mastering AiRenamify: The Ultimate Guide to AI-Powered File Organization"
date: "2026-02-02"
description: "Say goodbye to 'IMG_2024.jpg'. Learn how to use AiRenamify to automatically organize your files using advanced AI."
cover_image: "images/airenamify_rename_ui.webp"
author: "Willard Yuan"
tags: ["Guide", "Productivity", "AI"]
slug: "mastering-airenamify-ultimate-guide"
---

# 🚀 Mastering AiRenamify: The Ultimate Guide to AI-Powered File Organization

**Say goodbye to "IMG_2024.jpg" and "Untitled_Document_Final_Final_v2.pdf". Forever.**

Welcome to the future of file management! If you're reading this, your desktop probably looks like a digital crime scene—screenshots scattered everywhere, downloaded PDFs with cryptic names, and a "New Folder" nested inside three other "New Folders."

**AiRenamify** is here to fix that. It uses advanced Artificial Intelligence to *look* at your images and *read* your documents, giving them descriptive, organized, and searchable names automatically.

Let's turn that chaos into order.

---

## 🏁 Getting Started

### 1. The Two Worlds: Cloud vs. Local
Before you start dragging files, you have a choice to make. AiRenamify works in two modes, tailored to your privacy and hardware needs:

*   **☁️ Cloud Mode (Default)**:

    ![](./images/cloud_mode.webp)

    *   **Best for:** Most users who want instant results without setup.
    *   **How it works:** Uses powerful models like **GPT-4o** and **Llava** running on high-speed servers.
    *   **Cost:** Uses a simple credit system (you get free credits to start!).
    *   **Privacy:** Files are processed securely and privately.

*   **🏠 Local Mode (For the Geeks)**:

    ![](./images/local_mode.webp)

    *   **Best for:** Privacy purists and users with powerful hardware (Apple Silicon Macs recommended).
    *   **How it works:** Runs AI models (like **Ollama** or **LM Studio**) entirely on your machine.
    *   **Cost:** Free forever (uses your own electricity).
    *   **Setup:** Requires installing Ollama or LM Studio.

> **Tip:** You can switch between these modes anytime in the **Settings** tab.

---

## ✨ The Magic Workflow: 3 Steps to Zen

Using AiRenamify is as easy as 1-2-3. Literally.

### Step 1: The Drop 📂
Open AiRenamify and you'll see the **Drop Zone**.
*   **Drag & Drop** files directly from Finder/Explorer.
*   **Select Files** button for picking specific items.
*   **Select Folder** to process an entire directory at once.

**We support almost everything:**
*   🖼️ **Images:** `.jpg`, `.png`, `.webp`, `.gif` (The AI actually *sees* the image content!)
*   📄 **Documents:** `.pdf`, `.md`, `.txt` (The AI *reads* the text to understand context.)
*   💻 **Code:** `.js`, `.json`, `.css`, `.html`

### Step 2: The Brain 🧠
Once you drop files, the AI kicks in. You'll see "Thinking..." next to your files.
*   **What's happening?** The AI is analyzing the visual content of your photos or reading the summary of your documents.
*   **The Result:** Within seconds, a suggested filename appears.
    *   *Example:* A photo of a sunset on a beach becomes `sunset-beach-golden-hour.jpg`.
    *   *Example:* An invoice PDF becomes `invoice-acme-corp-2024-02.pdf`.

### Step 3: The Control 🎛️
You are the captain.
*   **Review:** Check the suggested names.
*   **Regenerate:** Don't like a name? Click the **Refresh icon** (🔄) to ask the AI for another variation.
*   **Rename All:** Happy with the list? Click the big green **Rename All** button. Your files are instantly updated on your disk.

---

## ⚙️ Power User Settings: The "Secret Sauce"

Head over to the **Settings** tab to customize exactly how your files are named. This is where AiRenamify truly shines.

### 1. Naming Conventions (Case Styles)
Stop manually capitalizing filenames. Choose your preferred style:
*   **Kebab Case:** `my-file-name.jpg` (Web developer favorite)
*   **Snake Case:** `my_file_name.jpg` (Data scientist favorite)
*   **Camel Case:** `myFileName.jpg`
*   **Pascal Case:** `MyFileName.jpg`

### 2. Global Translator 🌍
Working with international clients? Or just learning a new language?
Set the **Output Language** to Spanish, French, Chinese, or English. AiRenamify will analyze the content and generate the filename in your chosen language, regardless of the original file's language.

### 3. Custom Instructions (The Killer Feature) 🤖
This is where you can program the AI's behavior. In the **Custom Instructions** box, tell the AI exactly what you want.

**Examples:**
*   *"Always start with the date in YYYY-MM-DD format."*
*   *"If it's an invoice, include the total amount."*
*   *"Keep filenames under 15 characters."*
*   *"Use funny, witty names."*

---

## 🏠 Deep Dive: Setting Up Local Mode

If you want to run everything offline, here is how to set up **Local Mode** with **Ollama**:

1.  **Download Ollama:** Go to [ollama.com](https://ollama.com) and install it.
2.  **Pull a Model:** Open your terminal and run `ollama pull llava` (this is a vision-capable model).
3.  **Configure AiRenamify:**
    *   Go to **Settings** > **Local**.
    *   Set **Provider** to `Ollama`.
    *   Set **Model** to `llava:latest`.
4.  **Enjoy:** Unlimited, private, offline renaming.

---

## ❓ FAQ & Troubleshooting

**Q: Can I undo a rename?**
A: Currently, AiRenamify modifies the file directly. However, you can check the **History** tab to see the original names and manually revert them if needed.

**Q: My "Check Updates" button says "Check Failed".**
A: Check your internet connection. If you are in a restricted network, try disabling proxies.

**Q: Does it work with massive folders?**
A: Yes! But for optimal performance, we recommend processing batches of 50-100 files at a time to avoid hitting API rate limits (Cloud) or overheating your CPU (Local).

---

## 🚀 Ready to Organize?

Your digital life is about to get a whole lot tidier.
**[Download the latest version](#)** and start renaming!

*Happy Organizing!*
*— The AiRenamify Team*
