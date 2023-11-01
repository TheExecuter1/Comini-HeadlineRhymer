
// Function to generate a rhyme for a given headline using OpenAI's API
async function generateRhyme(headline, retries = 3) {
    const apiKey = 'your_api_key';  // Replace with your actual OpenAI API key
    const url = 'https://api.openai.com/v1/chat/completions';

    // Payload for the OpenAI API request
    const data = {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: "You are a creative assistant who can create rhymes."
            },
            {
                role: "user",
                content: `Create a rhyme for the headline: "${headline}"`
            }
        ]
    };

    try {
        // Making the API request
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(data)
        });

        // Handling rate limiting (429 status code) with retries
        if (response.status === 429 && retries > 0) {
            // Wait 1 second before retrying
            await delay(1000);
            return generateRhyme(headline, retries - 1);
        }

        // Processing the response
        const responseData = await response.json();
        if (responseData.choices && responseData.choices.length > 0 && responseData.choices[0].message) {
            return responseData.choices[0].message.content.trim() || headline;
        } else {
            // Return original headline if no rhyme is generated
            return headline;
        }
    } catch (error) {
        // Log the error and return the original headline
        console.error('Error generating rhyme:', error);
        return headline;
    }
}

// Function to introduce a delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let queue = [];
let processing = false;
// Function to process an individual headline
async function processHeadline(headline, element) {
    console.log("Original Headline:", headline);
    const rhymedHeadline = await generateRhyme(headline);
    console.log("Rhymed Headline:", rhymedHeadline);
    element.textContent = rhymedHeadline + "!!!";
}

// Function to process the queue
async function processQueue() {
    if (processing || queue.length === 0) return;

    processing = true;
    while (queue.length > 0) {
        const { headline, element } = queue.shift();
        try {
            await processHeadline(headline, element);
            await delay(1000); // Wait 1 second before processing the next item
        } catch (error) {
            console.error('Error processing headline:', error);
            queue.push({ headline, element }); // Optionally, re-add the headline to the queue
            await delay(5000); // Wait longer in case of an error
        }
    }
    processing = false;
}

// Function to change all headlines on the page into rhymes with queuing
async function rhymeAllHeadlinesWithQueue() {
    const headlineElements = document.querySelectorAll('h3.hdg3 a');
    for (let element of headlineElements) {
        const headline = element.textContent.trim();
        queue.push({ headline, element });
    }
    processQueue();
}

// Run the function to rhyme all headlines on the page with queuing
rhymeAllHeadlinesWithQueue();

