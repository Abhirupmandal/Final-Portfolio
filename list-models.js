const apiKey = "AIzaSyBUKyQkFWQKBmm9CmsXRfe6wB189Yg_P-I";

async function listModels() {
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await res.json();
    
    // We only want models that support generateContent
    const validModels = (data.models || []).filter(m => 
      m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")
    ).map(m => m.name.replace('models/', ''));
    
    console.log("AVAILABLE MODELS:", validModels);
  } catch (err) {
    console.error(err);
  }
}

listModels();
