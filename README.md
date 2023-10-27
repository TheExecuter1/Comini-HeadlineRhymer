# Beat-Bot

## Overview
The Beat-bot is a Chrome extension designed to transform headlines on the Hindustan Times (India News section) into mini rhymes. It uses the OpenAI API to generate rhymed versions of the headlines.

## Prerequisites
- Google Chrome Browser
- OpenAI API key (You can obtain it by signing up at [OpenAI](https://openai.com/))

## Installation and Setup

### Step 1: Clone or Download the Extension
Clone this repository or download the code to your local machine.

### Step 2: Get Your OpenAI API Key
Make sure you have your OpenAI API key. This key is essential for the extension to generate rhymes using the OpenAI service.

### Step 3: Add API Key to the Extension
Open the `content.js` file in the extension's codebase and replace `'your-api-key'` with your actual OpenAI API key.

### Step 4: Load the Extension into Chrome
1. Open Google Chrome and navigate to `chrome://extensions/`.
2. Enable "Developer mode" by toggling the switch in the top right corner.
3. Click on "Load unpacked" and select the directory where you cloned or unzipped the extension.

## Running the Extension
1. Visit the Hindustan Times India News section at `https://www.hindustantimes.com/india-news`.
2. The extension should automatically activate and begin transforming the headlines into rhymes. You will see the original headlines on the website replaced with rhymed versions, each followed by an exclamation mark "!".
