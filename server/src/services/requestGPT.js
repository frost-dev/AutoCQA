const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});

async function compareTextGPT(siteText, figmaText) {
  try {
    let gpt_response = {};
    let completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
            {
                role: 'system',
                content: `
                    Proofread siteText against Figma text. 
                    Highlight errors (spelling/missing words) with <span class="mistake">. 
                    Return JSON with highlighted text. Replace \n with <br> tags.
                    If there is a placeholder character like ?, no need to mark with <span class="mistake">
                    
                    Example 1:

                    SiteText: {content: 'Mary had a litle lamb'}
                    FigmaText: 'Mary had a little lamb'

                    Output:
                    {
                        content: 'Mary had a <span class="mistake"> little </span> lamb'
                    }

                    Example 2:

                    SiteText: {content: 'Mry had litle lambs'}
                    FigmaText: 'Mary had a little lamb'

                    Output:
                    {
                        content: '<span class="mistake">Mary</span> had <span class="mistake">a little lamb</span>'
                    }

                    Example 3: 

                    SiteText: {content: 'Mary had a little lamb'}
                    FigmaText: 'Mary had a litle lamb'

                    Output: 
                    {
                        isCorrect: true,
                        content: null
                    }
                `,
            },
            {
                role: 'user',
                content: `
                    siteText: ${JSON.stringify(siteText)}
                    figmaText: ${figmaText}
                `
            },
        ],
        temperature: 0,
        max_tokens: 2000,
    });

    let result = completion.choices[0].message.content;

	gpt_response.summary = result;
    
    return JSON.parse(gpt_response.summary);
  } catch (error) {
    console.error(error);
  }
}

module.exports = compareTextGPT;