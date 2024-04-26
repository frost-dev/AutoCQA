// This shows the HTML page in "ui.html".
figma.showUI(__html__);

figma.ui.resize(500,500);

figma.ui.onmessage =  async (urlInput: string) => {
  try {
    function removeFragment(url: string) {
      return url.split('#')[0];
    }

    let text = ""
    for (const node of figma.currentPage.selection) {
      if ("characters" in node) {
        text = node.characters;
      }
    }
    
    const response = await fetch(`http://localhost:3000/verify-content?siteURL="${removeFragment(urlInput)}"&figmaContent="${encodeURIComponent(text)}"`);
    console.log(response);
    const data = await response.json();
    // console.log('The API: ', data.gpt_correction.content);
    // console.log('Page title: ', data.pageTitle)
    
    figma.ui.postMessage({
      web: data.gpt_correction.siteContent ? data.gpt_correction.siteContent : 'Does not exist',
      correction: data.gpt_correction.content ? data.gpt_correction.content : 'Content is correct!',
      pageTitle: data.pageTitle ? data.pageTitle : 'Could not determine page title',
    });

  } catch (e) { 
    figma.ui.postMessage({
      web:'Sorry! Something went wrong',
      correction: ''
    });
  }

  
};


// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// // posted message.
// figma.ui.onmessage =  (msg: {type: string, count: number}) => {
//   // One way of distinguishing between different types of messages sent from
//   // your HTML page is to use an object with a "type" property like this.
//   if (msg.type === 'create-rectangles') {
//     const nodes: SceneNode[] = [];
//     for (let i = 0; i < msg.count; i++) {
//       const rect = figma.createRectangle();
//       rect.x = i * 150;
//       rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
//       figma.currentPage.appendChild(rect);
//       nodes.push(rect);
//     }
//     figma.currentPage.selection = nodes;
//     figma.viewport.scrollAndZoomIntoView(nodes);
//   }

//   // Make sure to close the plugin when you're done. Otherwise the plugin will
//   // keep running, which shows the cancel button at the bottom of the screen.
//   figma.closePlugin();
// };

