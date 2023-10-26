

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

// Function to introduce a delay (used for handling rate limits)
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to change all headlines on the page into rhymes
async function rhymeAllHeadlines() {
    // Selecting all headline elements on the page
    const headlineElements = document.querySelectorAll('h3.hdg3 a');
    for (let element of headlineElements) {
        // Extracting the original headline text
        const originalHeadline = element.textContent.trim();
        console.log("Original Headline:", originalHeadline);

        // Generating a rhymed version of the headline
        const rhymedHeadline = await generateRhyme(originalHeadline);
        console.log("Rhymed Headline:", rhymedHeadline);

        // Updating the headline on the page with the rhymed version
        element.textContent = rhymedHeadline + "!!!";
    }
}

// Run the function to rhyme all headlines on the page
rhymeAllHeadlines();









//If you are encountering too many requests this code below  just changes one headline I used it to test :) You can try too.
//Uncomment this code and comment out the above one.

// // Run the function to rhyme headlines on the page
// rhymeHeadlines();

// The function to generate a rhyme for a given headline using OpenAI's Chat API
// async function generateRhyme(headline, retries = 3) {
//     const apiKey = 'your_key';  // Replace with your actual OpenAI API key
//     const url = 'https://api.openai.com/v1/chat/completions';

//     const data = {
//         model: "gpt-3.5-turbo",
//         messages: [
//             {
//                 role: "system",
//                 content: "You are a creative assistant who can create rhymes."
//             },
//             {
//                 role: "user",
//                 content: `Create a rhyme for the headline: "${headline}"`
//             }
//         ]
//     };

//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${apiKey}`
//             },
//             body: JSON.stringify(data)
//         });

//         if (response.status === 429 && retries > 0) {
//             // Wait 1 second before retrying
//             await delay(1000);
//             return generateRhyme(headline, retries - 1);
//         }

//         const responseData = await response.json();
//         if (responseData.choices && responseData.choices.length > 0 && responseData.choices[0].message) {
//             return responseData.choices[0].message.content.trim() || headline;
//         } else {
//             return headline; // Return original headline if no rhyme is generated
//         }
//     } catch (error) {
//         console.error('Error generating rhyme:', error);
//         return headline; // Return original headline in case of an error
//     }
// }

// // Function to introduce a delay
// function delay(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// // Function to change the first headline on the page into a rhyme
// async function rhymeFirstHeadline() {
//     const headlineElement = document.querySelector('h3.hdg3 a');
//     if (headlineElement) {
//         const originalHeadline = headlineElement.textContent.trim();
//         console.log("Original Headline:", originalHeadline);
//         const rhymedHeadline = await generateRhyme(originalHeadline);
//         console.log("Rhymed Headline:", rhymedHeadline);
//         headlineElement.textContent = rhymedHeadline;
//     }
// }

// // Run the function to rhyme the first headline on the page
// rhymeFirstHeadline();