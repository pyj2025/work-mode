# WorkMode


[screen-capture (4).webm](https://github.com/user-attachments/assets/7d9f13a9-7b4e-4048-95c9-0b58144e5349)



## Overview

WorkMode is a specialized web application designed to prevent your machine from entering sleep mode while the browser tab remains in focus. This tool is particularly useful for developers who need to keep their machines active during long-running processes without manual intervention.

Similar to the terminal command `caffeinate -d` on macOS, WorkMode serves as a browser-based alternative that's cross-platform and easily accessible. For optimal convenience, consider keeping this app open alongside your terminal or development environment.

## Features

- Prevents system sleep mode while the browser tab is in focus
- Simple, minimalist interface
- Secure login system
- Cross-platform compatibility

## Usage

1. Open the WorkMode web application
2. Log in using the admin password provided by Joon
3. Once the command is initiated, resize the browser window to your preferred dimensions and keep it in focus
4. Continue with your work without worrying about your machine going to sleep

## Tech Stack

This project is built with Next.js, offering fast performance and easy deployment.

## Getting Started

For local development:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Deployment

WorkMode is already deployed on Vercel. 

## License

[MIT](LICENSE)
