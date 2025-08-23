# mokapi-kafka-workflow
This repository demonstrates how to build and test Kafka workflows using Mokapi and Playwright

Example project that demonstrates how to test Kafka-based workflows without running Kafka, using:

- Mokapi: mocks a Kafka cluster based on an AsyncAPI spec
- Backend (Node.js): consumes commands and publishes events
- Playwright: drives the end-to-end tests

This setup is designed for CI pipelines where running a full Kafka cluster is too heavy.

## Architecture

The workflow under test:

1. A foreign system produces a message to the document.send-command topic.
2. The backend consumes the command, simulates sending a document, and publishes a response to the document.send-event topic.
3. Playwright verifies the full flow through Mokapi’s mocked Kafka API.

```flowchart LR
    A[Playwright test] -->|produce document.send-command| M(Mokapi - Kafka Mock)
    M --> B[Backend service]
    B -->|publish document.send-event| M
    A -->|consume document.send-event| M
```

## Getting Started

### Prerequisites

- Node.js
- [Mokapi](https://mokapi.io/docs/guides/get-started/installation)


### 1. Install dependencies

```bash
npm install
```

### 2. Start Mokapi

From project root, run:

```bash
mokapi mocks
```

### 3. Start backend server

In a new terminal:

```bash
node backend/index.js
```

### 4. Run Playwright tests

In another terminal, run:

```bash
npx playwright test
```

## License

MIT License