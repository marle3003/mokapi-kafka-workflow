import { test, expect } from '@playwright/test';
import fetch from 'node-fetch';

const MOKAPI_API = 'http://localhost:8080/api/services/kafka/Kafka%20Mock';

test('Kafka document send workflow', async () => {
    const documentId = 'doc-' + Date.now();

    // Step 1: Produce a message to document-command topic
    let res = await fetch(`${MOKAPI_API}/topics/document-command`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            records: [
                {
                    key: documentId,
                    value: JSON.stringify({
                        documentId: documentId,
                        recipient: 'alice@mokapi.io',
                        document: {
                            mediaType: 'text/plain',
                            fileName: 'test.txt',
                            content: 'Hello Alice'
                        }
                    })
                }
            ]
        })
    });
    expect(res.status).toBe(200);
})