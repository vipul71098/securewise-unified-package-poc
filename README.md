# Securewise Unified Package PoC

## 📦 Overview

**Securewise Unified Package PoC** is a Proof of Concept (PoC) designed to demonstrate how a Node.js application can be packaged into a **self-contained executable** that runs independently of a locally installed Node.js runtime.

The objective is to simplify deployment, distribution, and execution by delivering a **single portable binary** across multiple operating systems.

This approach enables Securewise applications to be distributed and executed consistently in enterprise, offline, or restricted environments without additional setup.

---

## 🎯 Purpose

Modern deployments often require installing dependencies, managing runtime versions, and configuring environments before execution. This PoC explores an alternative strategy:

✅ Bundle application + runtime together  
✅ Remove Node.js dependency from target machines  
✅ Enable cross-platform distribution  
✅ Reduce deployment complexity  
✅ Ensure consistent runtime execution

---

## 🏗 Repository Structure
securewise-unified-package-poc/
│
├── nodejs-self-contained-demo/ # Demo Node.js application
│
├── Build_for_Linux.txt # Linux build instructions
├── Build_for_Windows.txt # Windows build instructions
├── Build_for_macOS.txt # macOS build instructions
│
└── .gitignore



The final artifact embeds:

- Application source code
- Node.js runtime
- Required dependencies

Result: **Zero external runtime dependency**.

---

## 🧩 Key Features

- 📦 Self-contained executable generation
- 🖥 Cross-platform builds
- 🚀 Zero-install execution
- 🔒 Controlled runtime environment
- ⚡ Simplified delivery model
- 🧱 Portable deployment artifact

---

## 🖥 Supported Platforms

| Platform | Supported |
|----------|-----------|
| Linux | ✅ |
| Windows | ✅ |
| macOS | ✅ |

---

## 🔧 Prerequisites (Build Machine Only)

These are required **only for building**, not for running the executable.

- Node.js (LTS recommended)
- npm
- Packaging tool (e.g., `pkg`)

Install packaging tool:

```bash
npm install -g pkg


🚀 Build Instructions

Platform-specific guides are available:

Build_for_Linux.txt

Build_for_Windows.txt

Build_for_macOS.txt

General Build Steps

Clone repository
git clone https://github.com/vipul71098/securewise-unified-package-poc.git
cd securewise-unified-package-poc

Navigate to demo application
cd nodejs-self-contained-demo


Install dependencies
npm install

📤 Build Output

After successful build:
dist/
 ├── app-linux
 ├── app-win.exe
 └── app-macos


🧪 Proof of Concept Scope

This repository validates:

Packaging feasibility

Runtime bundling

Cross-platform builds

Executable portability

This is not production-ready yet.
