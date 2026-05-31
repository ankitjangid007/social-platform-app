# Social Support Application

A multi-step government financial assistance form built with React. It supports English and Arabic, saves progress in the browser, and offers optional AI writing help on step 3 (“Help me write”).

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm (included with Node.js)

## How to run the project

1. **Clone or download** the repository and open a terminal in the project root.

2. **Install dependencies:**

   ```bash
   npm install --legacy-peer-deps
   ```

   The `--legacy-peer-deps` flag avoids peer-dependency conflicts with Create React App’s toolchain.

3. **Configure environment variables** (required for AI features — see below). At minimum, create a `.env` file in the project root before starting the dev server.

4. **Start the development server:**

   ```bash
   npm start
   ```

   The app opens at [http://localhost:3000](http://localhost:3000). The page reloads when you edit source files.

5. **Other useful commands:**

   | Command | Description |
   |---------|-------------|
   | `npm test` | Run unit tests (interactive watch mode) |
   | `npm test -- --watchAll=false` | Run tests once |
   | `npm run build` | Create an optimized production build in `build/` |

## OpenAI API key setup

Step 3 includes **Help me write**, which calls an **OpenAI-compatible** chat completions API. The key is read from the environment at build/start time (Create React App only exposes variables prefixed with `REACT_APP_`).

### 1. Create a `.env` file

In the project root (same folder as `package.json`), create a file named `.env`:

```env
REACT_APP_AI_API_KEY=your-api-key-here
```

Replace `your-api-key-here` with your actual key.

### 2. Choose a provider

**Option A — OpenAI (direct)**

1. Sign in at [platform.openai.com](https://platform.openai.com/).
2. Create an API key under **API keys**.
3. Add to `.env`:

   ```env
   REACT_APP_AI_API_KEY=sk-...
   REACT_APP_AI_API_URL=https://api.openai.com/v1/chat/completions
   ```

**Option B — OpenRouter (default)**

If you omit `REACT_APP_AI_API_URL`, the app uses OpenRouter’s endpoint:

```env
REACT_APP_AI_API_KEY=your-openrouter-key
# REACT_APP_AI_API_URL is optional; defaults to OpenRouter
```

Get a key from [openrouter.ai](https://openrouter.ai/).

### 3. Restart the dev server

Environment variables are loaded when the app starts. After changing `.env`, stop the running server (`Ctrl+C`) and run `npm start` again.

### 4. Verify in the app

On **step 3**, each textarea has a **Help me write** button. If the key is missing, the button stays disabled and the UI shows that AI is not configured. With a valid key, clicking it generates a draft you can edit, accept, or discard.

### Security notes

- **Do not commit** `.env` or share your API key in version control.
- Keys are bundled into the client build (standard for `REACT_APP_*` in CRA). Use a restricted key and provider quotas suitable for development or demos only.

## Architecture

For structure, design trade-offs, and possible follow-up work, see [ARCHITECTURE.md](./ARCHITECTURE.md).
